
const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// Test Gmail connection
router.get("/test-email", async (req, res) => {
  try {
    await transporter.verify();

    res.status(200).json({
      success: true,
      message: "Gmail connection successful!"
    });
  } catch (error) {
    console.error("Gmail Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Gmail connection failed!"
    });
  }
});

// Order confirmation
router.post("/confirm", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      items
    } = req.body;

    // Validate customer details
    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof customerEmail !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) ||
      !/^\d{10}$/.test(phone || "") ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer or order information!"
      });
    }

    // Validate products
    const validItems = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      const price = Number(item.price);

      if (
        typeof item.name !== "string" ||
        !item.name.trim() ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1 ||
        !Number.isFinite(price) ||
        price < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product information!"
        });
      }

      validItems.push({
        name: item.name.trim(),
        quantity,
        price
      });
    }

    const total = validItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      orderId: crypto.randomUUID(),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      phone,
      items: validItems,
      total
    };

    const productRows = order.items.map(item => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #eee;">
          ${escapeHtml(item.name)}
        </td>
        <td style="padding:12px;border-bottom:1px solid #eee;">
          ${item.quantity}
        </td>
        <td style="padding:12px;border-bottom:1px solid #eee;">
          Rs. ${item.price.toFixed(2)}
        </td>
        <td style="padding:12px;border-bottom:1px solid #eee;">
          Rs. ${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join("");

    const emailStyle = `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;color:#333;border:1px solid #eee;border-radius:12px;overflow:hidden;">
        <div style="background:#8b3a50;color:white;padding:25px;text-align:center;">
          <h1 style="margin:0;">Cake Shop</h1>
          <p>Fresh Cakes, Sweet Moments!</p>
        </div>

        <div style="padding:25px;">
          CONTENT_PLACEHOLDER
        </div>

        <div style="background:#f8f0f2;padding:18px;text-align:center;color:#777;">
          Thank you for choosing Cake Shop!
        </div>
      </div>
    `;

    const table = `
      <table style="width:100%;border-collapse:collapse;text-align:left;">
        <tr style="background:#f8f0f2;">
          <th style="padding:12px;">Product</th>
          <th style="padding:12px;">Qty</th>
          <th style="padding:12px;">Price</th>
          <th style="padding:12px;">Total</th>
        </tr>
        ${productRows}
      </table>
    `;

    // Customer email
    const customerMail = {
      from: process.env.EMAIL_USER,
      to: order.customerEmail,
      subject: "Your Cake Order is Confirmed!",
      html: emailStyle.replace(
        "CONTENT_PLACEHOLDER",
        `
          <h2>Hello ${escapeHtml(order.customerName)}!</h2>
          <p>Thank you for ordering from Cake Shop. Your order has been confirmed.</p>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <h3>Order Details</h3>
          ${table}
          <h3 style="text-align:right;color:#8b3a50;">
            Grand Total: Rs. ${total.toFixed(2)}
          </h3>
          <p>We hope you enjoy your cake!</p>
        `
      )
    };

    // Admin email
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Cake Order Received!",
      html: emailStyle.replace(
        "CONTENT_PLACEHOLDER",
        `
          <h2>New Order Received!</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>

          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(order.customerName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(order.customerEmail)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(order.phone)}</p>

          <h3>Ordered Products</h3>
          ${table}

          <h3 style="color:#8b3a50;">
            Total Amount: Rs. ${total.toFixed(2)}
          </h3>
        `
      )
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMail),
      transporter.sendMail(adminMail)
    ]);

    res.status(200).json({
      success: true,
      message: "Order confirmed and emails sent!",
      orderId: order.orderId
    });

  } catch (error) {
    console.error("Order Email Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Order processing or email sending failed!"
    });
  }
});

module.exports = router;
