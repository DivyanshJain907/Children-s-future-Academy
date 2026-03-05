'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  type: string;
  visible: boolean;
  order: number;
  content: any;
}

interface VisualPageEditorProps {
  password: string;
  onSave: () => void;
}

export default function VisualPageEditor({ password, onSave }: VisualPageEditorProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPageConfig();
  }, []);

  const fetchPageConfig = async () => {
    try {
      const res = await fetch('/api/page-config?page=home');
      const data = await res.json();
      if (data.success) {
        setSections(data.data.sections || []);
      }
    } catch (error) {
      console.error('Error fetching page config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/page-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageName: 'home',
          sections,
          password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✓ Page updated successfully!');
        onSave();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('✗ Error: ' + data.error);
      }
    } catch (err) {
      setMessage('✗ Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedSection);

    // Update order
    const updated = newSections.map((s, i) => ({ ...s, order: i + 1 }));
    setSections(updated);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const toggleVisibility = (id: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
  };

  const updateContent = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => 
      s.id === sectionId ? { ...s, content: { ...s.content, [field]: value } } : s
    ));
  };

  const handleImageUpload = async (sectionId: string, field: string, file: File) => {
    setUploadingImage(`${sectionId}-${field}`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // Check if field is an image index (image0, image1, etc.)
        if (field.startsWith('image') && field.length > 5 && !isNaN(Number(field.slice(5)))) {
          const index = Number(field.slice(5));
          setSections(prev => prev.map(s => {
            if (s.id === sectionId) {
              const newImages = [...(s.content.images || [])];
              newImages[index] = uploadData.imageUrl;
              return { ...s, content: { ...s.content, images: newImages } };
            }
            return s;
          }));
        } else {
          // Regular field update
          updateContent(sectionId, field, uploadData.imageUrl);
        }
        setMessage('✓ Image uploaded successfully!');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage('✗ Upload failed: ' + uploadData.error);
      }
    } catch (err) {
      setMessage('✗ Failed to upload image');
    } finally {
      setUploadingImage(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Save Button & Messages */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-end items-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition font-semibold shadow-lg"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Visual Preview with Drag & Drop */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all cursor-move ${
              draggedIndex === index ? 'opacity-50 scale-95' : 'hover:shadow-2xl'
            } ${!section.visible ? 'opacity-60 bg-gray-100' : ''}`}
          >
            {/* Section Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="cursor-grab active:cursor-grabbing hover:bg-white/20 p-2 rounded">
                  <span className="text-2xl">⋮⋮</span>
                </div>
                <span className="text-3xl">{getSectionIcon(section.type)}</span>
                <div>
                  <h3 className="font-bold text-xl capitalize">{section.type} Section</h3>
                  <p className="text-sm opacity-90">Position: {index + 1} of {sections.length}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => toggleVisibility(section.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    section.visible 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                  title={section.visible ? 'Hide section' : 'Show section'}
                >
                  {section.visible ? '👁️ Visible' : '🙈 Hidden'}
                </button>
              </div>
            </div>

            {/* Section Preview */}
            {section.visible && (
              <div className="p-6">
                {renderSectionPreview(section, updateContent, handleImageUpload, uploadingImage)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Save Button */}
      <div className="sticky bottom-0 bg-white rounded-lg shadow-lg p-4 border-t-4 border-primary">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {sections.filter(s => s.visible).length} sections visible • {sections.filter(s => !s.visible).length} hidden
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition font-semibold text-lg shadow-lg"
          >
            {saving ? 'Saving...' : '💾 Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

function getSectionIcon(type: string): string {
  const icons: { [key: string]: string } = {
    hero: '🎯',
    about: 'ℹ️',
    features: '⭐',
    notices: '📢',
    gallery: '🖼️',
    testimonials: '💬',
  };
  return icons[type] || '📄';
}

function renderSectionPreview(
  section: Section,
  updateContent: (id: string, field: string, value: any) => void,
  handleImageUpload: (id: string, field: string, file: File) => void,
  uploadingImage: string | null
) {
  const { id, type, content } = section;

  switch (type) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div className="relative">
            {content.imageUrl && (
              <div className="relative group">
                <img 
                  src={content.imageUrl} 
                  alt="Hero background"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer flex items-center justify-center">
                  <span className="text-white font-semibold bg-primary px-4 py-2 rounded-lg">
                    📸 Change Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(id, 'imageUrl', file);
                    }}
                  />
                </label>
                {uploadingImage === id && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-white">Uploading...</div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <EditableField
            label="Title"
            value={content.title || ''}
            onChange={(val) => updateContent(id, 'title', val)}
            multiline={false}
          />
          
          <EditableField
            label="Subtitle"
            value={content.subtitle || ''}
            onChange={(val) => updateContent(id, 'subtitle', val)}
            multiline={true}
          />
        </div>
      );

    case 'about':
      return (
        <div className="space-y-6">
          {/* About Images Grid */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Gallery Images (4 Images)
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative group">
                  <img
                    src={content.images?.[index] || `https://via.placeholder.com/400x400?text=Image+${index + 1}`}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition cursor-pointer flex items-center justify-center rounded-lg">
                    <span className="text-white font-semibold bg-primary px-3 py-2 rounded-lg text-sm">
                      📸 Change Image {index + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(id, `image${index}`, file);
                        }
                      }}
                    />
                  </label>
                  {uploadingImage === `${id}-image${index}` && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                      <div className="text-white text-sm">Uploading...</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <EditableField
            label="Title"
            value={content.title || ''}
            onChange={(val) => updateContent(id, 'title', val)}
          />
          
          <EditableField
            label="Subtitle"
            value={content.subtitle || ''}
            onChange={(val) => updateContent(id, 'subtitle', val)}
          />
          
          <EditableField
            label="Description"
            value={content.description || ''}
            onChange={(val) => updateContent(id, 'description', val)}
            multiline={true}
          />
        </div>
      );

    case 'features':
    case 'notices':
    case 'gallery':
    case 'testimonials':
      return (
        <div className="space-y-4">
          <EditableField
            label="Section Title"
            value={content.title || ''}
            onChange={(val) => updateContent(id, 'title', val)}
          />
          <p className="text-sm text-gray-500 italic">
            {type === 'notices' && 'Notices are managed in the Notices tab'}
            {type === 'gallery' && 'Gallery images are managed in the Gallery tab'}
            {type === 'testimonials' && 'Testimonials content is fixed'}
            {type === 'features' && 'Features content can be customized'}
          </p>
        </div>
      );

    default:
      return <p className="text-gray-500">Preview not available for this section type</p>;
  }
}

function EditableField({ 
  label, 
  value, 
  onChange, 
  multiline = false 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition text-lg"
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition text-lg"
        />
      )}
    </div>
  );
}
