'use client';

import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import SectionTitle from '@/components/SectionTitle';
import Card from '@/components/Card';

export default function AcademicsPage() {
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
          Academics
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
          Comprehensive curriculum from Pre-Primary to Class VIII
        </motion.p>
      </LampContainer>

      {/* Classes Offered */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Classes Offered"
            subtitle="Quality education at every level"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Pre-Primary</h3>
              <p className="text-gray-600 mb-4">521 Students</p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Play-based learning</li>
                <li>• Motor skills development</li>
                <li>• Basic literacy and numeracy</li>
                <li>• Social interaction skills</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">🎒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Primary Section</h3>
              <p className="text-gray-600 mb-4">Classes I to V</p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Strong foundation in core subjects</li>
                <li>• Activity-based learning</li>
                <li>• Focus on reading and writing</li>
                <li>• Creative arts and crafts</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Upper Primary</h3>
              <p className="text-gray-600 mb-4">Classes VI to VIII</p>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Comprehensive curriculum</li>
                <li>• Introduction to sciences</li>
                <li>• Language development</li>
                <li>• Co-curricular activities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Labs and Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Labs & Facilities"
            subtitle="Learn by doing with our state-of-the-art facilities"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">⚗️</div>
              <h3 className="text-2xl font-bold mb-3">Chemistry Lab</h3>
              <p>Fully equipped lab with safety equipment for practical experiments and demonstrations.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold mb-3">Physics Lab</h3>
              <p>Modern instruments for mechanics, optics, electricity, and magnetism experiments.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🧬</div>
              <h3 className="text-2xl font-bold mb-3">Biology Lab</h3>
              <p>Microscopes, specimens, and models for botany, zoology, and human anatomy studies.</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-3">Computer Lab</h3>
              <p>Latest computers with programming software, graphics tools, and high-speed internet.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3">Library</h3>
              <p>10,000+ books, e-library, reference section, and comfortable reading spaces.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold mb-3">Music & Arts</h3>
              <p>Dedicated rooms for music, dance, and fine arts with professional guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-curricular Activities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Co-curricular Activities"
            subtitle="Beyond academics - developing well-rounded individuals"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">⚽</div>
              <h4 className="font-bold text-gray-800">Sports</h4>
              <p className="text-sm text-gray-600">Football, Basketball, Cricket</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎭</div>
              <h4 className="font-bold text-gray-800">Drama</h4>
              <p className="text-sm text-gray-600">Theater & Acting</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-gray-800">Arts</h4>
              <p className="text-sm text-gray-600">Painting & Crafts</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🎵</div>
              <h4 className="font-bold text-gray-800">Music</h4>
              <p className="text-sm text-gray-600">Vocal & Instrumental</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">💃</div>
              <h4 className="font-bold text-gray-800">Dance</h4>
              <p className="text-sm text-gray-600">Classical & Contemporary</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🗣️</div>
              <h4 className="font-bold text-gray-800">Debate</h4>
              <p className="text-sm text-gray-600">Public Speaking</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-bold text-gray-800">Robotics</h4>
              <p className="text-sm text-gray-600">STEM Club</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">📰</div>
              <h4 className="font-bold text-gray-800">Journalism</h4>
              <p className="text-sm text-gray-600">School Magazine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Academic Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold mb-2">1679</div>
              <p className="text-xl">Total Students</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">44</div>
              <p className="text-xl">Dedicated Teachers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24+</div>
              <p className="text-xl">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
