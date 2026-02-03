const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ==================== CLOUDINARY HELPER FUNCTIONS ====================

// Upload single image
const uploadImage = async (file, folder = 'products') => {
  try {
    if (!file || !file.buffer) {
      throw new Error('No file provided');
    }

    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw error;
  }
};

// Upload multiple images
const uploadMultipleImages = async (files, folder = 'products') => {
  try {
    if (!files || !Array.isArray(files)) {
      return [];
    }

    const uploadPromises = files.map(file => 
      uploadImage(file, folder).catch(err => {
        console.error(`Failed to upload image: ${err.message}`);
        return null;
      })
    );

    const results = await Promise.all(uploadPromises);
    return results.filter(url => url !== null);
  } catch (error) {
    console.error('❌ Cloudinary multiple upload error:', error);
    return [];
  }
};

// Delete image from Cloudinary
const deleteImage = async (publicUrl) => {
  try {
    if (!publicUrl) return;
    
    const publicId = getPublicIdFromUrl(publicUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`✅ Deleted image: ${publicId}`);
    }
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
  }
};

// Get public ID from URL
const getPublicIdFromUrl = (url) => {
  try {
    if (!url) return null;
    
    // Extract public_id from Cloudinary URL
    const matches = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('❌ Error extracting public ID:', error);
    return null;
  }
};

// Upload base64 image (if needed)
const uploadBase64Image = async (base64String, folder = 'products') => {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: folder,
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error) {
    console.error('❌ Cloudinary base64 upload error:', error);
    throw error;
  }
};

// ==================== EXPORT EVERYTHING ====================
module.exports = {
  cloudinary,          // The cloudinary instance
  uploadImage,         // Upload single image
  uploadMultipleImages, // Upload multiple images
  deleteImage,         // Delete image
  getPublicIdFromUrl,  // Get public ID from URL
  uploadBase64Image    // Upload base64 image
};
