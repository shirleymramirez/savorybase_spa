import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Checkout = any;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.checkout) {
    return NextResponse.json({ error: "Missing checkout payload" }, { status: 400 });
  }

  const checkout: Checkout = body.checkout;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;
  const recipient = "jheilhet@gmail.com";

  if (!gmailUser || !gmailPass) {
    return NextResponse.json(
      {
        error: "Gmail is not configured. Set GMAIL_USER and GMAIL_PASS environment variables to enable email sending."
      },
      { status: 500 }
    );
  }

  function buildHtml(checkout: Checkout) {
    let itemsHtml = "";
    for (const item of checkout.items || []) {
      itemsHtml += `<li>${item.food.title} x${item.quantity} - ${item.food.price}</li>`;
    }

    return `
      <h1>New Order from SavoryBase</h1>
      <h2>Customer Information</h2>
      <p><strong>Email:</strong> ${checkout.customer?.email || "N/A"}</p>
      <p><strong>Phone:</strong> ${checkout.customer?.phone || "N/A"}</p>
      
      <h2>Recipient & Delivery</h2>
      <p><strong>Recipient Name:</strong> ${checkout.recipientName || "N/A"}</p>
      <p><strong>Delivery Address:</strong> ${checkout.deliveryAddress || "N/A"}</p>
      <p><strong>Special Message:</strong> ${checkout.message || "None"}</p>
      
      <h2>Items Ordered</h2>
      <ul>${itemsHtml || "<li>No items</li>"}</ul>
      
      <h2>Order Totals</h2>
      <p><strong>Subtotal:</strong> $${(checkout.totals?.subtotal ?? 0).toFixed(2)}</p>
      <p><strong>Shipping:</strong> $${(checkout.totals?.shipping ?? 0).toFixed(2)}</p>
      <p><strong>Tax:</strong> $${(checkout.totals?.tax ?? 0).toFixed(2)}</p>
      <p style="font-size: 1.2em;"><strong>Grand Total:</strong> $${(checkout.totals?.grandTotal ?? 0).toFixed(2)}</p>
    `;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const mailOptions = {
      from: gmailUser,
      to: recipient,
      subject: `New Order from ${checkout.customer?.email || "SavoryBase Customer"}`,
      html: buildHtml(checkout),
      text: `New order from ${checkout.customer?.email || "guest"}\n\n${JSON.stringify(checkout, null, 2)}`
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, message: `Order sent to ${recipient}` });
  } catch (err: any) {
    console.error("send-order error:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
