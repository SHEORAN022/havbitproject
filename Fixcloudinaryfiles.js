require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const mongoose = require("mongoose");
const Vendor = require("./models/VendorModel");

const MONGO_URI = process.env.MONGO_URI;

const DOC_FIELDS = [
  "gstFile", "panFile", "aadharFile",
  "fssaiFile", "msmeFile", "ownerPhoto", "supportingDoc"
];

// URL se public_id aur resource_type nikalo
const parseCloudinaryUrl = (url) => {
  const match = url.match(
    /res\.cloudinary\.com\/([^/]+)\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/
  );
  if (!match) return null;
  const [, cloudName, resourceType, pathWithExt] = match;
  const publicId = pathWithExt.replace(/\.[^.]+$/, ""); // extension hata do
  return { cloudName, resourceType, publicId };
};

// File ko public banao - re-upload ke bina
const makePublic = async (url) => {
  const parsed = parseCloudinaryUrl(url);
  if (!parsed) return { success: false, url };

  const { resourceType, publicId } = parsed;

  try {
    // Cloudinary explicit API - access_control update karta hai
    const result = await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      resource_type: resourceType,
      access_control: [{ access_type: "anonymous" }],
    });
    return { success: true, url: result.secure_url || url };
  } catch (err) {
    try {
      // Fallback: api.update
      await cloudinary.api.update(publicId, {
        resource_type: resourceType,
        type: "upload",
        access_mode: "public",
      });
      return { success: true, url };
    } catch (err2) {
      return { success: false, url, error: err2.message };
    }
  }
};

async function main() {
  console.log("\n=== Cloudinary File Access Fixer ===\n");

  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected\n");

  const vendors = await Vendor.find({});
  console.log(`Total vendors: ${vendors.length}\n`);

  let fixed = 0, failed = 0, skipped = 0;
  const failedUrls = [];

  for (const vendor of vendors) {
    let needsSave = false;
    console.log(`Vendor: ${vendor.brandName || vendor.email}`);

    for (const field of DOC_FIELDS) {
      const url = vendor[field];
      if (!url || !url.includes("res.cloudinary.com")) { skipped++; continue; }

      process.stdout.write(`  ${field}... `);
      const result = await makePublic(url);

      if (result.success) {
        if (result.url !== url) vendor[field] = result.url;
        needsSave = true;
        fixed++;
        console.log("FIXED");
      } else {
        failed++;
        failedUrls.push({ vendor: vendor.email, field, url });
        console.log(`FAILED - ${result.error}`);
      }
    }

    if (needsSave) {
      await vendor.save();
      console.log(`  Saved.\n`);
    } else {
      console.log(`  Nothing to save.\n`);
    }
  }

  console.log(`\n=== RESULT ===`);
  console.log(`Fixed  : ${fixed}`);
  console.log(`Failed : ${failed}`);
  console.log(`Skipped: ${skipped}`);

  if (failedUrls.length > 0) {
    console.log("\nFailed files (manually fix karo Cloudinary Dashboard se):");
    failedUrls.forEach(f => console.log(`  ${f.vendor} - ${f.field}: ${f.url}`));
    console.log("\nManual steps:");
    console.log("  1. cloudinary.com → Media Library → vendors folder");
    console.log("  2. File select → Edit → Access Control → Anonymous");
  } else {
    console.log("\nSab files public ho gayi!");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Script failed:", err.message);
  process.exit(1);
});
