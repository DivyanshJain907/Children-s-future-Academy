import Link from 'next/link';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';
import Testimonials from '@/components/Testimonials';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNotices() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/notices`, {
      cache: 'no-store',
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gallery`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data.slice(0, 6) : [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export default async function Home() {
  const notices = await getNotices();
  const galleryImages = await getGalleryPreview();

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Welcome to Children's Future Academy"
        subtitle="Nurturing young minds with quality education since 2000 - From Pre-Primary to Class VIII"
        backgroundImage="/hero.png"
      />

      {/* Featured Programs Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop" 
                  alt="Happy Students" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=800&fit=crop" 
                  alt="Student Learning" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop" 
                  alt="Students in Classroom" 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=800&fit=crop" 
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
                Quality Education in Moradabad
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-4 sm:mb-6">
                1679 Students | 44 Teachers | Classes Pre-Primary to VIII
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Private Unaided Co-educational School located in Saraswati Vihar, Govind Nagar. 
                Providing comprehensive education with modern facilities and dedicated faculty.
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

      {/* About School - Gurukul Pattern */}
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

      {/* About Preview */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Why Parents Choose Us</h2>
            <div className="w-20 sm:w-24 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              icon="👨‍🏫"
              title="Experienced Teachers"
              description="Our 44 qualified teachers know each student by name. Small class sizes mean your child gets the attention they need to succeed."
            />
            <Card
              icon="📖"
              title="Complete Education"
              description="From Pre-Primary to Class VIII, we cover everything - academics, sports, computer skills, and personality development all under one roof."
            />
            <Card
              icon="💯"
              title="Proven Track Record"
              description="Serving Moradabad families since 2000. Our students consistently perform well in exams and go on to top high schools."
            />
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition shadow-md hover:shadow-lg font-semibold"
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Notices */}
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
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
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

      {/* Testimonials Section */}
      <Testimonials />

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
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">What's Happening at School</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition">
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-2xl font-bold mb-2">Sports Day</h3>
              <p className="mb-2">Races, relay events, and prizes for winners. Parents welcome to watch!</p>
              <p className="text-sm text-gray-200">March 15, 2026</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-2">Annual Day Program</h3>
              <p className="mb-2">Students will perform dance, drama, and songs. Don't miss it!</p>
              <p className="text-sm text-gray-200">March 25, 2026</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2">Parent-Teacher Meet</h3>
              <p className="mb-2">Discuss your child's progress and exam preparation with teachers.</p>
              <p className="text-sm text-gray-200">April 5, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Gallery</h2>
            <p className="text-gray-600 text-lg">Glimpses of life at Excellence School</p>
            <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.length > 0 ? (
              galleryImages.map((image: any) => (
                <div
                  key={image._id}
                  className="relative overflow-hidden rounded-lg shadow-lg group h-64"
                >
                  <img
                    src={image.imageUrl}
                    alt="Gallery"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end">
                    <p className="text-white p-4 font-semibold">View Image</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 text-center bg-white p-12 rounded-lg shadow-md">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-gray-600 text-lg">No images available yet.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for amazing photos!</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition shadow-md hover:shadow-lg"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our School?</h2>
          <p className="text-xl mb-8">
            Start your journey towards excellence today!
          </p>
          <Link
            href="/admissions"
            className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
