import React, { useState } from "react"; // Import eye icons from react-icons
import { useParams, useNavigate } from "react-router-dom";
import { RxEyeClosed, RxEyeNone, RxEyeOpen } from "react-icons/rx";
import api from "../components/axios/Axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/auth/authSlices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(token)

  // Function to check if passwords match
  const passwordsMatch = password === confirmPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.patch(`/auth/resetPassword/${token}`, {
        password,
        confirmPassword,
      });
      // Store token in Redux state
      dispatch(
        setUser({ token: response.data.token, user: response.data.data.user })
      );

      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response.data.data);
      navigate("/login"); // Redirect to login after successful reset
    } catch (err) {
      setError(err.response.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                password === "" ? "border-black" : ""
              }`}
              placeholder="Enter your new password"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RxEyeOpen /> : <RxEyeNone />}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                confirmPassword === ""
                  ? "border-black"
                  : passwordsMatch
                  ? "border-green-500"
                  : "border-red-500"
              }`}
              placeholder="Confirm your new password"
            />
            <div
              className="absolute right-3 top-10 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <RxEyeOpen /> : <RxEyeNone />}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white ${
                passwordsMatch
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-primary hover:bg-green-600"
              } rounded-lg focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
