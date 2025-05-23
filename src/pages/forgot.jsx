import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center  justify-center bg-amber-50 px-4">
      <div className="bg-amber-50 rounded-4xl border-gray shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-[#2D3319] mb-4 text-center">Forgot Password</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#2D3319]">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#2D3319] rounded px-4 py-2 bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2D3319] text-white py-2 rounded hover:bg-[#1e2412] transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-[#2D3319] text-center">
            If this email is registered, a password reset link has been sent.
          </p>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-[#2D3319] underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
