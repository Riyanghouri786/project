"use client";

import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Flag to track if OTP has been sent
  const [storedOtp, setStoredOtp] = useState(""); // Store OTP temporarily
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   

  useEffect(() => {
  
  }, [storedOtp, otpSent]); // This will run when storedOtp or otpSent changes
  


  const handleSendOtp = async () => {
    toast.loading("Sending OTP...");
    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const data = await res.json();
      toast.dismiss();
  
      if (res.ok) {
        setOtpSent(true);
        setStoredOtp(data.otp); // Store OTP temporarily

        if (data.opt !== otp) {
          toast.success("Code Send");
          return;
        }
          console.log(otpSent);
          
        // Log the updated state values using useEffect or after state change
        console.log("OTP sent:", data.otp);
        
        // Logs after state change
        setTimeout(() => {
          console.log("Stored OTP:", storedOtp); // It will now log the updated OTP
          console.log("otpSent:", otpSent); // Will be true
        }, 100);
  
        // toast.success("OTP sent to your email");
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Server error");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password is too short
    if (formData.password.length < 6) {
      toast.error("Please enter a 6-digit password");
      return; // Stop form submission if password is too short
    }

    // Validate OTP
   

    toast.loading("Registering...");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast.dismiss();
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("User registered successfully!");
      router.push("/login");
    } catch (err) {
      toast.dismiss();
      toast.error("Server error. Please try again later.");
    }
  };

  const handleVerifyOtp = (e) => {
    setOtp(e.target.value); // Handle OTP input change
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://www.zillowstatic.com/bedrock/app/uploads/sites/47/GA_ATL_PITTSBURGH_82772_161_RT-2_RT-5f7457-1440x960.jpg')" }}
    >
      {/* Overlay for background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Toaster />

      <motion.div
        className="relative flex w-full max-w-4xl mx-3 bg-white shadow-lg rounded-2xl z-10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-1/2 p-8 bg-blue-100 hidden md:flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Why Create an Account?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Access exclusive property listings</li>
            <li>Save your favorite properties</li>
            <li>Receive personalized recommendations</li>
            <li>Track your buying and selling activities</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {otpSent && (
            <div className="mb-4">
              <label className="block text-sm font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={handleVerifyOtp} // Correctly bind OTP input change here
                className="w-full px-4 py-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          {!otpSent ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleSendOtp}
              className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Send OTP
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Verify OTP and Register
            </motion.button>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}



















