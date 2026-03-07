import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import InteractiveBentoGallery from '@/components/ui/interactive-bento-gallery';
import { Meteors } from '@/components/ui/meteors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPageConfig() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/page-config?page=home`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching page config:', error);
    return null;
  }
}

async function getNotices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notices`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

async function getGalleryPreview() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/gallery`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data.slice(0, 8) : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Transform gallery images to MediaItem format for bento gallery
function transformToMediaItems(images: any[]) {
  const spanPatterns = [
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
    "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  ];

  const categoryTitles: Record<string, string> = {
    events: 'School Events',
    infrastructure: 'Our Campus',
    activities: 'Student Activities',
    achievements: 'Achievements',
    other: 'School Life',
  };

  const categoryDescriptions: Record<string, string> = {
    events: 'Celebrating special moments',
    infrastructure: 'Modern facilities',
    activities: 'Engaging learning experiences',
    achievements: 'Student accomplishments',
    other: 'Daily life at school',
  };

  return images.map((image: any, index: number) => ({
    id: index + 1,
    type: 'image',
    title: categoryTitles[image.category] || 'School Life',
    desc: categoryDescriptions[image.category] || "Children's Future Academy",
    url: image.imageUrl,
    span: spanPatterns[index % spanPatterns.length],
  }));
}

export default async function Home() {
  const pageConfig = await getPageConfig();
  const notices = await getNotices();
  const galleryImages = await getGalleryPreview();
  const events = await getEvents();

  // Default events if database is empty
  const defaultEvents = [
    {
      _id: 'default-1',
      title: 'Sports Day',
      description: 'Races, relay events, and prizes for winners. Parents welcome to watch!',
      date: 'March 15, 2026',
      icon: '🏃',
      color: 'primary',
    },
    {
      _id: 'default-2',
      title: 'Annual Day Program',
      description: 'Students will perform dance, drama, and songs. Don\'t miss it!',
      date: 'March 25, 2026',
      icon: '🎨',
      color: 'accent',
    },
    {
      _id: 'default-3',
      title: 'Parent-Teacher Meet',
      description: 'Discuss your child\'s progress and exam preparation with teachers.',
      date: 'April 5, 2026',
      icon: '📚',
      color: 'blue',
    },
  ];

  // Use database events if available, otherwise use defaults
  const displayEvents = events.length > 0 ? events : defaultEvents;

  // Get sections from config or use defaults
  const sections = pageConfig?.sections?.filter((s: any) => s.visible).sort((a: any, b: any) => a.order - b.order) || [];
  
  // Helper function to check if a section should be displayed
  const shouldShowSection = (sectionId: string) => {
    if (!pageConfig) return true; // Show all if no config
    const section = sections.find((s: any) => s.id === sectionId);
    return section !== undefined;
  };

  // Helper function to get section content
  const getSectionContent = (sectionId: string, defaultContent: any) => {
    if (!pageConfig) return defaultContent;
    const section = sections.find((s: any) => s.id === sectionId);
    return section?.content || defaultContent;
  };

  const heroContent = getSectionContent('hero', {
    title: "Welcome to Children's Future Academy",
    subtitle: "Nurturing young minds with quality education since 2000 - From Pre-Primary to Class VIII",
    imageUrl: '/hero.png'
  });

  const aboutContent = getSectionContent('about', {
    title: 'Quality Education in Moradabad',
    subtitle: '1679 Students | 44 Teachers | Classes Pre-Primary to VIII',
    description: 'Private Unaided Co-educational School located in Saraswati Vihar, Govind Nagar. Providing comprehensive education with modern facilities and dedicated faculty.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=800&fit=crop'
    ]
  });

  const featuresContent = getSectionContent('features', {
    title: 'Features & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=600&fit=crop',
    items: []
  });

  return (
    <div>
      {/* Hero Section */}
      {shouldShowSection('hero') && (
        <Hero
          title={heroContent.title}
          subtitle={heroContent.subtitle}
          backgroundImage={heroContent.imageUrl}
        />
      )}

      {/* Featured Programs Section / About */}
      {shouldShowSection('about') && (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <img 
                  src={aboutContent.images?.[0] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop'} 
                  alt="Happy Students" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={aboutContent.images?.[1] || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=800&fit=crop'} 
                  alt="Student Learning" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <img 
                  src={aboutContent.images?.[2] || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop'} 
                  alt="Students in Classroom" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={aboutContent.images?.[3] || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=800&fit=crop'} 
                  alt="School Activities" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-block bg-primary text-white px-4 sm:px-6 py-2 rounded-md mb-4 font-semibold text-sm sm:text-base">
                Established 2000
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {aboutContent.title}
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-4 sm:mb-6">
                {aboutContent.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {aboutContent.description}
              </p>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">—</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">31 Well-equipped Classrooms</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">—</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Library & Reading Corner</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">—</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Computer Lab with Digital Learning</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Special attention is paid to monitor progress registered by every child. 
                Concepts are taught by interactive and practical approach. Emphasis is laid 
                on activity based learning so that the children could be induced to discover 
                their inner potential as much as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* About School - Gurukul Pattern */}
      {shouldShowSection('features') && (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=600&fit=crop" 
                alt="Student Studying" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Children's Future Academy - About Our School
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Established in <strong>2000</strong>, Children's Future Academy is located in the heart of 
                Moradabad at Saraswati Vihar, Govind Nagar. We are a recognized Private Unaided Co-educational 
                School. Our school serves urban community with 
                quality education from Pre-Primary to Class VIII.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                With a strength of <strong>1679 students</strong> and a dedicated team of <strong>44 teachers</strong>, 
                we maintain an excellent student-teacher ratio ensuring personalized attention to each child. 
                Our 31 well-equipped classrooms provide a conducive learning environment.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Our Facilities:</strong> We take pride in our modern infrastructure including a well-stocked 
                library, reading corner, book bank, computer lab with 2 desktops, digital learning tools with LED 
                displays and digiboard, proper sanitation with separate facilities for boys and girls, drinking water, 
                and handwash facilities. Special attention is paid to monitor progress of every child through interactive 
                and activity-based learning approaches.
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* About Preview */}
      {shouldShowSection('features') && (
        <WhyChooseUs />
      )}

      {/* Latest Notices */}
      {shouldShowSection('notices') && (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Latest Notices</h2>
            <p className="text-gray-600 text-lg">Stay updated with our latest announcements</p>
            <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {notices.length > 0 ? (
              notices.slice(0, 5).map((notice: any) => (
                <div
                  key={notice._id}
                  className="relative bg-white p-6 rounded-lg shadow-md border-l-4 border-primary hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {notice.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{notice.description}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span>📅</span>
                        {new Date(notice.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="ml-4 bg-accent/10 p-3 rounded-lg">
                      <span className="text-2xl">📢</span>
                    </div>
                  </div>
                  <Meteors number={12} />
                </div>
              ))
            ) : (
              <div className="text-center bg-gray-50 p-12 rounded-lg shadow-md">
                <div className="text-6xl mb-4">📢</div>
                <p className="text-gray-600 text-lg">No notices available at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Please check back later for updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Testimonials Section */}
      {shouldShowSection('testimonials') && (
      <Testimonials />
      )}

      {/* Achievements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Achievements</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Certificate/Achievement Image */}
            <div className="flex justify-center">
              <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl">
                <div className="bg-white p-6 rounded border-4 border-primary">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="text-2xl font-bold text-gray-800">Excellence Award</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p className="text-center italic">
                      This is to certify that students of Excellence School have been 
                      awarded for outstanding performance in academics and co-curricular activities.
                    </p>
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <p className="text-sm text-center">
                        Multiple state and national level awards in Science Olympiad, 
                        Mathematics competitions, and Sports championships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark text-white p-8 rounded-lg shadow-xl">
              <h3 className="text-3xl font-bold mb-6">Feel free to get in touch!</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    placeholder="Class"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className="w-full px-4 py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition"
                >
                  Send us a message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What's Happening at School</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          {displayEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayEvents.map((event: any) => {
                // Color mapping for each event
                const colorMap: Record<string, any> = {
                  primary: {
                    border: 'border-b-primary',
                    shadow: 'shadow-[0_4px_20px_rgba(0,0,0,0.1),0_2px_10px_rgba(13,122,46,0.4)]',
                    gradient: 'from-primary to-secondary',
                    bgGradient: 'from-primary/10',
                  },
                  accent: {
                    border: 'border-b-accent',
                    shadow: 'shadow-[0_4px_20px_rgba(0,0,0,0.1),0_2px_10px_rgba(255,107,53,0.4)]',
                    gradient: 'from-accent to-orange-600',
                    bgGradient: 'from-accent/10',
                  },
                  blue: {
                    border: 'border-b-blue-500',
                    shadow: 'shadow-[0_4px_20px_rgba(0,0,0,0.1),0_2px_10px_rgba(59,130,246,0.4)]',
                    gradient: 'from-blue-500 to-blue-700',
                    bgGradient: 'from-blue-500/10',
                  },
                };

                const colors = colorMap[event.color] || colorMap.primary;

                return (
                  <div
                    key={event._id}
                    className={`group relative bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden border-b-4 ${colors.border} ${colors.shadow}`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bgGradient} to-transparent rounded-bl-full`} />
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mb-4 text-3xl shadow-md`}>
                        {event.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex items-center text-sm text-accent font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg">No upcoming events. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      {shouldShowSection('gallery') && (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {galleryImages.length > 0 ? (
            <>
              <InteractiveBentoGallery
                mediaItems={transformToMediaItems(galleryImages)}
                title="Gallery"
                description="Glimpses of life at Children's Future Academy"
              />
              <div className="text-center mt-8">
                <Link
                  href="/gallery"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition shadow-md hover:shadow-lg"
                >
                  View Full Gallery →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Gallery</h2>
              <p className="text-gray-600 text-lg mb-4">Glimpses of life at Children's Future Academy</p>
              <p className="text-gray-500">No images available yet. Check back soon for amazing photos!</p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl mb-4 border border-white/30">
              <span className="text-2xl">🎓</span>
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              Ready to Join Our School?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Start your journey towards excellence today!
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <h3 className="text-sm font-bold text-white mb-1">Expert Teachers</h3>
                <p className="text-white/80 text-xs">Qualified educators</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition">
                <div className="text-2xl mb-2">🏆</div>
                <h3 className="text-sm font-bold text-white mb-1">Excellence</h3>
                <p className="text-white/80 text-xs">25+ years experience</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition">
                <div className="text-2xl mb-2">🌟</div>
                <h3 className="text-sm font-bold text-white mb-1">Holistic Growth</h3>
                <p className="text-white/80 text-xs">Complete development</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/admissions"
                className="group relative inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>Apply Now</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 34.7C840 32 960 32 1080 37.3C1200 43 1320 53 1380 58.7L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>
    </div>
  );
}
