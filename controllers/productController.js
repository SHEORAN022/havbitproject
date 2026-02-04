

// const Product = require('../models/Product');
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp'); // Install: npm install sharp

// // ==================== IMAGE COMPRESSION & SAVE ====================
// const saveImage = async (file, folder = 'products') => {
//   if (!file) return null;
  
//   try {
//     const uploadDir = path.join(__dirname, '../uploads', folder);
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
    
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
//     const filePath = path.join(uploadDir, uniqueName);
    
//     // Compress image using Sharp
//     await sharp(file.buffer)
//       .resize(800, 800, { 
//         fit: 'inside',
//         withoutEnlargement: true 
//       })
//       .jpeg({ 
//         quality: 80,
//         progressive: true 
//       })
//       .toFile(filePath);
    
//     const fileSize = fs.statSync(filePath).size;
//     console.log(`✅ Image saved & compressed: ${uniqueName} (${(fileSize/1024).toFixed(2)} KB)`);
    
//     return `/uploads/${folder}/${uniqueName}`;
//   } catch (error) {
//     console.error('❌ Error saving image:', error);
//     return null;
//   }
// };

// const deleteImage = (imagePath) => {
//   if (!imagePath) return;
//   try {
//     const fullPath = path.join(__dirname, '..', imagePath);
//     if (fs.existsSync(fullPath)) {
//       fs.unlinkSync(fullPath);
//       console.log(`🗑️  Deleted: ${imagePath}`);
//     }
//   } catch (error) {
//     console.error('❌ Error deleting image:', error);
//   }
// };

// // ==================== VARIATIONS CLEANER ====================
// const cleanVariationsData = (variationsStr) => {
//   if (!variationsStr) return [];
  
//   try {
//     let variations = typeof variationsStr === 'string' ? JSON.parse(variationsStr) : variationsStr;
//     if (!Array.isArray(variations)) return [];
    
//     return variations.map(variation => {
//       const cleaned = {};
//       if (variation._id) delete variation._id;
      
//       // Handle variationId
//       if (variation.id && typeof variation.id === 'number') {
//         cleaned.variationId = `var_${variation.id}`;
//       } else if (variation.variationId) {
//         cleaned.variationId = variation.variationId;
//       } else if (variation.id) {
//         cleaned.variationId = variation.id;
//       } else {
//         cleaned.variationId = `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       }
      
//       cleaned.size = String(variation.size || '').trim();
//       cleaned.flavor = String(variation.flavor || '').trim();
//       cleaned.oldPrice = parseFloat(variation.oldPrice) || 0;
//       cleaned.newPrice = parseFloat(variation.newPrice) || 0;
//       cleaned.stock = parseInt(variation.stock) || 0;
//       cleaned.sku = String(variation.sku || `SKU-${cleaned.variationId}`).trim();
//       if (variation.image) cleaned.image = variation.image;
      
//       return cleaned;
//     });
//   } catch (error) {
//     console.error('❌ Error cleaning variations:', error);
//     return [];
//   }
// };

// // ==================== PREPARE PRODUCT DATA - FIXED VERSION ====================
// const prepareProductData = (body) => {
//   console.log('\n📋 ========== PREPARING PRODUCT DATA ==========');
//   const data = {};
  
//   // ========== BASIC ==========
//   data.name = String(body.name || '').trim();
//   data.description = String(body.description || '').trim();
//   data.restaurantName = String(body.restaurantName || 'Havbit').trim();
//   data.hasVariations = body.hasVariations === true || body.hasVariations === 'true';
//   console.log('✅ Basic:', { name: data.name, hasVariations: data.hasVariations });
  
//   // ========== PRICING ==========
//   data.oldPrice = parseFloat(body.oldPrice) || 0;
//   data.price = parseFloat(body.price) || 0;
//   data.stock = parseInt(body.stock) || 0;
//   data.quality = String(body.quality || 'Standard').trim();
//   data.dietPreference = String(body.dietPreference || 'Veg').trim();
//   console.log('✅ Pricing:', { oldPrice: data.oldPrice, price: data.price, stock: data.stock });
  
//   // ========== VARIATIONS ==========
//   if (body.variations) {
//     data.variations = cleanVariationsData(body.variations);
//     console.log('✅ Variations:', data.variations.length);
//   } else {
//     data.variations = [];
//   }
  
//   if (data.hasVariations && data.variations.length > 0) {
//     data.price = 0;
//     data.oldPrice = 0;
//     data.stock = 0;
//   }
  
//   // ========== PRODUCT DETAILS ==========
//   data.productTypes = String(body.productTypes || '').trim();
//   data.flavors = String(body.flavors || '').trim();
//   data.size = String(body.size || '').trim();
//   data.materialTypes = String(body.materialTypes || '').trim();
//   // data.materialTypes = String(details.materialTypes || '').trim();
//   data.ingredients = String(body.ingredients || '').trim();
//   data.customWeight = String(body.customWeight || '').trim();
//   data.customSizeInput = String(body.customSizeInput || '').trim();
// //   data.customWeight = String(body.customWeight || '').trim();
// // data.customSizeInput = String(body.customSizeInput || '').trim();
//   data.ageRange = String(body.ageRange || '').trim();
//   data.containerType = String(body.containerType || '').trim();
//   data.itemForm = String(body.itemForm || '').trim();
//   data.specialty = String(body.specialty || '').trim();
//   data.itemTypeName = String(body.itemTypeName || '').trim();
//   data.countryOfOrigin = String(body.countryOfOrigin || '').trim();
//   console.log('✅ Details:', { productTypes: data.productTypes, ageRange: data.ageRange });
  
//   // ========== COMPLIANCE ==========
//   data.fssaiLicense = String(body.fssaiLicense || body.brandName || '').trim();
//   data.brandName = String(body.brandName || body.fssaiLicense || '').trim();
//   data.legalDisclaimer = String(body.legalDisclaimer || '').trim();
//   console.log('✅ Compliance:', { fssaiLicense: data.fssaiLicense });
  
//   // ========== MANUFACTURING - FIXED MAPPING ==========
//   // Frontend sends: manufacturer -> Save to both manufacturer and manufacturerName
//   const manufacturerValue = String(body.manufacturer || body.manufacturerName || '').trim();
//   data.manufacturer = manufacturerValue;
//   data.manufacturerName = manufacturerValue;
  
//   // Frontend sends: manufacturerContact -> Save to both manufacturerContact and manufacturerAddress
//   const manufacturerAddressValue = String(body.manufacturerContact || body.manufacturerAddress || '').trim();
//   data.manufacturerContact = manufacturerAddressValue;
//   data.manufacturerAddress = manufacturerAddressValue;
  
//   console.log('✅ Manufacturing:', {
//     manufacturer: data.manufacturer,
//     manufacturerName: data.manufacturerName,
//     manufacturerContact: data.manufacturerContact,
//     manufacturerAddress: data.manufacturerAddress
//   });
  
//   // ========== PACKAGER - FIXED MAPPING ==========
//   // Parse packerContact string: "Packager: NAME | Address: ADDRESS"
//   const packerContactString = String(body.packerContact || '').trim();
//   data.packerContact = packerContactString;
  
//   if (packerContactString) {
//     const lines = packerContactString.split('|').map(l => l.trim());
//     lines.forEach(line => {
//       if (line.includes('Packager:')) {
//         data.packagerName = line.replace('Packager:', '').trim();
//       } else if (line.includes('Address:')) {
//         data.packagerAddress = line.replace('Address:', '').trim();
//       }
//     });
//   }
  
//   // Set default empty strings if not found
//   if (!data.packagerName) data.packagerName = '';
//   if (!data.packagerAddress) data.packagerAddress = '';
  
//   data.packagerFssaiLicense = String(body.packagerFssaiLicense || '').trim();
  
//   console.log('✅ Packager:', {
//     packagerName: data.packagerName,
//     packagerAddress: data.packagerAddress,
//     packagerFssaiLicense: data.packagerFssaiLicense,
//     packerContact: data.packerContact
//   });
  
//   // ========== MARKETER - FIXED MAPPING ==========
//   // Parse marketerNameAddress string: "Name: NAME | Address: ADDRESS"
//   const marketerString = String(body.marketerNameAddress || '').trim();
//   data.marketerNameAddress = marketerString;
  
//   if (marketerString) {
//     const lines = marketerString.split('|').map(l => l.trim());
//     lines.forEach(line => {
//       if (line.includes('Name:')) {
//         data.marketerName = line.replace('Name:', '').trim();
//       } else if (line.includes('Address:')) {
//         data.marketerAddress = line.replace('Address:', '').trim();
//       }
//     });
//   }
  
//   // Set default empty strings if not found
//   if (!data.marketerName) data.marketerName = '';
//   if (!data.marketerAddress) data.marketerAddress = '';
  
//   console.log('✅ Marketer:', {
//     marketerName: data.marketerName,
//     marketerAddress: data.marketerAddress,
//     marketerNameAddress: data.marketerNameAddress
//   });
  
//   // ========== PACKAGE ==========
//   data.packageColour = String(body.packageColour || '').trim();
//   data.measurementUnit = String(body.measurementUnit || '').trim();
//   data.unitCount = String(body.unitCount || '').trim();
//   data.numberOfItems = String(body.numberOfItems || '').trim();
//   data.itemWeight = String(body.itemWeight || '').trim();
//   data.totalEaches = String(body.totalEaches || '').trim();
//   data.itemPackageWeight = String(body.itemPackageWeight || '').trim();
//   data.shelfLife = String(body.shelfLife || '').trim();
//   console.log('✅ Package:', { packageColour: data.packageColour, shelfLife: data.shelfLife });
  
//   // ========== DIETARY ==========
//   data.dietaryPreferences = String(body.dietaryPreferences || '').trim();
//   data.allergenInformation = String(body.allergenInformation || '').trim();
//   data.nutrition = String(body.nutrition || '').trim();
//   data.cuisine = String(body.cuisine || '').trim();
//   data.directions = String(body.directions || '').trim();
//   console.log('✅ Dietary:', { cuisine: data.cuisine });
  
//   // ========== LOCATION ==========
//   data.State = String(body.State || '').trim();
//   console.log('✅ Location:', { State: data.State });
  
//   // ========== CATEGORY ==========
//   if (body.category) data.category = body.category;
//   if (body.subcategory) data.subcategory = body.subcategory;
  
//   console.log('========== DATA PREPARATION COMPLETE ==========\n');
//   return data;
// };

// // ==================== CREATE PRODUCT ====================
// exports.createProduct = async (req, res) => {
//   try {
//     console.log('\n🆕 ==================== CREATING PRODUCT ====================');
//     console.log('📥 Body Keys:', Object.keys(req.body).length);
//     console.log('📸 Files:', req.files ? Object.keys(req.files) : 'None');

//     const data = prepareProductData(req.body);

//     // Main image with compression
//     if (req.files?.image?.[0]) {
//       data.image = await saveImage(req.files.image[0], 'products/main');
//       console.log('✅ Main image:', data.image);
//     }

//     // Gallery with compression
//     if (req.files?.gallery) {
//       const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
//       console.log(`📸 Processing ${galleryFiles.length} gallery images...`);
      
//       const galleryUrls = [];
//       for (const file of galleryFiles) {
//         const url = await saveImage(file, 'products/gallery');
//         if (url) galleryUrls.push(url);
//       }
//       data.gallery = galleryUrls.slice(0, 9);
//       console.log(`✅ Gallery: ${data.gallery.length} images`);
//     }

//     // Variation images with compression
//     if (data.hasVariations && data.variations.length > 0 && req.files?.variationImages) {
//       const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
//       console.log(`📸 Processing ${varImages.length} variation images...`);
      
//       for (let i = 0; i < varImages.length && i < data.variations.length; i++) {
//         const url = await saveImage(varImages[i], 'products/variations');
//         if (url) {
//           data.variations[i].image = url;
//           console.log(`✅ Variation ${i + 1} image:`, url);
//         }
//       }
//     }

//     // Validation
//     if (!data.name) return res.status(400).json({ success: false, message: 'Product name required' });
//     if (!data.category) return res.status(400).json({ success: false, message: 'Category required' });
//     if (!data.hasVariations && data.price <= 0) return res.status(400).json({ success: false, message: 'Price required' });
//     if (data.hasVariations && !data.variations.length) return res.status(400).json({ success: false, message: 'Variations required' });

//     const product = await Product.create(data);
    
//     console.log('✅ ==================== PRODUCT CREATED ====================');
//     console.log('📦 ID:', product._id);
//     console.log('📝 Name:', product.name);
//     console.log('🏭 Manufacturer:', product.manufacturer);
//     console.log('📦 Packager:', product.packagerName);
//     console.log('🏪 Marketer:', product.marketerName);
//     console.log('==================== END ====================\n');

//     res.status(201).json({ success: true, message: 'Product created successfully', data: product });
//   } catch (error) {
//     console.error('❌ ERROR:', error);
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Validation failed', 
//         errors: Object.values(error.errors).map(e => e.message) 
//       });
//     }
//     res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
//   }
// };

// // ==================== UPDATE PRODUCT ====================
// exports.updateProduct = async (req, res) => {
//   try {
//     console.log('\n🔄 ==================== UPDATING PRODUCT ====================');
//     let product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     console.log('📦 Updating:', product.name);
//     const updateData = prepareProductData(req.body);

//     // Main image
//     if (req.files?.image?.[0]) {
//       if (product.image) deleteImage(product.image);
//       updateData.image = await saveImage(req.files.image[0], 'products/main');
//     } else if (product.image) {
//       updateData.image = product.image;
//     }

//     // Gallery
//     if (req.files?.gallery) {
//       let galleryUrls = product.gallery ? [...product.gallery] : [];
//       const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      
//       for (const file of galleryFiles) {
//         const url = await saveImage(file, 'products/gallery');
//         if (url) galleryUrls.push(url);
//       }
//       updateData.gallery = galleryUrls.slice(0, 9);
//     } else if (product.gallery) {
//       updateData.gallery = product.gallery;
//     }

//     // Variations
//     if (updateData.hasVariations && updateData.variations.length > 0) {
//       if (product.variations?.length > 0) {
//         updateData.variations.forEach((newVar) => {
//           const existingVar = product.variations.find(v => v.variationId === newVar.variationId);
//           if (existingVar?.image && !newVar.image) {
//             newVar.image = existingVar.image;
//           }
//         });
//       }
      
//       if (req.files?.variationImages) {
//         const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
//         for (let i = 0; i < varImages.length && i < updateData.variations.length; i++) {
//           const url = await saveImage(varImages[i], 'products/variations');
//           if (url) updateData.variations[i].image = url;
//         }
//       }
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
//       .populate('category', 'name')
//       .populate('subcategory', 'name');

//     console.log('✅ Product updated');
//     console.log('==================== END ====================\n');

//     res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
//   } catch (error) {
//     console.error('❌ ERROR:', error);
//     res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
//   }
// };

// // ==================== GET ALL PRODUCTS ====================
// exports.getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 100, search = '', category = '', quality = '', dietPreference = '', inStock = '', sort = '-createdAt' } = req.query;
//     const query = {};
    
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { brandName: { $regex: search, $options: 'i' } },
//         { State: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     if (category) query.category = category;
//     if (quality) query.quality = quality;
//     if (dietPreference) query.dietPreference = dietPreference;
//     if (inStock === 'true') {
//       query.$or = [{ stock: { $gt: 0 } }, { 'variations.stock': { $gt: 0 } }];
//     }

//     const products = await Product.find(query)
//       .populate('category', 'name')
//       .populate('subcategory', 'name')
//       .sort(sort)
//       .limit(parseInt(limit))
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .lean();

//     const total = await Product.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / parseInt(limit)),
//       data: products
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
//   }
// };

// // ==================== GET SINGLE PRODUCT ====================
// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate('category', 'name')
//       .populate('subcategory', 'name');
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(400).json({ success: false, message: 'Invalid product ID' });
//     }
//     res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
//   }
// };

// // ==================== DELETE PRODUCT ====================
// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

//     if (product.image) deleteImage(product.image);
//     product.gallery?.forEach(img => deleteImage(img));
//     product.variations?.forEach(v => v.image && deleteImage(v.image));

//     await product.deleteOne();
//     res.status(200).json({ success: true, message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
//   }
// };

// // ==================== BULK DELETE ====================
// exports.bulkDeleteProducts = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     if (!ids?.length) return res.status(400).json({ success: false, message: 'No IDs provided' });

//     const products = await Product.find({ _id: { $in: ids } });
//     products.forEach(p => {
//       if (p.image) deleteImage(p.image);
//       p.gallery?.forEach(img => deleteImage(img));
//       p.variations?.forEach(v => v.image && deleteImage(v.image));
//     });

//     const result = await Product.deleteMany({ _id: { $in: ids } });
//     res.status(200).json({ success: true, message: `${result.deletedCount} products deleted`, deletedCount: result.deletedCount });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Bulk delete failed', error: error.message });
//   }
// };

// // ==================== BULK UPDATE ====================
// exports.bulkUpdateProducts = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
//     if (!ids?.length) return res.status(400).json({ success: false, message: 'No IDs provided' });

//     const cleanData = {};
//     Object.keys(data).forEach(key => {
//       if (data[key] !== '' && data[key] != null) cleanData[key] = data[key];
//     });

//     if (cleanData.price) cleanData.price = parseFloat(cleanData.price);
//     if (cleanData.oldPrice) cleanData.oldPrice = parseFloat(cleanData.oldPrice);
//     if (cleanData.stock) cleanData.stock = parseInt(cleanData.stock);

//     const result = await Product.updateMany({ _id: { $in: ids } }, { $set: cleanData }, { runValidators: true });
//     res.status(200).json({ success: true, message: `${result.modifiedCount} products updated`, modifiedCount: result.modifiedCount });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Bulk update failed', error: error.message });
//   }
// };

// // ==================== EXPORT CSV ====================
// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await Product.find().populate('category', 'name').populate('subcategory', 'name').lean();
//     let csv = 'ID,Name,Category,MRP,Price,Stock,Variations,Quality,Diet,State,Manufacturer,Packager,Marketer\n';
//     products.forEach(p => {
//       csv += `"${p._id}","${p.name}","${p.category?.name||''}",${p.oldPrice||0},${p.price||0},${p.stock||0},"${p.hasVariations?'Yes':'No'}","${p.quality}","${p.dietPreference}","${p.State||''}","${p.manufacturer||''}","${p.packagerName||''}","${p.marketerName||''}"\n`;
//     });
//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', `attachment; filename=products-${Date.now()}.csv`);
//     res.send(csv);
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Export failed', error: error.message });
//   }
// };

// // ==================== IMPORT CSV ====================
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ success: false, message: 'No file' });
//     const rows = req.file.buffer.toString().split('\n');
//     const headers = rows[0].split(',').map(h => h.trim());
//     const imported = [], errors = [];
    
//     for (let i = 1; i < rows.length; i++) {
//       if (!rows[i].trim()) continue;
//       const values = rows[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
//       const productData = {};
//       headers.forEach((h, idx) => { if (values[idx]) productData[h] = values[idx]; });
      
//       if (productData.name && productData.category) {
//         try {
//           imported.push(await Product.create(productData));
//         } catch (error) {
//           errors.push({ row: i + 1, error: error.message });
//         }
//       }
//     }
    
//     res.status(200).json({ success: true, message: `${imported.length} imported`, imported: imported.length, errors: errors.length ? errors : undefined });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Import failed', error: error.message });
//   }
// };

// // ==================== GET STATS ====================
// exports.getProductStats = async (req, res) => {
//   try {
//     const total = await Product.countDocuments();
//     const inStock = await Product.countDocuments({ $or: [{ stock: { $gt: 10 } }, { 'variations.stock': { $gt: 10 } }] });
//     const lowStock = await Product.countDocuments({ $or: [{ stock: { $gt: 0, $lte: 10 } }, { 'variations.stock': { $gt: 0, $lte: 10 } }] });
//     const outOfStock = total - inStock - lowStock;
//     const categories = (await Product.distinct('category')).length;
//     const productsWithVariations = await Product.countDocuments({ hasVariations: true });

//     res.status(200).json({ success: true, data: { total, inStock, lowStock, outOfStock, categories, productsWithVariations } });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Stats failed', error: error.message });
//   }
// };

// // ==================== GET BY SLUG ====================
// exports.getProductBySlug = async (req, res) => {
//   try {
//     const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name').populate('subcategory', 'name');
//     if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
//     res.status(200).json({ success: true, data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed', error: error.message });
//   }
// };

// // ==================== ADVANCED SEARCH ====================
// exports.advancedSearch = async (req, res) => {
//   try {
//     const { q = '', category = '', minPrice = 0, maxPrice = 1000000, quality = '', dietPreference = '', sort = '-createdAt', page = 1, limit = 20 } = req.query;
//     const query = {};

//     if (q) query.$or = [{ name: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
//     if (category) query.category = category;
//     if (quality) query.quality = quality;
//     if (dietPreference) query.dietPreference = dietPreference;

//     const products = await Product.find(query).populate('category', 'name').sort(sort).limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit)).lean();
//     const total = await Product.countDocuments(query);

//     res.status(200).json({ success: true, count: products.length, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)), data: products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Search failed', error: error.message });
//   }
// };

// module.exports = exports;






// module.exports = exports;
const Product = require('../models/Product');
const CloudinaryHelper = require('../helpers/cloudinaryHelper');

// ==================== PREPARE PRODUCT DATA ====================
const prepareProductData = (body) => {
  console.log('\n📋 ========== PREPARING PRODUCT DATA ==========');
  const data = {};
  
  // ========== BASIC ==========
  data.name = String(body.name || '').trim();
  data.description = String(body.description || '').trim();
  data.restaurantName = String(body.restaurantName || 'Havbit').trim();
  data.hasVariations = body.hasVariations === true || body.hasVariations === 'true';
  
  // ========== PRICING ==========
  data.oldPrice = parseFloat(body.oldPrice) || 0;
  data.price = parseFloat(body.price || body.newPrice || 0);
  data.stock = parseInt(body.stock) || 0;
  data.quality = String(body.quality || 'Standard').trim();
  data.dietPreference = String(body.dietPreference || 'Veg').trim();
  
  // ========== VARIATIONS ==========
  if (body.variations) {
    try {
      const variations = typeof body.variations === 'string' ? JSON.parse(body.variations) : body.variations;
      data.variations = Array.isArray(variations) ? variations.map(v => ({
        variationId: v.variationId || `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        size: String(v.size || '').trim(),
        flavor: String(v.flavor || '').trim(),
        oldPrice: parseFloat(v.oldPrice) || 0,
        newPrice: parseFloat(v.newPrice || v.price) || 0,
        stock: parseInt(v.stock) || 0,
        sku: String(v.sku || '').trim(),
        image: v.image || ''
      })) : [];
    } catch (error) {
      console.error('Error parsing variations:', error);
      data.variations = [];
    }
  } else {
    data.variations = [];
  }
  
  // Reset main pricing if variations exist
  if (data.hasVariations && data.variations.length > 0) {
    data.price = 0;
    data.oldPrice = 0;
    data.stock = 0;
  }
  
  // ========== PRODUCT DETAILS ==========
  data.productTypes = String(body.productTypes || '').trim();
  data.materialTypes = String(body.materialTypes || '').trim();
  data.ingredients = String(body.ingredients || '').trim();
  data.customWeight = String(body.customWeight || '').trim();
  data.customSizeInput = String(body.customSizeInput || '').trim();
  data.ageRange = String(body.ageRange || '').trim();
  data.containerType = String(body.containerType || '').trim();
  data.itemForm = String(body.itemForm || '').trim();
  data.specialty = String(body.specialty || '').trim();
  data.itemTypeName = String(body.itemTypeName || '').trim();
  data.countryOfOrigin = String(body.countryOfOrigin || '').trim();
  
  // Handle flavors array
  if (body.flavors) {
    if (typeof body.flavors === 'string') {
      try {
        data.flavors = JSON.parse(body.flavors);
      } catch (e) {
        data.flavors = body.flavors.split(',').map(f => f.trim()).filter(f => f !== '');
      }
    } else if (Array.isArray(body.flavors)) {
      data.flavors = body.flavors.filter(f => f && f.trim() !== '');
    } else {
      data.flavors = [];
    }
  } else {
    data.flavors = [];
  }
  
  // Handle size array
  if (body.size) {
    if (typeof body.size === 'string') {
      try {
        data.size = JSON.parse(body.size);
      } catch (e) {
        data.size = body.size.split(',').map(s => s.trim()).filter(s => s !== '');
      }
    } else if (Array.isArray(body.size)) {
      data.size = body.size.filter(s => s && s.trim() !== '');
    } else {
      data.size = [];
    }
  } else {
    data.size = [];
  }
  
  // ========== COMPLIANCE ==========
  data.fssaiLicense = String(body.fssaiLicense || body.fssaiLicenseNumber || '').trim();
  data.brandName = String(body.brandName || '').trim();
  data.legalDisclaimer = String(body.legalDisclaimer || '').trim();
  
  // ========== MANUFACTURING ==========
  data.manufacturer = String(body.manufacturer || body.manufacturerName || '').trim();
  data.manufacturerName = String(body.manufacturerName || body.manufacturer || '').trim();
  data.manufacturerAddress = String(body.manufacturerAddress || body.manufacturerContact || '').trim();
  data.manufacturerContact = String(body.manufacturerContact || body.manufacturerAddress || '').trim();
  
  // ========== PACKAGER ==========
  data.packagerName = String(body.packagerName || '').trim();
  data.packagerAddress = String(body.packagerAddress || '').trim();
  data.packagerFssaiLicense = String(body.packagerFssaiLicense || '').trim();
  data.packerContact = String(body.packerContact || '').trim();
  
  // ========== MARKETER ==========
  data.marketerName = String(body.marketerName || '').trim();
  data.marketerAddress = String(body.marketerAddress || '').trim();
  data.marketerNameAddress = String(body.marketerNameAddress || '').trim();
  
  // ========== PACKAGE DETAILS ==========
  data.packageColour = String(body.packageColour || '').trim();
  data.measurementUnit = String(body.measurementUnit || '').trim();
  data.unitCount = String(body.unitCount || '').trim();
  data.numberOfItems = String(body.numberOfItems || '').trim();
  data.itemWeight = String(body.itemWeight || '').trim();
  data.totalEaches = String(body.totalEaches || '').trim();
  data.itemPackageWeight = String(body.itemPackageWeight || '').trim();
  data.shelfLife = String(body.shelfLife || '').trim();
  
  // ========== DIETARY & NUTRITION ==========
  data.dietaryPreferences = String(body.dietaryPreferences || '').trim();
  data.allergenInformation = String(body.allergenInformation || '').trim();
  data.nutrition = String(body.nutrition || '').trim();
  data.cuisine = String(body.cuisine || '').trim();
  data.directions = String(body.directions || '').trim();
  
  // ========== LOCATION ==========
  data.State = String(body.State || '').trim();
  
  // ========== CATEGORY ==========
  if (body.category) data.category = body.category;
  if (body.subcategory) data.subcategory = body.subcategory;
  
  // ========== VENDOR ==========
  if (body.vendor) data.vendor = body.vendor;
  
  console.log('========== DATA PREPARATION COMPLETE ==========\n');
  return data;
};

// ==================== CREATE PRODUCT ====================
const createProduct = async (req, res) => {
  try {
    console.log('\n🆕 ==================== CREATING PRODUCT ====================');
    
    const data = prepareProductData(req.body);

    // Upload main image to Cloudinary
    if (req.files?.image?.[0]) {
      try {
        data.image = await CloudinaryHelper.uploadImage(req.files.image[0], 'products/main');
        console.log('✅ Main image uploaded:', data.image);
      } catch (error) {
        console.error('❌ Main image upload failed:', error);
      }
    }

    // Upload gallery images to Cloudinary
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      console.log(`📸 Processing ${galleryFiles.length} gallery images...`);
      
      const galleryUrls = await CloudinaryHelper.uploadMultipleImages(galleryFiles, 'products/gallery');
      data.gallery = galleryUrls.slice(0, 9);
      console.log(`✅ Gallery: ${data.gallery.length} images uploaded`);
    }

    // Upload variation images
    if (data.hasVariations && data.variations.length > 0 && req.files?.variationImages) {
      const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
      console.log(`📸 Processing ${varImages.length} variation images...`);
      
      for (let i = 0; i < varImages.length && i < data.variations.length; i++) {
        try {
          const url = await CloudinaryHelper.uploadImage(varImages[i], 'products/variations');
          if (url) {
            data.variations[i].image = url;
            console.log(`✅ Variation ${i + 1} image uploaded`);
          }
        } catch (error) {
          console.error(`❌ Variation ${i + 1} image upload failed:`, error);
        }
      }
    }

    // Validation
    if (!data.name) return res.status(400).json({ success: false, message: 'Product name required' });
    if (!data.category) return res.status(400).json({ success: false, message: 'Category required' });
    if (!data.hasVariations && data.price <= 0) return res.status(400).json({ success: false, message: 'Price required' });
    if (data.hasVariations && !data.variations.length) return res.status(400).json({ success: false, message: 'Variations required' });

    const product = await Product.create(data);
    
    console.log('✅ ==================== PRODUCT CREATED ====================');
    console.log('📦 ID:', product._id);
    console.log('📝 Name:', product.name);
    console.log('==================== END ====================\n');

    res.status(201).json({ 
      success: true, 
      message: 'Product created successfully', 
      data: product 
    });
  } catch (error) {
    console.error('❌ CREATE PRODUCT ERROR:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create product', 
      error: error.message 
    });
  }
};

// ==================== UPDATE PRODUCT ====================
const updateProduct = async (req, res) => {
  try {
    console.log('\n🔄 ==================== UPDATING PRODUCT ====================');
    
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ 
      success: false, 
      message: 'Product not found' 
    });

    console.log('📦 Updating:', product.name);
    const updateData = prepareProductData(req.body);

    // Handle main image
    if (req.files?.image?.[0]) {
      // Delete old image from Cloudinary
      if (product.image) {
        await CloudinaryHelper.deleteImage(product.image);
      }
      // Upload new image
      updateData.image = await CloudinaryHelper.uploadImage(req.files.image[0], 'products/main');
    } else if (product.image) {
      updateData.image = product.image;
    }

    // Handle gallery images
    if (req.files?.gallery) {
      // Delete old gallery images
      if (product.gallery && product.gallery.length > 0) {
        for (const imgUrl of product.gallery) {
          await CloudinaryHelper.deleteImage(imgUrl);
        }
      }
      
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      const galleryUrls = await CloudinaryHelper.uploadMultipleImages(galleryFiles, 'products/gallery');
      updateData.gallery = galleryUrls.slice(0, 9);
    } else if (product.gallery) {
      updateData.gallery = product.gallery;
    }

    // Handle variation images
    if (updateData.hasVariations && updateData.variations.length > 0) {
      // Preserve existing variation images
      if (product.variations?.length > 0) {
        updateData.variations.forEach((newVar) => {
          const existingVar = product.variations.find(v => v.variationId === newVar.variationId);
          if (existingVar?.image && !newVar.image) {
            newVar.image = existingVar.image;
          }
        });
      }
      
      // Upload new variation images
      if (req.files?.variationImages) {
        const varImages = Array.isArray(req.files.variationImages) ? req.files.variationImages : [req.files.variationImages];
        for (let i = 0; i < varImages.length && i < updateData.variations.length; i++) {
          const url = await CloudinaryHelper.uploadImage(varImages[i], 'products/variations');
          if (url) updateData.variations[i].image = url;
        }
      }
    }

    product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    )
    .populate('category', 'name')
    .populate('subcategory', 'name')
    .populate('vendor', 'storeName');

    console.log('✅ Product updated');
    console.log('==================== END ====================\n');

    res.status(200).json({ 
      success: true, 
      message: 'Product updated successfully', 
      data: product 
    });
  } catch (error) {
    console.error('❌ UPDATE PRODUCT ERROR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update product', 
      error: error.message 
    });
  }
};

// ==================== GET ALL PRODUCTS (PUBLIC) ====================
const getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      category = '', 
      quality = '', 
      dietPreference = '',
      minPrice = 0,
      maxPrice = 1000000,
      sort = '-createdAt' 
    } = req.query;
    
    const query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { restaurantName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) query.category = category;
    
    // Quality filter
    if (quality) query.quality = quality;
    
    // Diet preference filter
    if (dietPreference) query.dietPreference = dietPreference;
    
    // Price filter
    query.$or = [
      { 
        $and: [
          { hasVariations: false },
          { price: { $gte: parseFloat(minPrice) } },
          { price: { $lte: parseFloat(maxPrice) } }
        ]
      },
      { 
        $and: [
          { hasVariations: true },
          { 'variations.newPrice': { $gte: parseFloat(minPrice) } },
          { 'variations.newPrice': { $lte: parseFloat(maxPrice) } }
        ]
      }
    ];

    const total = await Product.countDocuments(query);
    
    const products = await Product.find(query)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .populate('vendor', 'storeName email phone')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    // Transform data for public API
    const transformedProducts = products.map(product => ({
      // Basic Information
      id: product._id,
      name: product.name,
      description: product.description,
      restaurantName: product.restaurantName,
      slug: product.slug,
      
      // Pricing
      oldPrice: product.oldPrice,
      price: product.price,
      hasVariations: product.hasVariations,
      variations: product.variations.map(v => ({
        variationId: v.variationId,
        size: v.size,
        flavor: v.flavor,
        oldPrice: v.oldPrice,
        price: v.newPrice,
        stock: v.stock,
        sku: v.sku,
        image: v.image
      })),
      
      // Product Details
      quality: product.quality,
      dietPreference: product.dietPreference,
      productTypes: product.productTypes,
      flavors: product.flavors,
      size: product.size,
      materialTypes: product.materialTypes,
      ingredients: product.ingredients,
      customWeight: product.customWeight,
      customSizeInput: product.customSizeInput,
      ageRange: product.ageRange,
      containerType: product.containerType,
      itemForm: product.itemForm,
      specialty: product.specialty,
      itemTypeName: product.itemTypeName,
      countryOfOrigin: product.countryOfOrigin,
      
      // Compliance
      fssaiLicense: product.fssaiLicense,
      brandName: product.brandName,
      legalDisclaimer: product.legalDisclaimer,
      shelfLife: product.shelfLife,
      
      // Manufacturing
      manufacturer: product.manufacturer,
      manufacturerName: product.manufacturerName,
      manufacturerAddress: product.manufacturerAddress,
      manufacturerContact: product.manufacturerContact,
      
      // Package Details
      packageColour: product.packageColour,
      measurementUnit: product.measurementUnit,
      unitCount: product.unitCount,
      numberOfItems: product.numberOfItems,
      itemWeight: product.itemWeight,
      totalEaches: product.totalEaches,
      itemPackageWeight: product.itemPackageWeight,
      
      // Dietary & Nutrition
      dietaryPreferences: product.dietaryPreferences,
      allergenInformation: product.allergenInformation,
      nutrition: product.nutrition,
      cuisine: product.cuisine,
      directions: product.directions,
      
      // Location
      State: product.State,
      
      // Category
      category: product.category ? {
        id: product.category._id,
        name: product.category.name,
        image: product.category.image
      } : null,
      
      subcategory: product.subcategory ? {
        id: product.subcategory._id,
        name: product.subcategory.name,
        image: product.subcategory.image
      } : null,
      
      // Vendor Info (if available)
      vendor: product.vendor ? {
        id: product.vendor._id,
        storeName: product.vendor.storeName,
        email: product.vendor.email,
        phone: product.vendor.phone
      } : null,
      
      // Images
      image: product.image,
      gallery: product.gallery,
      
      // Stock Status
      inStock: product.hasVariations 
        ? product.variations.some(v => v.stock > 0)
        : product.stock > 0,
      
      // Timestamps
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: transformedProducts
    });
  } catch (error) {
    console.error('❌ GET PRODUCTS ERROR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products', 
      error: error.message 
    });
  }
};

// ==================== GET SINGLE PRODUCT ====================
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .populate('vendor', 'storeName email phone');

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product', 
      error: error.message 
    });
  }
};

// ==================== GET PRODUCT BY SLUG ====================
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .populate('vendor', 'storeName email phone');

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product', 
      error: error.message 
    });
  }
};

// ==================== DELETE PRODUCT ====================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Delete images from Cloudinary
    if (product.image) {
      await CloudinaryHelper.deleteImage(product.image);
    }
    
    if (product.gallery && product.gallery.length > 0) {
      for (const imgUrl of product.gallery) {
        await CloudinaryHelper.deleteImage(imgUrl);
      }
    }
    
    if (product.variations && product.variations.length > 0) {
      for (const variation of product.variations) {
        if (variation.image) {
          await CloudinaryHelper.deleteImage(variation.image);
        }
      }
    }

    await product.deleteOne();
    
    res.status(200).json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete product', 
      error: error.message 
    });
  }
};

// ==================== BULK DELETE ====================
const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No product IDs provided' 
      });
    }

    const products = await Product.find({ _id: { $in: ids } });
    
    // Delete images from Cloudinary
    for (const product of products) {
      if (product.image) {
        await CloudinaryHelper.deleteImage(product.image);
      }
      
      if (product.gallery && product.gallery.length > 0) {
        for (const imgUrl of product.gallery) {
          await CloudinaryHelper.deleteImage(imgUrl);
        }
      }
      
      if (product.variations && product.variations.length > 0) {
        for (const variation of product.variations) {
          if (variation.image) {
            await CloudinaryHelper.deleteImage(variation.image);
          }
        }
      }
    }

    const result = await Product.deleteMany({ _id: { $in: ids } });
    
    res.status(200).json({ 
      success: true, 
      message: `${result.deletedCount} products deleted successfully`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Bulk delete failed', 
      error: error.message 
    });
  }
};

// ==================== BULK UPDATE ====================
const bulkUpdateProducts = async (req, res) => {
  try {
    const { ids, data } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No product IDs provided' 
      });
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ 
        success: false, 
        message: 'No update data provided' 
      });
    }

    const cleanData = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== '' && data[key] != null) {
        cleanData[key] = data[key];
      }
    });

    // Convert numeric fields
    if (cleanData.price) cleanData.price = parseFloat(cleanData.price);
    if (cleanData.oldPrice) cleanData.oldPrice = parseFloat(cleanData.oldPrice);
    if (cleanData.stock) cleanData.stock = parseInt(cleanData.stock);

    const result = await Product.updateMany(
      { _id: { $in: ids } }, 
      { $set: cleanData }, 
      { runValidators: true }
    );
    
    res.status(200).json({ 
      success: true, 
      message: `${result.modifiedCount} products updated successfully`,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Bulk update failed', 
      error: error.message 
    });
  }
};

// ==================== GET PRODUCT STATS ====================
const getProductStats = async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const inStock = await Product.countDocuments({
      $or: [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ]
    });
    
    const lowStock = await Product.countDocuments({
      $or: [
        { stock: { $gt: 0, $lte: 10 } },
        { 'variations.stock': { $gt: 0, $lte: 10 } }
      ]
    });
    
    const outOfStock = total - inStock - lowStock;
    const categories = await Product.distinct('category').length;
    const productsWithVariations = await Product.countDocuments({ hasVariations: true });
    
    // Vendor products count
    const vendorProducts = await Product.countDocuments({ vendor: { $ne: null } });
    const adminProducts = total - vendorProducts;

    res.status(200).json({
      success: true,
      data: {
        total,
        inStock,
        lowStock,
        outOfStock,
        categories,
        productsWithVariations,
        vendorProducts,
        adminProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get product stats',
      error: error.message
    });
  }
};

// ==================== ADVANCED SEARCH ====================
const advancedSearch = async (req, res) => {
  try {
    const {
      q = '',
      category = '',
      subcategory = '',
      minPrice = 0,
      maxPrice = 1000000,
      quality = '',
      dietPreference = '',
      State = '',
      hasVariations = '',
      inStock = '',
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    const query = {};

    // Search query
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brandName: { $regex: q, $options: 'i' } },
        { restaurantName: { $regex: q, $options: 'i' } }
      ];
    }

    // Category filters
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    // Other filters
    if (quality) query.quality = quality;
    if (dietPreference) query.dietPreference = dietPreference;
    if (State) query.State = { $regex: State, $options: 'i' };
    
    if (hasVariations === 'true') query.hasVariations = true;
    if (hasVariations === 'false') query.hasVariations = false;

    // Price filter
    query.$or = [
      {
        $and: [
          { hasVariations: false },
          { price: { $gte: parseFloat(minPrice) } },
          { price: { $lte: parseFloat(maxPrice) } }
        ]
      },
      {
        $and: [
          { hasVariations: true },
          { 'variations.newPrice': { $gte: parseFloat(minPrice) } },
          { 'variations.newPrice': { $lte: parseFloat(maxPrice) } }
        ]
      }
    ];

    // Stock filter
    if (inStock === 'true') {
      query.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
    }

    const total = await Product.countDocuments(query);
    
    const products = await Product.find(query)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .populate('vendor', 'storeName')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

// ==================== EXPORT CSV ====================
const exportCSV = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').populate('subcategory', 'name').lean();
    let csv = 'ID,Name,Category,MRP,Price,Stock,Variations,Quality,Diet,State,Manufacturer,Packager,Marketer\n';
    products.forEach(p => {
      csv += `"${p._id}","${p.name}","${p.category?.name||''}",${p.oldPrice||0},${p.price||0},${p.stock||0},"${p.hasVariations?'Yes':'No'}","${p.quality}","${p.dietPreference}","${p.State||''}","${p.manufacturer||''}","${p.packagerName||''}","${p.marketerName||''}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=products-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Export failed', error: error.message });
  }
};

// ==================== IMPORT CSV ====================
const importCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });
    const rows = req.file.buffer.toString().split('\n');
    const headers = rows[0].split(',').map(h => h.trim());
    const imported = [], errors = [];
    
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      const values = rows[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
      const productData = {};
      headers.forEach((h, idx) => { if (values[idx]) productData[h] = values[idx]; });
      
      if (productData.name && productData.category) {
        try {
          imported.push(await Product.create(productData));
        } catch (error) {
          errors.push({ row: i + 1, error: error.message });
        }
      }
    }
    
    res.status(200).json({ success: true, message: `${imported.length} imported`, imported: imported.length, errors: errors.length ? errors : undefined });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Import failed', error: error.message });
  }
};

// Export all functions
module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  getProductBySlug,
  deleteProduct,
  bulkDeleteProducts,
  bulkUpdateProducts,
  getProductStats,
  advancedSearch,
  exportCSV,
  importCSV
};


