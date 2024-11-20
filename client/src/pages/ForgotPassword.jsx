import { useState } from "react";
import Containar from "../components/containar/Containar";
import forgotPassword from "../assets/ForgotPassword/forgot-password.png";
import api from "../components/axios/Axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // To display success message
  const [error, setError] = useState(null);   // To handle any errors
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgotPassword", { email });
      setMessage("Password reset link sent successfully! Please check your email.");
      setError(null);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e2e7ef] min-h-screen flex items-center">
      <Containar>
        <div className="flex justify-center items-center w-full px-5 md:px-0">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-center">
              <img src={forgotPassword} alt="Forgot Password" className="w-28 md:w-40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-center mt-6 mb-4">
              Forgot Password
            </h2>

            {/* Conditionally render form and text if message is not set */}
            {!message && (
              <>
                <p className="text-center text-sm md:text-base font-medium text-gray-500 mb-6 px-4 md:px-6">
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="w-full mt-6 md:mt-12 pb-10">
                  <div className="mb-4 w-full">
                    <input
                      type="email"
                      className="w-full p-3 bg-slate-100 outline-none rounded-lg mb-5"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full bg-primary text-white p-3 rounded-lg flex items-center justify-center transition duration-200 ${
                      loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.3 5a.7.7 0 01.7-.7h14a.7.7 0 01.7.7v10a.7.7 0 01-.7.7h-14a.7.7 0 01-.7-.7V5zm1 1v8h12V6H3.3zM9.2 8.29a.7.7 0 011 0l3 3a.7.7 0 11-1 1L10 10.41V15a.7.7 0 01-1.4 0v-4.59L7.3 12.3a.7.7 0 11-1-1l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        SEND
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            {/* Display success or error messages */}
            {message && <p className="text-green-600 text-center mt-4">{message}</p>}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default ForgotPassword;
