'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const res = await fetch('/api/contact', {
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
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero
        title="Contact Us"
        subtitle="Get in touch with us - we'd love to hear from you"
      />

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Visit Us</h3>
              <p className="text-gray-600">
                Saraswati Vihar<br />
                Govind Nagar, Moradabad<br />
                Uttar Pradesh - 244001
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Call Us</h3>
              <div className="text-gray-700">
                <a 
                  href="https://wa.me/919557706427?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Children%27s%20Future%20Academy." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-green-600 transition font-semibold"
                >
                  <span>📱 95577 06427</span>
                  <span className="text-green-500">💬</span>
                </a>
                <p className="text-sm text-gray-500 mt-2">Click to chat on WhatsApp</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Email Us</h3>
              <p className="text-gray-600">
                <a href="mailto:info@childrenfutureacademy.in" className="hover:text-primary transition">info@childrenfutureacademy.in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Send Us a Message" />
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-bold">Success!</p>
                <p>Your message has been sent successfully. We will get back to you soon.</p>
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
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
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
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Find Us on Map" />
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=Saraswati+Vihar,+Govind+Nagar,+Moradabad,+Uttar+Pradesh+244001&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Office Hours" />
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-800">Monday - Friday</span>
                <span className="text-gray-600">8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="font-semibold text-gray-800">Saturday</span>
                <span className="text-gray-600">9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </div>
            </div>
            <p className="mt-6 text-center text-gray-600 italic">
              For urgent matters outside office hours, please call our emergency number: 95577 06427
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
