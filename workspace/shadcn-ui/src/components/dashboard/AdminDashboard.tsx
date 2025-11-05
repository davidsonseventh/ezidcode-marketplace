import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Package, DollarSign, TrendingUp, Store, 
  CheckCircle, XCircle, Clock
} from 'lucide-react';
import { mockVendors, mockProducts } from '@/lib/mockData';

export default function AdminDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalRevenue = 125750000;
  const totalCommission = 15750000;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Admin</h2>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Tambah Vendor Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Vendor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockVendors.length}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Total Produk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockProducts.length}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatPrice(totalRevenue)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +25% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Komisi Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatPrice(totalCommission)}</div>
            <p className="text-xs text-gray-500 mt-1">
              Rata-rata 12.5%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{vendor.name}</h3>
                    <p className="text-sm text-gray-500">{vendor.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span>{vendor.products} produk</span>
                      <span>{vendor.followers.toLocaleString('id-ID')} followers</span>
                      <span>Rating {vendor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Komisi {vendor.commission}%</Badge>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Persetujuan Produk Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">5 produk menunggu persetujuan</p>
                  <p className="text-sm text-gray-500">Dari 3 vendor berbeda</p>
                </div>
              </div>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Tinjau Sekarang
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">23 produk disetujui hari ini</p>
                  <p className="text-sm text-gray-500">Total 156 produk aktif</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium">2 produk ditolak</p>
                  <p className="text-sm text-gray-500">Tidak memenuhi standar kualitas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 pb-3 border-b">
              <Store className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p><span className="font-medium">Toko Elektronik Jaya</span> menambahkan 3 produk baru</p>
                <p className="text-xs text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <Users className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p><span className="font-medium">Fashion Store</span> mencapai 25.000 followers</p>
                <p className="text-xs text-gray-500">5 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <DollarSign className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p>Komisi platform mencapai <span className="font-medium">{formatPrice(totalCommission)}</span> bulan ini</p>
                <p className="text-xs text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
