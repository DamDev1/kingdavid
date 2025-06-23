export default function getWelcomeEmail(firstName: string) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
    <div style="text-align: center;">
      <img src="https://cdn-icons-png.flaticon.com/512/743/743131.png" alt="Car Logo" style="width: 80px; margin-bottom: 16px;" />
      <h2 style="color: #2c3e50;">Welcome to King David Auto 🚗</h2>
    </div>

    <p style="font-size: 16px; color: #333;">
      Hi <strong>${firstName}</strong>,
    </p>

    <p style="font-size: 15px; color: #555;">
      We’re thrilled to have you on board! You’re now part of a community where buying your next car is simple, transparent, and exciting.
    </p>

    <ul style="font-size: 15px; color: #444; padding-left: 18px; line-height: 1.6;">
      <li><strong>Explore</strong> hundreds of verified cars near you</li>
      <li><strong>Buy</strong> confidently with our secure checkout process</li>
      <li><strong>Chat with us</strong> directly on the website for fast support</li>
      <li><strong>Stand a chance to WIN a car for free!</strong> 🎉</li>
    </ul>

    <p style="font-size: 15px; color: #555;">
      Ready to get started? Visit our website now and explore the best deals waiting for you.
    </p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="https://kingdavidauto.com" target="_blank" style="background-color: #1e88e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Start Exploring
      </a>
    </div>

    <p style="font-size: 13px; color: #999; margin-top: 32px; text-align: center;">
      🚘 King David Auto • www.kingdavidauto.com • support@kingdavidauto.com
    </p>
  </div>
  `;
}
