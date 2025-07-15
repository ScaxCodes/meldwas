import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import type { CreateReportData, ReportCategory, Location } from '../../types';
import { REPORT_CATEGORIES } from '../../utils/dummyData';

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateReportData) => void;
  initialLocation?: Location | null;
}

export const ReportForm = ({ isOpen, onClose, onSubmit, initialLocation }: ReportFormProps) => {
  
  const [formData, setFormData] = useState<CreateReportData>({
    title: '',
    description: '',
    category: 'other',
    location: initialLocation || { lat: 0, lng: 0 },
  });

  const [isLocationSet, setIsLocationSet] = useState<boolean>(!!initialLocation);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update form when initialLocation changes (when user clicks on map)
  useEffect(() => {
    if (initialLocation) {
      setFormData(prev => ({
        ...prev,
        location: initialLocation
      }));
      setIsLocationSet(true);
    } else {
      // Reset location when initialLocation becomes null
      setFormData(prev => ({
        ...prev,
        location: { lat: 0, lng: 0 }
      }));
      setIsLocationSet(false);
    }
  }, [initialLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!isLocationSet) {
      newErrors.location = 'Please click on the map to set a location';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: 'other',
      location: { lat: 0, lng: 0 },
    });
    setIsLocationSet(false);
    setErrors({});
    onClose();
  };

  const handleLocationChange = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [field]: numValue }
      }));
      // Mark location as set if both coordinates are non-zero or one of them is manually set
      setIsLocationSet(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '100%',
          maxWidth: '448px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Create Report</h2>
            <button
              onClick={onClose}
              style={{
                padding: '4px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of the issue"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ReportCategory }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {REPORT_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional details about the issue (optional)"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.lat}
                    onChange={(e) => handleLocationChange('lat', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Latitude"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.lng}
                    onChange={(e) => handleLocationChange('lng', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Longitude"
                  />
                </div>
              </div>
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              <p className={`text-xs mt-1 ${isLocationSet ? 'text-green-600' : 'text-gray-500'}`}>
                {isLocationSet 
                  ? '✓ Location set' 
                  : 'Click on the map to automatically set the location'
                }
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};