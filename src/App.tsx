import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Terminal, 
  Search, 
  Coffee, 
  CloudOff, 
  Layers, 
  Cpu,
  Loader2,
  ArrowLeft
} from "lucide-react";

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  search: Search,
  coffee: Coffee,
  cloud_off: CloudOff,
  architecture: Layers,
  cpu: Cpu
};

const Nav = ({ content }: { content: any }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  // Scroll spy logic
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = ["expertise", "code", "loop", "contact"];
      const scrollPos = window.scrollY + 150; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("expertise");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Handle cross-page scrolling
  useEffect(() => {
    // Check both hash (/#/#contact) and router state (passed via navigate)
    const scrollToId = location.hash.substring(1) || location.state?.scrollTo;
    
    if (location.pathname === "/" && scrollToId) {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash, location.state]);

  if (!content) return null;
  const { data, content: markdown } = content;
  
  const links = markdown.trim().replace(/^- /, '').split('\n- ').filter(Boolean).map((item: string) => {
    const lines = item.trim().split('\n');
    const label = lines[0].replace('label: "', '').replace('"', '');
    const href = lines[1].replace('  href: "', '').replace('"', '');
    return { label, href };
  });

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tighter font-display text-[#293e8a]">
            {data.logo}
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {links.map((link: any, i: number) => {
            const isAnchor = link.href.startsWith('#');
            const sectionId = link.href.substring(1);
            const isActive = isAnchor && activeSection === sectionId && location.pathname === "/";
            
            const handleClick = (e: React.MouseEvent) => {
              if (isAnchor) {
                if (location.pathname === '/') {
                  e.preventDefault();
                  const el = document.getElementById(sectionId);
                  el?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If we're on another page, navigate home and pass state
                  navigate('/', { state: { scrollTo: sectionId } });
                }
              }
            };

            return (
              <Link
                key={i}
                to="/"
                onClick={handleClick}
                className={`transition-all duration-300 relative pb-1 ${
                  isActive 
                    ? "text-[#293e8a] font-bold after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-[#293e8a]" 
                    : "hover:text-[#293e8a]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <Link 
          to="/"
          className="bg-[#293e8a] text-white px-5 py-2.5 rounded-md text-sm font-bold tracking-tight hover:bg-[#1f2f6b] transition-all active:scale-95 inline-block"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/', { state: { scrollTo: 'contact' } });
            }
          }}
        >
          {data.cta}
        </Link>
      </div>
    </nav>
  );
};

const Hero = ({ content }: { content: any }) => {
  const navigate = useNavigate();
  if (!content) return null;
  const { data, content: markdown } = content;
  
  return (
    <section id="expertise" className="pt-40 pb-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold font-display tracking-tighter leading-[0.95] mb-8">
          {data.title.split(data.highlight)[0]}
          <span className="text-[#4559a7]">{data.highlight}</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigate('/debug')}
            className="bg-[#293e8a] text-white px-8 py-4 rounded-md font-bold text-lg hover:shadow-xl hover:shadow-blue-900/10 transition-all active:scale-95"
          >
            {data.primary_btn}
          </button>
          <button 
            onClick={() => navigate('/manifest')}
            className="bg-slate-200 text-slate-800 px-8 py-4 rounded-md font-bold text-lg hover:bg-slate-300 transition-all active:scale-95"
          >
            {data.secondary_btn}
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 font-mono text-sm leading-relaxed relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#293e8a]"></div>
          <div className="markdown-code">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-xs border-t border-slate-50 pt-4">
            <Terminal size={14} />
            <span>{data.code_filename}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Features = ({ content }: { content: any }) => {
  if (!content) return null;
  const { data, content: markdown } = content;
  
  // Simple parser for the list in markdown content
  const features = markdown.trim().replace(/^- /, '').split('\n- ').filter(Boolean).map((item: string) => {
    const lines = item.trim().split('\n');
    const title = lines[0].replace('title: "', '').replace('"', '');
    const desc = lines[1].replace('  desc: "', '').replace('"', '');
    const icon = lines[2].replace('  icon: "', '').replace('"', '');
    return { title, desc, icon };
  });

  return (
    <section id="code" className="bg-slate-50 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#293e8a] mb-4 block">{data.label}</span>
          <h2 className="text-4xl font-bold font-display tracking-tight">{data.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f: any, i: number) => {
            const Icon = IconMap[f.icon] || Search;
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-8">
                  <Icon className="text-[#293e8a]" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 font-display">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Process = ({ content }: { content: any }) => {
  if (!content) return null;
  const { data, content: markdown } = content;
  
  // Simple parser for the list in markdown content
  const steps = markdown.trim().replace(/^- /, '').split('\n- ').filter(Boolean).map((item: string) => {
    const lines = item.trim().split('\n');
    const id = lines[0].replace('id: "', '').replace('"', '');
    const title = lines[1].replace('  title: "', '').replace('"', '');
    const desc = lines[2].replace('  desc: "', '').replace('"', '');
    return { id, title, desc };
  });

  return (
    <section id="loop" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#293e8a] mb-4 block">{data.label}</span>
          <h2 className="text-5xl font-bold font-display tracking-tight leading-tight mb-8">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="space-y-12">
          {steps.map((s: any, i: number) => (
            <div key={i} className="flex gap-8 group">
              <span className="text-4xl font-black font-display text-slate-200 group-hover:text-[#293e8a] transition-colors duration-300">
                {s.id}
              </span>
              <div>
                <h4 className="text-2xl font-bold mb-3 font-display">{s.title}</h4>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="bg-slate-100 py-32 px-6">
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-bold font-display tracking-tight mb-4">Need a flipper?</h2>
        <p className="text-slate-500">Tell us what's broken and we'll fix the bits.</p>
      </div>
      <a 
        href="mailto:hello@1010.se" 
        className="inline-block bg-[#293e8a] text-white px-12 py-5 rounded-md font-mono font-bold tracking-widest hover:bg-[#1f2f6b] transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10 text-xl"
      >
        HELLO@1010.SE
      </a>
    </div>
  </section>
);

const Footer = ({ content }: { content: any }) => {
  if (!content) return null;
  const { data, content: markdown } = content;

  const links = markdown.trim().replace(/^- /, '').split('\n- ').filter(Boolean).map((item: string) => {
    const lines = item.trim().split('\n');
    const label = lines[0].replace('label: "', '').replace('"', '');
    const href = lines[1].replace('  href: "', '').replace('"', '');
    return { label, href };
  });

  return (
    <footer className="py-16 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-lg font-bold font-display text-slate-900">
          {data.company}
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-slate-400 uppercase tracking-widest">
          {links.map((link: any, i: number) => (
            <a key={i} href={link.href} className="hover:text-[#293e8a] transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-xs text-slate-400">
          {data.copyright}
        </div>
      </div>
    </footer>
  );
};

const ManifestoLayout = ({ content }: { content: any }) => {
  const { data } = content;
  const sections = data.sections || [];

  return (
    <div className="pt-40 max-w-7xl mx-auto px-6">
       <header className="mb-24">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] mb-8">
              {data.title} <br/><span className="text-primary-container">{data.highlight}</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <p className="text-xl text-on-surface-variant font-medium max-w-sm border-l-4 border-secondary pl-6">
              {data.doctrine}
            </p>
          </div>
        </div>
      </header>

      {/* 01 & 02 */}
      <section className="grid md:grid-cols-2 gap-16 mb-32 items-center">
        <div className="space-y-12">
          {sections.slice(0, 2).map((s: any) => (
            <div key={s.id}>
              <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">{s.id} / {s.category}</span>
              <h2 className="text-4xl font-display font-bold mb-6 leading-tight">{s.title}</h2>
              <p className="text-on-surface-variant leading-relaxed max-w-md">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="relative aspect-square bg-surface-container rounded-xl overflow-hidden shadow-2xl">
          <img 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            src={sections[0]?.image || "https://picsum.photos/seed/tech-dashboard/1000/1000"} 
            alt="Technical Dashboard"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 03 */}
      {sections[2] && (
        <section className="mb-32">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-surface-container-low p-12 flex flex-col justify-between rounded-xl">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">{sections[2].id} / {sections[2].category}</span>
                <h2 className="text-4xl font-display font-bold mb-8 leading-tight">{sections[2].title}</h2>
                <p className="text-on-surface-variant leading-relaxed">{sections[2].description}</p>
              </div>
            </div>
            <div className="lg:col-span-2 relative min-h-[400px] overflow-hidden rounded-xl">
              <img 
                className="w-full h-full object-cover" 
                src={sections[2].image || "https://picsum.photos/seed/code-stream/1200/800"} 
                alt="Code Stream"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 max-w-xs shadow-lg border-l-2 border-primary">
                <p className="text-xs font-mono">{sections[2].trace_id}</p>
                <p className="text-sm font-medium mt-1">{sections[2].trace_note}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 04 & 05 */}
       <section className="grid lg:grid-cols-12 gap-16 mb-32 items-start">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-xl shadow-xl">
            <img 
              className="w-full h-full object-cover" 
              src={sections[3]?.image || "https://picsum.photos/seed/architecture/800/1000"} 
              alt="System Architecture"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-20 pt-12">
          {sections.slice(3, 5).map((s: any) => (
            <div key={s.id} className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">{s.id} / {s.category}</span>
              <h2 className="text-5xl font-display font-bold mb-8 leading-tight">{s.title}</h2>
              <p className="text-on-surface-variant leading-relaxed">{s.description}</p>
              {s.id === "04" && <div className="h-1 w-24 bg-slate-200 mt-8"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* 06 */}
      {sections[5] && (
        <section className="bg-primary-container text-white p-16 md:p-24 relative overflow-hidden rounded-xl mb-32">
          <div className="relative z-10 max-w-4xl">
            <span className="text-xs font-bold tracking-[0.4em] text-white/60 uppercase mb-12 block">{sections[5].id} / {sections[5].category}</span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-12 leading-tight">{sections[5].title}</h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-12">
              {sections[5].description}
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Search size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">{sections[5].panel}</p>
                <p className="text-sm opacity-70 italic">{sections[5].protocol}</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <Layers size={500} />
          </div>
        </section>
      )}
    </div>
  );
};

const GenericPage = ({ path }: { path: string }) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`content/${path}.md`);
        const text = await res.text();
        setContent(matter(text));
      } catch (error) {
        console.error("Failed to load page content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
    window.scrollTo(0, 0);
  }, [path]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 px-6 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#293e8a]" size={48} />
      </div>
    );
  }

  if (!content) return null;

  if (path === "manifest") {
    return <ManifestoLayout content={content} />;
  }

  return (
    <div className="pt-40 pb-24 px-6 max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-[#293e8a] font-bold mb-8 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold font-display tracking-tighter mb-6">
          {content.data.title}
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-12 border-b border-slate-100 pb-12">
          {content.data.description}
        </p>
        <div className="markdown-body">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [heroRes, featuresRes, processRes, navRes, footerRes] = await Promise.all([
          fetch('content/hero.md'),
          fetch('content/features.md'),
          fetch('content/process.md'),
          fetch('content/nav.md'),
          fetch('content/footer.md')
        ]);

        const [heroText, featuresText, processText, navText, footerText] = await Promise.all([
          heroRes.text(),
          featuresRes.text(),
          processRes.text(),
          navRes.text(),
          footerRes.text()
        ]);

        setContent({
          hero: heroText ? matter(heroText) : null,
          features: featuresText ? matter(featuresText) : null,
          process: processText ? matter(processText) : null,
          nav: navText ? matter(navText) : null,
          footer: footerText ? matter(footerText) : null
        });
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#293e8a]" size={48} />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav content={content?.nav} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero content={content?.hero} />
                <Features content={content?.features} />
                <Process content={content?.process} />
                <Contact />
              </>
            } />
            <Route path="/debug" element={<GenericPage path="debug" />} />
            <Route path="/manifest" element={<GenericPage path="manifest" />} />
          </Routes>
        </main>
        <Footer content={content?.footer} />
      </div>
    </Router>
  );
}
