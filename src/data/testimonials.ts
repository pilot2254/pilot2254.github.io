/**
 * Testimonials data configuration
 * Client feedback and recommendations
 */

import type { Testimonial } from "@/types"

/**
 * Testimonials data with ratings
 * Ratings are on a scale of 1-5 stars
 */
export const testimonials: Testimonial[] = [
  {
    id: "matyas-hajek",
    name: "Matyáš Hájek",
    role: "Co-Founder",
    company: "RedFox Studios",
    content: "Exceptional work and great attention to detail!",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "kayley-hajek",
    name: "Kayley Hájek",
    role: "Designer",
    company: "RedFox Studios",
    content: "One of the most talented developers I've worked with.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "martin-weis",
    name: "Martin Weis",
    role: "Investor, Client",
    content: "Amazing, high quality and fast work. A pleasure to work with.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "richard-backo",
    name: "Richard Bačko",
    role: "Co Worker",
    content: "Very good man to work with.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "maximilian-repa",
    name: "Maximilián Repa",
    role: "Co Worker",
    content: "Helped us with music at gamejam 2024.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "martin-palus",
    name: "Martin Paluš",
    role: "Co Worker",
    content: "Did a really good work!",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "viliam-adamy",
    name: "Viliam Adámy",
    role: "Co Worker",
    content: "Neviem, ale je to cool clovek.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: "martin-flaska",
    name: "Martin Flaška",
    role: "Client",
    content: "Significantly improved my website's performance and user experience.",
    avatar: "/user.svg?height=40&width=40",
    rating: 5,
  },
]

/**
 * Get testimonials with high ratings
 */
export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter((testimonial) => (testimonial.rating ?? 0) >= 4)
}
