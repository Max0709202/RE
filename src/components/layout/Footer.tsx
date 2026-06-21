import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    selectedTags: [] as string[],
  });

  const [messageCount, setMessageCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // EmailJS configuration - Get these from your EmailJS account
  // You can set these as environment variables or replace directly
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_CONFIRMATION_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || ""; // Optional: for sending confirmation to sender
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
  const RECIPIENT_EMAIL = "engr20889@gmail.com";

  const serviceTags = [
    "AI Product Development",
    "LLM Features & Chatbots",
    "Backend & API Architecture",
    "Automation & Integrations",
    "Performance Optimization",
    "Cloud Deployment",
    "Remote Work",
    "Full-time Employee",
    "Contractor",
  ];

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessageCount(value.length);
    setFormData((prev) => ({ ...prev, message: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Try EmailJS first if configured
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        // Initialize EmailJS
        emailjs.init(EMAILJS_PUBLIC_KEY);

        // Prepare template parameters - only include variables that match your EmailJS template
        // Common EmailJS template variables: from_name, from_email, message, subject, etc.
        // IMPORTANT: Your EmailJS template must use these exact variable names: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
        const templateParams: Record<string, string> = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        };

        // Add optional fields only if they have values (to avoid 422 errors)
        if (formData.company) {
          templateParams.company = formData.company;
        }
        if (formData.selectedTags.length > 0) {
          templateParams.tags = formData.selectedTags.join(", ");
        }
        // reply_to is used by EmailJS for the Reply-To header, not a template variable
        templateParams.reply_to = formData.email;

        // Send email to recipient (yourself) via EmailJS
        let response;
        try {
          response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        } catch (emailjsError: unknown) {
          // EmailJS throws errors for non-200 status codes
          if (emailjsError && typeof emailjsError === 'object' && 'status' in emailjsError) {
            const err = emailjsError as { status: number; text: string };
            if (err.status === 422) {
              throw new Error(`422: Template variables don't match. Your EmailJS template must use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}. Optional: {{company}}, {{tags}}.`);
            }
            if (err.status === 412) {
              throw new Error(`412: Gmail authentication error. Your Gmail service needs proper OAuth scopes. Go to EmailJS > Email Services > Your Gmail Service > Settings and re-authenticate with all required permissions. Alternatively, use a different email service like Outlook or SMTP.`);
            }
            throw new Error(`EmailJS error (${err.status}): ${err.text || 'Unknown error'}`);
          }
          throw emailjsError;
        }

        // Check if the response indicates success (200 or 201)
        if (response.status === 200 || response.status === 201) {
          // Optionally send confirmation email to the sender
          if (EMAILJS_CONFIRMATION_TEMPLATE_ID) {
            try {
              // Send confirmation email to sender (don't wait for this, just fire and forget)
              emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, {
                to_name: formData.name,
                to_email: formData.email,
                subject: formData.subject,
              }).catch((confirmationError) => {
                // Log but don't fail the main submission
                console.warn("Confirmation email failed:", confirmationError);
              });
            } catch (confirmationError) {
              // Ignore confirmation errors - main email was sent successfully
              console.warn("Confirmation email error:", confirmationError);
            }
          }

          toast({
            title: "Message Sent!",
            description: "Thank you for your message. I'll get back to you soon!",
          });

          // Reset form only on success
          setFormData({
            name: "",
            email: "",
            company: "",
            subject: "",
            message: "",
            selectedTags: [],
          });
          setMessageCount(0);
        } else {
          throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
        }
      } else {
        // Fallback: Use mailto link if EmailJS is not configured
        const mailtoBody = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Company: ${formData.company || "N/A"}\n` +
          `Subject: ${formData.subject}\n` +
          `Tags: ${formData.selectedTags.join(", ") || "None"}\n\n` +
          `Message:\n${formData.message}`
        );

        // Open default email client (this won't throw an error)
        try {
          window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${mailtoBody}`;
          
          toast({
            title: "Opening Email Client",
            description: "Your default email client should open. If not, please send an email to engr20889@gmail.com",
          });

          // Reset form after a short delay to allow mailto to work
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              company: "",
              subject: "",
              message: "",
              selectedTags: [],
            });
            setMessageCount(0);
          }, 500);
        } catch (mailtoError) {
          // If mailto fails, still show success but with a note
          console.warn("Mailto link failed:", mailtoError);
          toast({
            title: "Email Client",
            description: `Please send an email to ${RECIPIENT_EMAIL} with your message.`,
          });
          
          // Reset form
          setFormData({
            name: "",
            email: "",
            company: "",
            subject: "",
            message: "",
            selectedTags: [],
          });
          setMessageCount(0);
        }
      }

      // Log form data (for development/debugging)
      console.log("Form submitted:", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        tags: formData.selectedTags,
      });

    } catch (error: unknown) {
      console.error("Form submission error:", error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to send message. Please try again later or contact me directly via email.";
      let errorTitle = "Error";
      
      if (error instanceof Error) {
        // Handle 412 error specifically (Gmail authentication scopes)
        if (error.message.includes("412") || error.message.includes("insufficient authentication scopes") || error.message.includes("Gmail authentication")) {
          errorTitle = "Gmail Authentication Error";
          errorMessage = "Your Gmail service in EmailJS needs proper OAuth permissions. Fix: Go to EmailJS Dashboard > Email Services > Your Gmail Service > Settings > Re-authenticate and grant all permissions. Or switch to Outlook/SMTP service.";
        } else if (error.message.includes("422") || error.message.includes("Unprocessable")) {
          errorTitle = "Configuration Error";
          errorMessage = "EmailJS template variables don't match. Please check your EmailJS template and ensure it uses these variables: from_name, from_email, subject, message. You can also use the mailto fallback by removing EmailJS configuration.";
        } else if (error.message.includes("Invalid public key") || error.message.includes("Invalid service ID") || error.message.includes("Invalid template ID")) {
          errorTitle = "Configuration Error";
          errorMessage = "EmailJS configuration error. Please check your Service ID, Template ID, and Public Key in your .env file.";
        } else if (error.message.includes("Network") || error.message.includes("Failed to fetch")) {
          errorTitle = "Network Error";
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (error.message.includes("400") || error.message.includes("Bad Request")) {
          errorTitle = "Request Error";
          errorMessage = "Invalid request. Please check your EmailJS template configuration.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      } else if (error && typeof error === 'object' && 'status' in error) {
        // Handle EmailJS response errors
        const emailjsError = error as { status: number; text: string };
        if (emailjsError.status === 412) {
          errorTitle = "Gmail Authentication Error";
          errorMessage = "Gmail service needs proper OAuth scopes. Go to EmailJS > Email Services > Your Gmail Service > Settings > Re-authenticate. Or use Outlook/SMTP instead.";
        } else if (emailjsError.status === 422) {
          errorTitle = "Template Error";
          errorMessage = "EmailJS template variables don't match. Your template must use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}. Check your EmailJS template settings.";
        } else {
          errorMessage = `EmailJS error (${emailjsError.status}): ${emailjsError.text || 'Unknown error'}`;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="section-padding bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden" ref={ref}>
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Building an AI-first product? I can help you design, build, and launch it end-to-end.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section: Let's Talk */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Let's Build Something Smart
            </h3>

            {/* Introductory Text */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am an AI Full-Stack Engineer focused on production-grade web platforms powered by LLMs, modern frontend stacks, and scalable backend systems.
              </p>
              <p>
                If you need help with AI chat features, intelligent workflows, platform architecture, or full product delivery, reach out. We can align on priorities, scope, timeline, and the fastest path to launch.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <a
                href="mailto:engr20889@gmail.com"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">engr20889@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+60-13-735-8087"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+60 13 735 8087</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Malaysia</p>
                </div>
              </div>
            </div>

            {/* Connect Via */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">Or connect via</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/robert-eng-3b16b6412/"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/Max0709202"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/60137358087"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                href="https://t.me/@Eng_N"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Send className="w-5 h-5" />
              </a>
              </div>
            </div>
          </motion.div>

          {/* Right Section: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-background"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-background"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-foreground">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-background"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-background"
                />
              </div>

              {/* What's on your mind? */}
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  What's on your mind?
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={handleMessageChange}
                  maxLength={500}
                  rows={6}
                  className="w-full bg-background resize-none pr-20"
                  placeholder="Tell me about your AI product or platform idea..."
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {messageCount}/500 characters
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
