import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import Navbar from "../components/Navbar";

const BusinessDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusiness() {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error("Error fetching business:", error);
        setBusiness(null);
      } else {
        setBusiness(data);
      }
      setLoading(false);
    }
    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laadimine...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ettevõtet ei leitud</h1>
          <p className="text-gray-600 mb-8">See ettevõte ei eksisteeri või on eemaldatud.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tagasi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar openModal={() => {}} setShowAuth={() => {}} />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
              <span>Tagasi</span>
            </button>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                {business.image && (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {business.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {business.category}
                    </span>
                    <span>{business.municipality || business.city}</span>
                  </div>
                  {business.averageRating && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <StarRating 
                          rating={Math.round(business.averageRating)} 
                          readonly 
                          size="small" 
                        />
                        <span className="font-semibold text-gray-900">
                          {business.averageRating}
                        </span>
                        <span className="text-gray-600">
                          ({business.totalReviews || 0} arvustust)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {business.description || "Kirjeldus puudub"}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kontaktandmed
              </h3>
              <div className="space-y-3">
                {business.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{business.address}</span>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a
                      href={`tel:${business.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {business.phone}
                    </a>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a
                      href={`mailto:${business.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center space-x-3">
                    <span className="h-5 w-5 text-gray-400">🌐</span>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Koduleht
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - AUTH PROTECTED */}
      <div className="container mx-auto px-4 py-8">
        {user ? (
          <Reviews business={business} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Hinnangud ja kommentaarid
            </h3>
            <div className="text-gray-600 mb-6">
              <p className="mb-2">🔒 Ainult sisselogitud kasutajad saavad:</p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
                <li>Vaadata ettevõtte hinnanguid</li>
                <li>Jätta oma hinnanguid ja kommentaare</li>
                <li>Lugeda teiste kasutajate arvustusi</li>
              </ul>
            </div>
            <button
              onClick={() => {
                // This could trigger the auth modal
                // For now, just redirect to login
                window.location.href = "/#login";
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Logi sisse hinnangute nägemiseks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDetailPage; 