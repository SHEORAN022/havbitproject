const cloudinary = require('../config/cloudinary');

class CloudinaryHelper {
  // Upload single image
  static async uploadImage(file, folder = 'products') {
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
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }

  // Upload multiple images
  static async uploadMultipleImages(files, folder = 'products') {
    try {
      if (!files || !Array.isArray(files)) {
        return [];
      }

      const uploadPromises = files.map(file => 
        this.uploadImage(file, folder).catch(err => {
          console.error(`Failed to upload image: ${err.message}`);
          return null;
        })
      );

      const results = await Promise.all(uploadPromises);
      return results.filter(url => url !== null);
    } catch (error) {
      console.error('Cloudinary multiple upload error:', error);
      return [];
    }
  }

  // Delete image from Cloudinary
  static async deleteImage(publicUrl) {
    try {
      if (!publicUrl) return;
      
      const publicId = this.getPublicIdFromUrl(publicUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
    }
  }

  // Get public ID from URL
  static getPublicIdFromUrl(url) {
    try {
      const matches = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
      return matches ? matches[1] : null;
    } catch (error) {
      return null;
    }
  }
}

module.exports = CloudinaryHelper;
