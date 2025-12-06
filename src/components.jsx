import { useState, useEffect, useRef, useCallback } from 'react';

// --- Icons ---
const createIcon = (path) => (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={props.size || 24} 
    height={props.size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
  >
    {path}
  </svg>
);

export const Icons = {
  ArrowRight: createIcon(<path d="M5 12h14M12 5l7 7-7 7"/>),
  Terminal: createIcon(<><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>),
  BookOpen: createIcon(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>),
  ShieldAlert: createIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>),
  Database: createIcon(<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>),
  MapPin: createIcon(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
  Menu: createIcon(<><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></>),
  X: createIcon(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
  ChevronDown: createIcon(<polyline points="6 9 12 15 18 9"/>),
  Activity: createIcon(<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>),
  Recycle: createIcon(<><polyline points="7 19 7 23 13 23 13 19"/><path d="M2 9h20"/><path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/></>),
  ShoppingBag: createIcon(<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>),
  MousePointer2: createIcon(<path d="m12 6 2-2-2-2-2 2 2 2zm0 0v12"/>),
  Copy: createIcon(<><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>),
  ExternalLink: createIcon(<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>)
};

// --- Hooks ---
export const useScrambleText = (text, speed = 30) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1/3; 
    }, speed);
  }, [text, isScrambling, speed]);

  return { displayText, scramble };
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = ev => setMousePosition({ x: ev.clientX, y: ev.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

export const useOnScreen = (ref, rootMargin = "-50px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [ref, rootMargin]);
  return isIntersecting;
};

// --- Components ---
export const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A') {
        setVariant('hover');
      } else if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference top-0 left-0"
         style={{ transform: `translate(${x}px, ${y}px)` }}>
      <div className={`
        transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2
        ${variant === 'hover' ? 'w-16 h-16 bg-white opacity-80' : 'w-4 h-4 bg-white'}
        ${variant === 'text' ? 'w-1 h-8 bg-white' : 'rounded-full'}
      `} />
      {variant === 'hover' && (
         <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-[#a3e635] rounded-full animate-ping opacity-30" />
      )}
    </div>
  );
};

export const DecryptText = ({ text, className }) => {
  const { displayText, scramble } = useScrambleText(text);
  return (
    <span onMouseEnter={scramble} className={`cursor-default inline-block ${className}`}>
      {displayText}
    </span>
  );
};

export const NeoButton = ({ children, variant = "primary", className = "", icon: Icon, onClick, ...props }) => {
  const baseStyles = "relative px-6 md:px-8 py-3 md:py-4 font-bold uppercase tracking-wider transition-all duration-200 group border-2 border-black flex items-center justify-center gap-3 neo-shadow active:translate-y-1 active:translate-x-1 active:shadow-none";
  
  const variants = {
    primary: "bg-[#a3e635] text-black hover:bg-black hover:text-[#a3e635]",
    secondary: "bg-white text-black hover:bg-[#ff00ff] hover:text-white",
    dark: "bg-black text-white hover:bg-[#00ffff] hover:text-black",
    outline: "bg-transparent text-black hover:bg-black hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2 font-mono text-sm md:text-base">
        {children}
        {Icon && <Icon size={18} />}
      </span>
    </button>
  );
};

export const RevealSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-1'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const Badge = ({ text, color = "lime" }) => {
  const colors = {
    lime: "bg-[#a3e635] text-black",
    pink: "bg-[#ff00ff] text-white",
    cyan: "bg-[#00ffff] text-black",
    black: "bg-black text-white"
  };
  return (
    <span className={`inline-flex items-center gap-2 border-2 border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest neo-shadow-sm ${colors[color]}`}>
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
      {text}
    </span>
  );
};

export const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 60; 
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Interactive Mouse Logic
    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = Math.random() > 0.5 ? '#a3e635' : '#000000'; 
      }

      update() {
        // Mouse Interaction
        if (mouse.x) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Return to original trajectory if not hovered
                if (this.x !== this.baseX) {
                     let dx = this.x - this.baseX;
                     this.x -= dx/10;
                }
                if (this.y !== this.baseY) {
                     let dy = this.y - this.baseY;
                     this.y -= dy/10;
                }
            }
        }

        this.x += this.vx;
        this.y += this.vy;
        
        // Reset base positions periodically to follow the flow
        this.baseX = this.x;
        this.baseY = this.y;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a) => {
          particles.forEach((b) => {
              let dx = a.x - b.x;
              let dy = a.y - b.y;
              let distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 120) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(0,0,0,${1 - distance/120})`;
                  ctx.lineWidth = 0.5;
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
              }
          })
      })

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30" />;
};
