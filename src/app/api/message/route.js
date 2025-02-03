import nodemailer from 'nodemailer';

// Function to generate a 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Store OTP temporarily in memory (you can replace this with a Redis database or other solution)
let otpStorage = {}; // Use a more persistent store in production

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400 }
      );
    }

    // Simple email format validation (for demonstration purposes)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400 }
      );
    }

    // Generate a 4-digit OTP
    const otp = generateOtp();

    // Store OTP in memory with expiration time (e.g., 10 minutes)
    otpStorage[email] = { otp, timestamp: Date.now() };

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: "maliksuffyan550@gmail.com", // Email address to send from
        pass: "pcoe ouqd lina drjt", // App password or password
      },
    });

    // Define the email content
    const mailOptions = {
      from: 'No Broker', // Your email address
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #e0f7fa; padding: 20px; min-height: 100vh;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); border-top: 5px solid #4e73df;">
            <h2 style="text-align: center; color: #4e73df; font-size: 28px; font-weight: bold;">Your OTP Code</h2>
            <p style="font-size: 16px; color: #555555; line-height: 1.6; text-align: center;">Hello,</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.6;">We received a request to send you a One-Time Password (OTP) for verification. Please use the OTP below to complete your request:</p>
            <div style="background-color: #4e73df; color: #ffffff; font-size: 28px; padding: 20px; text-align: center; border-radius: 8px; margin-top: 25px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-weight: bold;">
              <strong>${otp}</strong>
            </div>
            <p style="font-size: 16px; color: #555555; margin-top: 20px; text-align: center;">If you did not request this OTP, please ignore this email. Your OTP is valid for 10 minutes.</p>
            <footer style="margin-top: 40px; text-align: center; font-size: 14px; color: #777777; line-height: 1.5;">
              <p>Thank you for using our service!</p>
              <p><small>If you have any questions, feel free to <a style="color: #4e73df; text-decoration: none;">contact us</a>.</small></p>
            </footer>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    return new Response(
      JSON.stringify({ message: 'OTP sent successfully!', otp }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending OTP:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send OTP' }),
      { status: 500 }
    );
  }
}
