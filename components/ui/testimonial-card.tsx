import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "relative flex flex-col rounded-2xl border-2 border-gray-100",
        "bg-white",
        "p-6 text-start",
        "hover:border-primary/30 hover:shadow-xl hover:-translate-y-1",
        "max-w-[360px] min-h-[240px]",
        "transition-all duration-300 shadow-lg",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
    >
      <div className="relative z-10">
        {/* Quote Icon */}
        <div className="mb-4">
          <svg className="w-10 h-10 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        
        {/* Testimonial Text */}
        <p className="text-gray-700 leading-relaxed mb-6 text-base italic">
          {text}
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
            <AvatarImage src={author.avatar} alt={author.name} />
          </Avatar>
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold text-gray-900">
              {author.name}
            </h3>
            <p className="text-sm font-medium text-primary">
              {author.handle}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
