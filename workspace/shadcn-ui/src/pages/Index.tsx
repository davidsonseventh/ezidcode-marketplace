import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, ShoppingCart, User, Store, LayoutDashboard, 
  Heart, Bell, Menu, Star, MapPin, Phone, Mail
} from 'lucide-react';
import { mockProducts, categories } from '@/lib/mockData';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b border-orange-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +62 812-3456-7890
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                support@ezidcode.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="hover:text-orange-200 transition-colors">
                <Bell className="w-4 h-4" />
              </Link>
              <Link to="/dashboard" className="hover:text-orange-200 transition-colors">
                Bantuan
              </Link>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-2">
              <Store className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">ezidcode</h1>
                <p className="text-xs text-orange-100">Multivendor Marketplace</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Cari produk, toko, atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-6 rounded-lg text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-orange-300"
                />
                <Button 
                  size="icon"
                  className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600 h-10 w-10"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-4">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-400">
                  <ShoppingCart className="w-6 h-6" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0.5 text-xs">
                    3
                  </Badge>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="hover:bg-orange-400 gap-2">
                  <User className="w-5 h-5" />
                  <span>Akun Saya</span>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="hover:bg-orange-400 gap-2">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="w-5 h-5" />
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="shrink-0 gap-2 hover:text-orange-600 hover:bg-orange-50"
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 py-6">
        <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold drop-shadow-lg">Flash Sale Hari Ini!</h2>
              <p className="text-2xl drop-shadow-md">Diskon hingga 80% untuk produk pilihan</p>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 mt-4">
                Belanja Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Produk Terpopuler'}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Terbaru</Button>
            <Button variant="outline" size="sm">Terlaris</Button>
            <Button variant="outline" size="sm">Harga</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-orange-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    {product.isDigital && (
                      <Badge className="absolute bottom-2 left-2 bg-blue-500">
                        Digital
                      </Badge>
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-orange-600">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{product.vendorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Terjual {product.sold.toLocaleString('id-ID')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Tentang ezidcode</h3>
              <p className="text-sm">
                Platform hybrid commerce yang menggabungkan Multivendor Marketplace dengan Sistem POS yang canggih.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Layanan</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Marketplace</a></li>
                <li><a href="#" className="hover:text-orange-400">Sistem POS</a></li>
                <li><a href="#" className="hover:text-orange-400">PPOB</a></li>
                <li><a href="#" className="hover:text-orange-400">Menjadi Vendor</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Bantuan</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-orange-400">Cara Berbelanja</a></li>
                <li><a href="#" className="hover:text-orange-400">Pengiriman</a></li>
                <li><a href="#" className="hover:text-orange-400">Pengembalian</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Hubungi Kami</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +62 812-3456-7890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  support@ezidcode.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Jakarta, Indonesia
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 ezidcode Multivendor Marketplace. Dibuat oleh Davidson Iglesias Rumondor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
