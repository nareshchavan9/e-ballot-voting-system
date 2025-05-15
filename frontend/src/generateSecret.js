// generateSecret.js
import crypto from 'crypto'; // Use import instead of require

// Generate a 64-byte random string (will be 128 hex characters)
const secretKey = crypto.randomBytes(64).toString('hex');

console.log(secretKey);