import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
      <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl space-y-8 w-full max-w-sm animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          NeighborFit
        </h2>
        <p className="text-center text-gray-600">
          Sign in with your Google account to continue
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Sign-In Failed")}
            size="large"
            shape="pill"
            theme="outline"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
          <FcGoogle size={16} />
          <span>Admin access is granted based on verified email.</span>
        </div>
      </div>
    </div>
  );
}
