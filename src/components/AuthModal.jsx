import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthModal({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false); // true=register, false=login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  // LOGIN FUNKTSIOON
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthMessage("Vale email või parool.");
    } else {
      setAuthMessage("Sisselogimine õnnestus!");
      onClose();
    }
  };

  // REGISTER FUNKTSIOON
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setAuthMessage("Registreerimine ebaõnnestus: " + error.message);
    } else {
      // --- SIIA ON TÄHTIS OSA ---
      setAuthMessage("Registreerimine õnnestus! Logi nüüd sisse.");
      setIsRegister(false); // ← VAHETA LOGIN-VORMI PEALE!
      setEmail("");
      setPassword("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRegister ? "Loo konto" : "Logi sisse"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="p-6">
          <div className="space-y-4">
            {/* Auth Message */}
            {authMessage && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm text-center">{authMessage}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                type="email" 
                placeholder="Email" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parool *
              </label>
              <input 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                type="password" 
                placeholder="Parool" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isRegister ? "Registreeru" : "Logi sisse"}
          </button>
        </form>

        {/* Mode Switch */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600">
            {isRegister ? (
              <>
                Oled juba registreeritud?{" "}
                <button 
                  type="button" 
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Logi sisse
                </button>
              </>
            ) : (
              <>
                Pole veel kontot?{" "}
                <button 
                  type="button" 
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Registreeru
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
} 