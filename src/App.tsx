import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { 
  Terminal, 
  Search, 
  Coffee, 
  CloudOff, 
  Layers, 
  Cpu,
  Loader2
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
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tighter font-display text-[#293e8a]">
            {data.logo}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {links.map((link: any, i: number) => (
            <a 
              key={i} 
              href={link.href} 
              className={`hover:text-[#293e8a] transition-colors ${i === 0 ? 'text-[#293e8a] border-b-2 border-[#293e8a] pb-1' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a 
          href="#contact" 
          className="bg-[#293e8a] text-white px-5 py-2.5 rounded-md text-sm font-bold tracking-tight hover:bg-[#1f2f6b] transition-all active:scale-95 inline-block"
        >
          {data.cta}
        </a>
      </div>
    </nav>
  );
};

const Hero = ({ content }: { content: any }) => {
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
          <button className="bg-[#293e8a] text-white px-8 py-4 rounded-md font-bold text-lg hover:shadow-xl hover:shadow-blue-900/10 transition-all active:scale-95">
            {data.primary_btn}
          </button>
          <button className="bg-slate-200 text-slate-800 px-8 py-4 rounded-md font-bold text-lg hover:bg-slate-300 transition-all active:scale-95">
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
    <div className="min-h-screen">
      <Nav content={content?.nav} />
      <main>
        <Hero content={content?.hero} />
        <Features content={content?.features} />
        <Process content={content?.process} />
        <Contact />
      </main>
      <Footer content={content?.footer} />
    </div>
  );
}
