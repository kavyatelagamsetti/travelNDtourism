import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Package, TrendingUp, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    // Fetch dashboard stats
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Fetch users count
      const adminToken = localStorage.getItem('adminToken');
      const usersResponse = await fetch('http://localhost:5000/api/auth/all-users', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      const usersData = await usersResponse.json();
      const totalUsers = usersData.users ? usersData.users.length : 0;

      // For now, set dummy data for other stats
      // In a real app, you'd have separate endpoints for these
      setStats({
        totalUsers,
        totalBookings: 45, // Dummy data
        totalRevenue: 125000, // Dummy data
        pendingRequests: 8, // Dummy data
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-blue-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Package,
      description: "Completed bookings",
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "Total earnings",
      color: "text-yellow-600",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: TrendingUp,
      description: "Awaiting approval",
      color: "text-red-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to the admin panel. Manage users, bookings, and system settings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dummy recent bookings */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Gulmarg Trip - 3 days</p>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Srinagar Package</p>
                  </div>
                  <Badge variant="default">Confirmed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">Houseboat Booking</p>
                  </div>
                  <Badge variant="outline">Processing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <Badge variant="default" className="bg-green-500">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="default" className="bg-green-500">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <Badge variant="secondary">Maintenance</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;