export default function getPurchaseConfirmationEmail({
  firstName,
  carModel,
  orderId,
  imageUrl,
}: {
  firstName: string;
  carModel: string;
  orderId: string;
  imageUrl?: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #2e86de;">Thank you for your purchase, ${firstName}!</h2>
      <p>We're thrilled to let you know that your order for <strong>${carModel}</strong> has been received.</p>
      ${
        imageUrl
          ? `<div style="text-align:center; margin: 20px 0;">
               <img src="${imageUrl}" alt="${carModel}" style="max-width:100%; height:auto; border-radius:8px;" />
             </div>`
          : ""
      }
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p>Our team will reach out to you shortly to finalize delivery or pickup arrangements.</p>
      <p>Need help? Just reply to this email or chat with us on our website.</p>
      <br/>
      <p>🚗 Happy driving!</p>
      <p><strong>– King David Auto</strong></p>
    </div>
  `;
}
