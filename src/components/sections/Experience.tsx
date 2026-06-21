import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const highlightKeywords = [
  "Large Language Models",
  "Generative AI",
  "REST APIs",
  "database-driven",
  "workflow automation",
  "third-party APIs",
  "chatbots",
  "solution architecture",
  "LLM integration",
  "end-to-end software",
  "internal web applications",
  "AI-powered solutions",
  "enterprise applications",
  "support processes",
  "deployment pipelines",
  "scalable deployment",
  "retail systems",
  "streamline retail operations",
  "database administration",
  "software deployments",
  "business intelligence",
  "vendors",
  "internal stakeholders",
  "full-stack",
  "embeddings",
  "vector DB concepts",
  "caching strategies",
  "product and stakeholders",
  "data pipelines",
  "prompt engineering",
  "workflows",
  "Machine Learning",
  "Data Science",
  "Data Analysis",
  "Data Visualization",
  "Data Engineering",
  "OpenAI API",
  "LangChain",
  "React.js",
  "RESTful APIs",
  "Stripe",
  "wireframes",
  "lazy loading",
  "code splitting",
  "Agile/Scrum",
  "prototypes",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Python",
  "Supabase",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "CI/CD",
  "MLOps",
  "JWT",
  "OAuth2",
  "SSR/SSG",
];

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderHighlightedText = (text: string) => {
  const pattern = new RegExp(`(${highlightKeywords.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isKeyword = highlightKeywords.some(
      (keyword) => keyword.toLowerCase() === part.toLowerCase()
    );

    if (!isKeyword) return <span key={`${part}-${index}`}>{part}</span>;

    return (
      <span key={`${part}-${index}`} className="text-primary font-semibold">
        {part}
      </span>
    );
  });
};

const experiences = [
  {
    role: "AI-Full Stack Engineer",
    company: "Self-Employed",
    period: "November 2025 – Present",
    responsibilities: [
      "Developed AI-driven applications using Large Language Models (LLMs) and Generative AI technologies",
      "Built full-stack web applications, REST APIs, and database-driven systems",
      "Designed workflow automation solutions to improve operational efficiency",
      "Integrated third-party APIs, enterprise systems, and cloud services",
      "Developed chatbots, intelligent assistants, and knowledge management solutions",
      "Provided technical consulting, solution architecture, and system design recommendations",
      "Managed end-to-end software development lifecycle from requirements gathering to deployment and support"
    ],
  },
  {
    role: "AI-Full Stack Engineer",
    company: "ST Engineering",
    period: "Septemeber 2020 – October 2025",
    responsibilities: [
      "Developed and maintained internal web applications, automation tools, and business systems",
      "Designed AI-powered solutions, chatbots, and knowledge management platforms to improve operational efficiency",
      "Integrated enterprise applications, APIs, databases, and cloud-based services",
      "Automated IT workflows, monitoring, reporting, and support processes using scripting and modern development frameworks",
      "Managed system architecture, deployment pipelines, and application support for business-critical systems"
    ],
  },
  {
    role: "Senior Information Technology Support Engineer | AI engineer",
    company: "HMS Far East Pte Ltd - Seven Seas Group",
    period: "April 2014 – March 2018",
    responsibilities: [
      "Managed retail systems, POS platforms, inventory applications, and enterprise business solutions",
      "Developed automation scripts and reporting tools to streamline retail operations and reduce manual processes",
      "Supported database administration, data synchronization, and systems integration projects",
      "Coordinated software deployments, upgrades, and technology rollouts across retail locations",
      "Analyzed operational data and generated business intelligence reports for management teams",
      "ECollaborated with vendors and internal stakeholders to implement technology enhancements",
    ],
  },
  {
    role: "Head. Retail Support",
    company: "Estee Lauder Companies Inc",
    period: "December 2009 – July 2012",
    responsibilities: [
      "Supported enterprise application, business systems, and end-user computing environments",
      "Managed user access, system configuration, software deployment, and technical troubleshooting",
      "Assisted in implementing workflow improvements and automation initiatives to increase operational efficiency",
      "Supported database driven applications and reporting systems",
      "Participated in infrastructure upgrades, migration projects, and technology rollouts",
      "Developed technical documentation, support procedures, and knowledge base materials",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-wide mb-4">Experience</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute left-8 top-20 bottom-0 w-px bg-border" />

              <div className="flex gap-8">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center glow">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-16">
                  <div className="p-8 rounded-2xl bg-card border border-border card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-heading font-bold">{exp.role}</h3>
                        <p className="text-primary text-lg mt-1">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground bg-secondary px-4 py-2 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <motion.li
                          key={respIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 + respIndex * 0.1 }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{renderHighlightedText(resp)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
