import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Rajesh Kumar",
      handle: "Batch 2018-2022",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "My four years at Children's Future Academy were truly memorable. The teachers here not only focus on academics but also help us develop as better individuals."
  },
  {
    author: {
      name: "Priya Sharma",
      handle: "Batch 2017-2021",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The dedication of teachers and the supportive environment helped me build a strong foundation. The library and computer lab facilities are excellent."
  },
  {
    author: {
      name: "Amit Verma",
      handle: "Batch 2019-2023",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Children's Future Academy provided me with not just education but also life skills and moral values. The teachers are caring and always ready to help."
  },
  {
    author: {
      name: "Sneha Patel",
      handle: "Batch 2016-2020",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The interactive teaching methods and practical approach helped me understand concepts deeply. I am grateful for the values and knowledge I gained."
  },
  {
    author: {
      name: "Vikram Singh",
      handle: "Batch 2015-2019",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Special attention given to each student makes this school stand out. The school activities and events helped me discover my talents."
  },
  {
    author: {
      name: "Anjali Gupta",
      handle: "Batch 2017-2021",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "Thank you CFA for shaping my future! The supportive environment and excellent facilities made learning enjoyable and effective."
  }
]

export function TestimonialsMarquee() {
  return (
    <TestimonialsSection
      title="What Our Students Say"
      description="Hear from our students about their transformative experiences at Children's Future Academy"
      testimonials={testimonials}
    />
  )
}
