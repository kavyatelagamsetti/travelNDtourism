import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  const isLoggedIn = isUserLoggedIn || isAdminLoggedIn;
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "Rides", path: "/rides" },
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-bold text-foreground">EchoesOfKashmir</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted/50 ${
                    isActive ? "text-primary bg-muted font-semibold" : "text-foreground"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-foreground">
                  Hi {userName}!
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <NavLink to="/login">
                    <User className="h-4 w-4 mr-1" />
                    Login
                  </NavLink>
                </Button>
                <Button size="sm" className="bg-gradient-hero shadow-glow" asChild>
                  <NavLink to="/signup">
                    Sign Up
                  </NavLink>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-muted/50 ${
                      isActive ? "text-primary bg-muted font-semibold" : "text-foreground"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-border">
                {isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-sm text-foreground">
                      Hi {userName}!
                    </div>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                      <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </NavLink>
                    </Button>
                    <Button size="sm" className="bg-gradient-hero shadow-glow" asChild>
                      <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                        Sign Up
                      </NavLink>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;