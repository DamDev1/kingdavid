const getVerificationEmail = ({ firstName, verificationCode }: { firstName: string, verificationCode: string }) => {
    return ` 
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
      <h2 style="color: #333333;">Welcome to King David Auto 🚗</h2>
      <p style="color: #555555;">Hi <strong>${firstName}</strong>,</p>
      <p style="color: #555555;">Thanks for signing up. Use the code below to verify your email:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 28px; font-weight: bold; color: #4a58f8;">${verificationCode}</span>
      </div>
      <p>This code is valid for 10 minutes.</p>
    </div>
    `
}

export default getVerificationEmail