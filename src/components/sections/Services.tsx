import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Rocket, Zap, ArrowRight } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const services: Service[] = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "AI Full-Stack Product Development",
    description:
      "I build end-to-end AI products from UX to backend services, combining modern web stacks with real LLM-powered features.",
    features: [
      "React/Next.js frontend with production UX",
      "Node.js/Python backend and API architecture",
      "LLM chat, recommendation, and assistant workflows",
    ],
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Scalable AI Platform Engineering",
    description:
      "I design scalable systems for AI-enabled applications with performance, reliability, and maintainability in mind.",
    features: [
      "Database design for transactional + AI workloads",
      "Semantic search and vector-ready architecture",
      "Observability, error handling, and deployment pipelines",
    ],
    featured: true,
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Automation, Integrations & AI Ops",
    description:
      "I automate business workflows and integrate third-party services to ship features faster and reduce manual operations.",
    features: [
      "OpenAI, Stripe, analytics, and messaging integrations",
      "Workflow automation with robust API design",
      "CI/CD-ready delivery with clean handover",
    ],
  },
];

const benefits = [
  "Proven delivery of production AI platforms from idea to launch.",
  "Strong backend architecture with practical AI/LLM implementation.",
  "Business-focused execution: performance, UX, and measurable impact.",
  "Reliable collaboration with clear communication and ownership.",
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/50" />
      
      <div className="section-container relative z-10">
        {/* What I Can Do For You Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
              What I Can Do For You
            </h2>
            <p className="text-lg text-muted-foreground">
              AI-first engineering services to turn your product vision into a scalable, production-ready platform
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group ${
                  service.featured ? "bg-gradient-to-br from-primary/5 to-primary/10" : ""
                }`}
              >
                {/* Featured background pattern */}
                {service.featured && (
                  <div className="absolute inset-0 rounded-2xl opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, hsl(var(--primary)) 10px, hsl(var(--primary)) 11px),
                        repeating-linear-gradient(90deg, transparent, transparent 10px, hsl(var(--primary)) 10px, hsl(var(--primary)) 11px))`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 text-primary">{service.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-heading font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Work With Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center text-foreground">
            Why Work With Me
          </h2>

          {/* Benefits Container */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{index + 1}</span>
                  </div>
                  {/* Benefit text */}
                  <p className="text-foreground leading-relaxed pt-1">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
