import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Plus, Minus, Trash2, ShoppingCart, Printer,
  Package, BarChart3, TrendingUp, DollarSign
} from 'lucide-react';
import { mockPOSItems } from '@/lib/mockData';

export default function POSSystem() {
  const [cartItems, setCartItems] = useState<Array<{ item: typeof mockPOSItems[0]; quantity: number }>>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (item: typeof mockPOSItems[0]) => {
    const existingItem = cartItems.find(ci => ci.item.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(ci =>
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(cartItems.map(ci =>
      ci.item.id === itemId
        ? { ...ci, quantity: Math.max(1, ci.quantity + delta) }
        : ci
    ).filter(ci => ci.quantity > 0));
  };

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter(ci => ci.item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, ci) => sum + ci.item.sellPrice * ci.quantity, 0);
  const total = subtotal;

  const filteredItems = mockPOSItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sistem POS (Point of Sale)</h2>

      <Tabs defaultValue="kasir" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="kasir">Kasir</TabsTrigger>
          <TabsTrigger value="stok">Manajemen Stok</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
          <TabsTrigger value="cabang">Cabang</TabsTrigger>
        </TabsList>

        {/* Kasir Tab */}
        <TabsContent value="kasir" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product List */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Cari produk atau scan barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Scan Barcode
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredItems.map((item) => (
                      <Card
                        key={item.id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => addToCart(item)}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-gray-500 mb-2">{item.sku}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-orange-600">
                              {formatPrice(item.sellPrice)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Stok: {item.stock}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Keranjang
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Keranjang kosong</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto">
                        {cartItems.map((ci) => (
                          <div key={ci.item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{ci.item.name}</h4>
                              <p className="text-sm text-orange-600 font-medium">
                                {formatPrice(ci.item.sellPrice)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(ci.item.id, -1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{ci.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(ci.item.id, 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-500"
                                onClick={() => removeItem(ci.item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 pt-3 border-t">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span className="font-medium">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-orange-600">{formatPrice(total)}</span>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12">
                            Bayar Cash
                          </Button>
                          <Button variant="outline" className="w-full h-12">
                            Bayar Non-Cash
                          </Button>
                          <Button variant="outline" className="w-full gap-2">
                            <Printer className="w-4 h-4" />
                            Cetak Struk
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Stok Tab */}
        <TabsContent value="stok" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Manajemen Stok</h3>
            <div className="flex gap-2">
              <Button variant="outline">Import Data</Button>
              <Button className="bg-orange-600 hover:bg-orange-700">Tambah Item</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">SKU</th>
                      <th className="text-left py-3 px-2">Nama Item</th>
                      <th className="text-left py-3 px-2">Kategori</th>
                      <th className="text-right py-3 px-2">Harga Beli</th>
                      <th className="text-right py-3 px-2">Harga Jual</th>
                      <th className="text-center py-3 px-2">Stok</th>
                      <th className="text-center py-3 px-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPOSItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">{item.sku}</td>
                        <td className="py-3 px-2 font-medium">{item.name}</td>
                        <td className="py-3 px-2">{item.category}</td>
                        <td className="py-3 px-2 text-right">{formatPrice(item.buyPrice)}</td>
                        <td className="py-3 px-2 text-right font-medium text-orange-600">
                          {formatPrice(item.sellPrice)}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant={item.stock < 50 ? 'destructive' : 'default'}>
                            {item.stock} {item.unit}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="outline" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Laporan Tab */}
        <TabsContent value="laporan" className="space-y-4">
          <h3 className="text-xl font-bold">Laporan Penjualan</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Penjualan Hari Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{formatPrice(2450000)}</div>
                <p className="text-xs text-gray-500 mt-1">45 transaksi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Penjualan Bulan Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{formatPrice(45750000)}</div>
                <p className="text-xs text-green-600 mt-1">+18% dari bulan lalu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Laba Kotor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{formatPrice(12500000)}</div>
                <p className="text-xs text-gray-500 mt-1">Margin 27.3%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Produk Terlaris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPOSItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-400">#{idx + 1}</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{Math.floor(Math.random() * 100) + 50} terjual</p>
                      <p className="text-sm text-orange-600">{formatPrice(item.sellPrice * (Math.floor(Math.random() * 100) + 50))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cabang Tab */}
        <TabsContent value="cabang" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Manajemen Cabang</h3>
            <Button className="bg-orange-600 hover:bg-orange-700">Tambah Cabang</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cabang Utama - Jakarta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Produk</span>
                  <span className="font-medium">{mockPOSItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Penjualan Hari Ini</span>
                  <span className="font-medium text-orange-600">{formatPrice(2450000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-500">Aktif</Badge>
                </div>
                <Button variant="outline" className="w-full">Kelola Cabang</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cabang 2 - Bandung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Produk</span>
                  <span className="font-medium">{mockPOSItems.length - 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Penjualan Hari Ini</span>
                  <span className="font-medium text-orange-600">{formatPrice(1850000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-500">Aktif</Badge>
                </div>
                <Button variant="outline" className="w-full">Kelola Cabang</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
