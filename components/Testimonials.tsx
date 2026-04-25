import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Mrs. Rajesh Kumar",
      handle: "Parent of Aditya (Class 7)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "My son has shown tremendous improvement since joining CFA. The teachers here understand each child's learning pace and provide individual attention. The curriculum is well-balanced between academics and personality development. We are very satisfied with the holistic approach."
  },
  {
    author: {
      name: "Mr. Priya Sharma",
      handle: "Parent of Ishita (Class 6)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The infrastructure and facilities at Children's Future Academy are world-class. More importantly, the staff truly cares about each student's growth. My daughter is more confident and enthusiastic about her studies now. Regular communication from teachers keeps us updated."
  },
  {
    author: {
      name: "Ms. Amit Verma",
      handle: "Parent of Rohit (Class 8)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "We chose CFA for our child's foundation years and haven't looked back. The school emphasis on values, discipline, and character development is commendable. The teachers go beyond textbooks to inspire curiosity and critical thinking in students."
  },
  {
    author: {
      name: "Mrs. Sneha Patel",
      handle: "Parent of Kavya (Class 5)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The environment at CFA is nurturing and encouraging. My daughter looks forward to school every day. The blend of modern teaching methods with traditional values is exactly what we wanted for our child. Highly recommend CFA to all parents!"
  },
  {
    author: {
      name: "Mr. Vikram Singh",
      handle: "Parent of Arjun (Class 7)",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The extracurricular activities and sports programs at CFA help students discover their talents. My son has grown not just academically but also in confidence and social skills. The parent-teacher interactions are transparent and supportive."
  },
  {
    author: {
      name: "Mrs. Anjali Gupta",
      handle: "Parent of Zara (Class 6)",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a parent, I appreciate the safety, discipline, and academic excellence that CFA provides. The teachers genuinely invest in each child's success. My daughter's scores have improved significantly, and more importantly, she enjoys learning."
  }
]

export default function Testimonials() {
  return (
    <TestimonialsSection
      title="What Parents Say"
      description="Hear from our parents about their experience and their child's growth at Children's Future Academy"
      testimonials={testimonials}
    />
  )
}
