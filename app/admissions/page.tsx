'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';
import SectionTitle from '@/components/SectionTitle';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    classApplied: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          studentName: '',
          parentName: '',
          phone: '',
          email: '',
          classApplied: '',
          message: '',
        });
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          Admissions
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
          Join our family and begin your journey to excellence
        </motion.p>
      </LampContainer>

      {/* Admission Process */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Admission Process"
            subtitle="Simple steps to enroll your child"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Fill Application</h3>
              <p className="text-sm sm:text-base text-gray-600">Complete the online application form below</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Document Verification</h3>
              <p className="text-sm sm:text-base text-gray-600">Submit required documents for verification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Interaction</h3>
              <p className="text-sm sm:text-base text-gray-600">Meet with our admission counselor</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                4
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Enrollment</h3>
              <p className="text-sm sm:text-base text-gray-600">Complete fee payment and enrollment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Admission Application Form" />
          <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-bold">Success!</p>
                <p>Your application has been submitted successfully. We will contact you soon.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-bold">Error!</p>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-gray-700 font-semibold mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-gray-700 font-semibold mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="classApplied" className="block text-gray-700 font-semibold mb-2">
                  Class Applying For *
                </label>
                <select
                  id="classApplied"
                  name="classApplied"
                  value={formData.classApplied}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11 - Science">Class 11 - Science</option>
                  <option value="Class 11 - Commerce">Class 11 - Commerce</option>
                  <option value="Class 11 - Arts">Class 11 - Arts</option>
                  <option value="Class 12 - Science">Class 12 - Science</option>
                  <option value="Class 12 - Commerce">Class 12 - Commerce</option>
                  <option value="Class 12 - Arts">Class 12 - Arts</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any specific requirements or queries..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Required Documents" />
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Birth Certificate of the student</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Transfer Certificate from previous school (if applicable)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Recent passport-size photographs (4 copies)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Previous year's mark sheet/report card</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Address proof (utility bill, Aadhar card, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Parent/Guardian ID proof</span>
              </li>
            </ul>
            <p className="mt-6 text-gray-600 italic">
              * All documents should be original with one set of photocopies
            </p>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Fee Structure" />
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Class</th>
                    <th className="px-6 py-4 text-left">Annual Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">Classes 1-5</td>
                    <td className="px-6 py-4 font-semibold">$2,000/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Classes 6-8</td>
                    <td className="px-6 py-4 font-semibold">$2,500/year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Classes 9-10</td>
                    <td className="px-6 py-4 font-semibold">$3,000/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4">Classes 11-12</td>
                    <td className="px-6 py-4 font-semibold">$3,500/year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-gray-600">
              * Fees include tuition, library, sports, and exam charges
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
