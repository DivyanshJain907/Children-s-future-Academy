'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // States for admin actions
  const [activeTab, setActiveTab] = useState<'notices' | 'gallery' | 'admissions'>('notices');
  const [notices, setNotices] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  
  // Form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDescription, setNoticeDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageCategory, setImageCategory] = useState('other');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call server-side authentication API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        sessionStorage.setItem('adminPassword', password);
        fetchData();
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchData = async () => {
    const pwd = sessionStorage.getItem('adminPassword');
    
    // Fetch notices
    const noticesRes = await fetch('/api/notices');
    const noticesData = await noticesRes.json();
    if (noticesData.success) setNotices(noticesData.data);

    // Fetch gallery
    const galleryRes = await fetch('/api/gallery');
    const galleryData = await galleryRes.json();
    if (galleryData.success) setGalleryImages(galleryData.data);

    // Fetch admissions
    const admissionsRes = await fetch(`/api/admissions?password=${pwd}`);
    const admissionsData = await admissionsRes.json();
    if (admissionsData.success) setAdmissions(admissionsData.data);
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionMessage('');

    try {
      const pwd = sessionStorage.getItem('adminPassword');
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noticeTitle,
          description: noticeDescription,
          password: pwd,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActionMessage('Notice added successfully!');
        setNoticeTitle('');
        setNoticeDescription('');
        fetchData();
        router.refresh(); // Refresh other pages
      } else {
        setActionMessage('Error: ' + data.error);
      }
    } catch (err) {
      setActionMessage('Failed to add notice');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    try {
      const pwd = sessionStorage.getItem('adminPassword');
      const res = await fetch(`/api/notices/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });

      const data = await res.json();
      if (data.success) {
        setActionMessage('Notice deleted successfully!');
        fetchData();
        router.refresh(); // Refresh other pages
      } else {
        setActionMessage('Error: ' + data.error);
      }
    } catch (err) {
      setActionMessage('Failed to delete notice');
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setActionMessage('Please select an image');
      return;
    }

    setActionLoading(true);
    setActionMessage('');

    try {
      const pwd = sessionStorage.getItem('adminPassword');
      
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('password', pwd || '');

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // Add to gallery
        const galleryRes = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageUrl: uploadData.imageUrl,
            category: imageCategory,
            password: pwd,
          }),
        });

        const galleryData = await galleryRes.json();
        if (galleryData.success) {
          setActionMessage('Image uploaded successfully!');
          setImageFile(null);
          setImageCategory('other');
          fetchData();
          router.refresh(); // Refresh other pages
        } else {
          setActionMessage('Error: ' + galleryData.error);
        }
      } else {
        setActionMessage('Upload failed: ' + uploadData.error);
      }
    } catch (err) {
      setActionMessage('Failed to upload image');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const pwd = sessionStorage.getItem('adminPassword');
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });

      const data = await res.json();
      if (data.success) {
        setActionMessage('Image deleted successfully!');
        fetchData();
        router.refresh(); // Refresh other pages
      } else {
        setActionMessage('Error: ' + data.error);
      }
    } catch (err) {
      setActionMessage('Failed to delete image');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-4 sm:py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 sm:px-4 lg:px-6 py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
            <button
              onClick={() => setActiveTab('notices')}
              className={`py-3 sm:py-4 px-3 sm:px-6 font-semibold transition border-b-4 text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'notices'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Notices
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-3 sm:py-4 px-3 sm:px-6 font-semibold transition border-b-4 text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('admissions')}
              className={`py-3 sm:py-4 px-3 sm:px-6 font-semibold transition border-b-4 text-sm sm:text-base whitespace-nowrap ${
                activeTab === 'admissions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Admissions ({admissions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {actionMessage && (
          <div className={`mb-6 px-4 py-3 rounded text-sm sm:text-base ${
            actionMessage.includes('Error') || actionMessage.includes('Failed')
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            {actionMessage}
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Notice Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Add New Notice</h2>
              <form onSubmit={handleAddNotice} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={noticeDescription}
                    onChange={(e) => setNoticeDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {actionLoading ? 'Adding...' : 'Add Notice'}
                </button>
              </form>
            </div>

            {/* Notices List */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">All Notices ({notices.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {notices.map((notice) => (
                  <div key={notice._id} className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1">{notice.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{notice.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {new Date(notice.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDeleteNotice(notice._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Image Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Upload New Image</h2>
              <form onSubmit={handleUploadImage} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select
                    value={imageCategory}
                    onChange={(e) => setImageCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="events">Events</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="activities">Activities</option>
                    <option value="achievements">Achievements</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {actionLoading ? 'Uploading...' : 'Upload Image'}
                </button>
              </form>
            </div>

            {/* Gallery Images */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">All Images ({galleryImages.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
                {galleryImages.map((image) => (
                  <div key={image._id} className="relative group">
                    <img
                      src={image.imageUrl}
                      alt="Gallery"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition flex items-center justify-center rounded-lg">
                      <button
                        onClick={() => handleDeleteImage(image._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{image.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Admissions Tab */}
        {activeTab === 'admissions' && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Admission Applications ({admissions.length})</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Student Name</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Parent Name</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Class</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Email</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Phone</th>
                      <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {admissions.map((admission) => (
                      <tr key={admission._id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">{admission.studentName}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">{admission.parentName}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">{admission.classApplied}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">{admission.email}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">{admission.phone}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm whitespace-nowrap">
                          {new Date(admission.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
