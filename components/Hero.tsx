interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  badge?: string;
  contact?: string;
}

export default function Hero({ 
  title, 
  subtitle, 
  backgroundImage,
  badge = "Quality Education Since 2000",
  contact = "92866 01333"
}: HeroProps) {
  return (
    <div className="relative">
      {/* Top Info Bar - Hidden on Mobile */}
      <div className="hidden md:block bg-dark text-white py-2 text-xs sm:text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 justify-center md:justify-start">
            <span className="whitespace-nowrap">📝 Online Registration</span>
            <span className="whitespace-nowrap">📞 {contact}</span>
            <span className="whitespace-nowrap">✉️ info@childrenfutureacademy.in</span>
          </div>
        </div>
      </div>

      {/* School Info Banner */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="flex items-center gap-3 justify-center">
              <img 
                src="/images/logo.png" 
                alt="Children's Future Academy Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-primary">Children's Future Academy</h1>
                <p className="text-xs sm:text-sm text-gray-600">— Co-educational School —</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/images/logo.png" 
                alt="Children's Future Academy Logo" 
                className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
              />
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-primary">Children's Future Academy</h1>
                <p className="text-sm text-gray-600">— Co-educational School —</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg lg:text-xl font-bold text-gray-800">{badge}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Contact Us</p>
              <p className="text-base lg:text-lg font-bold text-primary">{contact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div
        className="relative h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-r from-primary to-secondary"
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        {/* Dark overlay for readability when background image is present */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        )}
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center px-4 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 animate-fade-in drop-shadow-lg">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-md">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
