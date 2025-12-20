"use client";

import { config } from "@/lib/config";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function Testimonials() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="container py-24 bg-muted/50">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground">
            What people I've worked with say about me
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {config.testimonials.map((testimonial, idx) => (
              <CarouselItem key={idx}>
                <div className="border rounded-lg p-8 bg-background">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg italic">"{testimonial.text}"</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
