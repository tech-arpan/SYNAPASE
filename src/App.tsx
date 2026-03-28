import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Orbit, 
  Brain,
  Cpu, 
  ShieldAlert, 
  History, 
  Lightbulb, 
  Code2, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Play,
  Info
} from 'lucide-react';
import { Scene } from './components/Scene';
import { GeneratedImage } from './components/GeneratedImage';
import { cn } from './lib/utils';

const Section = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={cn("py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn("glass-card p-8 hover:bg-white/10 transition-all duration-500", className)}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('history');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleKeySetup = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30">
      <Scene />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Orbit className="w-8 h-8 text-cyan-400" />
            <span className="font-display font-bold text-xl tracking-tighter uppercase">SYN<span className="text-cyan-400">APSE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#origins" className="hover:text-cyan-400 transition-colors">Origins</a>
            <a href="#concepts" className="hover:text-cyan-400 transition-colors">Concepts</a>
            <a href="#tech" className="hover:text-cyan-400 transition-colors">Technical</a>
            <a href="#ethics" className="hover:text-cyan-400 transition-colors">Ethics</a>
            <button 
              onClick={handleKeySetup}
              className={cn(
                "px-4 py-2 rounded-full transition-all font-bold flex items-center gap-2 uppercase tracking-widest text-[10px]",
                hasKey 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                  : "bg-cyan-500 text-black hover:bg-cyan-400 glow-cyan"
              )}
            >
              {hasKey ? <CheckCircle2 className="w-3 h-3" /> : <Orbit className="w-3 h-3" />}
              SYN AI
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="min-h-screen flex flex-col justify-center items-center text-center pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
            The Intelligence Revolution
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
            ARTIFICIAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_auto] animate-gradient neon-text-cyan">
              INTELLIGENCE
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Exploring the foundations, mechanics, and ethical frontiers of Machine Learning in the modern era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Get Started <ChevronRight className="w-4 h-4" />
            </button>
            <button className="glass-card px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Origins & History */}
      <Section id="origins">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-8 flex items-center gap-4">
              <History className="text-purple-500" /> Origins & History
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                The dream of artificial intelligence dates back to antiquity, with myths of mechanical men. However, the formal field was born in 1956 at the <span className="text-cyan-400 font-bold">Dartmouth Workshop</span>.
              </p>
              <p>
                Early AI focused on symbolic logic and "Expert Systems." It wasn't until the 21st century, with the explosion of big data and GPU computing, that <span className="text-purple-400 font-bold">Neural Networks</span> and Deep Learning truly took flight.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <GlassCard className="p-4">
                  <h4 className="text-cyan-400 font-bold mb-1">1950</h4>
                  <p className="text-xs">Alan Turing proposes the "Turing Test".</p>
                </GlassCard>
                <GlassCard className="p-4">
                  <h4 className="text-purple-400 font-bold mb-1">1997</h4>
                  <p className="text-xs">Deep Blue defeats Garry Kasparov.</p>
                </GlassCard>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <GeneratedImage 
              prompt="A hyper-realistic cinematic portrait of Alan Turing surrounded by glowing holographic neural networks and vintage 1950s mainframe computers, deep dark atmosphere, neon cyan and violet highlights, 8k resolution, masterpiece"
              alt="AI History" 
              fallbackUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
              className="relative glow-cyan"
            />
          </div>
        </div>
      </Section>

      {/* Significance & Key Areas */}
      <Section id="concepts" className="bg-white/[0.02]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Core Concepts</h2>
          <p className="text-white/60">The pillars that sustain modern machine intelligence.</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 lg:order-1 grid grid-cols-1 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6 text-cyan-400" />,
                title: "Machine Learning",
                desc: "Algorithms that improve through experience without explicit programming."
              },
              {
                icon: <Cpu className="w-6 h-6 text-purple-400" />,
                title: "Deep Learning",
                desc: "Neural networks with many layers capable of learning complex patterns."
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
                title: "NLP",
                desc: "Enabling computers to understand, interpret, and generate human language."
              }
            ].map((item, i) => (
              <GlassCard key={i} className="flex items-start gap-6 text-left group p-6">
                <div className="shrink-0 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <GeneratedImage 
              prompt="A futuristic 3D technical diagram of a complex neural network architecture, glowing nodes and synapses, holographic blueprint style, deep dark night theme, cyan and purple lighting, intricate details"
              alt="AI Concepts Diagram" 
              fallbackUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
              className="glow-cyan"
            />
          </div>
        </div>
      </Section>

      {/* Technical Deep Dive */}
      <Section id="tech">
        <div className="grid lg:grid-cols-2 gap-16">
          <GlassCard className="bg-black/40">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code2 className="text-cyan-400" /> Mathematical Model
            </h3>
            <div className="space-y-6">
              <p className="text-white/70 text-sm">
                At its heart, a simple neuron can be modeled as a linear combination followed by an activation function:
              </p>
              <div className="bg-white/5 p-6 rounded-xl font-mono text-cyan-300 text-center text-lg">
                y = f(Σ(wᵢ * xᵢ) + b)
              </div>
              <ul className="text-xs text-white/50 space-y-2">
                <li>• <span className="text-white">xᵢ:</span> Input features</li>
                <li>• <span className="text-white">wᵢ:</span> Weights (learned parameters)</li>
                <li>• <span className="text-white">b:</span> Bias</li>
                <li>• <span className="text-white">f:</span> Activation function (e.g., ReLU, Sigmoid)</li>
              </ul>
            </div>
          </GlassCard>
          
          <GlassCard className="bg-black/40">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code2 className="text-purple-400" /> Code Implementation
            </h3>
            <pre className="bg-white/5 p-6 rounded-xl font-mono text-xs text-purple-300 overflow-x-auto">
{`import tensorflow as tf

# Simple Neural Network
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, activation='relu'),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(
  optimizer='adam',
  loss='sparse_categorical_crossentropy',
  metrics=['accuracy']
)`}
            </pre>
          </GlassCard>
        </div>
      </Section>

      {/* Ethics & Concerns */}
      <Section id="ethics">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <GeneratedImage 
              prompt="A sleek white humanoid robot sitting at a wooden desk with a laptop, interacting with glowing blue holographic diagrams and icons, dark blue background, cinematic lighting, high-tech aesthetic"
              alt="AI Ethics" 
              fallbackUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
              className="glow-cyan"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-display font-bold mb-8 flex items-center gap-4">
              <ShieldAlert className="text-red-500" /> Ethical Concerns
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><AlertTriangle className="text-red-400 w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold mb-1">Algorithmic Bias</h4>
                  <p className="text-sm text-white/60">AI systems can inherit and amplify human biases present in training data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><AlertTriangle className="text-red-400 w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold mb-1">Privacy & Surveillance</h4>
                  <p className="text-sm text-white/60">Massive data collection poses risks to individual privacy and civil liberties.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><AlertTriangle className="text-red-400 w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold mb-1">Job Displacement</h4>
                  <p className="text-sm text-white/60">Automation may disrupt labor markets, requiring significant societal adaptation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Advantages & Limitations */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="border-cyan-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-cyan-400" /> Advantages
            </h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-cyan-400 shrink-0" /> Unmatched data processing speed</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-cyan-400 shrink-0" /> Automation of repetitive tasks</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-cyan-400 shrink-0" /> 24/7 availability and precision</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-cyan-400 shrink-0" /> Predictive analytics for medicine</li>
            </ul>
          </GlassCard>
          
          <GlassCard className="border-red-500/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-red-400" /> Limitations
            </h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-red-400 shrink-0" /> Lack of common sense and intuition</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-red-400 shrink-0" /> High computational costs</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-red-400 shrink-0" /> "Black Box" nature of deep learning</li>
              <li className="flex gap-3"><ChevronRight className="w-5 h-5 text-red-400 shrink-0" /> Dependency on high-quality data</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* Future & Overcoming Limitations */}
      <Section className="text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold mb-8">The Path Forward</h2>
          <p className="text-white/60 mb-12 leading-relaxed">
            To overcome current limitations, researchers are focusing on <span className="text-cyan-400 font-bold">Explainable AI (XAI)</span>, more efficient algorithms, and robust ethical frameworks. The future lies in <span className="text-purple-400 font-bold">Human-AI Collaboration</span>, where technology augments rather than replaces human potential.
          </p>
          <div className="flex justify-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">90%</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Efficiency Increase</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$15T</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">GDP Impact by 2030</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">∞</div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Future Potential</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-bold mb-8 flex items-center justify-center gap-3">
            <Play className="text-purple-400" /> AI in Education: Impact on Students
          </h3>
          <div className="glass-card overflow-hidden aspect-video relative group">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/hJP5GqnTrNo" 
              title="How AI will transform education" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm text-white/80">Exploring how AI personalizes learning and empowers the next generation of students.</p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <GlassCard className="p-4 text-left">
              <h4 className="text-cyan-400 font-bold text-sm mb-1">Personalized Learning</h4>
              <p className="text-xs text-white/50">AI tutors adapt to individual student paces and learning styles.</p>
            </GlassCard>
            <GlassCard className="p-4 text-left">
              <h4 className="text-purple-400 font-bold text-sm mb-1">Accessibility</h4>
              <p className="text-xs text-white/50">Tools like speech-to-text and translation break down learning barriers.</p>
            </GlassCard>
            <GlassCard className="p-4 text-left">
              <h4 className="text-cyan-400 font-bold text-sm mb-1">Skill Development</h4>
              <p className="text-xs text-white/50">Preparing students for a future where AI collaboration is a core competency.</p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Orbit className="w-6 h-6 text-cyan-400" />
            <span className="font-display font-bold tracking-tighter uppercase">SYNAPSE</span>
          </div>
          <div className="flex gap-6 text-white/40">
            <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-sm text-white/30">© 2026 SYNAPSE. Exploring the Intelligence Frontier.</p>
        </div>
      </footer>
    </div>
  );
}
