import { useState, useEffect } from "react";
import PreferencesForm from "./components/PreferencesForm";
import NeighborhoodList from "./components/NeighborhoodList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddNeighborhoodForm from "./components/AddNeighborhoodForm";
import NeighborhoodListPage from "./components/NeighborhoodListPage";
import NeighborhoodDetails from "./components/NeighborhoodDetails";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState(null);

  const clientId = "997943266020-f0v7uph48gno2nlc42od74ko3toc7jdi.apps.googleusercontent.com";

  useEffect(() => {
    const storedUser = localStorage.getItem("neighborfit-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    localStorage.setItem("neighborfit-user", JSON.stringify(userData));
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ToastContainer position="top-right" autoClose={3000} />

      {!user ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
          <Login setUser={handleSetUser} />
        </div>
      ) : (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col">
            <Navbar user={user} />

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home />
                      <div className="mt-10 bg-white/30 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-6 justify-center">
                          <PreferencesForm setMatches={setMatches} />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <NeighborhoodList matches={matches} />
                        </div>
                      </div>
                    </>
                  }
                />

                {user.role === "admin" && (
                  <>
                    <Route path="/add" element={<AddNeighborhoodForm />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
                  </>
                )}

                <Route path="/neighborhoods" element={<NeighborhoodListPage user={user} />} />
                <Route path="/neighborhoods/:id" element={<NeighborhoodDetails />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </Router>
      )}
    </GoogleOAuthProvider>
  );
}
