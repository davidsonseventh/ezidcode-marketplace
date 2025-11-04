import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, Trash2, Plus, Minus, Store, ArrowLeft,
  Truck, Wallet, CreditCard, MapPin
} from 'lucide-react';
import { mockProducts } from '@/lib/mockData';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: '1', product: mockProducts[0], quantity: 1, selected: true },
    { id: '2', product: mockProducts[1], quantity: 2, selected: true },
    { id: '3', product: mockProducts[2], quantity: 1, selected: false },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('tripay-bca');
  const [shippingMethod, setShippingMethod] = useState('jne-reg');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, item.quantity + delta)) }
          : item
      )
    );
  };

  const toggleSelect = (id: string) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = 15000;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali Belanja
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-xl">ezidcode</span>
          </div>
          <div className="w-32" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-orange-600" />
          Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox
                    checked={selectedItems.length === cartItems.length}
                    onCheckedChange={(checked) => {
                      setCartItems(items =>
                        items.map(item => ({ ...item, selected: !!checked }))
                      );
                    }}
                  />
                  <span className="font-medium">Pilih Semua ({cartItems.length})</span>
                </div>

                <Separator className="mb-4" />

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Keranjang belanja Anda kosong</p>
                    <Link to="/">
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        Mulai Belanja
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <Checkbox
                          checked={item.selected}
                          onCheckedChange={() => toggleSelect(item.id)}
                        />
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.product.vendorName}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-orange-600">
                              {formatPrice(item.product.price)}
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {cartItems.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Alamat Pengiriman
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">+62 812-3456-7890</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Jl. Sudirman No. 123, Kec. Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                    </p>
                    <Button variant="outline" size="sm">
                      Ubah Alamat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Method */}
            {cartItems.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                    Metode Pengiriman
                  </h3>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="jne-reg" id="jne-reg" />
                          <Label htmlFor="jne-reg" className="cursor-pointer">
                            <p className="font-medium">JNE Reguler</p>
                            <p className="text-sm text-gray-500">Estimasi 2-3 hari</p>
                          </Label>
                        </div>
                        <span className="font-medium">{formatPrice(15000)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="jne-yes" id="jne-yes" />
                          <Label htmlFor="jne-yes" className="cursor-pointer">
                            <p className="font-medium">JNE YES</p>
                            <p className="text-sm text-gray-500">Estimasi 1 hari</p>
                          </Label>
                        </div>
                        <span className="font-medium">{formatPrice(25000)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="cursor-pointer">
                            <p className="font-medium">Cash on Delivery (COD)</p>
                            <p className="text-sm text-gray-500">Bayar di tempat</p>
                          </Label>
                        </div>
                        <span className="font-medium">{formatPrice(10000)}</span>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-bold text-lg">Ringkasan Belanja</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({selectedItems.length} produk)
                      </span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ongkos Kirim</span>
                      <span className="font-medium">{formatPrice(shippingCost)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-medium">Metode Pembayaran</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <RadioGroupItem value="tripay-bca" id="tripay-bca" />
                          <Label htmlFor="tripay-bca" className="cursor-pointer flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>BCA Virtual Account</span>
                          </Label>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <RadioGroupItem value="tripay-mandiri" id="tripay-mandiri" />
                          <Label htmlFor="tripay-mandiri" className="cursor-pointer flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span>Mandiri Virtual Account</span>
                          </Label>
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg">
                          <RadioGroupItem value="wallet" id="wallet" />
                          <Label htmlFor="wallet" className="cursor-pointer flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            <span>Saldo Akun (Rp 500.000)</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Input placeholder="Masukkan kode voucher" />
                    <Button variant="outline" className="w-full">
                      Gunakan Voucher
                    </Button>
                  </div>

                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg"
                    disabled={selectedItems.length === 0}
                  >
                    Checkout ({selectedItems.length})
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Dengan melakukan checkout, Anda menyetujui syarat dan ketentuan yang berlaku
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
