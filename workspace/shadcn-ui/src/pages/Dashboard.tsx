import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Store, LayoutDashboard, Package, ShoppingCart, Wallet, 
  Users, Settings, LogOut, BarChart3, TrendingUp, DollarSign,
  ArrowLeft, CreditCard, Smartphone
} from 'lucide-react';
import { mockUser } from '@/lib/mockData';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import VendorDashboard from '@/components/dashboard/VendorDashboard';
import POSSystem from '@/components/dashboard/POSSystem';
import PPOBSystem from '@/components/dashboard/PPOBSystem';

export default function Dashboard() {
  const [activeRole, setActiveRole] = useState<'admin' | 'vendor' | 'buyer'>('vendor');
  const [activeTab, setActiveTab] = useState('overview');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Ke Marketplace
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-xl">ezidcode Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium">{mockUser.name}</p>
              <p className="text-sm text-gray-500 capitalize">{activeRole}</p>
            </div>
            <Avatar>
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Role Switcher (Demo Only) */}
        <Card className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Demo Mode - Switch Role:</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeRole === 'admin' ? 'default' : 'outline'}
                    onClick={() => setActiveRole('admin')}
                    className={activeRole === 'admin' ? 'bg-orange-600' : ''}
                  >
                    Admin
                  </Button>
                  <Button
                    size="sm"
                    variant={activeRole === 'vendor' ? 'default' : 'outline'}
                    onClick={() => setActiveRole('vendor')}
                    className={activeRole === 'vendor' ? 'bg-orange-600' : ''}
                  >
                    Vendor
                  </Button>
                  <Button
                    size="sm"
                    variant={activeRole === 'buyer' ? 'default' : 'outline'}
                    onClick={() => setActiveRole('buyer')}
                    className={activeRole === 'buyer' ? 'bg-orange-600' : ''}
                  >
                    Buyer
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Saldo: <span className="font-bold text-orange-600">{formatPrice(mockUser.balance)}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'overview' ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-2 ${activeTab === 'overview' ? 'bg-orange-600' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                  
                  {activeRole === 'admin' && (
                    <>
                      <Button
                        variant={activeTab === 'vendors' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'vendors' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('vendors')}
                      >
                        <Users className="w-4 h-4" />
                        Kelola Vendor
                      </Button>
                      <Button
                        variant={activeTab === 'reports' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'reports' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('reports')}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Laporan
                      </Button>
                    </>
                  )}

                  {activeRole === 'vendor' && (
                    <>
                      <Button
                        variant={activeTab === 'products' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'products' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('products')}
                      >
                        <Package className="w-4 h-4" />
                        Produk Saya
                      </Button>
                      <Button
                        variant={activeTab === 'orders' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'orders' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('orders')}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Pesanan
                      </Button>
                      <Button
                        variant={activeTab === 'pos' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'pos' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('pos')}
                      >
                        <CreditCard className="w-4 h-4" />
                        Sistem POS
                      </Button>
                      <Button
                        variant={activeTab === 'ppob' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'ppob' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('ppob')}
                      >
                        <Smartphone className="w-4 h-4" />
                        PPOB
                      </Button>
                    </>
                  )}

                  {activeRole === 'buyer' && (
                    <>
                      <Button
                        variant={activeTab === 'orders' ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${activeTab === 'orders' ? 'bg-orange-600' : ''}`}
                        onClick={() => setActiveTab('orders')}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Pesanan Saya
                      </Button>
                    </>
                  )}

                  <Button
                    variant={activeTab === 'wallet' ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-2 ${activeTab === 'wallet' ? 'bg-orange-600' : ''}`}
                    onClick={() => setActiveTab('wallet')}
                  >
                    <Wallet className="w-4 h-4" />
                    Dompet
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-2 ${activeTab === 'settings' ? 'bg-orange-600' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && activeRole === 'admin' && <AdminDashboard />}
            {activeTab === 'overview' && activeRole === 'vendor' && <VendorDashboard />}
            {activeTab === 'pos' && <POSSystem />}
            {activeTab === 'ppob' && <PPOBSystem />}
            
            {activeTab === 'overview' && activeRole === 'buyer' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Dashboard Pembeli</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">24</div>
                      <p className="text-xs text-gray-500 mt-1">+3 bulan ini</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Belanja</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">{formatPrice(15750000)}</div>
                      <p className="text-xs text-gray-500 mt-1">Sepanjang waktu</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Wishlist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <p className="text-xs text-gray-500 mt-1">Produk favorit</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Dompet Saya</h2>
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <p className="text-sm opacity-90 mb-2">Saldo Tersedia</p>
                    <p className="text-4xl font-bold mb-4">{formatPrice(mockUser.balance)}</p>
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm">Top Up</Button>
                      <Button variant="secondary" size="sm">Tarik Dana</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Pengaturan Akun</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Fitur pengaturan akan segera hadir...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
