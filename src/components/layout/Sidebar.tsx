import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  CheckCircle2,
  FolderKanban,
  Briefcase,
  FileText,
  MessageSquareQuote,
  HelpCircle,
  Mail,
  Sun,
  Moon,
  Languages,
  Gift,
  Terminal,
  ArrowUp,
} from "lucide-react";
import { useTheme } from "next-themes";

interface SidebarItem {
  icon: React.ReactNode;
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button after scrolling down
      setShowScrollTop(window.scrollY > 500);

      // Determine active section based on scroll position
      const sections = [
        "about",
        "skills",
        "experience",
        "projects",
        "testimonials",
        "faq",
        "services",
        "contact",
      ];

      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Top section items
  const topSectionItems: SidebarItem[] = [
    {
      icon: <User className="w-5 h-5" />,
      href: "#about",
      label: "About",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      href: "#skills",
      label: "Skills",
    },
    {
      icon: <FolderKanban className="w-5 h-5" />,
      href: "#projects",
      label: "Projects",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      href: "#experience",
      label: "Experience",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      href: "#services",
      label: "Services",
    },
  ];

  // Middle section items
  const middleSectionItems: SidebarItem[] = [
    {
      icon: <MessageSquareQuote className="w-5 h-5" />,
      href: "#testimonials",
      label: "Testimonials",
      active: activeSection === "testimonials",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      href: "#faq",
      label: "FAQ",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "#contact",
      label: "Contact",
    },
  ];

  // Bottom section items
  const bottomSectionItems: SidebarItem[] = [
    {
      icon: mounted && theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
      href: "#",
      label: "Theme",
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
    {
      icon: <Languages className="w-5 h-5" />,
      href: "#services",
      label: "Services",
    },
    {
      icon: <Gift className="w-5 h-5" />,
      href: "#services",
      label: "Services",
    },
    {
      icon: <Terminal className="w-5 h-5" />,
      href: "#projects",
      label: "Projects",
    },
  ];

  const renderItem = (item: SidebarItem, index: number, section: "top" | "middle" | "bottom") => {
    const isActive = item.active || activeSection === item.href.replace("#", "");
    const Component = item.onClick ? "button" : "a";

    return (
      <motion.div
        key={item.href + index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {Component === "button" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              item.onClick?.();
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative ${
              isActive
                ? "bg-primary/20 border-2 border-primary text-primary shadow-lg shadow-primary/20"
                : "bg-card border border-border text-foreground hover:bg-card/80 hover:border-primary/50"
            }`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            {isActive && section === "middle" && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ) : (
          <a
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative ${
              isActive
                ? "bg-primary/20 border-2 border-primary text-primary shadow-lg shadow-primary/20"
                : "bg-card border border-border text-foreground hover:bg-card/80 hover:border-primary/50"
            }`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            {isActive && section === "middle" && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </a>
        )}
      </motion.div>
    );
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center gap-4">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-lg border border-border"
        >
          {topSectionItems.map((item, index) => renderItem(item, index, "top"))}
        </motion.div>

        {/* Middle Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-lg border border-border"
        >
          {middleSectionItems.map((item, index) => renderItem(item, index, "middle"))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-3 p-4 rounded-2xl bg-card/80 backdrop-blur-lg border border-border"
        >
          {bottomSectionItems.map((item, index) => renderItem(item, index, "bottom"))}
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            y: showScrollTop ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-card border-2 border-border text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 ${
            showScrollTop ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;
