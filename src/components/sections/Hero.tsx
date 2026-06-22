import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Linkedin, Github, Mail, MessageCircle, Send, ChevronDown, FileText } from "lucide-react";

// Resume PDFs are in public/ so they're served at root and work on all platforms (incl. Vercel)
const resumeEnglishUrl = "/Resume-English.pdf";
const resumeJapaneseUrl = "/Resume-Japanese.pdf";

const Hero = () => {
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResumeDropdownOpen(false);
      }
    };

    if (isResumeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isResumeDropdownOpen]);

  // Download handler functions
  const handleDownloadEnglish = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = resumeEnglishUrl;
    link.download = "Resume-English.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsResumeDropdownOpen(false);
  };

  const handleDownloadJapanese = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = resumeJapaneseUrl;
    link.download = "Resume-Japanese.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsResumeDropdownOpen(false);
  };
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary font-medium tracking-wide"
            >
              
            </motion.p>

            {/* Name */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight"
              >
                Robert{" "}
                <span className="text-gradient">Eng</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-heading text-muted-foreground font-medium"
              >
                AI full-stack Engineer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="max-w-xl text-lg text-muted-foreground leading-relaxed"
            >
              Results-driven AI Full-Stack Engineer with over 12 years of experience designing, developing, and deploying scalable, data-driven applications. Specialized in integrating machine learning and AI capabilities into modern web architectures, bridging the gap between intelligent systems and user-centric applications.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>Malaysia</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex items-center gap-3 pt-4 flex-nowrap"
            >
              <a
                href="#contact"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap text-sm md:text-base"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300 whitespace-nowrap text-sm md:text-base"
              >
                View Projects
              </a>
              
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex items-center gap-4 pt-2"
            >
              <a
                href="https://www.linkedin.com/in/robert-eng-3b16b6412/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Max0709202"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:engr20889@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/60137358087"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/@Eng_N"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
              >
                <Send className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl transform scale-110" />
              
              {/* Photo container */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm"
              >
                <img
                  src="/avatar.png"
                  alt="Robert Eng"
                  className="w-full h-full object-cover aspect-[3/4] scale-110 object-center"
                  loading="eager"
                />
                
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating decoration elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
