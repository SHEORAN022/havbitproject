const RestaurantMedia = require("../models/RestaurantMedia");
const cloudinary = require("../config/cloudinary");

/* ===== helper upload ===== */
async function uploadCloud(file) {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "restaurant_media",
    resource_type: "auto"
  });
  return result.secure_url;
}

/* ==============================
   CREATE / UPDATE (UPSERT)
================================ */
exports.upsertRestaurantMedia = async (req, res) => {
  try {
    const { restaurantName } = req.body;

    if (!restaurantName)
      return res.status(400).json({
        success: false,
        message: "restaurantName is required"
      });

    let ownerPhoto, bannerImage;

    if (req.files?.ownerPhoto)
      ownerPhoto = await uploadCloud(req.files.ownerPhoto[0]);

    if (req.files?.bannerImage)
      bannerImage = await uploadCloud(req.files.bannerImage[0]);

    const media = await RestaurantMedia.findOneAndUpdate(
      { restaurantName },
      {
        restaurantName,
        vendor: req.vendor._id,
        ...(ownerPhoto && { ownerPhoto }),
        ...(bannerImage && { bannerImage })
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: media });
  } catch (err) {
    console.log("UPSERT ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ==============================
   GET BY RESTAURANT NAME
================================ */
exports.getRestaurantMedia = async (req, res) => {
  try {
    const media = await RestaurantMedia.findOne({
      restaurantName: req.params.restaurantName
    }).populate("vendor", "storeName email");

    if (!media)
      return res.status(404).json({
        success: false,
        message: "No media found"
      });

    res.json({ success: true, data: media });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ==============================
   DELETE
================================ */
exports.deleteRestaurantMedia = async (req, res) => {
  try {
    await RestaurantMedia.deleteOne({
      restaurantName: req.params.restaurantName,
      vendor: req.vendor._id
    });

    res.json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
