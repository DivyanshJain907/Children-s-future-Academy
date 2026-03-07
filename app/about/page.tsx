'use client';

import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';

export default function AboutPage() {
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
          About Children&apos;s Future Academy
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
          Providing Quality Education in Moradabad since 2000
        </motion.p>
      </LampContainer>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To nurture future leaders by providing quality education that develops academic 
                excellence, moral values, and life skills. We envision creating responsible citizens 
                who contribute positively to society and make meaningful impact in their communities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide comprehensive education from Pre-Primary to Class VIII in a safe, 
                supportive environment. We are committed to fostering academic excellence, 
                character development, and holistic growth through modern teaching methods 
                and individual attention to each student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School Statistics */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Strength in Numbers" />
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 rounded-lg text-white text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">1679</div>
                <div className="text-xs sm:text-sm">Total Students</div>
              </div>
              <div className="bg-gradient-to-br from-accent to-orange-600 p-4 sm:p-6 rounded-lg text-white text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">44</div>
                <div className="text-xs sm:text-sm">Dedicated Teachers</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 rounded-lg text-white text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">31</div>
                <div className="text-xs sm:text-sm">Classrooms</div>
              </div>
              <div className="bg-gradient-to-br from-accent to-orange-600 p-4 sm:p-6 rounded-lg text-white text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">2000</div>
                <div className="text-xs sm:text-sm">Established Year</div>
              </div>
            </div>

            {/* Enrollment Details */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Class-wise Enrollment</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[300px]">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-sm sm:text-base">Class</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-sm sm:text-base">Number of Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Pre-Primary</td>
                      <td className="px-4 py-3 text-right font-semibold">521</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class I</td>
                      <td className="px-4 py-3 text-right font-semibold">193</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class II</td>
                      <td className="px-4 py-3 text-right font-semibold">200</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class III</td>
                      <td className="px-4 py-3 text-right font-semibold">193</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class IV</td>
                      <td className="px-4 py-3 text-right font-semibold">150</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class V</td>
                      <td className="px-4 py-3 text-right font-semibold">149</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class VI</td>
                      <td className="px-4 py-3 text-right font-semibold">123</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class VII</td>
                      <td className="px-4 py-3 text-right font-semibold">89</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">Class VIII</td>
                      <td className="px-4 py-3 text-right font-semibold">61</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-right text-primary">1679</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="School Profile" />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Year of Establishment</h3>
              <p className="text-gray-600">2000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">School Type</h3>
              <p className="text-gray-600">Co-educational</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Management</h3>
              <p className="text-gray-600">Private Unaided (Recognized)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">Urban - Moradabad, Uttar Pradesh</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Classes Offered</h3>
              <p className="text-gray-600">Pre-Primary to Class VIII</p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Infrastructure & Facilities"
            subtitle="Modern facilities for comprehensive development"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card
              icon="🏫"
              title="31 Classrooms"
              description="Well-ventilated and spacious classrooms providing conducive learning environment for all students."
            />
            <Card
              icon="📚"
              title="Library & Reading Corner"
              description="Well-stocked library with diverse collection of books and a dedicated reading corner for students."
            />
            <Card
              icon="💻"
              title="Computer Lab"
              description="Computer lab equipped with 2 desktops, LED displays, and digiboard for digital learning."
            />
            <Card
              icon="🚰"
              title="Clean Water & Sanitation"
              description="Drinking water availability with 10 boys toilets and 10 girls toilets, plus handwash facilities."
            />
            <Card
              icon="📖"
              title="Book Bank"
              description="Book bank facility to support students with textbooks and reference materials."
            />
            <Card
              icon="⚡"
              title="Power Backup"
              description="Functional generator ensuring uninterrupted learning even during power outages."
            />
            <Card
              icon="🖨️"
              title="Digital Equipment"
              description="Scanner, 2 printers, and 2 LED displays for modern teaching and administration."
            />
            <Card
              icon="📺"
              title="DTH Facility"
              description="DTH connectivity with 40 channels for educational content and awareness programs."
            />
            <Card
              icon="🏢"
              title="Additional Rooms"
              description="9 other rooms including staff rooms, activity rooms, and administrative offices."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose Children's Future Academy?" />
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Experienced Faculty</h3>
                  <p className="text-gray-600">44 dedicated and qualified teachers committed to student success.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Good Student-Teacher Ratio</h3>
                  <p className="text-gray-600">Excellent ratio ensuring personalized attention to each student.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Holistic Development</h3>
                  <p className="text-gray-600">Focus on academics, activities, and character building for overall growth.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Urban Location</h3>
                  <p className="text-gray-600">Conveniently located in Govind Nagar, easily accessible to families.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Modern Facilities</h3>
                  <p className="text-gray-600">Library, computer lab, digital learning tools, and proper sanitation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Recognized Institution</h3>
                  <p className="text-gray-600">Officially recognized Private Unaided school.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
