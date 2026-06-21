import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

type TechFilterId =
  | "all"
  | "typescript"
  | "react"
  | "python"
  | "php"
  | "nodejs"
  | "wordpress"
  | "ml-ai";

const TECH_FILTERS: { id: TechFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "python", label: "Python" },
  { id: "php", label: "PHP" },
  { id: "nodejs", label: "Node.js" },
  { id: "wordpress", label: "WordPress" },
  { id: "ml-ai", label: "ML / AI" },
];

const ML_AI_SUBSTRINGS = [
  "machine-learning",
  "machine-learing",
  "deep-learning",
  "tensorflow",
  "pytorch",
  "keras",
  "sklearn",
  "xgboost",
  "automl",
  "computer-vision",
  "object-detection",
  "nlp",
  "ensemble-learning",
  "efficientdet",
  "m2det",
  "openai",
  "opeanai",
  "gpt-4",
  "chatgpt",
  "transformers.js",
  "huggingface",
  "rag",
  "llm",
  "gpt-syn",
  "image-analysis",
  "voice-analysis",
  "audio-analysis",
  "speech-to-text",
  "voice-assistant",
  "chatbot",
  "ai-assistant",
  "tabular-data",
  "gan",
  "esrgan",
  "dataset-training",
  "cancer-detection",
  "disease-prediction",
  "medical-ai",
  "conversational",
  "whatsapp",
];

function normalizeTechTag(tag: string) {
  return tag.toLowerCase();
}

function projectMatchesTechFilter(
  techTags: string[],
  filterId: TechFilterId
): boolean {
  if (filterId === "all") return true;

  const tags = techTags.map(normalizeTechTag);

  switch (filterId) {
    case "typescript":
      return tags.some((t) => t.includes("typescript"));
    case "react":
      return tags.some((t) => t === "react");
    case "python":
      return tags.some((t) => t === "python");
    case "php":
      return tags.some((t) => t === "php");
    case "nodejs":
      return tags.some((t) => t.includes("node.js") || t === "nodejs");
    case "wordpress":
      return tags.some(
        (t) => t.includes("wordpress") || t.includes("wordpres-customization")
      );
    case "ml-ai":
      return tags.some((tag) =>
        ML_AI_SUBSTRINGS.some((sub) => tag.includes(sub))
      );
    default:
      return true;
  }
}

const projects = [
  {
    title: "AI-assistant (Assistant IA)",
    description: "Analyze. Understand. Apply. JOY gives you clear and actionable technical answers.",
    tech: ["Typescript", "Openai", "Image-analysis", "Chatapp", "Prisma", "voice-analysis"],
    gradient: "from-primary/20 to-primary/5",
    images: ["/images/projects/assistant1.png", "/images/projects/assistant2.png", "/images/projects/assistant3.png"],
    liveLink: "https://www.hasieai.com/",
    githubLink: "https://github.com/Max0709202/ai-assistant",
  },
  {
    title: "Intelligent Ecommerce Platform",
    description: "A production-grade full-stack e-commerce platform featuring AI-powered product recommendations, built with React, Node.js, MongoDB, and Python Flask, demonstrating advanced ML algorithms, microservices architecture, and cloud-native deployment.",
    tech: ["Python", "React", "Machine-Learning", "e-commerce", "ai-agents", "frontend", "backend"],
    gradient: "from-primary/20 to-primary/5",
    images: ["/images/projects/IntelligentEcommerce1.png", "/images/projects/IntelligentEcommerce2.png", "/images/projects/IntelligentEcommerce3.png"],
    githubLink: "https://github.com/Max0709202/NexusCommerce_AI",
  },
  {
    title: "Ecommerce-stripe",
    description: "A minimal Django e-commerce starter with Stripe checkout that loads products from JSON templates—no product database required.",
    tech: ["Ecommerce", "Django", "Stripe", "Starter-template", "Payment-processing", "stripe-checkout"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/ecommercestripe1.png", "/images/projects/ecommercestripe2.png"],
    githubLink: "https://github.com/Max0709202/ecommerce_stripe",
  },
  {
    title: "Recorder system",
    description: "Open-source browser app to record your screen, tab, window, and/or webcam locally—with PiP, teleprompter, and optional in-browser MP4 conversion—no install required.",
    tech: ["React", "TypeScript", "Privacy", "Mediarecorder-API", "Vite", "Screen-Recording", "FFmpeg-wasm", "Webcom-Recording", "Browser-Recording"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/screenrecorder1.png", "/images/projects/screenrecorder2.png", "/images/projects/screenrecorder3.png"],
    liveLink: "https://record.addy.ie/",
    githubLink: "https://github.com/Max0709202/record",
  },
  {
    title: "Py-automl",
    description: "AutoML for tabular CSV data that trains optimized TensorFlow/Keras and XGBoost models and exports readable native Python pipelines instead of a black box.",
    tech: ["Python", "Deep-learning", "Tensorflow", "Sklearn", "Keras", "Tabular-data", "ML", "Pandas", "XGBoost", "AutoML"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/pyautoml1.png", "/images/projects/pyautoml2.png"],
    githubLink: "https://github.com/Max0709202/py-automl",
  },
  {
    title: "Health-business-service (ヘルスケア・ビジネス・サービス)",
    description: "AI Vita is a full-stack health and wellness platform with an AI-powered chat experience, diagnostic tools, personality assessment, reporting, and subscription workflows, built with Next.js + Express and integrated with Supabase, OpenAI, Stripe, and LINE.",
    tech: ["Typescript", "Stripe", "Chatbot", "Postgresql", "Healthcare", "Opeanai", "Image-analysis", "Voice-analysis", "Supabase", "LINE-integration", "Economy-news"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/health-business1.png", "/images/projects/health-business2.png", "/images/projects/health-business3.png"],
    liveLink: "https://execuwell.jp/",
    githubLink: "https://github.com/Max0709202/health-business-service",
  },
  {
    title: "M2Det (Detector M2)",
    description: "A single-shot object detector built on a multi-level feature pyramid (MLFPN).",
    tech: ["Python", "Computer-vision", "Deep-learning", "Pytorch", "Object-detection", "M2det", "Single-shot-detector", "Feature-pyramid"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/m2det1.png", "/images/projects/m2det2.png"],
    githubLink: "https://github.com/Max0709202/M2Det",
  },
  {
    title: "GPT-syn",
    description: "An intelligent voice assistant powered by GPT-4 with speech I/O, web search, Python code execution, and chat tools.",
    tech: ["Typescript", "Serverless", "Chatbot", "speech-to-text", "Voice-assistant", "Seb-search", "GPT-4"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/synthgpt1.png", "/images/projects/synthgpt2.png"],
    githubLink: "https://github.com/Max0709202/gpt-syn",
  },
  {
    title: "whatsapp-chatgpt",
    description: "WhatsApp bot built with Node.js and TypeScript that answers chats with OpenAI GPT and generates images with DALL·E via WhatsApp Web.",
    tech: ["Node.js", "Automation", "Typescript", "Openai", "Whatsapp", "mit-license", "Chatgpt"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/whatsappchatgpt1.png", "/images/projects/whatsappchatgpt2.png"],
    githubLink: "https://github.com/Max0709202/whatspp-chatgpt",
  },
  {
    title: "Image Converter",
    description: "Browser-based image compression and format conversion (AVIF, JPEG, JPEG XL, PNG, WebP) using WebAssembly—runs locally, no server uploads.",
    tech: ["React", "TypeScript", "Webassembly", "Wasm", "Image-converter", "Image-compression", "Image-optimization", "Tailwindcss", "Vite", "Avif"],
    gradient: "from-emerald-500/20 to-emerald-500/5",
    images: ["/images/projects/image_converter1.png", "/images/projects/image_converter2.png", "/images/projects/image_converter3.png"],
    liveLink: "https://squish.addy.ie/",
    githubLink: "https://github.com/Max0709202/image-converter",
  },
  {
    title: "Real Estate Portal (不動産ポータル)",
    description: "AI-powered digital business card platform for real estate professionals, featuring customizable card pages, built-in AI chatbot conversations, QR sharing, and Stripe-based billing (credit card, bank transfer, subscription renewal, and card update flows).",
    tech: ["PHP", "MySQL", "Stripe", "MySQL", "QR-code", "Bank-transfer", "AI-chatbot"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/realestate1.png", "/images/projects/realestate2.png", "/images/projects/realestate3.png"],
    liveLink: "https://www.ai-fcard.com/",
    githubLink: "https://github.com/Max0709202/real-estate-ai-card",
  },
  {
    title: "Cookbook",
    description: "Reusable TensorFlow 2 building blocks and helpers for GANs and image classification.",
    tech: ["Python", "Tensorflow", "Cookbook", "Gan"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/cookbook1.png", "/images/projects/cookbook2.png", "/images/projects/cookbook3.png"],
    githubLink: "https://github.com/Max0709202/cookbook",
  },
  {
    title: "Auto-reply system (自動返信システム)",
    description: "Auto-reply system is a system that automatically replies to emails.",
    tech: ["PHP", "Wordpress", "Auto-reply", "Contact-form", "Javascript"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/auto_reply1.png", "/images/projects/auto_reply2.png", "/images/projects/auto_reply3.png"],
    liveLink: "https://connectinternationalone.co.jp/",
  },
  {
    title: "Mapbox-GPS",
    description: "A Next.js fleet dashboard that uses Mapbox to simulate live GPS vehicle tracking in Dubai with ROI analytics and an admin configuration panel.",
    tech: ["Typescript", "Dashboard", "Mapbox", "Fleet-management", "Admin-panel", "GPS-tracking", "Tailwindcss", "Role-calculator"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/mapbox1.png", "/images/projects/mapbox2.png"],
    liveLink: "https://mapbox-gps.vercel.app/fleet",
    githubLink: "https://github.com/Max0709202/mapbox-GPS",
  },
  {
    title: "Beauty Cosmetics Landing Page (美容化粧品LP)",
    description: "I designed and developed a landing page for natural cosmetics, handling both the visual design and front-end implementation.",
    tech: ["Landing Page", "HTML", "CSS", "JavaScript", "SEO", "opensearch"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/herbalplus1.png", "/images/projects/herbalplus2.png", "/images/projects/herbalplus.png"],
    liveLink: "https://herbalplus.jp/"
  },
  {
    title: "Speaker-tracking",
    description: "Real-time browser-based speaker tracking app that uses voice feature analysis (pitch, formants, MFCC, and VAD) to detect, distinguish, and time multiple speakers locally without recording audio.",
    tech: ["React", "Machine-learning", "Audio-analysis", "Speaker-tracking"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/speaker-tracking1.png", "/images/projects/speaker-tracking2.png", "/images/projects/speaker-tracking3.png"],
    liveLink: "https://speaker-tracking-app.vercel.app/",
    githubLink: "https://github.com/Max0709202/speaker-tracking",
  },
  {
    title: "Theme migration (テーマ移行)",
    description: "Responsive, Bootstrap-based WordPress theme by Vektor Inc.; Customizer-ready, modular layouts (G2/G3), GPL‑2.0+.",
    tech: ["PHP", "Wordpress", "Theme-migration", "HTML", "CSS", "JavaScript", "Luxury-theme", "Lightning-theme", "Wordpres-customization"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/jkkcoop1.png", "/images/projects/jkkcoop2.png"],
    liveLink: "https://www.jkkcoop.net/",
    githubLink: "https://github.com/Max0709202/wp-migration",
  },
  {
    title: "Cancer Prediction",
    description: "This project uses a trained machine learning model to predict whether a breast tumor is benign or malignant from diagnostic input features.",
    tech: ["Python", "AI", "Healthcare", "Cancer-detection", "Machine-learning"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/cancerprediction1.png", "/images/projects/cancerprediction2.png"],
    githubLink: "https://github.com/Max0709202/cancer_prediction",
  },
  {
    title: "kachaka (カチカカ)",
    description: "kachaka is a factory that produces kachaka products.",
    tech: ["Landing Page", "HTML", "CSS", "JavaScript", "SEO", "opensearch"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/kachaka1.png", "/images/projects/kachaka2.png", "/images/projects/kachaka3.png"],
    liveLink: "https://kachaka.life/factory/",
  },
  {
    title: "Medical-AI",
    description: "`MediAI Intelligence Platform` is a healthcare AI web app that combines symptom-based disease prediction, drug recommendation, heart risk assessment, and an LLM-powered medical chatbot into a single production-ready Streamlit system",
    tech: ["Python", "Docker", "Data-science", "Chatbot", "Machine-learning", "Healthcare", "Ensemble-learning", "Heart-disease", "RAG", "Disease-prediction"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/medicalai1.png", "/images/projects/medicalai2.png", "/images/projects/medicalai3.png"],
    githubLink: "https://github.com/Max0709202/medical-ai",
  },
  {
    title: "Migration life (移住生活)",
    description: "I was responsible for the complete design and development of a website themed around the experience of relocating from urban areas to the countryside, handling the entire process from the initial planning stage through to the final implementation.",
    tech: ["PHP", "Wordpress", "Affinger", "HTML", "CSS", "JavaScript", "SEO", "Wordpres-customization"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/migrationlife1.png", "/images/projects/migrationlife2.png", "/images/projects/migrationlife3.png"],
    liveLink: "https://ijyu.life/",
  },
  {
    title: "Document-scanner",
    description: "Web-based document scanner built with React: capture or upload pages, crop and enhance them, then export a multi-page PDF.",
    tech: ["React", "PDF", "PWA", "Web-app", "Image-processing", "Document-scanner", "Cropping", "Tailwindcss", "Vite"],
    gradient: "from-emerald-500/20 to-emerald-500/5",
    images: ["/images/projects/document-scanner1.png", "/images/projects/document-scanner2.png", "/images/projects/document-scanner3.png"],
    liveLink: "https://scan.addy.ie/",
    githubLink: "https://github.com/Max0709202/document-scanner",
  },
  {
    title: "Image-enhance",
    description: "AI-powered image upscaling and enhancement in the browser, built with React, TypeScript, and TensorFlow.js (ESRGAN & MAXIM models).",
    tech: ["Webgl", "Machine-learing", "Client-side", "Super-resolution", "Image-enhancement", "Esrgan", "Image-upscaling", "Browser-ml"],
    gradient: "from-blue-500/20 to-blue-500/5",
    images: ["/images/projects/image-enhance1.png", "/images/projects/image-enhance2.png", "/images/projects/image-enhance3.png"],
    liveLink: "https://enhance.addy.ie/",
    githubLink: "https://github.com/Max0709202/image-enhance",
  },
  {
    title: "Background-remover",
    description: "Remove image backgrounds entirely in the browser with React, Vite, and Transformers.js (RMBG-1.4 by default, optional MODNet via WebGPU)—no uploads, privacy-first.",
    tech: ["React", "Machine-learning", "Privacy", "Webassembly", "Client-side", "Background-removal", "Image-processing", "Webgpu", "Vite", "huggingface", "transformers.js"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/background-remover1.png", "/images/projects/background-remover2.png", "/images/projects/background-remover3.png"],
    liveLink: "https://bg.addy.ie/",
    githubLink: "https://github.com/Max0709202/background-remove",
  },
  {
    title: "Obisidian-Life",
    description: "Minimal Obsidian vault for structured note-taking with templates and preconfigured settings.",
    tech: ["Obisidian", "Typescript", "Javascript"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/obisidian (1).jpg", "/images/projects/obisidian (2).jpg"],
    githubLink: "https://github.com/Max0709202/Obisidian-life",
  },
  {
    title: "Resonus face clinic (レゾナスフェイスクリニック)",
    description: "Resonus face clinic is a face clinic that provides face care services.",
    tech: ["Landing Page", "Clinic", "HTML", "CSS", "JavaScript"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/clinic1.png", "/images/projects/clinic2.png", "/images/projects/clinic3.png"],
    liveLink: "https://yamaguchisensei.com/",
  },
  {
    title: "Conversational-AI",
    description: "This project is a Conversational AI application designed to interact with users using natural language. It can be used for chatbots, virtual assistants, or customer support automation.",
    tech: ["Python", "NLP", "API-integration", "AI-assistant"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/conversationalai1.png", "/images/projects/conversationalai2.png", "/images/projects/conversationalai3.png"],
    githubLink: "https://github.com/Max0709202/conversational-AI",
  },
  {
    title: "Live-captioning",
    description: "Browser-based live captions for events using Chrome’s Web Speech API, with multi-language support and transcript export (SRT, WebVTT, plain text).",
    tech: ["A11y", "Captions", "Web-speech-api", "Speech-to-text", "Meetups", "Live-captioning"],
    gradient: "from-primary/20 to-primary/5",
    images: ["/images/projects/live-captioning1.png", "/images/projects/live-captioning2.png", "/images/projects/live-captioning3.png"],
    liveLink: "https://lc.midcamp.org/",
    githubLink: "https://github.com/Max0709202/live-captioning",
  },
  {
    title: "Booking System",
    description: "I enhanced the website and successfully attracted more customers by identifying and resolving numerous issues within the WordPress-based reservation system.",
    tech: ["PHP", "Wordpress","WooCommerce", "Traveler", "Paypal", "reCAPTCHA", "Booking-system"],
    gradient: "from-primary/20 to-primary/5",
    images: ["/images/projects/booking.png", "/images/projects/booking1.png", "/images/projects/booking21.png"],
    liveLink: "https://glowadventurextours.com/",
    githubLink: "https://github.com/Max0709202/Booking-System",
  },
  {
    title: "Dataset-training",
    description: "`Yet-Another-EfficientDet-Pytorch` is a PyTorch reimplementation of EfficientDet focused on near-official accuracy with practical scripts and pretrained weights for real-time object detection training, evaluation, and inference on COCO or custom datasets.",
    tech: ["Python", "Training", "Real-time", "Computer-vision", "Deep-learning", "Pytorch", "Object-detection", "Interface", "EfficientDet"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/datasettraining1.png", "/images/projects/datasettraining2.png"],
    githubLink: "https://github.com/Max0709202/dataset-training",
  },
  {
    title: "Twitter-analystic",
    description: "A Node.js/Express web app that connects to the Twitter API v2 and MongoDB to collect and visualize Twitter analytics (charts, auth, reCAPTCHA, email), built as a Web and Mobile Design course project.",
    tech: ["Node.js", "JWT", "Twitter", "MongoDB", "Gravatar", "reCaptcha"],
    gradient: "from-emerald-500/20 to-emerald-500/5",
    images: ["/images/projects/twitter-analystic1.png", "/images/projects/twitter-analystic2.png"],
    liveLink: "https://my-twitter-analytics-app.onrender.com/",
    githubLink: "https://github.com/Max0709202/twitter-analytic",
  },
  {
    title: "Youth-sports-club",
    description: "A web application for managing youth sports clubs, including teams, players, schedules, and results.",
    tech: ["Typescript", "Openai", "Club-management", "Youth-sports"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/youth-team1.png", "/images/projects/youth-team2.png", "/images/projects/youth-team3.png"],
    liveLink: "https://youth-sports-clubs.vercel.app/",
    githubLink: "https://github.com/Max0709202/youth-sports-clubs",
  },
  {
    title: "Alt-text-from-image",
    description: "Another Next.js app, it allows users to upload images or provide image URLs and receive generated img alt text descriptions using OpenAI's image model. It's perfect for improving accessibility and better search optimization practices in image-heavy websites.",
    tech: ["Typescript", "Scss", "Openai", "Image-analysis"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/alttextimage1.png", "/images/projects/alttextimage2.png", "/images/projects/alttextimage3.png"],
    liveLink: "https://alt-text-from-image.vercel.app/",
    githubLink: "https://github.com/Max0709202/alt-text-from-image",
  },
  {
    title: "Audio_AI",
    description: "A lightweight, client-side audio editor that combines waveform editing with AI-powered transcription and summary features.",
    tech: ["Javascript", "Audio-analysis"],
    gradient: "from-amber-500/20 to-amber-500/5",
    images: ["/images/projects/audioai1.png", "/images/projects/audioai2.png"],
    liveLink: "https://audiomass.co/",
    githubLink: "https://github.com/Max0709202/Audio_AI",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [techFilter, setTechFilter] = useState<TechFilterId>("all");
  const [activeImageByTitle, setActiveImageByTitle] = useState<
    Record<string, number>
  >({});
  const [modalImage, setModalImage] = useState<string | null>(null);

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) => projectMatchesTechFilter(p.tech, techFilter)),
    [techFilter]
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageByTitle((prev) => {
        const next = { ...prev };
        for (const p of projects) {
          const imageCount = p.images?.length ?? 0;
          if (imageCount <= 1) {
            next[p.title] = 0;
            continue;
          }
          const cur = next[p.title] ?? 0;
          next[p.title] = (cur + 1) % imageCount;
        }
        return next;
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalImage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16"
        >
          <div className="text-center lg:text-left">
            <p className="text-primary font-medium tracking-wide mb-4">
              Projects
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Featured <span className="text-gradient">Work</span>
            </h2>
          </div>
          <div
            className="flex flex-wrap justify-center lg:justify-end gap-2"
            role="tablist"
            aria-label="Filter projects by technology"
          >
            {TECH_FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={techFilter === id}
                onClick={() => setTechFilter(id)}
                className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                  techFilter === id
                    ? "border-primary bg-primary/15 text-primary font-medium"
                    : "border-border bg-card/80 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.length === 0 ? (
            <p className="md:col-span-2 text-center text-muted-foreground py-12">
              No projects match this technology filter.
            </p>
          ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden card-hover flex flex-col"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Project Images */}
              {project.images?.length > 0 && (
                <div className="relative w-full overflow-hidden">
                  <div className="relative w-full h-48 overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setModalImage(
                          project.images[
                            activeImageByTitle[project.title] ?? 0
                          ] ?? null
                        )
                      }
                      className="w-full h-full cursor-zoom-in"
                      aria-label={`Open ${project.title} preview ${(activeImageByTitle[project.title] ?? 0) + 1}`}
                    >
                      <img
                        src={
                          project.images[activeImageByTitle[project.title] ?? 0]
                        }
                        alt={`${project.title} preview ${(activeImageByTitle[project.title] ?? 0) + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </button>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                  </div>
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 p-2 bg-card/40 border-t border-border">
                      {project.images.map((image, imageIndex) => (
                        <button
                          key={`${image}-${imageIndex}`}
                          type="button"
                          onClick={() =>
                            setActiveImageByTitle((prev) => ({
                              ...prev,
                              [project.title]: imageIndex,
                            }))
                          }
                          className={`relative h-20 overflow-hidden rounded-md border transition-colors ${
                            (activeImageByTitle[project.title] ?? 0) ===
                            imageIndex
                              ? "border-primary"
                              : "border-border hover:border-primary/60"
                          }`}
                          aria-label={`Show ${project.title} preview ${imageIndex + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} preview ${imageIndex + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="relative p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed min-h-24">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-2 min-h-20 content-start">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project links */}
                <div className="flex flex-wrap gap-3 mt-auto min-h-10">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live link
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Github
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
          )}
        </div>
      </div>

      {modalImage && (
        <button
          type="button"
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8 flex items-center justify-center"
          aria-label="Close image preview"
        >
          <img
            src={modalImage}
            alt="Expanded project preview"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(event) => event.stopPropagation()}
          />
        </button>
      )}
    </section>
  );
};

export default Projects;
