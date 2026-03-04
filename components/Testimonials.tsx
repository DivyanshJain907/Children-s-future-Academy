'use client';

import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  batch: string;
  currentStatus: string;
  message: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    batch: '(2018-2022)',
    currentStatus: 'Currently at Secondary School',
    message: 'My four years at Children\'s Future Academy were truly memorable. The teachers here not only focus on academics but also help us develop as better individuals. The interactive teaching methods and practical approach helped me understand concepts deeply. I am grateful for the values and knowledge I gained during my time here.',
    image: '/student1.jpg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    batch: '(2017-2021)',
    currentStatus: 'Currently at High School',
    message: 'The dedication of teachers and the supportive environment at CFA helped me build a strong foundation. The library and computer lab facilities are excellent. Special attention given to each student makes this school stand out. I cherish the memories and friendships made here.',
    image: '/student2.jpg'
  },
  {
    id: 3,
    name: 'Amit Verma',
    batch: '(2019-2023)',
    currentStatus: 'Currently at Class IX',
    message: 'Children\'s Future Academy provided me with not just education but also life skills and moral values. The teachers are caring and always ready to help. The school activities and events helped me discover my talents. Thank you CFA for shaping my future!',
    image: '/student3.jpg'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            What our Student say
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <div className="text-6xl text-primary leading-none">&ldquo;</div>
              <p className="text-gray-700 text-lg italic leading-relaxed">
                {currentTestimonial.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {currentTestimonial.image && (
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%230d7a2e" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="white"%3E' + currentTestimonial.name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {currentTestimonial.name}
              </h3>
              <p className="text-gray-600 font-semibold">
                {currentTestimonial.batch} {currentTestimonial.currentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
