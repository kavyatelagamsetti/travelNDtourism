const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin JWT token
const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] ||
                req.headers['admin-token'] ||
                req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Admin access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, admin) => {
    if (err || admin.role !== 'admin') {
      return res.status(403).json({ message: 'Invalid admin token' });
    }
    req.admin = admin;
    next();
  });
};

// Create booking request
router.post('/create', async (req, res) => {
  try {
    console.log('Booking request received:', req.body); // Debug log

    const {
      type,
      // Package fields
      packageName,
      packageId,
      travelers,
      startDate,
      endDate,
      // Ride fields
      rideType,
      rideId,
      pickupLocation,
      destination,
      pickupDate,
      pickupTime,
      tripType,
      passengers,
      // Common fields
      fullName,
      email,
      phone,
      specialRequests,
      totalAmount
    } = req.body;

    console.log('Extracted type:', type); // Debug log

    let bookingData = {
      fullName,
      email,
      phone,
      specialRequests: specialRequests || '',
      totalAmount: parseFloat(totalAmount)
    };

    // Determine booking type
    const isRideBooking = type === 'ride' || (rideType && pickupLocation);

    if (isRideBooking) {
      // For rides, auto-approve and don't require user authentication
      bookingData.type = 'ride';
      bookingData.rideType = rideType;
      bookingData.rideId = rideId ? parseInt(rideId) : 1;
      bookingData.pickupLocation = pickupLocation;
      bookingData.destination = destination;
      bookingData.pickupDate = pickupDate ? new Date(pickupDate) : new Date();
      bookingData.pickupTime = pickupTime;
      bookingData.tripType = tripType || 'oneway';
      bookingData.passengers = passengers ? parseInt(passengers) : 1;
      bookingData.status = 'approved'; // Auto-approve ride bookings
    } else {
      // For packages, require authentication and set as pending
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Access token required for package bookings' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        bookingData.user = decoded.userId;
        bookingData.type = 'package';
        bookingData.packageName = packageName;
        bookingData.packageId = packageId ? parseInt(packageId) : 1;
        bookingData.travelers = travelers ? parseInt(travelers) : 1;
        bookingData.startDate = startDate ? new Date(startDate) : new Date();
        bookingData.endDate = endDate ? new Date(endDate) : new Date();
        bookingData.status = 'pending';
      } catch (jwtError) {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }

    // Handle ride bookings (no authentication required)
    try {
      console.log('Creating ride booking with data:', bookingData); // Debug log
      const booking = new Booking(bookingData);
      await booking.save();

      console.log('Ride booking saved successfully:', booking._id); // Debug log
      res.status(201).json({
        message: 'Ride booking confirmed successfully',
        booking: {
          id: booking._id,
          rideType: booking.rideType,
          status: booking.status,
          createdAt: booking.createdAt
        }
      });
    } catch (saveError) {
      console.error('Ride booking save error:', saveError);
      res.status(500).json({ message: 'Failed to save ride booking' });
    }
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      bookings: bookings.map(booking => ({
        id: booking._id,
        packageName: booking.packageName,
        packageId: booking.packageId,
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        travelers: booking.travelers,
        startDate: booking.startDate,
        endDate: booking.endDate,
        specialRequests: booking.specialRequests,
        totalAmount: booking.totalAmount,
        status: booking.status,
        rejectionReason: booking.rejectionReason,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (for admin)
router.get('/all', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      bookings: bookings.map(booking => ({
        id: booking._id,
        type: booking.type || 'package', // Default to package for backward compatibility
        user: booking.user ? {
          id: booking.user._id,
          name: booking.user.name,
          email: booking.user.email
        } : null,
        // Package fields
        packageName: booking.packageName,
        packageId: booking.packageId,
        travelers: booking.travelers,
        startDate: booking.startDate,
        endDate: booking.endDate,
        // Ride fields
        rideType: booking.rideType,
        rideId: booking.rideId,
        pickupLocation: booking.pickupLocation,
        destination: booking.destination,
        pickupDate: booking.pickupDate,
        pickupTime: booking.pickupTime,
        tripType: booking.tripType,
        passengers: booking.passengers,
        // Common fields
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        specialRequests: booking.specialRequests,
        totalAmount: booking.totalAmount,
        status: booking.status,
        rejectionReason: booking.rejectionReason,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (for admin)
router.put('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    const updateData = { status };
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: `Booking ${status} successfully`,
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;