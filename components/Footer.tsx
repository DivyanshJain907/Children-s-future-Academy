import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Us Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Children's Future Academy provides quality education with modern facilities and experienced faculty since 2000.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">📍</span>
                <span>Saraswati Vihar, Govind Nagar, Moradabad, Uttar Pradesh - 244001</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">📞</span>
                <a 
                  href="https://wa.me/919557706427?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Children%27s%20Future%20Academy." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition flex items-center gap-2"
                >
                  <span>95577 06427</span>
                  <span className="text-green-400">💬</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✉️</span>
                <span>info@childrenfutureacademy.in</span>
              </li>
            </ul>
          </div>

          {/* Important Links - Column 1 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-accent transition">
                  Admission Procedure
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-300 hover:text-accent transition">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-accent transition">
                  School Reviews
                </Link>
              </li>
              <li>
                <Link href="/book-list" className="text-gray-300 hover:text-accent transition">
                  Book List
                </Link>
              </li>
              <li>
                <Link href="/holiday-list" className="text-gray-300 hover:text-accent transition">
                  School holiday list 2022-23
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-300 hover:text-accent transition">
                  Rules and regulation
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="text-gray-300 hover:text-accent transition">
                  ENTRANCE SYLLABUS
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links - Column 2 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-accent transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/virtual-tour" className="text-gray-300 hover:text-accent transition">
                  Virtual Campus tour
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-accent transition">
                  School Reviews
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-300 hover:text-accent transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/holiday-list" className="text-gray-300 hover:text-accent transition">
                  School holiday list 2022-23
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-300 hover:text-accent transition">
                  Rules and regulation
                </Link>
              </li>
              <li>
                <Link href="/kit-list" className="text-gray-300 hover:text-accent transition">
                  Kit List
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links - Column 3 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-accent transition">
                  Admission Procedure
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-300 hover:text-accent transition">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-accent transition">
                  School Reviews
                </Link>
              </li>
              <li>
                <Link href="/book-list" className="text-gray-300 hover:text-accent transition">
                  Book List
                </Link>
              </li>
              <li>
                <Link href="/fee" className="text-gray-300 hover:text-accent transition">
                  Fee
                </Link>
              </li>
              <li>
                <Link href="/kit-list" className="text-gray-300 hover:text-accent transition">
                  Kit List
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-accent transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-gray-300 hover:text-accent transition">
                  Mandatory Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Children's Future Academy</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-accent transition">
                Terms & Condition
              </Link>
              <span>/</span>
              <Link href="/privacy" className="hover:text-accent transition">
                Privacy Policy
              </Link>
              <span>/</span>
              <Link href="/contact" className="hover:text-accent transition">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            <p>
              Developed by{' '}
              <a 
                href="https://divyanshjainportfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition font-semibold"
              >
                Jain Agency
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
