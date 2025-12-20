import { config } from "@/lib/config";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Testimonials</h2>
      <div className="space-y-8">
        {config.testimonials.map((testimonial, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "fill-foreground text-foreground"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            <div className="text-sm">
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-muted-foreground">{testimonial.position} at {testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
