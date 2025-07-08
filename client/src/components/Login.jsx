import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function Login({ setUser }) {
  const adminEmails = ["admin@gmail.com", "chaitanyabajaj42@gmail.com"];

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const role = adminEmails.includes(decoded.email) ? "admin" : "user";

      setUser({
        username: decoded.name,
        email: decoded.email,
        role
      });

      toast.success(`Welcome ${decoded.name} (${role})`);
    } catch (err) {
      console.error(err);
      toast.error("Login Failed. Please try again.");
    }
  };

  const isLocalhost = window.location.hostname === "localhost";
  const redirectUri = isLocalhost
    ? "http://localhost:5173" // or 3000 if using CRA
    : "https://neighborfit-4bh2bpjam-chaitanya-bajajs-projects.vercel.app";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          Login to NeighborFit
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in with your Google account to continue
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign-In Failed")}
            useOneTap
            ux_mode="popup"
            // optional if you want to explicitly control redirect behavior:
            // redirectUri={redirectUri}
          />
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          Admin access is granted based on verified email.
        </p>
      </div>
    </div>
  );
}
