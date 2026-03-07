export default function WhyChooseUs() {
  const features = [
    {
      icon: "👨‍🏫",
      title: "Experienced Teachers",
      description: "Our 44 qualified teachers know each student by name. Small class sizes mean your child gets the attention they need to succeed.",
      accentColor: "bg-primary"
    },
    {
      icon: "📖",
      title: "Complete Education",
      description: "From Pre-Primary to Class VIII, we cover everything - academics, sports, computer skills, and personality development all under one roof.",
      accentColor: "bg-accent"
    },
    {
      icon: "💯",
      title: "Proven Track Record",
      description: "Serving Moradabad families since 2000. Our students consistently perform well in exams and go on to top high schools.",
      accentColor: "bg-primary"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Parents Choose Us
          </h2>
          <div className="w-32 h-1.5 bg-accent mx-auto"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-6 text-5xl mx-auto">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center mt-12">
          <a
            href="/about"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition shadow-md hover:shadow-lg font-semibold"
          >
            Learn More About Us →
          </a>
        </div>
      </div>
    </section>
  );
}
