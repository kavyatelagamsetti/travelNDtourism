const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['package', 'ride'],
    default: 'package'
  },
  // User reference (required for packages, optional for rides)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.type === 'package'; }
  },
  // Package booking fields
  packageName: {
    type: String,
    required: function() { return this.type === 'package'; }
  },
  packageId: {
    type: Number,
    required: function() { return this.type === 'package'; }
  },
  // Ride booking fields
  rideType: {
    type: String,
    required: function() { return this.type === 'ride'; }
  },
  rideId: {
    type: Number,
    required: function() { return this.type === 'ride'; }
  },
  pickupLocation: {
    type: String,
    required: function() { return this.type === 'ride'; }
  },
  destination: {
    type: String,
    required: function() { return this.type === 'ride'; }
  },
  pickupDate: {
    type: Date,
    required: function() { return this.type === 'ride'; }
  },
  pickupTime: {
    type: String,
    required: function() { return this.type === 'ride'; }
  },
  tripType: {
    type: String,
    enum: ['oneway', 'roundtrip', 'hourly', 'daily'],
    required: function() { return this.type === 'ride'; }
  },
  // Common required fields
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  // Travelers for packages, passengers for rides
  travelers: {
    type: Number,
    required: function() { return this.type === 'package'; }
  },
  passengers: {
    type: Number,
    required: function() { return this.type === 'ride'; }
  },
  // Dates for packages
  startDate: {
    type: Date,
    required: function() { return this.type === 'package'; }
  },
  endDate: {
    type: Date,
    required: function() { return this.type === 'package'; }
  },
  specialRequests: {
    type: String,
    default: ''
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: function() { return this.type === 'ride' ? 'approved' : 'pending'; }
  },
  rejectionReason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);