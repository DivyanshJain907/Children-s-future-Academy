import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Gallery - Excellence School',
  description: 'View photos and memories from Excellence School events, activities, and daily life.',
};

async function getGallery() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/gallery`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGallery();

  // Group images by category
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

  return (
    <div>
      <Hero
        title="Gallery"
        subtitle="Capturing moments, creating memories"
      />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl sm:text-6xl mb-4">📷</div>
              <p className="text-gray-600 text-lg sm:text-xl">No images available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {categories.map((category) => {
                const categoryImages = groupedImages[category.key] || [];
                if (categoryImages.length === 0) return null;

                return (
                  <div key={category.key} className="mb-12 sm:mb-16">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <span className="text-3xl sm:text-4xl mr-2 sm:mr-3">{category.icon}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{category.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {categoryImages.map((image: any) => (
                        <div
                          key={image._id}
                          className="relative overflow-hidden rounded-lg shadow-lg group h-64 bg-gray-200"
                        >
                          <img
                            src={image.imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                            <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                              {new Date(image.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

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
