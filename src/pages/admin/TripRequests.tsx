import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Package, Car, Check, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from "@/lib/api";

interface Booking {
  id: string;
  type: 'package' | 'ride';
  user?: {
    id: string;
    name: string;
    email: string;
  };
  packageName?: string;
  packageId?: number;
  rideType?: string;
  rideId?: number;
  pickupLocation?: string;
  destination?: string;
  pickupDate?: string;
  pickupTime?: string;
  tripType?: string;
  passengers?: number;
  fullName: string;
  email: string;
  phone: string;
  travelers?: number;
  startDate?: string;
  endDate?: string;
  specialRequests: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason: string;
  createdAt: string;
  updatedAt: string;
}

const TripRequests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.BOOKING.ALL, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings || []);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'approved' | 'rejected', reason?: string) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await fetch(API_ENDPOINTS.BOOKING.UPDATE_STATUS(bookingId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          status,
          rejectionReason: reason || '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message,
        });
        fetchBookings(); // Refresh the list
        setIsRejectDialogOpen(false);
        setRejectionReason("");
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (booking.packageName && booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'ride' ? <Car className="h-4 w-4" /> : <Package className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Trip Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage and approve booking requests.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-input rounded-md bg-background"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{bookings.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Booking Requests</CardTitle>
            <CardDescription>
              Review and manage all booking requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" ? 'No bookings found matching your criteria.' : 'No bookings yet.'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(booking.type)}
                          <span className="capitalize">{booking.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.fullName}</p>
                          <p className="text-sm text-muted-foreground">{booking.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {booking.type === 'package' ? (
                            <p className="font-medium">{booking.packageName}</p>
                          ) : (
                            <p className="font-medium">{booking.rideType} - {booking.tripType}</p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            {booking.type === 'package' ?
                              `${booking.travelers} travelers` :
                              `${booking.passengers} passengers`
                            }
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{booking.totalAmount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'approved')}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setIsRejectDialogOpen(true);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Booking Details Dialog */}
        {selectedBooking && (
          <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>
                  Detailed information about this booking request.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <p className="font-medium">{selectedBooking.fullName}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p>{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <p className="font-medium">₹{selectedBooking.totalAmount}</p>
                  </div>
                </div>

                {selectedBooking.type === 'package' ? (
                  <div className="space-y-2">
                    <Label>Package Details</Label>
                    <p><strong>Package:</strong> {selectedBooking.packageName}</p>
                    <p><strong>Travelers:</strong> {selectedBooking.travelers}</p>
                    <p><strong>Dates:</strong> {selectedBooking.startDate} to {selectedBooking.endDate}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Ride Details</Label>
                    <p><strong>Type:</strong> {selectedBooking.rideType}</p>
                    <p><strong>Passengers:</strong> {selectedBooking.passengers}</p>
                    <p><strong>Route:</strong> {selectedBooking.pickupLocation} to {selectedBooking.destination}</p>
                    <p><strong>Pickup:</strong> {selectedBooking.pickupDate} at {selectedBooking.pickupTime}</p>
                  </div>
                )}

                {selectedBooking.specialRequests && (
                  <div>
                    <Label>Special Requests</Label>
                    <p className="text-sm bg-muted p-2 rounded">{selectedBooking.specialRequests}</p>
                  </div>
                )}

                {selectedBooking.status === 'rejected' && selectedBooking.rejectionReason && (
                  <div>
                    <Label>Rejection Reason</Label>
                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{selectedBooking.rejectionReason}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Booking</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this booking.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter the reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedBooking && updateBookingStatus(selectedBooking.id, 'rejected', rejectionReason)}
              >
                Reject Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default TripRequests;