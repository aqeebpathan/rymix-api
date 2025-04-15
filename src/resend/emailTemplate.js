export const VERIFICATION_EMAIL_TEMPLATE = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: "Courier New", Courier; sans-serif; line-height: 1.6; color: #000; max-width: 480px; margin: 0 auto; padding: 20px; ">

  <!-- Logo Section -->
  <div style=" margin-bottom: 20px;">
    <img src="https://gyiktpapyfjjwgcfuhik.supabase.co/storage/v1/object/public/uidsigns_images/authpack.png" alt="AuthPack Logo" style="max-width: 200px;">
  </div>

  <!-- Header -->
  <div style="padding: 0px 20px; font-size: 14px;">
    <h2>Verify your email, {username}!</h2>
  </div>

  <!-- Main Content -->
  <div style="padding: 0px 20px; font-size: 14px;">
    <p>Thank you for signing up for <strong>Audify</strong>! Please verify your email with the code below:</p>
    
    <div style=" margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #165ef0;">{verificationToken}</span>
    </div>
    
    <p>This code expires in 24 hours. If you didn’t sign up, ignore this email.</p>
  </div>

  <!-- Footer -->
  <div style="padding: 20px; font-size: 13px; color: #a9a9a9;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
  
</body>
</html>`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #000; max-width: 480px; margin: 0 auto; padding: 20px; text-align: center;">

  <!-- Logo Section -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://gyiktpapyfjjwgcfuhik.supabase.co/storage/v1/object/public/uidsigns_images/authpack.png" alt="AuthPack Logo" style="max-width: 200px;">
  </div>

  <!-- Header -->
  <div style="padding: 0px 20px; font-size: 14px;">
    <h2>Reset Your Password</h2>
  </div>

  <!-- Main Content -->
  <div style="padding: 0px 20px; font-size: 14px;">
    <p>We received a request to reset your password for your <strong>Audify</strong> account. Click the button below to reset your password:</p>
    
    <!-- Reset Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="display: inline-block; padding: 10px 40px; font-size: 16px; color: #fff; background-color: #165ef0; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </div>
    
    <p>If you didn't request a password reset, please ignore this email. The link will expire in 15 minutes.</p>
  </div>

  <!-- Footer -->
  <div style="padding: 20px; font-size: 13px; color: #a9a9a9;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
  
</body>
</html>
`;
