interface CardProps {
  icon?: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function Card({ icon, title, description, imageUrl }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
        />
      )}
      {icon && !imageUrl && (
        <div className="text-4xl sm:text-5xl mb-4 text-center">{icon}</div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
}
