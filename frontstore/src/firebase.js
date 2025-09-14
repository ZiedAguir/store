// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

// Your Firebase configuration object
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in production)
let analytics = null;
if (import.meta.env.PROD && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Performance (only in production)
let performance = null;
if (import.meta.env.PROD && typeof window !== 'undefined') {
  performance = getPerformance(app);
}

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    // Auth emulator
    if (!auth._delegate._config?.emulator) {
      connectAuthEmulator(auth, "http://localhost:9099");
    }
    
    // Firestore emulator
    if (!db._delegate._settings?.host?.includes('localhost')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    
    // Storage emulator
    if (!storage._delegate._host?.includes('localhost')) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  } catch (error) {
    console.warn('Firebase emulators already connected or not available:', error.message);
  }
}

// Export analytics and performance for use in components
export { analytics, performance };

// Export the app instance
export default app;

// Utility functions for common Firebase operations

// Auth utilities
export const authUtils = {
  // Get current user
  getCurrentUser: () => auth.currentUser,
  
  // Check if user is authenticated
  isAuthenticated: () => !!auth.currentUser,
  
  // Get user ID
  getUserId: () => auth.currentUser?.uid,
  
  // Get user email
  getUserEmail: () => auth.currentUser?.email,
  
  // Get user display name
  getUserDisplayName: () => auth.currentUser?.displayName,
};

// Firestore utilities
export const firestoreUtils = {
  // Collection references
  users: () => db.collection('users'),
  products: () => db.collection('products'),
  categories: () => db.collection('categories'),
  orders: () => db.collection('orders'),
  cart: () => db.collection('cart'),
  reviews: () => db.collection('reviews'),
  
  // Helper to create a document reference
  doc: (collection, id) => db.collection(collection).doc(id),
  
  // Helper to create a collection reference
  collection: (name) => db.collection(name),
};

// Storage utilities
export const storageUtils = {
  // Product images
  productImages: (productId, filename) => 
    storage.ref(`products/${productId}/${filename}`),
  
  // User avatars
  userAvatars: (userId, filename) => 
    storage.ref(`users/${userId}/avatar/${filename}`),
  
  // Category images
  categoryImages: (categoryId, filename) => 
    storage.ref(`categories/${categoryId}/${filename}`),
  
  // General file upload
  uploadFile: (path, file) => storage.ref(path).put(file),
};

// Error handling utility
export const handleFirebaseError = (error) => {
  console.error('Firebase Error:', error);
  
  // Common Firebase error messages
  const errorMessages = {
    'auth/user-not-found': 'No user found with this email address.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'permission-denied': 'You do not have permission to perform this action.',
    'unavailable': 'Service is temporarily unavailable. Please try again later.',
  };
  
  return errorMessages[error.code] || error.message || 'An unexpected error occurred.';
};

// Analytics utilities (if analytics is available)
export const analyticsUtils = {
  // Track page views
  trackPageView: (pageName) => {
    if (analytics) {
      analytics.logEvent('page_view', {
        page_name: pageName,
        page_location: window.location.href,
      });
    }
  },
  
  // Track custom events
  trackEvent: (eventName, parameters = {}) => {
    if (analytics) {
      analytics.logEvent(eventName, parameters);
    }
  },
  
  // Track e-commerce events
  trackPurchase: (transactionId, value, currency = 'USD', items = []) => {
    if (analytics) {
      analytics.logEvent('purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items,
      });
    }
  },
  
  // Track add to cart
  trackAddToCart: (itemId, itemName, category, price, quantity = 1) => {
    if (analytics) {
      analytics.logEvent('add_to_cart', {
        currency: 'USD',
        value: price * quantity,
        items: [{
          item_id: itemId,
          item_name: itemName,
          category: category,
          price: price,
          quantity: quantity,
        }],
      });
    }
  },
};
