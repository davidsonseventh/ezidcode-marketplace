import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, Wifi, Zap, Droplet, Heart, 
  CreditCard, Clock, CheckCircle
} from 'lucide-react';
import { mockPPOBProducts } from '@/lib/mockData';

export default function PPOBSystem() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const pulsaProducts = mockPPOBProducts.filter(p => p.category === 'pulsa');
  const dataProducts = mockPPOBProducts.filter(p => p.category === 'data');
  const plnProducts = mockPPOBProducts.filter(p => p.category === 'pln');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">PPOB (Payment Point Online Bank)</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Transaksi Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-gray-500 mt-1">+12 dari kemarin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatPrice(2450000)}</div>
            <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Komisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatPrice(125000)}</div>
            <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Saldo Digiflazz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatPrice(5000000)}</div>
            <Button size="sm" variant="outline" className="mt-2">Top Up</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pulsa" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pulsa" className="gap-2">
            <Smartphone className="w-4 h-4" />
            Pulsa
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Wifi className="w-4 h-4" />
            Paket Data
          </TabsTrigger>
          <TabsTrigger value="pln" className="gap-2">
            <Zap className="w-4 h-4" />
            Token PLN
          </TabsTrigger>
          <TabsTrigger value="pdam" className="gap-2">
            <Droplet className="w-4 h-4" />
            PDAM
          </TabsTrigger>
          <TabsTrigger value="bpjs" className="gap-2">
            <Heart className="w-4 h-4" />
            BPJS
          </TabsTrigger>
        </TabsList>

        {/* Pulsa Tab */}
        <TabsContent value="pulsa" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Isi Pulsa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nomor HP</Label>
                    <Input
                      placeholder="08xx-xxxx-xxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pilih Nominal</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pulsaProducts.map((product) => (
                        <Card
                          key={product.id}
                          className={`cursor-pointer transition-all ${
                            selectedProduct === product.id
                              ? 'border-orange-500 border-2 shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Smartphone className="w-4 h-4 text-orange-600" />
                              <span className="text-sm font-medium">{product.provider}</span>
                            </div>
                            <p className="font-bold text-lg mb-1">{product.name}</p>
                            <p className="text-orange-600 font-medium">{formatPrice(product.price)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nomor HP</span>
                          <span className="font-medium">{phoneNumber || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Produk</span>
                          <span className="font-medium">
                            {mockPPOBProducts.find(p => p.id === selectedProduct)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Harga</span>
                          <span className="font-medium text-orange-600">
                            {formatPrice(mockPPOBProducts.find(p => p.id === selectedProduct)?.price || 0)}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 h-12"
                        disabled={!phoneNumber}
                      >
                        Bayar Sekarang
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Pilih nominal pulsa</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Paket Data Tab */}
        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Beli Paket Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nomor HP</Label>
                    <Input
                      placeholder="08xx-xxxx-xxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pilih Paket</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dataProducts.map((product) => (
                        <Card
                          key={product.id}
                          className={`cursor-pointer transition-all ${
                            selectedProduct === product.id
                              ? 'border-orange-500 border-2 shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Wifi className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium">{product.provider}</span>
                              </div>
                              <Badge variant="outline">30 Hari</Badge>
                            </div>
                            <p className="font-bold text-lg mb-1">{product.name}</p>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <p className="text-orange-600 font-medium">{formatPrice(product.price)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nomor HP</span>
                          <span className="font-medium">{phoneNumber || '-'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Paket</span>
                          <span className="font-medium">
                            {mockPPOBProducts.find(p => p.id === selectedProduct)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Harga</span>
                          <span className="font-medium text-orange-600">
                            {formatPrice(mockPPOBProducts.find(p => p.id === selectedProduct)?.price || 0)}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 h-12"
                        disabled={!phoneNumber}
                      >
                        Bayar Sekarang
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Wifi className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Pilih paket data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Token PLN Tab */}
        <TabsContent value="pln" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Beli Token PLN</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>ID Pelanggan / No. Meter</Label>
                    <Input placeholder="Masukkan nomor meter PLN" />
                  </div>

                  <div className="space-y-2">
                    <Label>Pilih Nominal</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {plnProducts.map((product) => (
                        <Card
                          key={product.id}
                          className={`cursor-pointer transition-all ${
                            selectedProduct === product.id
                              ? 'border-orange-500 border-2 shadow-lg'
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-orange-600" />
                              <span className="text-sm font-medium">{product.provider}</span>
                            </div>
                            <p className="font-bold text-lg mb-1">{product.name}</p>
                            <p className="text-orange-600 font-medium">{formatPrice(product.price)}</p>
                            <p className="text-xs text-gray-500 mt-1">Admin: Rp 1.000</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Nominal</span>
                          <span className="font-medium">
                            {mockPPOBProducts.find(p => p.id === selectedProduct)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Harga</span>
                          <span className="font-medium text-orange-600">
                            {formatPrice(mockPPOBProducts.find(p => p.id === selectedProduct)?.price || 0)}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12">
                        Bayar Sekarang
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Zap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Pilih nominal token</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* PDAM Tab */}
        <TabsContent value="pdam" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bayar Tagihan PDAM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ID Pelanggan PDAM</Label>
                <Input placeholder="Masukkan ID pelanggan" />
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">Cek Tagihan</Button>
              <div className="text-center py-8 text-gray-500">
                <Droplet className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Masukkan ID pelanggan untuk cek tagihan</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BPJS Tab */}
        <TabsContent value="bpjs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bayar Iuran BPJS Kesehatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nomor Kartu BPJS</Label>
                <Input placeholder="Masukkan nomor kartu BPJS" />
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">Cek Tagihan</Button>
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Masukkan nomor kartu untuk cek tagihan</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'TRX001', type: 'Pulsa Telkomsel 10.000', phone: '0812-3456-7890', amount: 11000, status: 'success', time: '10:30' },
              { id: 'TRX002', type: 'Paket Data XL 3GB', phone: '0856-7890-1234', amount: 25000, status: 'success', time: '09:15' },
              { id: 'TRX003', type: 'Token PLN 50.000', meter: '12345678901', amount: 51000, status: 'pending', time: '08:45' },
            ].map((trx) => (
              <div key={trx.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trx.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {trx.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{trx.type}</p>
                    <p className="text-sm text-gray-500">
                      {trx.phone || trx.meter} • {trx.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-orange-600">{formatPrice(trx.amount)}</p>
                  <Badge variant={trx.status === 'success' ? 'default' : 'secondary'} className={trx.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {trx.status === 'success' ? 'Berhasil' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
