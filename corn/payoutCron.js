// const cron = require("node-cron");
// const Razorpay = require("razorpay");

// const CustomerOrder = require("../models/CustomerOrder");
// const Vendor = require("../models/VendorModel");

// /* ================= CRON RUN DAILY ================= */
// cron.schedule("0 2 * * *", async () => {
//   console.log("🔥 Running payout cron...");

//   try {
//     /* ================= INIT RAZORPAY ================= */
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.log("❌ Razorpay ENV missing");
//       return;
//     }

//     if (!process.env.RAZORPAY_ACCOUNT_NUMBER) {
//       console.log("❌ ACCOUNT NUMBER missing");
//       return;
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     /* ================= FETCH ORDERS ================= */
//     const orders = await CustomerOrder.find({
//       orderStatus: "Delivered",
//       payoutStatus: "Pending",
//       payoutEligibleAt: { $lte: new Date() },
//     });

//     console.log("🧾 Eligible Orders:", orders.length);

//     for (const order of orders) {
//       try {
//         if (!order.vendorId) continue;
//         if (!order.vendorAmount || order.vendorAmount <= 0) continue;

//         const vendor = await Vendor.findById(order.vendorId);

//         if (!vendor?.razorpayFundAccountId) {
//           console.log("⚠️ Fund account missing:", order._id);
//           continue;
//         }

//         /* ================= PAYOUT ================= */
//         const payout = await razorpay.payouts.create({
//           account_number: process.env.RAZORPAY_ACCOUNT_NUMBER,
//           fund_account_id: vendor.razorpayFundAccountId,
//           amount: Math.round(order.vendorAmount * 100),
//           currency: "INR",
//           mode: "IMPS",
//           purpose: "payout",
//           reference_id: order._id.toString(),
//           narration: "Vendor payout",
//         });

//         /* ================= UPDATE ORDER ================= */
//         order.payoutStatus = "Paid";
//         order.payoutId = payout.id;

//         await order.save();

//         console.log("✅ Paid:", order._id);

//       } catch (err) {
//         console.log("❌ Error:", err.message);
//       }
//     }

//   } catch (err) {
//     console.log("❌ Cron Error:", err.message);
//   }
// });
const cron = require("node-cron");
const Razorpay = require("razorpay");

const CustomerOrder = require("../models/CustomerOrder");

/* ================= CRON RUN DAILY ================= */
cron.schedule("0 2 * * *", async () => {
  console.log("🔥 Running payout cron...");

  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.log("❌ Razorpay ENV missing");
      return;
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    /* ================= FETCH ORDERS ================= */
    const orders = await CustomerOrder.find({
      orderStatus: "Delivered",
      payoutStatus: "OnHold", // 🔥 IMPORTANT CHANGE
      payoutEligibleAt: { $lte: new Date() },
    });

    console.log("🧾 Eligible Orders:", orders.length);

    for (const order of orders) {
      try {
        if (!order.transferId) {
          console.log("⚠️ No transferId:", order._id);
          continue;
        }

        /* ================= RELEASE TRANSFER ================= */
        await razorpay.transfers.edit(order.transferId, {
          on_hold: false,
        });

        /* ================= UPDATE ORDER ================= */
        order.payoutStatus = "Released";
        order.payoutReleasedAt = new Date();

        await order.save();

        console.log("✅ Released:", order._id);

      } catch (err) {
        console.log("❌ Error:", err.message);
      }
    }

  } catch (err) {
    console.log("❌ Cron Error:", err.message);
  }
});
