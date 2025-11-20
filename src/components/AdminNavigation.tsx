import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Shield, Users, Package, Settings, BarChart3 } from "lucide-react";

const AdminNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const adminNavLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: BarChart3 },
    { name: "Trip Requests", path: "/admin/trip-requests", icon: Package },
    { name: "User Management", path: "/admin/user-management", icon: Users },
    { name: "Custom Controls", path: "/admin/custom-controls", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  return (
    <nav className="bg-destructive/95 backdrop-blur supports-[backdrop-filter]:bg-destructive/60 sticky top-0 z-50 w-full border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/admin/dashboard" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" />
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {adminNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white hover:bg-white/10 flex items-center gap-2 ${
                    isActive ? "text-white bg-white/20 font-semibold" : "text-white/90"
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Logout Button */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {adminNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white hover:bg-white/10 flex items-center gap-2 ${
                      isActive ? "text-white bg-white/20 font-semibold" : "text-white/90"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                <Button variant="ghost" size="sm" className="justify-start text-white hover:bg-white/10" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavigation;