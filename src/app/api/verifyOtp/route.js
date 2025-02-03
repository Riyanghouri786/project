// Store OTP temporarily in memory (you can replace this with a Redis database or other solution)
let otpStorage = {}; // Use a more persistent store in production

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: 'Email and OTP are required' }),
        { status: 400 }
      );
    }

    // Check if OTP matches and if it hasn't expired (e.g., 10 minutes)
    const storedOtpData = otpStorage[email];

    if (!storedOtpData || storedOtpData.otp !== otp) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP' }),
        { status: 400 }
      );
    }

    // Check if OTP is expired (e.g., 10 minutes expiration)
    const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    if (Date.now() - storedOtpData.timestamp > expirationTime) {
      return new Response(
        JSON.stringify({ error: 'OTP has expired' }),
        { status: 400 }
      );
    }

    // OTP is valid and not expired, proceed with user registration or any other operation
    return new Response(
      JSON.stringify({ message: 'OTP verified, user registration successful!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to verify OTP' }),
      { status: 500 }
    );
  }
}
