import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const clientFAQs: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary based on project scope. A landing page typically takes **1-2 weeks**, while a full web application can take **4-12 weeks**. I'll provide a detailed timeline during our initial consultation after understanding your specific requirements.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "I am an AI-focused Full-Stack Engineer specializing in building scalable end-to-end applications using React, Node.js, and modern databases, while integrating AI/ML capabilities to deliver intelligent, high-performance user experiences",
  },
  {
    question: "What types of clients do you work with?",
    answer:
      "I work with a diverse range of clients including startups, small businesses, and established companies. Whether you need a simple landing page, a complex web application, or ongoing maintenance and support, I can help bring your vision to life.",
  },
  {
    question: "What's your work process like?",
    answer:
      "My process typically involves: 1) Initial consultation to understand your needs, 2) Detailed project proposal with timeline and milestones, 3) Regular updates and communication throughout development, 4) Testing and quality assurance, 5) Deployment and handover. I believe in transparent communication and keeping you informed every step of the way.",
  },
];

const employerFAQs: FAQItem[] = [
  {
    question: "Are you available for full-time positions?",
    answer:
      "Yes, I'm open to the right **full-time remote opportunity**. I'm particularly interested in roles where I can contribute to product development, work with modern technologies, and be part of a team that values code quality and user experience.",
  },
  {
    question: "Are you open to part-time or contract work?",
    answer:
      "Yes, I'm available for part-time positions and contract work. I'm flexible with arrangements that allow me to contribute meaningfully to your team while maintaining work-life balance. Let's discuss how I can help with your specific needs.",
  },
  {
    question: "What's your remote work setup?",
    answer:
      "I have a fully equipped home office with reliable high-speed internet, multiple monitors, and all necessary development tools. I'm experienced with remote collaboration tools like Slack, Zoom, and Git, and I'm comfortable working across different time zones when needed.",
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding bg-card/30" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Answers to common questions about working with me
          </p>
        </motion.div>

        {/* FAQ Columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* For Clients Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-heading font-bold text-foreground">For Clients</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {clientFAQs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`client-${index}`}
                  className="border border-border rounded-lg bg-card/50 px-6 py-4 data-[state=open]:bg-card/80 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline group [&>svg]:text-primary [&>svg]:w-5 [&>svg]:h-5">
                    <span className="flex-1 text-primary font-medium group-hover:text-primary/80 transition-colors pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-foreground leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* For Employers Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-heading font-bold text-foreground">For Employers</h3>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {employerFAQs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`employer-${index}`}
                  className="border border-border rounded-lg bg-card/50 px-6 py-4 data-[state=open]:bg-card/80 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline group [&>svg]:text-primary [&>svg]:w-5 [&>svg]:h-5">
                    <span className="flex-1 text-primary font-medium group-hover:text-primary/80 transition-colors pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-foreground leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
