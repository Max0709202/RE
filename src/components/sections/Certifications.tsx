import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, Pause, Play, Linkedin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  id: string;
  text: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    text: "Stakeholders valued measurable impact: the new flow reduced support tickets and improved completion rates for the primary user journey.",
    author: {
      name: "Jose Canciani",
      title: "Customer Supporter",
      avatar: "/images/clients/Jose.jpg",
    },
  },
  {
    id: "2",
    text: "Robert have addressed all of the requests accurately. If the opportunity arises, we would be happy to work together again in the future.",
    author: {
      name: "Kaoru Takebuchi",
      title: "CEO of Grease Co., Ltd",
      avatar: "/images/clients/Kaoru Takebuchi.jpg",
    },
  },
  {
    id: "2",
    text: "Naming conventions and properties were standardized, which reduced ambiguity and made reporting faster.",
    author: {
      name: "Lucia Sarasola",
      title: "Data Analyst",
      avatar: "/images/clients/lucia.jpg",
    }
  },
  {
    id: "3",
    text: "The solution matches real user needs and resolves common pain points we previously saw in operations/support.",
    author: {
      name: "Pablo Cuadrado",
      title: "Business Owner",
      avatar: "/images/clients/Pablo.jpg",
    }
  },
  {
    id: "3",
    text: "They developed our company website with exceptional attention to detail, leaving nothing overlooked. They are truly an engineer I would be delighted to work with again.",
    author: {
    name: "Shota Nakahashi",
    title: "CEO of CIO Co.,Ltd",
    avatar: "/images/clients/Shota Nakahashi.png",
    }
  },
  {
    id: "3",
    text: "Robert helped fix big issues with our site promptly and effectively. His expertise came servers us well as. Thanks Robert!",
    author: {
    name: "Kristina Saunders",
    title: "Business Owner",
    avatar: "/images/clients/kristina.png",
    }
  },
  {
    id: "3",
    text: "Not only the backend, but the site’s design was also executed excellently.",
    author: {
      name: "Ryo Sakaki",
      title: "CEO of Promote Act Co., Ltd.",
      avatar: "/images/clients/Ryo Sakaki.png",
    }
  },
  {
    id: "4",
    text: "Documentation and clean implementation reduce long-term maintenance cost and make future upgrades safer.",
    author: {
      name: "Jorge Luis Capoduri",
      title: "Stakeholders",
      avatar: "/images/clients/Jorge.jpg",
    }
  },
  {
    id: "4",
    text: "Even though I made the request on short notice due to urgent circumstances, they handled everything perfectly.",
    author: {
      name: "Ken Nishio",
      title: "CEO of Renewal Brokerage Co., Ltd.",
      avatar: "/images/clients/Ken Nishio.png",
    }
  },
  {
    id: "5",
    text: "A single source of truth was reinforced by syncing business logic between the app database and reporting tables.",
    author: {
      name: "Juan Converso",
      title: "Business Intelligence",
      avatar: "/images/clients/Juan.jpg",
    }
  },
  {
    id: "6",
    text: "Critical actions (logins, permission changes, exports, deletions) were recorded with audit logs suitable for reviews.",
    author: {
      name: "Lucas Mayoni",
      title: "Compliance",
      avatar: "/images/clients/Lucas.jpg",
    }
  }
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || !isPlaying) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isPlaying]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/50" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Kind words from clients, and collaborators
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <div className="relative p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 h-full flex flex-col group hover:border-primary/50 transition-all">
                    {/* Quotation mark icon */}
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/20" />
                    
                    {/* Testimonial text */}
                    <p className="text-foreground mb-6 flex-1 line-clamp-5 leading-relaxed">
                      {testimonial.text}
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 overflow-hidden flex-shrink-0">
                        {testimonial.author.avatar ? (
                          <img
                            src={testimonial.author.avatar}
                            alt={testimonial.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary text-lg font-bold">
                            {testimonial.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">
                          {testimonial.author.name}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {testimonial.author.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {testimonial.author.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows */}
            <CarouselPrevious className="left-0 -translate-x-4" />
            <CarouselNext className="right-0 translate-x-4" />
          </Carousel>

          {/* Pagination dots and play/pause */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Play/Pause button */}
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
