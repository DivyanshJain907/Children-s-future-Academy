'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface GalleryImage {
  _id: string;
  imageUrl: string;
  category: string;
  uploadedAt: string;
}

interface MediaItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

// Define bento grid span patterns for dynamic layouts
const spanPatterns = [
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
];

// Category titles for gallery images
const categoryTitles: Record<string, string> = {
  events: 'School Events',
  infrastructure: 'Our Campus',
  activities: 'Student Activities',
  achievements: 'Achievements',
  other: 'School Life',
};

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  events: 'Celebrating special moments and events',
  infrastructure: 'Modern facilities and learning spaces',
  activities: 'Engaging activities and creative learning',
  achievements: 'Student accomplishments and milestones',
  other: 'Daily life at Children\'s Future Academy',
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery', {
          cache: 'no-store',
        });
        
        if (res.ok) {
          const data = await res.json();
          setImages(data.success ? data.data : []);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  // Transform API images to MediaItem format
  const transformImagesToMediaItems = (images: GalleryImage[]): MediaItem[] => {
    return images.map((image, index) => ({
      id: index + 1,
      type: 'image',
      title: categoryTitles[image.category] || 'School Life',
      desc: categoryDescriptions[image.category] || 'Children\'s Future Academy',
      url: image.imageUrl,
      span: spanPatterns[index % spanPatterns.length],
    }));
  };

  // Group images by category for fallback display
  const groupedImages = images.reduce((acc: any, image: any) => {
    const category = image.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(image);
    return acc;
  }, {});

  const categories = [
    { key: 'events', title: 'Events & Celebrations', icon: '🎉' },
    { key: 'infrastructure', title: 'Infrastructure', icon: '🏫' },
    { key: 'activities', title: 'Activities', icon: '🎨' },
    { key: 'achievements', title: 'Achievements', icon: '🏆' },
    { key: 'other', title: 'Other', icon: '📸' },
  ];

  const mediaItems = transformImagesToMediaItems(images);

  return (
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 text-slate-300 text-center text-lg md:text-xl max-w-2xl"
        >
          Capturing moments, creating memories at Children&apos;s Future Academy
        </motion.p>
      </LampContainer>

      {loading ? (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading gallery...</p>
            </div>
          </div>
        </section>
      ) : images.length === 0 ? (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="text-4xl sm:text-6xl mb-4">📷</div>
              <p className="text-gray-600 text-lg sm:text-xl">No images available yet. Check back soon!</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-8">
          <InteractiveBentoGallery
            mediaItems={mediaItems}
            title="School Gallery"
            description="Explore our vibrant school community through photos. Drag to reorder!"
          />
        </section>
      )}

      {/* Gallery Stats */}
      {images.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Gallery Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">{images.length}</div>
                <p className="text-lg">Total Images</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {groupedImages.events?.length || 0}
                </div>
                <p className="text-lg">Events</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {groupedImages.activities?.length || 0}
                </div>
                <p className="text-lg">Activities</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {groupedImages.achievements?.length || 0}
                </div>
                <p className="text-lg">Achievements</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
