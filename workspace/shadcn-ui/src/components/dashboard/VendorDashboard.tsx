import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, ShoppingCart, DollarSign, TrendingUp, Eye,
  Edit, Trash2, Plus
} from 'lucide-react';
import { mockProducts, mockOrders } from '@/lib/mockData';

export default function VendorDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const myProducts = mockProducts.slice(0, 3);
  const myOrders = mockOrders;
  const totalSales = 45750000;
  const totalOrders = 156;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Vendor</h2>
        <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Total Produk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{myProducts.length}</div>
            <p className="text-xs text-gray-500 mt-1">3 aktif, 0 nonaktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Total Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Penjualan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatPrice(totalSales)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +32% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Saldo Tersedia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatPrice(12500000)}</div>
            <Button size="sm" variant="outline" className="mt-2">
              Tarik Dana
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Product Management */}
      <Card>
        <CardHeader>
          <CardTitle>Produk Saya</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Stok: {product.stock}</span>
                    <span>Terjual: {product.sold}</span>
                    <span>Rating: {product.rating} ⭐</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-orange-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Lihat
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 gap-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{order.id}</span>
                    <Badge
                      variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'shipped' ? 'secondary' :
                        'outline'
                      }
                      className={
                        order.status === 'delivered' ? 'bg-green-500' :
                        order.status === 'shipped' ? 'bg-blue-500' :
                        ''
                      }
                    >
                      {order.status === 'delivered' ? 'Selesai' :
                       order.status === 'shipped' ? 'Dikirim' :
                       order.status === 'paid' ? 'Dibayar' :
                       'Pending'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.items.length} produk • {order.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">{formatPrice(order.total)}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 mx-auto mb-3 text-orange-600" />
            <h3 className="font-medium mb-1">Upload Produk</h3>
            <p className="text-sm text-gray-500">Tambahkan produk baru ke toko Anda</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-orange-600" />
            <h3 className="font-medium mb-1">Kelola Pesanan</h3>
            <p className="text-sm text-gray-500">Proses dan lacak pesanan pelanggan</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-3 text-orange-600" />
            <h3 className="font-medium mb-1">Laporan Penjualan</h3>
            <p className="text-sm text-gray-500">Lihat statistik dan analisis penjualan</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
