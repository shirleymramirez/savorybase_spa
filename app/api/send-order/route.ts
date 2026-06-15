import { NextResponse } from "next/server";

type Checkout = any;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.checkout) {
    return NextResponse.json({ error: "Missing checkout payload" }, { status: 400 });
  }

  const checkout: Checkout = body.checkout;

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sender = process.env.SENDER_EMAIL || process.env.NEXT_PUBLIC_SENDER_EMAIL;
  const recipient = "shirley.mramirez@yahoo.com";

  const subject = `New order from ${checkout.customer?.email || "guest"}`;

  function buildHtml(checkout: Checkout) {
    let itemsHtml = "";
    for (const item of checkout.items || []) {
      itemsHtml += `<li>${item.food.title} x${item.quantity} - ${item.food.price}</li>`;
    }

    return `
      <h1>New order</h1>
      <p><strong>Customer:</strong> ${checkout.customer?.email || ""} (${checkout.customer?.phone || ""})</p>
      <p><strong>Recipient:</strong> ${checkout.recipientName || ""}</p>
      <p><strong>Address:</strong> ${checkout.deliveryAddress || ""}</p>
      <p><strong>Message:</strong> ${checkout.message || ""}</p>
      <h2>Items</h2>
      <ul>${itemsHtml}</ul>
      <h3>Totals</h3>
      <p>Subtotal: $${(checkout.totals?.subtotal ?? 0).toFixed(2)}</p>
      <p>Shipping: $${(checkout.totals?.shipping ?? 0).toFixed(2)}</p>
      <p>Tax: $${(checkout.totals?.tax ?? 0).toFixed(2)}</p>
      <p><strong>Grand total: $${(checkout.totals?.grandTotal ?? 0).toFixed(2)}</strong></p>
    `;
  }

  if (!sendgridKey || !sender) {
    return NextResponse.json(
      {
        error:
          "SendGrid is not configured. Set SENDGRID_API_KEY and SENDER_EMAIL environment variables to enable server-side emailing."
      },
      { status: 500 }
    );
  }

  try {
    // Dynamically import @sendgrid/mail so the app can run without the package if not used
    const sg = await import("@sendgrid/mail");
    sg.setApiKey(sendgridKey);

    const msg = {
      to: recipient,
      from: sender,
      subject,
      text: `New order from ${checkout.customer?.email || "guest"}\n\n` + JSON.stringify(checkout, null, 2),
      html: buildHtml(checkout)
    } as any;

    await sg.send(msg);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("send-order error", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
