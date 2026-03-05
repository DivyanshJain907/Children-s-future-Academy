'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  type: string;
  visible: boolean;
  order: number;
  content: any;
}

interface PageEditorProps {
  password: string;
  onSave: () => void;
}

export default function PageEditor({ password, onSave }: PageEditorProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const toggleVisibility = (id: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update order
    newSections.forEach((section, i) => {
      section.order = i + 1;
    });

    setSections(newSections);
  };

  const updateSectionContent = (id: string, field: string, value: any) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, content: { ...s.content, [field]: value } } : s
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading page configuration...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Home Page Editor</h2>
          <p className="text-gray-600 text-sm mt-1">Customize your home page sections</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            👁️ Preview
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`bg-white border-2 rounded-lg p-6 transition ${
              section.visible ? 'border-gray-200' : 'border-gray-300 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSectionIcon(section.type)}</span>
                <div>
                  <h3 className="font-bold text-lg capitalize">{section.type} Section</h3>
                  <p className="text-sm text-gray-500">Order: {section.order}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Visibility Toggle */}
                <button
                  onClick={() => toggleVisibility(section.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    section.visible ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                  }`}
                  title={section.visible ? 'Hide section' : 'Show section'}
                >
                  {section.visible ? '👁️ Visible' : '🙈 Hidden'}
                </button>

                {/* Move Up */}
                <button
                  onClick={() => moveSection(section.id, 'up')}
                  disabled={index === 0}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  title="Move up"
                >
                  ↑
                </button>

                {/* Move Down */}
                <button
                  onClick={() => moveSection(section.id, 'down')}
                  disabled={index === sections.length - 1}
                  className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  title="Move down"
                >
                  ↓
                </button>

                {/* Edit Toggle */}
                <button
                  onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                  className="px-3 py-1 bg-purple-500 text-white rounded"
                >
                  {editingSection === section.id ? '✓ Done' : '✏️ Edit'}
                </button>
              </div>
            </div>

            {/* Edit Form */}
            {editingSection === section.id && (
              <div className="mt-4 pt-4 border-t space-y-3">
                {renderEditForm(section, updateSectionContent)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <iframe
                src="/"
                className="w-full h-[70vh] border-2 border-gray-300 rounded"
                title="Preview"
              />
            </div>
          </div>
        </div>
      )}
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

function renderEditForm(section: Section, updateContent: (id: string, field: string, value: any) => void) {
  const { id, type, content } = section;

  switch (type) {
    case 'hero':
      return (
        <>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateContent(id, 'title', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Subtitle</label>
            <textarea
              value={content.subtitle || ''}
              onChange={(e) => updateContent(id, 'subtitle', e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Background Image URL</label>
            <input
              type="text"
              value={content.imageUrl || ''}
              onChange={(e) => updateContent(id, 'imageUrl', e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="/hero.png"
            />
          </div>
        </>
      );

    case 'about':
      return (
        <>
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => updateContent(id, 'title', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Subtitle</label>
            <input
              type="text"
              value={content.subtitle || ''}
              onChange={(e) => updateContent(id, 'subtitle', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              value={content.description || ''}
              onChange={(e) => updateContent(id, 'description', e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
        </>
      );

    case 'features':
      return (
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateContent(id, 'title', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-sm text-gray-500 mt-2">Feature items can be managed in a future update</p>
        </div>
      );

    default:
      return (
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateContent(id, 'title', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      );
  }
}
