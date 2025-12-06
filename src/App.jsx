import { useState, useEffect } from 'react';
import { 
  Icons, CustomCursor, DecryptText, NeoButton, RevealSection, Badge, ParticleNetwork 
} from './components';

const { 
  ArrowRight, Terminal, BookOpen, ShieldAlert, Database, MapPin, 
  Copy, ExternalLink, Menu, X, ChevronDown, Activity, Recycle, 
  ShoppingBag 
} = Icons;

// Preloader
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
      
      const texts = ["LOADING ASSETS", "CONNECTING DB", "DECRYPTING", "STARTING ENGINE"];
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[10000] flex flex-col justify-center items-center text-[#a3e635] font-mono">
      <div className="w-64 md:w-96">
         <div className="flex justify-between mb-2 text-xs">
            <span>{text}</span>
            <span>{Math.min(100, progress)}%</span>
         </div>
         <div className="h-4 border-2 border-[#a3e635] p-0.5">
           <div className="h-full bg-[#a3e635]" style={{ width: `${Math.min(100, progress)}%` }} />
         </div>
      </div>
      <div className="mt-8 text-4xl animate-bounce">LAILIN.TECH</div>
    </div>
  );
};

// Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
     { name: 'HOME', to: '#hero' },
     { name: 'HOW IT WORKS', to: '#process' },
     { name: 'SOLUTIONS', to: '#solutions' },
     { name: 'ABOUT', to: '#about' },
     { name: 'FAQ', to: '#faq' },
     { name: 'CONTACT', to: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 py-4 mix-blend-exclusion text-white flex justify-between items-center">
         <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#a3e635] border-2 border-white flex items-center justify-center">
               <span className="font-black text-black">LL</span>
            </div>
            <div className="leading-tight">
               <h1 className="font-bold text-lg tracking-tighter">LAILIN TECH</h1>
               <p className="text-[10px] tracking-widest opacity-80">CAMPUS LOOP</p>
            </div>
         </div>

         <div className="hidden md:flex gap-6 font-mono text-sm font-bold">
            {links.map(link => (
               <a key={link.name} href={link.to} className="hover:text-[#a3e635] transition-colors decoration-2 hover:underline underline-offset-4">
                 {link.name}
               </a>
            ))}
            <button className="border border-white px-3 py-1 text-xs hover:bg-white hover:text-black transition-colors">
               MINI PROGRAM
            </button>
         </div>

         <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
         </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
         <div className="fixed inset-0 bg-[#a3e635] z-40 flex flex-col justify-center items-center gap-6 animate-float">
            {links.map(link => (
               <a 
                 key={link.name} 
                 href={link.to} 
                 onClick={() => setIsOpen(false)}
                 className="text-4xl font-black text-black hover:text-white hover:italic transition-all"
               >
                 {link.name}
               </a>
            ))}
         </div>
      )}
    </>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
       <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-8">
             <div className="inline-block">
               <Badge text="SYSTEM ONLINE" color="lime" />
               <Badge text="V2.0" color="black" />
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                <span className="block hover:text-stroke-1 hover:text-transparent transition-all duration-300">CAMPUS</span>
                <span className="block text-[#a3e635] glitch-wrapper" data-text="LAILIN TEXTBOOK">LAILIN TEXTBOOK</span>
                <span className="block flex items-center gap-4">
                   LOOP
                   <span className="text-xl md:text-3xl border-2 border-black px-4 py-1 font-mono bg-white rotate-3">
                      EST. 2023
                   </span>
                </span>
             </h1>

             <p className="text-lg md:text-xl font-medium max-w-xl border-l-4 border-black pl-6 py-2 bg-white/50 backdrop-blur-sm">
                把「买新书很贵 / 旧书扔不掉」变成一个正常的校园基础设施。<br/>
                <span className="bg-black text-white px-1">来霖科技</span> 出品，让知识循环更酷一点。
             </p>

             <div className="flex flex-col sm:flex-row gap-4">
                <NeoButton variant="primary" icon={ArrowRight} onClick={() => document.getElementById('product').scrollIntoView({behavior: 'smooth'})}>
                   <DecryptText text="启动 来霖教材" />
                </NeoButton>
                <NeoButton variant="outline" icon={Terminal} onClick={() => document.getElementById('process').scrollIntoView({behavior: 'smooth'})}>
                   如何运作
                </NeoButton>
             </div>
          </div>

          {/* Visual Graphic (Interactive Card) */}
          <div className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000">
             {/* Back Card */}
             <div className="absolute w-80 h-[450px] bg-black border-4 border-black rotate-[-6deg] translate-x-[-20px]"></div>
             {/* Middle Card */}
             <div className="absolute w-80 h-[450px] bg-[#00ffff] border-4 border-black rotate-[6deg] translate-x-[20px] flex items-center justify-center">
                <div className="text-center font-mono font-bold">
                   <div className="text-6xl mb-2">♻</div>
                   <div>RECYCLE</div>
                   <div>REUSE</div>
                   <div>REDUCE</div>
                </div>
             </div>
             {/* Front Card (Phone Mockup style) */}
             <div className="relative w-80 h-[450px] bg-white border-4 border-black p-4 flex flex-col neo-shadow hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out">
                <div className="border-b-4 border-black pb-4 mb-4 flex justify-between items-center">
                   <span className="font-black text-xl">来霖教材.EXE</span>
                   <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                   </div>
                </div>
                <div className="flex-1 bg-[#f3f4f6] border-2 border-black p-2 space-y-2 font-mono text-xs overflow-hidden">
                   <div className="bg-white border border-black p-2 neo-shadow-sm">
                      <div className="flex justify-between font-bold"><span>高等数学(上)</span><span>¥15</span></div>
                      <div className="text-gray-500">同济第七版 / 9成新</div>
                   </div>
                   <div className="bg-white border border-black p-2 neo-shadow-sm">
                      <div className="flex justify-between font-bold"><span>大学物理</span><span>¥12</span></div>
                      <div className="text-gray-500">含重点笔记</div>
                   </div>
                   <div className="bg-[#a3e635] border border-black p-2 mt-4 text-center font-bold cursor-pointer hover:bg-black hover:text-[#a3e635]">
                      立即预订 &gt;&gt;
                   </div>
                   <div className="mt-8 text-[10px] text-center opacity-50">
                      LOADING CAMPUS DATA...
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// Pain Points Section
const PainPoints = () => {
   const points = [
      { title: "EXPENSIVE", desc: "新书一学期几百起步，很多是为了「点名」而买。", color: "bg-[#ff9999]" },
      { title: "WASTEFUL", desc: "毕业/换寝室时，纸箱里最重的那一段永远是教材。", color: "bg-[#99ccff]" },
      { title: "CHAOTIC", desc: "想买二手书，只能在各种群、帖子和墙上小广告里乱翻。", color: "bg-[#ffff99]" }
   ];

   return (
      <section className="py-20 border-y-4 border-black bg-[#f8f8f8]">
         <div className="max-w-7xl mx-auto px-6">
            <RevealSection>
               <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase">
                  Reality <span className="text-[#ff00ff] bg-black px-2">Check</span>
               </h2>
            </RevealSection>
            
            <div className="grid md:grid-cols-3 gap-8">
               {points.map((pt, idx) => (
                  <RevealSection key={idx} delay={idx * 100}>
                     <div className={`h-full border-4 border-black p-6 ${pt.color} neo-shadow hover:-translate-y-2 transition-transform`}>
                        <h3 className="text-2xl font-black mb-4 border-b-2 border-black pb-2">{pt.title}</h3>
                        <p className="font-bold text-sm md:text-base leading-relaxed">{pt.desc}</p>
                     </div>
                  </RevealSection>
               ))}
            </div>
         </div>
      </section>
   );
};

// Process Section
const Process = () => {
   return (
      <section id="process" className="py-24 bg-black text-white relative overflow-hidden">
         {/* Decorative Grid */}
         <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <RevealSection>
               <div className="flex items-center gap-4 mb-16">
                  <div className="w-12 h-12 bg-[#a3e635] text-black flex items-center justify-center font-black text-2xl border-2 border-white">
                     <Activity />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black">HOW IT WORKS</h2>
               </div>
            </RevealSection>

            <div className="grid lg:grid-cols-3 gap-12">
               {[
                  { step: "01", title: "RECYCLE / 回收", icon: Recycle, text: "在校内回收点，一口气处理掉一堆书。系统登记学号与书目，快速结算。" },
                  { step: "02", title: "MANAGE / 管理", icon: Database, text: "来霖负责分类、质检、入库、贴标签。把「一堆乱书」变成一张整齐的库存表。" },
                  { step: "03", title: "ORDER / 预订", icon: ShoppingBag, text: "下一届学生在小程序里直接预订。按课程、书名搜索，所见即所得。" }
               ].map((item, i) => (
                  <RevealSection key={i} delay={i * 150}>
                     <div className="group relative bg-[#1a1a1a] border-2 border-[#333] p-8 hover:border-[#a3e635] transition-colors duration-300 h-full">
                        <div className="absolute -top-6 -right-6 text-8xl font-black text-[#333] group-hover:text-[#a3e635] transition-colors duration-300 opacity-50 select-none">
                           {item.step}
                        </div>
                        <item.icon className="text-white w-12 h-12 mb-6 group-hover:text-[#a3e635]" />
                        <h3 className="text-2xl font-bold mb-4 text-[#a3e635]">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed font-mono text-sm">
                           {item.text}
                        </p>
                     </div>
                  </RevealSection>
               ))}
            </div>
         </div>
      </section>
   );
};

// FAQ Accordion
const FaqItem = ({ question, answer, index }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b-4 border-black bg-white group">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex justify-between items-center p-6 text-left transition-all duration-200 ${
               isOpen ? 'bg-[#a3e635] text-black' : 'hover:bg-black hover:text-white'
            }`}
         >
            <div className="flex items-center gap-4">
               <span className={`font-mono font-bold text-xl ${isOpen ? 'text-black' : 'text-[#a3e635]'}`}>
                  {String(index + 1).padStart(2, '0')}
               </span>
               <span className="font-bold text-lg md:text-xl uppercase tracking-tight">{question}</span>
            </div>
            <div className={`transform transition-transform duration-300 border-2 border-current w-8 h-8 flex items-center justify-center ${isOpen ? 'rotate-180 bg-black text-[#a3e635]' : 'bg-white text-black'}`}>
               {isOpen ? '-' : '+'}
            </div>
         </button>
         <div className={`overflow-hidden transition-all duration-300 bg-white ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="p-6 border-t-2 border-black border-dashed bg-[#f9f9f9]">
               <p className="font-mono text-sm md:text-base leading-relaxed border-l-4 border-[#ff00ff] pl-4">
                  {answer}
               </p>
            </div>
         </div>
      </div>
   );
};

const FAQ = () => {
   const faqs = [
      { q: "来霖教材现在已经在哪些学校运营了？", a: "项目目前聚焦于西南大学校内的深度运营，进行试点。我们采取'单点验证-打磨模式-跨校复制'的稳健策略，确保每一步都扎实可行。" },
      { q: "二手书的价格谁说了算？", a: "由「规则 + 现实」共同决定。根据成色、版本、热门程度和新书价格设定区间，并结合学校供需微调。" },
      { q: "老师或学校管理者如何合作？", a: "我们需要：1.教材存放空间；2.梳理闲置情况；3.指定对接人员。点击下方联系我们，定制方案。" },
      { q: "交易安全怎么保证？", a: "集中回收 + 平台管理 + 必要的访问控制。在取得资质前，不提供经营性互联网信息服务。" },
     { q: "如何保证不会收到盗版书？", a: "我们建立了多重鉴别机制：ISBN数据库比对 + 人工目视检查 + 正版出版社标识核验。一旦发现盗版或非法出版物，将立即拒收并上报相关部门。项目将严格办理《出版物经营许可证》，对盗版零容忍。" }
   ];

   return (
      <section id="faq" className="py-24 bg-[#00ffff] border-b-4 border-black relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '20px 20px'}}></div>
         
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <RevealSection>
               <div className="mb-12 text-center">
                  <h2 className="text-6xl md:text-8xl font-black mb-4 glitch-wrapper" data-text="FAQ">FAQ</h2>
                  <p className="font-bold bg-black text-white inline-block px-4 py-2 uppercase tracking-widest">Frequently Asked Questions</p>
               </div>
            </RevealSection>
            <div className="border-4 border-black neo-shadow bg-white">
               {faqs.map((f, i) => <FaqItem key={i} index={i} question={f.q} answer={f.a} />)}
            </div>
         </div>
      </section>
   );
};

// Contact Form (Brutalist Style)
const Contact = () => {
   const [formData, setFormData] = useState({ name: '', school: '', message: '' });
   const [status, setStatus] = useState('idle'); // idle, submitting, success, error

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (status === 'submitting') return;
      setStatus('submitting');
      
      try {
         // Assuming API is available at api.lailinkeji.com
         const res = await fetch('https://api.lailinkeji.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
         });
         
         if (res.ok) {
            setStatus('success');
            setFormData({ name: '', school: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
         } else {
            setStatus('error');
         }
      } catch (err) {
         console.error(err);
         setStatus('error');
      }
   };

   return (
      <section id="contact" className="py-24 bg-[#a3e635] border-y-4 border-black">
         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
            <RevealSection>
               <h2 className="text-5xl md:text-7xl font-black mb-8">
                  LET'S<br/>TALK.
               </h2>
               <div className="bg-black text-white p-8 border-4 border-white neo-shadow">
                  <h3 className="text-xl font-bold mb-4 text-[#a3e635] font-mono">CONTACT INFO</h3>
                  <div className="space-y-4 font-mono text-sm">
                     <p>EMAIL: contact@lailinkeji.com</p>
                     <p>PARTNERS: campus@lailinkeji.com</p>
                     <p>ADDRESS: 成都高新区天府大道中段530号</p>
                     <p className="pt-4 border-t border-gray-700">无论你是学生、老师还是校方管理人员，欢迎留言。</p>
                  </div>
               </div>
            </RevealSection>

            <RevealSection delay={200}>
               <form className="bg-white border-4 border-black p-6 md:p-8 neo-shadow space-y-6" onSubmit={handleSubmit}>
                  <div>
                     <label className="block font-bold mb-2 uppercase">Name / 姓名</label>
                     <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-mono focus:outline-none focus:bg-[#ff00ff] focus:text-white transition-colors disabled:opacity-50" 
                     />
                  </div>
                  <div>
                     <label className="block font-bold mb-2 uppercase">School / 学校</label>
                     <input 
                        type="text" 
                        value={formData.school}
                        onChange={e => setFormData({...formData, school: e.target.value})}
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-mono focus:outline-none focus:bg-[#00ffff] transition-colors disabled:opacity-50" 
                     />
                  </div>
                  <div>
                     <label className="block font-bold mb-2 uppercase">Message / 留言</label>
                     <textarea 
                        rows="4" 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-mono focus:outline-none focus:bg-black focus:text-[#a3e635] transition-colors disabled:opacity-50"
                     ></textarea>
                  </div>
                  
                  <button 
                    disabled={status === 'submitting'}
                    className="w-full bg-black text-white font-bold py-4 text-xl hover:bg-[#ff00ff] hover:text-black border-2 border-transparent hover:border-black transition-all disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {status === 'submitting' && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                     {status === 'submitting' ? 'TRANSMITTING...' : 
                      status === 'success' ? 'MESSAGE RECEIVED' : 
                      status === 'error' ? 'ERROR - RETRY?' : 'SEND TRANSMISSION'}
                  </button>
                  
                  {status === 'success' && (
                    <div className="bg-[#a3e635] border-2 border-black p-3 font-mono text-sm text-center font-bold animate-pulse">
                       // ACKNOWLEDGED. END OF LINE.
                    </div>
                  )}
               </form>
            </RevealSection>
         </div>
      </section>
   );
};

// Footer
const Footer = () => (
   <footer className="bg-black text-white py-12 font-mono text-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 relative z-10">
         <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">LAILIN TECH</h2>
            <p className="text-gray-400 max-w-xs">
               构建可持续的校园生态，提供卓越的软件技术服务。<br/>
               成都来霖科技有限公司 © 2025
            </p>
            <div className="mt-4 inline-block border border-gray-600 px-2 py-1 rounded-full text-xs text-gray-400 hover:border-white hover:text-white cursor-pointer">
               蜀ICP备2025171118号
            </div>
         </div>
         <div>
            <h3 className="text-[#a3e635] font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-gray-400">
               <li><a href="/terms.html" className="hover:text-white cursor-pointer block">用户协议 (Terms)</a></li>
               <li><a href="/privacy.html" className="hover:text-white cursor-pointer block">隐私政策 (Privacy)</a></li>
               <li className="hover:text-white cursor-pointer">合规信息</li>
            </ul>
         </div>
         <div>
            <h3 className="text-[#a3e635] font-bold mb-4">SOCIAL</h3>
            <div className="flex gap-4">
               <div className="w-8 h-8 bg-white rounded-full"></div>
               <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
         </div>
      </div>
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-0 w-full text-[15vw] font-black text-[#111] leading-none select-none pointer-events-none text-center">
         LAILIN
      </div>
   </footer>
);

// Marquee Strip
const Marquee = ({ text, reverse }) => (
   <div className="bg-[#a3e635] border-y-4 border-black py-3 overflow-hidden flex whitespace-nowrap">
      <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
         {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl md:text-4xl font-black mx-4 uppercase flex items-center gap-4">
               {text} <span className="text-black">///</span>
            </span>
         ))}
      </div>
   </div>
);

// Main App Component
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="noise-bg"></div>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
         <div className="min-h-screen flex flex-col">
            <CustomCursor />
            <Navbar />
            <ParticleNetwork />
            
            <main className="flex-grow">
               <Hero />
               <Marquee text="SUSTAINABLE CAMPUS • CIRCULAR ECONOMY • SMART TECH" />
               <PainPoints />
               <Process />
               
               {/* Green Impact Section */}
               <section className="py-24 border-y-4 border-black bg-white">
                  <div className="max-w-7xl mx-auto px-6">
                     <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase">Green Impact</h2>
                        <p className="text-xl font-mono bg-black text-[#a3e635] inline-block px-4 py-1">不只是省钱，更是为地球减负</p>
                     </div>
                     <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-[#a3e635] border-4 border-black p-8 neo-shadow hover:-translate-y-2 transition-transform">
                           <div className="text-6xl mb-6 border-4 border-black bg-white w-24 h-24 flex items-center justify-center mx-auto neo-shadow-sm">📄</div>
                           <div className="text-5xl font-black mb-2">~10<span className="text-2xl">吨</span></div>
                           <div className="font-bold border-t-4 border-black pt-4 mt-4">节约纸张 / 年</div>
                           <div className="text-xs font-mono mt-2 bg-black text-white inline-block px-2">按循环20,000册估算</div>
                        </div>
                        <div className="bg-[#ff00ff] border-4 border-black p-8 neo-shadow hover:-translate-y-2 transition-transform">
                           <div className="text-6xl mb-6 border-4 border-black bg-white w-24 h-24 flex items-center justify-center mx-auto neo-shadow-sm">🌲</div>
                           <div className="text-5xl font-black mb-2">~180<span className="text-2xl">棵</span></div>
                           <div className="font-bold border-t-4 border-black pt-4 mt-4">保护树木 / 年</div>
                           <div className="text-xs font-mono mt-2 bg-black text-white inline-block px-2">成材大树免于砍伐</div>
                        </div>
                        <div className="bg-[#00ffff] border-4 border-black p-8 neo-shadow hover:-translate-y-2 transition-transform">
                           <div className="text-6xl mb-6 border-4 border-black bg-white w-24 h-24 flex items-center justify-center mx-auto neo-shadow-sm">☁️</div>
                           <div className="text-5xl font-black mb-2">~11<span className="text-2xl">吨</span></div>
                           <div className="font-bold border-t-4 border-black pt-4 mt-4">减少碳排 / 年</div>
                           <div className="text-xs font-mono mt-2 bg-black text-white inline-block px-2">LCA模型: 0.55kg/本</div>
                        </div>
                     </div>
                     <div className="mt-16 text-center">
                        <div className="inline-flex flex-col md:flex-row items-center gap-4 border-4 border-black p-4 bg-[#f0f0f0] neo-shadow">
                           <span className="text-xl font-bold uppercase">Annual Saving Projection</span>
                           <div className="bg-black text-[#a3e635] px-6 py-2 text-2xl font-black font-mono border-2 border-[#a3e635]">
                              ¥ 700,000+
                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Project Detail Section */}
                <section id="product" className="py-24 bg-[#f8f8f8] border-b-4 border-black">
                   <div className="max-w-6xl mx-auto px-6">
                      <RevealSection>
                         <div className="border-4 border-black bg-white neo-shadow relative">
                            {/* Window Header */}
                            <div className="bg-black text-white px-4 py-2 flex justify-between items-center border-b-4 border-black">
                               <span className="font-mono font-bold">LAILIN_TEXTBOOK_SPEC_SHEET.TXT</span>
                               <div className="flex gap-2">
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                                  <div className="w-3 h-3 bg-white rounded-full opacity-50"></div>
                               </div>
                            </div>
                            
                            <div className="p-8 md:p-12">
                               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b-4 border-black pb-8">
                                  <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
                                     Lailin<br/>Textbook
                                  </h2>
                                  <div className="flex flex-col items-end gap-2">
                                     <Badge text="STATUS: PILOT" color="lime" />
                                     <Badge text="VER: 2.0.4" color="black" />
                                  </div>
                               </div>
                               
                               <div className="grid md:grid-cols-2 gap-12 font-mono">
                                  <div className="space-y-6 text-sm md:text-base">
                                     <div>
                                        <strong className="bg-black text-white px-2 py-1 mb-2 inline-block uppercase">Core Function</strong>
                                        <p className="border-l-4 border-black pl-4 py-2">集中回收 + 统一管理 + 校园内交付</p>
                                     </div>
                                     <div>
                                        <strong className="bg-black text-white px-2 py-1 mb-2 inline-block uppercase">Current Status</strong>
                                        <p className="border-l-4 border-black pl-4 py-2">微信小程序内测中。线下网点筹备中。预计毕业季/开学季全量启动。</p>
                                     </div>
                                     <div>
                                        <strong className="bg-black text-white px-2 py-1 mb-2 inline-block uppercase">Pricing Model</strong>
                                        <p className="border-l-4 border-black pl-4 py-2">算法定价：(新旧程度 x 版本系数) / 市场供需</p>
                                     </div>
                                  </div>
                                  
                                  <div className="bg-black text-[#00ffff] p-6 border-4 border-[#00ffff] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                     <p className="mb-4 font-black text-xl border-b-2 border-[#00ffff] pb-2">&gt; WHY_MINI_PROGRAM?</p>
                                     <ul className="space-y-3 text-sm">
                                        <li className="flex gap-3">
                                           <span className="text-[#ff00ff]">[+]</span> 无需下载，扫码即用
                                        </li>
                                        <li className="flex gap-3">
                                           <span className="text-[#ff00ff]">[+]</span> 易于在课程群传播
                                        </li>
                                        <li className="flex gap-3">
                                           <span className="text-[#ff00ff]">[+]</span> 直接对接微信支付
                                        </li>
                                     </ul>
                                  </div>
                               </div>

                               <div className="mt-12 grid md:grid-cols-3 gap-6">
                                  <div className="border-4 border-black p-4 bg-[#fff5f5] hover:bg-[#ff9999] transition-colors">
                                     <div className="text-xs font-bold uppercase mb-2 border-b-2 border-black pb-1">SAVING RATE</div>
                                     <div className="text-4xl font-black">70-80%</div>
                                     <div className="text-[10px] font-mono mt-1 opacity-70">VS BRAND NEW</div>
                                  </div>
                                  <div className="border-4 border-black p-4 bg-[#f0fff4] hover:bg-[#a3e635] transition-colors">
                                     <div className="text-xs font-bold uppercase mb-2 border-b-2 border-black pb-1">BREAK EVEN</div>
                                     <div className="text-4xl font-black">3.5K<span className="text-lg">/YR</span></div>
                                     <div className="text-[10px] font-mono mt-1 opacity-70">BASED ON 60% GP</div>
                                  </div>
                                  <div className="border-4 border-black p-4 bg-[#ebf8ff] hover:bg-[#00ffff] transition-colors">
                                     <div className="text-xs font-bold uppercase mb-2 border-b-2 border-black pb-1">TARGET</div>
                                     <div className="text-4xl font-black">20K+</div>
                                     <div className="text-[10px] font-mono mt-1 opacity-70">15% PENETRATION</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </RevealSection>
                   </div>
                </section>

               <Marquee text="REDUCE WASTE • SAVE MONEY • BUILD COMMUNITY" reverse />
               
               {/* About / Company Info */}
               <section id="about" className="py-24 bg-[#00ffff] border-b-4 border-black relative">
                  <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                     <RevealSection>
                        <div className="relative">
                           <div className="absolute -inset-4 bg-black border-2 border-white rotate-2"></div>
                           <div className="relative bg-white border-4 border-black p-8 neo-shadow">
                              <h3 className="text-2xl font-black mb-4">ABOUT LAILIN</h3>
                              <p className="mb-4 font-medium">
                                 成立于 2023 年 12 月，注册于中国（四川）自由贸易试验区成都高新区。
                              </p>
                              <p className="mb-2 text-sm font-bold text-blue-700">
                                 <span className="inline-block w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                                 技术支持：成都来霖科技有限公司
                              </p>
                              <p className="mb-4 text-sm font-bold text-blue-700">
                                 <span className="inline-block w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
                                 运营主体：重庆来霖科技有限公司<span className="text-gray-400 text-xs ml-1">(拟注册)</span>
                              </p>
                              <p className="text-xs font-mono text-gray-500 border-l-2 border-gray-300 pl-3">
                                 ⚖️ 合规承诺：项目将依法申办《出版物经营许可证》，确保二手教材业务阳光化、规范化运营。
                              </p>
                              <p className="text-sm font-mono text-gray-600 mt-4">
                                 我们是一支从寝室、图书馆和楼道堆书里长出来的团队。深知痛点，所以给出解法。
                              </p>
                           </div>
                        </div>
                     </RevealSection>
                     <RevealSection delay={200}>
                         <h2 className="text-4xl md:text-6xl font-black leading-none text-black mix-blend-multiply">
                            MISSION:<br/>
                            DATA DRIVEN<br/>
                            RECYCLING.
                         </h2>
                     </RevealSection>
                  </div>
               </section>

               <FAQ />
               <Contact />
            </main>
            <Footer />
         </div>
      )}
    </>
  );
}
