interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 px-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-20 sm:w-24 h-1 bg-accent mx-auto mt-3 sm:mt-4"></div>
    </div>
  );
}
