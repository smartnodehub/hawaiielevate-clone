import React, { useState } from 'react';
import StarRating from './StarRating';
import { Camera, X, Upload } from 'lucide-react';

const CATEGORY_CRITERIA = {
  'Ravintolat ja kahvilat': {
    food_quality: 'Toidu kvaliteet',
    service: 'Teenindus',
    atmosphere: 'Atmosfäär',
    value_for_money: 'Hinna-kvaliteedi suhe',
    cleanliness: 'Puhtus'
  },
  'Hotellit ja majoitus': {
    room_quality: 'Toa kvaliteet',
    cleanliness: 'Puhtus',
    location: 'Asukoht',
    staff_service: 'Personal',
    amenities: 'Mugavused',
    value_for_money: 'Hinna-kvaliteedi suhe'
  },
  'Kauneuspalvelut': {
    professionalism: 'Professionaalsus',
    skill_level: 'Oskuste tase',
    cleanliness: 'Puhtus ja hügieen',
    atmosphere: 'Atmosfäär',
    value_for_money: 'Hinna-kvaliteedi suhe',
    booking_ease: 'Broneerimise lihtsus'
  }
};

const SERVICE_TYPES = {
  'Ravintolat ja kahvilat': [
    { value: 'dine_in', label: 'Kohapeal söömine' },
    { value: 'takeaway', label: 'Kaasa võtmine' },
    { value: 'delivery', label: 'Kojutoominen' }
  ],
  'Hotellit ja majoitus': [
    { value: 'overnight', label: 'Ööbimine' },
    { value: 'event', label: 'Üritus' },
    { value: 'meeting', label: 'Koosolek' }
  ],
  'default': [
    { value: 'service_visit', label: 'Teenuse kasutamine' },
    { value: 'consultation', label: 'Konsultatsioon' },
    { value: 'purchase', label: 'Ostmine' }
  ]
};

const ReviewForm = ({ business, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    visitDate: '',
    serviceType: '',
    recommended: true,
    categoryRatings: {}
  });
  
  const [photos, setPhotos] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const criteria = CATEGORY_CRITERIA[business.category] || {};
  const serviceTypes = SERVICE_TYPES[business.category] || SERVICE_TYPES.default;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCategoryRating = (criterion, rating) => {
    setFormData(prev => ({
      ...prev,
      categoryRatings: {
        ...prev.categoryRatings,
        [criterion]: rating
      }
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    addPhotos(files);
  };

  const addPhotos = (files) => {
    const newPhotos = files.slice(0, 5 - photos.length).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      caption: ''
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => {
      const updatedPhotos = prev.filter(photo => photo.id !== photoId);
      // Clean up object URL
      const removedPhoto = prev.find(photo => photo.id === photoId);
      if (removedPhoto) {
        URL.revokeObjectURL(removedPhoto.url);
      }
      return updatedPhotos;
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    addPhotos(files);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rating) {
      newErrors.rating = 'Palun anna hinne';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Palun lisa pealkiri';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Pealkiri peab olema vähemalt 5 tähemärki';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Palun kirjuta arvustus';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Arvustus peab olema vähemalt 10 tähemärki';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const reviewData = {
        ...formData,
        businessId: business.id,
        photos: photos.map(photo => ({
          file: photo.file,
          caption: photo.caption
        }))
      };
      
      await onSubmit(reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Arvusta yritykst</h2>
          <h3 className="text-lg opacity-90">{business.name}</h3>
          <p className="text-sm opacity-75">{business.category} • {business.municipality}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-lg font-semibold mb-3">
              Üldine hinne *
            </label>
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => handleInputChange('rating', rating)}
              size="large"
              showLabel={true}
              showDescription={true}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Category-specific ratings */}
          {Object.keys(criteria).length > 0 && (
            <div>
              <label className="block text-lg font-semibold mb-3">
                Detailsed hinnangud
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(criteria).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{label}</span>
                    <StarRating
                      rating={formData.categoryRatings[key] || 0}
                      onRatingChange={(rating) => handleCategoryRating(key, rating)}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Arvustuse pealkiri *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Kokkuvõte su kogemusest..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.title.length}/100
              </p>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Detailne arvustus *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Kirjelda oma kogemust detailsemalt..."
              rows={5}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength={2000}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.content.length}/2000
              </p>
            </div>
          </div>

          {/* Visit Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Külastuse kuupäev
              </label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => handleInputChange('visitDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Teenuse tüüp
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Vali...</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Fotod (valikuline)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Lohista fotod siia või kliki üleslaadimiseks
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
                disabled={photos.length >= 5}
              />
              <label
                htmlFor="photo-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Vali fotod
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Kuni 5 fotot, maksimaalne suurus 5MB
              </p>
            </div>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map(photo => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.url}
                      alt="Upload preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommendation */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="recommended"
              checked={formData.recommended}
              onChange={(e) => handleInputChange('recommended', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="recommended" className="text-sm font-medium text-gray-700">
              Soovitan seda yritykst teistele
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Tühista
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {isSubmitting ? 'Avaldamine...' : 'Avalda arvustus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm; 