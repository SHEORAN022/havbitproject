

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
//   // data.materialTypes = String(body.materialTypes || '').trim();
//   data.materialTypes = String(details.materialTypes || '').trim();
//   data.ingredients = String(body.ingredients || '').trim();
//   // data.customWeight = String(body.customWeight || '').trim();
//   // data.customSizeInput = String(body.customSizeInput || '').trim();
//   data.customWeight = String(body.customWeight || '').trim();
// data.customSizeInput = String(body.customSizeInput || '').trim();
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
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const cloudinary = require('../config/cloudinary');
const { Parser } = require('json2csv');
const csv = require('csv-parser');

// ==================== CLOUDINARY UPLOAD ====================
async function uploadToCloudinary(file, folder = 'products') {
  try {
    if (!file || !file.buffer) {
      console.error('❌ No file buffer provided');
      return null;
    }

    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });
    
    console.log(`✅ Cloudinary upload successful: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error.message);
    return null;
  }
}

// ==================== DELETE CLOUDINARY IMAGE ====================
async function deleteCloudinaryImage(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
      return;
    }
    
    // Extract public_id from URL
    const urlParts = imageUrl.split('/');
    const publicIdWithExtension = urlParts.slice(-2).join('/');
    const publicId = publicIdWithExtension.split('.')[0];
    
    await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error('❌ Error deleting Cloudinary image:', error.message);
  }
}

// ==================== VARIATIONS CLEANER ====================
const cleanVariationsData = (variationsStr) => {
  if (!variationsStr) return [];
  
  try {
    let variations = typeof variationsStr === 'string' ? JSON.parse(variationsStr) : variationsStr;
    if (!Array.isArray(variations)) return [];
    
    return variations.map((variation, index) => {
      const cleaned = {};
      
      // Handle variationId
      if (variation.variationId) {
        cleaned.variationId = variation.variationId;
      } else if (variation.id) {
        cleaned.variationId = variation.id.toString();
      } else {
        cleaned.variationId = `var_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Clean fields
      cleaned.size = String(variation.size || '').trim();
      cleaned.flavor = String(variation.flavor || '').trim();
      cleaned.oldPrice = parseFloat(variation.oldPrice) || 0;
      cleaned.newPrice = parseFloat(variation.newPrice || variation.price) || 0;
      cleaned.stock = parseInt(variation.stock) || 0;
      cleaned.sku = String(variation.sku || `SKU-${cleaned.variationId}`).trim();
      
      // Keep existing image if provided
      if (variation.image) {
        cleaned.image = variation.image;
      }
      
      return cleaned;
    });
  } catch (error) {
    console.error('❌ Error cleaning variations:', error);
    return [];
  }
};

// ==================== PREPARE PRODUCT DATA ====================
const prepareProductData = (body) => {
  console.log('\n📋 ========== PREPARING PRODUCT DATA ==========');
  const data = {};
  
  // Helper functions
  const safeString = (value) => (value !== undefined && value !== null ? String(value).trim() : '');
  const safeNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };
  const safeArray = (value) => {
    if (Array.isArray(value)) return value.filter(item => item && safeString(item) !== '');
    if (typeof value === 'string' && value.trim() !== '') {
      return value.split(',').map(item => item.trim()).filter(item => item !== '');
    }
    return [];
  };
  
  // ========== BASIC INFORMATION ==========
  data.name = safeString(body.name);
  data.description = safeString(body.description);
  data.restaurantName = safeString(body.restaurantName) || 'Havbit';
  data.hasVariations = body.hasVariations === true || body.hasVariations === 'true';
  
  // ========== PRICING & STOCK ==========
  data.oldPrice = safeNumber(body.oldPrice);
  data.price = safeNumber(body.price || body.newPrice);
  data.stock = safeNumber(body.stock);
  data.quality = safeString(body.quality) || 'Standard';
  data.dietPreference = safeString(body.dietPreference) || 'Veg';
  
  // ========== VARIATIONS ==========
  if (body.variations) {
    data.variations = cleanVariationsData(body.variations);
  } else {
    data.variations = [];
  }
  
  // Reset main pricing if variations exist
  if (data.hasVariations && data.variations.length > 0) {
    const minPrice = Math.min(...data.variations.map(v => v.newPrice || 0).filter(p => p > 0));
    data.price = minPrice > 0 ? minPrice : 0;
    data.oldPrice = 0;
    data.stock = data.variations.reduce((sum, v) => sum + (v.stock || 0), 0);
  }
  
  // ========== PRODUCT DETAILS ==========
  data.productTypes = safeString(body.productTypes);
  data.flavors = safeArray(body.flavors);
  data.size = safeArray(body.size);
  data.materialTypes = safeString(body.materialTypes);
  data.ingredients = safeString(body.ingredients);
  data.customWeight = safeString(body.customWeight);
  data.customSizeInput = safeString(body.customSizeInput);
  data.ageRange = safeString(body.ageRange);
  data.containerType = safeString(body.containerType);
  data.itemForm = safeString(body.itemForm);
  data.specialty = safeString(body.specialty);
  data.itemTypeName = safeString(body.itemTypeName);
  data.countryOfOrigin = safeString(body.countryOfOrigin);
  
  // ========== COMPLIANCE ==========
  data.fssaiLicense = safeString(body.fssaiLicense || body.brandName);
  data.brandName = safeString(body.brandName || body.fssaiLicense);
  data.legalDisclaimer = safeString(body.legalDisclaimer);
  
  // ========== MANUFACTURING ==========
  data.manufacturerName = safeString(body.manufacturerName || body.manufacturer);
  data.manufacturerAddress = safeString(body.manufacturerAddress || body.manufacturerContact);
  data.manufacturer = safeString(body.manufacturer || body.manufacturerName);
  data.manufacturerContact = safeString(body.manufacturerContact || body.manufacturerAddress);
  
  // ========== PACKAGER ==========
  data.packagerName = safeString(body.packagerName);
  data.packagerAddress = safeString(body.packagerAddress);
  data.packagerFssaiLicense = safeString(body.packagerFssaiLicense);
  data.packerContact = safeString(body.packerContact);
  
  // Parse packerContact string if needed
  if (data.packerContact && data.packerContact.includes('|')) {
    const lines = data.packerContact.split('|').map(l => l.trim());
    lines.forEach(line => {
      if (line.includes('Packager:') && !data.packagerName) {
        data.packagerName = line.replace('Packager:', '').trim();
      } else if (line.includes('Address:') && !data.packagerAddress) {
        data.packagerAddress = line.replace('Address:', '').trim();
      }
    });
  }
  
  // ========== MARKETER ==========
  data.marketerName = safeString(body.marketerName);
  data.marketerAddress = safeString(body.marketerAddress);
  data.marketerNameAddress = safeString(body.marketerNameAddress);
  
  // Parse marketerNameAddress string if needed
  if (data.marketerNameAddress && data.marketerNameAddress.includes('|')) {
    const lines = data.marketerNameAddress.split('|').map(l => l.trim());
    lines.forEach(line => {
      if (line.includes('Name:') && !data.marketerName) {
        data.marketerName = line.replace('Name:', '').trim();
      } else if (line.includes('Address:') && !data.marketerAddress) {
        data.marketerAddress = line.replace('Address:', '').trim();
      }
    });
  }
  
  // ========== PACKAGE DETAILS ==========
  data.packageColour = safeString(body.packageColour);
  data.measurementUnit = safeString(body.measurementUnit);
  data.unitCount = safeString(body.unitCount);
  data.numberOfItems = safeString(body.numberOfItems);
  data.itemWeight = safeString(body.itemWeight);
  data.totalEaches = safeString(body.totalEaches);
  data.itemPackageWeight = safeString(body.itemPackageWeight);
  data.shelfLife = safeString(body.shelfLife);
  
  // ========== DIETARY & NUTRITION ==========
  data.dietaryPreferences = safeString(body.dietaryPreferences);
  data.allergenInformation = safeString(body.allergenInformation || body.allergenInfo);
  data.nutrition = safeString(body.nutrition);
  data.cuisine = safeString(body.cuisine);
  data.directions = safeString(body.directions);
  
  // ========== LOCATION ==========
  data.State = safeString(body.State);
  
  // ========== CATEGORY ==========
  if (body.category) data.category = body.category;
  if (body.subcategory) data.subcategory = body.subcategory;
  
  // ========== STATUS ==========
  data.status = safeString(body.status) || 'active';
  
  // ========== TAGS ==========
  data.tags = safeArray(body.tags);
  
  // ========== SEO ==========
  data.metaTitle = safeString(body.metaTitle);
  data.metaDescription = safeString(body.metaDescription);
  data.keywords = safeArray(body.keywords);
  
  console.log('✅ Data prepared successfully');
  console.log('📊 Summary:', {
    name: data.name,
    price: data.price,
    hasVariations: data.hasVariations,
    variationsCount: data.variations?.length || 0
  });
  
  return data;
};

// ==================== CREATE PRODUCT ====================
exports.createProduct = async (req, res) => {
  try {
    console.log('\n🆕 ==================== CREATING PRODUCT ====================');
    
    const data = prepareProductData(req.body);
    
    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({
        success: false,
        message: 'Product name, price and category are required'
      });
    }
    
    // Check if category exists
    const categoryExists = await Category.findById(data.category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Selected category does not exist'
      });
    }
    
    // Check subcategory if provided
    if (data.subcategory) {
      const subcategoryExists = await SubCategory.findById(data.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Selected subcategory does not exist'
        });
      }
    }
    
    // Upload main image
    if (req.files?.image?.[0]) {
      data.image = await uploadToCloudinary(req.files.image[0], 'products/main');
    }
    
    // Upload gallery images
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      const galleryUrls = [];
      
      for (const file of galleryFiles) {
        const url = await uploadToCloudinary(file, 'products/gallery');
        if (url) galleryUrls.push(url);
      }
      
      data.gallery = galleryUrls.slice(0, 9);
    }
    
    // Upload variation images
    if (data.hasVariations && data.variations.length > 0 && req.files?.variationImages) {
      const varImages = Array.isArray(req.files.variationImages) ? 
        req.files.variationImages : [req.files.variationImages];
      
      for (let i = 0; i < varImages.length && i < data.variations.length; i++) {
        const url = await uploadToCloudinary(varImages[i], 'products/variations');
        if (url) {
          data.variations[i].image = url;
        }
      }
    }
    
    // Create product
    const product = await Product.create(data);
    
    // Populate category and subcategory
    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    console.log('✅ ==================== PRODUCT CREATED ====================');
    console.log('📦 Product ID:', product._id);
    console.log('📝 Name:', product.name);
    console.log('💰 Price:', product.price);
    console.log('🏭 Manufacturer:', product.manufacturerName);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct
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
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Product with similar name already exists'
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
exports.updateProduct = async (req, res) => {
  try {
    console.log('\n🔄 ==================== UPDATING PRODUCT ====================');
    
    const productId = req.params.id;
    let product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.log('📦 Updating product:', product.name);
    
    const updateData = prepareProductData(req.body);
    
    // Validate category if being updated
    if (updateData.category && updateData.category !== product.category.toString()) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Selected category does not exist'
        });
      }
    }
    
    // Validate subcategory if being updated
    if (updateData.subcategory && updateData.subcategory !== product.subcategory?.toString()) {
      const subcategoryExists = await SubCategory.findById(updateData.subcategory);
      if (!subcategoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Selected subcategory does not exist'
        });
      }
    }
    
    // Handle main image update
    if (req.files?.image?.[0]) {
      // Delete old image from Cloudinary
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      // Upload new image
      updateData.image = await uploadToCloudinary(req.files.image[0], 'products/main');
    }
    
    // Handle gallery images update
    let gallery = [...product.gallery];
    
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery) ? req.files.gallery : [req.files.gallery];
      
      for (const file of galleryFiles) {
        const url = await uploadToCloudinary(file, 'products/gallery');
        if (url) gallery.push(url);
      }
      
      updateData.gallery = gallery.slice(0, 9);
    }
    
    // Handle variation images update
    if (updateData.hasVariations && updateData.variations.length > 0) {
      // Preserve existing variation images
      updateData.variations.forEach((newVar, index) => {
        const existingVar = product.variations.find(v => v.variationId === newVar.variationId);
        if (existingVar?.image && !newVar.image) {
          updateData.variations[index].image = existingVar.image;
        }
      });
      
      // Upload new variation images
      if (req.files?.variationImages) {
        const varImages = Array.isArray(req.files.variationImages) ? 
          req.files.variationImages : [req.files.variationImages];
        
        for (let i = 0; i < varImages.length && i < updateData.variations.length; i++) {
          const url = await uploadToCloudinary(varImages[i], 'products/variations');
          if (url) {
            updateData.variations[i].image = url;
          }
        }
      }
    }
    
    // Update product
    product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    console.log('✅ Product updated successfully');
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
    
  } catch (error) {
    console.error('❌ UPDATE PRODUCT ERROR:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// ==================== GET ALL PRODUCTS ====================
exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      search = '',
      category = '',
      subcategory = '',
      quality = '',
      dietPreference = '',
      status = '',
      minPrice = '',
      maxPrice = '',
      inStock = '',
      sort = '-createdAt'
    } = req.query;
    
    const query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brandName: { $regex: search, $options: 'i' } },
        { restaurantName: { $regex: search, $options: 'i' } },
        { 'variations.sku': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    // Quality filter
    if (quality) query.quality = quality;
    
    // Diet preference filter
    if (dietPreference) query.dietPreference = dietPreference;
    
    // Status filter
    if (status) query.status = status;
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Stock filter
    if (inStock === 'true') {
      query.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
    } else if (inStock === 'false') {
      query.$or = [
        { stock: 0 },
        { 'variations.stock': 0 }
      ];
    }
    
    // Execute query with pagination
    const products = await Product.find(query)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();
    
    const total = await Product.countDocuments(query);
    
    // Calculate summary stats
    const stats = {
      total,
      active: await Product.countDocuments({ ...query, status: 'active' }),
      outOfStock: await Product.countDocuments({ 
        $or: [
          { stock: 0, hasVariations: false },
          { 'variations.stock': 0, hasVariations: true }
        ]
      }),
      withVariations: await Product.countDocuments({ ...query, hasVariations: true }),
      totalValue: await Product.aggregate([
        { $match: query },
        { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$stock'] } } } }
      ]).then(result => result[0]?.total || 0)
    };
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      stats,
      data: products
    });
    
  } catch (error) {
    console.error('❌ GET ALL PRODUCTS ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// ==================== GET SINGLE PRODUCT ====================
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Calculate additional fields
    product.discountPercentage = product.oldPrice > 0 && product.price > 0 && product.oldPrice > product.price ?
      Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    
    product.isInStock = product.hasVariations ?
      product.variations.some(v => v.stock > 0) :
      product.stock > 0;
    
    res.status(200).json({
      success: true,
      data: product
    });
    
  } catch (error) {
    console.error('❌ GET PRODUCT ERROR:', error);
    
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

// ==================== DELETE PRODUCT ====================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Delete images from Cloudinary
    if (product.image && product.image.includes('cloudinary.com')) {
      await deleteCloudinaryImage(product.image);
    }
    
    // Delete gallery images
    if (product.gallery && product.gallery.length > 0) {
      for (const imageUrl of product.gallery) {
        if (imageUrl && imageUrl.includes('cloudinary.com')) {
          await deleteCloudinaryImage(imageUrl);
        }
      }
    }
    
    // Delete variation images
    if (product.variations && product.variations.length > 0) {
      for (const variation of product.variations) {
        if (variation.image && variation.image.includes('cloudinary.com')) {
          await deleteCloudinaryImage(variation.image);
        }
      }
    }
    
    // Delete product from database
    await product.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ DELETE PRODUCT ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// ==================== BULK DELETE ====================
exports.bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No product IDs provided for bulk delete'
      });
    }
    
    // Find products to delete
    const products = await Product.find({ _id: { $in: ids } });
    
    // Delete images from Cloudinary for all products
    for (const product of products) {
      if (product.image && product.image.includes('cloudinary.com')) {
        await deleteCloudinaryImage(product.image);
      }
      
      if (product.gallery && product.gallery.length > 0) {
        for (const imageUrl of product.gallery) {
          if (imageUrl && imageUrl.includes('cloudinary.com')) {
            await deleteCloudinaryImage(imageUrl);
          }
        }
      }
      
      if (product.variations && product.variations.length > 0) {
        for (const variation of product.variations) {
          if (variation.image && variation.image.includes('cloudinary.com')) {
            await deleteCloudinaryImage(variation.image);
          }
        }
      }
    }
    
    // Delete products from database
    const result = await Product.deleteMany({ _id: { $in: ids } });
    
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} products deleted successfully`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('❌ BULK DELETE ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Bulk delete failed',
      error: error.message
    });
  }
};

// ==================== BULK UPDATE ====================
exports.bulkUpdateProducts = async (req, res) => {
  try {
    const { ids, data } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No product IDs provided for bulk update'
      });
    }
    
    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
    }
    
    // Clean update data
    const updateData = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        updateData[key] = data[key];
      }
    });
    
    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.oldPrice) updateData.oldPrice = parseFloat(updateData.oldPrice);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
    // Perform bulk update
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: updateData },
      { runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} products updated successfully`,
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('❌ BULK UPDATE ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Bulk update failed',
      error: error.message
    });
  }
};

// ==================== EXPORT CSV ====================
exports.exportCSV = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .lean();
    
    // Transform products for CSV
    const csvData = products.map(product => ({
      ID: product._id,
      Name: product.name,
      Description: product.description,
      Brand: product.brandName,
      FSSAI_License: product.fssaiLicense,
      Restaurant: product.restaurantName,
      MRP: product.oldPrice,
      Selling_Price: product.price,
      Stock: product.stock,
      Quality: product.quality,
      Diet: product.dietPreference,
      Category: product.category?.name || '',
      Subcategory: product.subcategory?.name || '',
      Has_Variations: product.hasVariations ? 'Yes' : 'No',
      Variations_Count: product.variations?.length || 0,
      Product_Type: product.productTypes,
      Flavors: Array.isArray(product.flavors) ? product.flavors.join(', ') : product.flavors,
      Sizes: Array.isArray(product.size) ? product.size.join(', ') : product.size,
      Ingredients: product.ingredients,
      Manufacturer: product.manufacturerName,
      Packager: product.packagerName,
      Marketer: product.marketerName,
      Package_Color: product.packageColour,
      Shelf_Life: product.shelfLife,
      State: product.State,
      Status: product.status,
      Created_At: product.createdAt,
      Updated_At: product.updatedAt
    }));
    
    const fields = [
      'ID', 'Name', 'Description', 'Brand', 'FSSAI_License', 'Restaurant',
      'MRP', 'Selling_Price', 'Stock', 'Quality', 'Diet', 'Category',
      'Subcategory', 'Has_Variations', 'Variations_Count', 'Product_Type',
      'Flavors', 'Sizes', 'Ingredients', 'Manufacturer', 'Packager',
      'Marketer', 'Package_Color', 'Shelf_Life', 'State', 'Status',
      'Created_At', 'Updated_At'
    ];
    
    const parser = new Parser({ fields });
    const csv = parser.parse(csvData);
    
    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=products_${Date.now()}.csv`);
    
    res.send(csv);
    
  } catch (error) {
    console.error('❌ EXPORT CSV ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export products as CSV',
      error: error.message
    });
  }
};

// ==================== IMPORT CSV ====================
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No CSV file uploaded'
      });
    }
    
    const results = [];
    const errors = [];
    
    // Parse CSV file
    const csvData = req.file.buffer.toString();
    const rows = csvData.split('\n');
    const headers = rows[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      
      const values = rows[i].split(',').map(v => v.replace(/^"|"$/g, '').trim());
      const rowData = {};
      
      // Map headers to values
      headers.forEach((header, index) => {
        if (values[index] !== undefined) {
          rowData[header] = values[index];
        }
      });
      
      try {
        // Transform CSV data to product schema
        const productData = {
          name: rowData.Name || '',
          description: rowData.Description || '',
          brandName: rowData.Brand || '',
          fssaiLicense: rowData.FSSAI_License || '',
          restaurantName: rowData.Restaurant || 'Havbit',
          oldPrice: parseFloat(rowData.MRP) || 0,
          price: parseFloat(rowData.Selling_Price) || 0,
          stock: parseInt(rowData.Stock) || 0,
          quality: rowData.Quality || 'Standard',
          dietPreference: rowData.Diet || 'Veg',
          productTypes: rowData.Product_Type || '',
          ingredients: rowData.Ingredients || '',
          manufacturerName: rowData.Manufacturer || '',
          packagerName: rowData.Packager || '',
          marketerName: rowData.Marketer || '',
          packageColour: rowData.Package_Color || '',
          shelfLife: rowData.Shelf_Life || '',
          State: rowData.State || '',
          status: rowData.Status || 'active'
        };
        
        // Handle flavors and sizes as arrays
        if (rowData.Flavors) {
          productData.flavors = rowData.Flavors.split(',').map(f => f.trim()).filter(f => f);
        }
        
        if (rowData.Sizes) {
          productData.size = rowData.Sizes.split(',').map(s => s.trim()).filter(s => s);
        }
        
        // Handle category - you might need to find by name
        if (rowData.Category) {
          // Implement category lookup by name
          // const category = await Category.findOne({ name: rowData.Category });
          // if (category) productData.category = category._id;
        }
        
        // Create product
        const product = await Product.create(productData);
        results.push(product._id);
        
      } catch (error) {
        errors.push({
          row: i + 1,
          error: error.message,
          data: rowData
        });
      }
    }
    
    res.status(200).json({
      success: true,
      message: `CSV import completed: ${results.length} products imported, ${errors.length} errors`,
      imported: results.length,
      errors: errors.length > 0 ? errors : undefined
    });
    
  } catch (error) {
    console.error('❌ IMPORT CSV ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import products from CSV',
      error: error.message
    });
  }
};

// ==================== GET PRODUCT STATS ====================
exports.getProductStats = async (req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      outOfStockProducts,
      productsWithVariations,
      totalCategories,
      totalStockValue
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: 'active' }),
      Product.countDocuments({ 
        $or: [
          { stock: 0, hasVariations: false },
          { 'variations.stock': 0, hasVariations: true }
        ]
      }),
      Product.countDocuments({ hasVariations: true }),
      Product.distinct('category').then(categories => categories.length),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
          }
        }
      ]).then(result => result[0]?.totalValue || 0)
    ]);
    
    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name price stock createdAt')
      .lean();
    
    // Get products by quality
    const qualityStats = await Product.aggregate([
      {
        $group: {
          _id: '$quality',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get products by diet preference
    const dietStats = await Product.aggregate([
      {
        $group: {
          _id: '$dietPreference',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        total: totalProducts,
        active: activeProducts,
        outOfStock: outOfStockProducts,
        withVariations: productsWithVariations,
        categories: totalCategories,
        totalValue: totalStockValue,
        recentProducts,
        qualityStats,
        dietStats
      }
    });
    
  } catch (error) {
    console.error('❌ GET STATS ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product statistics',
      error: error.message
    });
  }
};

// ==================== GET PRODUCT BY SLUG ====================
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
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
    console.error('❌ GET PRODUCT BY SLUG ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// ==================== ADVANCED SEARCH ====================
exports.advancedSearch = async (req, res) => {
  try {
    const {
      q = '',
      category = '',
      subcategory = '',
      minPrice = 0,
      maxPrice = 1000000,
      quality = '',
      dietPreference = '',
      state = '',
      inStock = '',
      sort = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;
    
    const query = {};
    
    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brandName: { $regex: q, $options: 'i' } },
        { restaurantName: { $regex: q, $options: 'i' } },
        { productTypes: { $regex: q, $options: 'i' } },
        { ingredients: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Category filters
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Other filters
    if (quality) query.quality = quality;
    if (dietPreference) query.dietPreference = dietPreference;
    if (state) query.State = state;
    
    // Stock filter
    if (inStock === 'true') {
      query.$or = [
        { stock: { $gt: 0 } },
        { 'variations.stock': { $gt: 0 } }
      ];
    } else if (inStock === 'false') {
      query.$or = [
        { stock: 0 },
        { 'variations.stock': 0 }
      ];
    }
    
    // Execute query
    const products = await Product.find(query)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();
    
    const total = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products
    });
    
  } catch (error) {
    console.error('❌ ADVANCED SEARCH ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

// ==================== UPDATE STOCK ====================
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, variationId } = req.body;
    
    if (!stock && stock !== 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock quantity is required'
      });
    }
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    if (product.hasVariations && variationId) {
      // Update variation stock
      const variationIndex = product.variations.findIndex(v => v.variationId === variationId);
      
      if (variationIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Variation not found'
        });
      }
      
      product.variations[variationIndex].stock = parseInt(stock);
      product.stock = product.variations.reduce((sum, v) => sum + v.stock, 0);
    } else {
      // Update main product stock
      product.stock = parseInt(stock);
    }
    
    // Update status based on stock
    if (product.stock <= 0) {
      product.status = 'out_of_stock';
    } else if (product.status === 'out_of_stock') {
      product.status = 'active';
    }
    
    await product.save();
    
    const updatedProduct = await Product.findById(id)
      .populate('category', 'name image')
      .populate('subcategory', 'name image')
      .lean();
    
    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: updatedProduct
    });
    
  } catch (error) {
    console.error('❌ UPDATE STOCK ERROR:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock',
      error: error.message
    });
  }
};

module.exports = exports;
