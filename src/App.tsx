import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function useTypewriter(text: string, speed = 45, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return displayed;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/90 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-white tracking-tight">
          {/*Ephraen Voltaire Olatic*/}<span className="text-teal">Home</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/60 hover:text-teal transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[500px] h-[500px] -top-40 -left-40 bg-teal/5 rounded-full blur-[120px] animate-float" />
      <div
        className="absolute w-[400px] h-[400px] top-1/2 right-0 bg-teal/3 rounded-full blur-[100px]"
        style={{ animation: 'float 4s ease-in-out infinite 1s' }}
      />
      <div
        className="absolute w-[300px] h-[300px] bottom-0 left-1/3 bg-teal/4 rounded-full blur-[80px]"
        style={{ animation: 'float 5s ease-in-out infinite 2s' }}
      />
    </div>
  );
}

function Hero() {
  const tagline = 'I Build Apps with AI — Fast.';
  const typedTagline = useTypewriter(tagline);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center px-6">
        <p className="text-teal font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in-up">
          Welcome to my portfolio
        </p>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight"
          style={{ animation: 'fade-in-up 0.6s ease-out 0.15s forwards', opacity: 0 }}
        >
          Ephraen Voltaire Olatic
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-white/50 mb-10 max-w-xl mx-auto font-light min-h-[2.5rem] sm:min-h-[3rem]"
          style={{ animation: 'fade-in-up 0.6s ease-out 0.3s forwards', opacity: 0 }}
        >
          {typedTagline}
          <span className="inline-block w-[2px] h-[1em] bg-teal/70 ml-0.5 align-middle animate-pulse" />
        </p>
        <div style={{ animation: 'fade-in-up 0.6s ease-out 0.45s forwards', opacity: 0 }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dim text-dark font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-teal/25 hover:-translate-y-0.5"
          >
            View My Work
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-teal transition-colors animate-float"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useInView();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 md:gap-16 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="md:col-span-2 flex justify-center">
          <div className="relative">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center animate-pulse-ring">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-dark border-2 border-teal/40 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl">👋</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal rounded-full flex items-center justify-center">
              <span className="text-dark text-xs font-bold">AI</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            About <span className="text-teal">Me</span>
          </h2>
          <p className="text-white/60 leading-relaxed">
            I'm an aspiring developer navigating the new frontier of AI-assisted coding — where
            curiosity and the right tools matter more than years of syntax memorization.
          </p>
          <p className="text-white/60 leading-relaxed">
            My background isn't traditional; I came to development not through computer science
            lectures, but through a genuine obsession with building things that work. I use AI tools
            to accelerate what I create, to learn faster, and to punch above my experience level —
            and I believe that's not a shortcut, it's the skill.
          </p>
          <p className="text-white/60 leading-relaxed">
            I'm currently building my portfolio of projects, sharpening my problem-solving
            instincts, and looking for opportunities to collaborate, contribute, and grow alongside
            people who care about making great products. If you're building something interesting,
            I'd love to be in the room.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['5+ Apps Built', 'AI-First Workflow', 'Open to Opportunities'].map((chip) => (
              <span
                key={chip}
                className="px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const skills = [
  { emoji: '🤖', name: 'Claude AI' },
  { emoji: '⌨️', name: 'Cursor' },
  { emoji: '⚡', name: 'Bolt.new' },
  { emoji: '🎨', name: 'v0.dev' },
  { emoji: '⚛️', name: 'React' },
  { emoji: '🐙', name: 'GitHub' },
  { emoji: '▲', name: 'Vercel' },
  { emoji: '🗄️', name: 'Supabase' },
];

function Skills() {
  const { ref, isVisible } = useInView();

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-teal">Stack</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto">
            The AI-powered toolkit I use to go from idea to production in record time.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 flex flex-col items-center gap-3 hover:-translate-y-1.5 hover:border-teal/30 hover:bg-teal/[0.04] transition-all duration-300 cursor-default"
              style={{ transitionDelay: isVisible ? `${i * 50}ms` : '0ms' }}
            >
              <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                {skill.emoji}
              </span>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: 'SpendSight',
    description: 'Personal Finance Dashboard with Analytics.',
    tags: ['React', 'Supabase', 'Claude API'],
    demo: '#',
    github: '#',
  },
  {
    title: 'IdeaForge',
    description: 'AI-Powered Content Idea Generator & Studio.',
    tags: ['Next.js', 'Vercel', 'PostgreSQL'],
    demo: '#',
    github: '#',
  },
  {
    title: 'FlowBoard',
    description: 'Multi-Tenant Team Productivity SaaS.',
    tags: ['Bolt.new', 'TypeScript', 'AI'],
    demo: '#',
    github: '#',
  },
];

function Projects() {
  const { ref, isVisible } = useInView();

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Featured <span className="text-teal">Projects</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto">
            A selection of apps built with AI-assisted development workflows.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 flex flex-col hover:-translate-y-1 hover:border-teal/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal/20 transition-colors">
                <ExternalLink size={18} className="text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-teal/10 text-teal/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.demo}
                  className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-lg border border-teal/40 text-teal hover:bg-teal/10 transition-all duration-200"
                >
                  Live Demo
                </a>
                <a
                  href={project.github}
                  className="flex-1 text-center text-sm font-medium px-4 py-2.5 rounded-lg bg-white/[0.06] text-white/70 hover:bg-white/[0.1] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-6 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Let's Build <span className="text-teal">Something</span>
        </h2>
        <p className="text-white/50 mb-12 max-w-md mx-auto leading-relaxed">
          Have an idea? I'd love to hear about it. Let's turn your vision into a shipped product.
        </p>
        <div className="flex items-center justify-center gap-5">
          {[
            { icon: Mail, label: 'Email', href: 'mailto:ephraenvoltaireolatic@gmail.com' },
            { icon: Github, label: 'GitHub', href: 'https://github.com/ephraen1228' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ephraen-voltaire-olatic-aa350b267/' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-teal/30 hover:bg-teal/[0.06] transition-all duration-300"
              aria-label={label}
            >
              <Icon
                size={22}
                className="text-white/50 group-hover:text-teal transition-colors duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/30">
        <span>
          &copy; {new Date().getFullYear()} Ephraen Voltaire Olatic<span className="text-teal/60">.dev</span>
        </span>
        <span>Built with AI &amp; ambition</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
