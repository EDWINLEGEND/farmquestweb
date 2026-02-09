'use client'
import Link from 'next/link';
import Logo from '@/components/Logo';
import HeroImage from '@/components/HeroImage';
import GetStartedButton from '@/components/GetStartedButton';
import AccountLink from '@/components/AccountLink';
import { CheckCircle, Leaf, Sprout, Users, BarChart3, ShieldCheck, Globe, Award, Zap, ArrowRight, ChevronUp, MessageSquare, ArrowDown, Star, Play, Plus, Minus, Facebook, Instagram, Linkedin, Twitter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Import BackgroundGrid with SSR disabled
const BackgroundGrid = dynamic(
  () => import('@/components/ui/BackgroundGrid').then((mod) => mod.BackgroundGrid),
  { ssr: false }
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeSolution, setActiveSolution] = useState<number | null>(1);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);



  return (
    <main className="min-h-screen bg-gradient-to-br from-[#77AD3F]/10 to-white overflow-x-hidden relative">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative h-screen flex flex-col">
          <div className="absolute inset-0 bg-white z-0"></div>

          <div className="z-10 p-6 flex justify-between items-center">
            <Logo />
            <button className="text-[#0F6435] font-medium">Skip</button>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center px-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 w-full max-w-xs"
            >
              <HeroImage />
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                <span className="text-[#0F6435]">Farm</span>Quest
              </h2>
              <p className="text-xl text-gray-700">
                Turn Your Thumb Green, No Experience Needed!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full space-y-4"
            >
              <GetStartedButton />
              <AccountLink />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Navigation Bar */}
        {/* Navigation Bar & Hero Section Wrapped */}
        <div className="p-6 h-screen min-h-[800px] flex flex-col relative bg-gray-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative rounded-[2.5rem] overflow-hidden shadow-2xl isolate"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-[url('/images/background.png')] bg-cover bg-center z-0">
              <div className="absolute inset-0 bg-black/10 backdrop-brightness-95"></div>
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30"></div>
            </div>

            {/* Floating Navbar */}
            <nav className="relative z-50 px-8 py-6 flex justify-between items-center">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg brightness-0 invert filter">
                <Logo />
              </div>

              <div className="hidden lg:flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-lg">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Solutions', href: '/solutions' },
                  { name: 'Investors', href: '/investors' },
                  { name: 'Success Story', href: '/stories' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${item.name === 'Home'
                      ? 'bg-white text-[#0F6435] shadow-sm'
                      : 'text-white hover:bg-white/20'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                className="bg-white text-[#0F6435] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg active:scale-95 duration-200"
              >
                Contact Us
              </Link>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-120px)] text-center px-4 max-w-5xl mx-auto -mt-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium mb-6 uppercase tracking-wider">
                  Sustainable Agriculture
                </div>

                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-sm font-display">
                  Smart Farming for <br />
                  <span className="font-serif italic text-white font-light">Future Generations</span>
                </h1>

                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
                  Turn Your Thumb Green, No Experience Needed! Start your farming journey in minutes — grow crops, earn rewards, and turn your passion into profit.
                </p>

                <div className="flex items-center justify-center gap-5">
                  <Link href="/get-started" className="bg-[#D2F04E] text-[#0F6435] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-[#c2e03e] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(210,240,78,0.3)]">
                    Start Farming <ArrowRight className="w-5 h-5" />
                  </Link>

                  <button className="group px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </span>
                    Meet the Farmers
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Elements */}
            <div className="absolute bottom-12 left-12 z-20 text-white/80 font-medium text-sm tracking-widest flex items-center gap-3">
              SCROLL <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            <div className="absolute bottom-12 right-12 z-20">
              <div className="bg-black/30 backdrop-blur-md rounded-full pl-2 pr-5 py-2 flex items-center gap-3 border border-white/10 shadow-xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center overflow-hidden bg-white/20`}>
                      {/* Placeholder for avatars */}
                      <Users className="w-5 h-5 text-white/70" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#D2F04E] border-2 border-[#1a1a1a] flex items-center justify-center text-[#0F6435] font-bold text-xs relative z-10">
                    <Star className="w-3 h-3 fill-current" /> 4.9
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">10k+ Farmers</p>
                  <p className="text-white/60 text-xs">Joined this week</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <p className="text-sm font-semibold text-gray-500 max-w-[150px] leading-tight">
                Trusted by thousand companies in the world
              </p>
              <div className="flex-1 flex flex-wrap justify-between items-center gap-8">
                {['CHASE', 'JOHN DEERE', 'Leader', 'Kubota', 'GLEANER'].map((name, i) => (
                  <span key={i} className="text-xl md:text-2xl font-bold font-serif text-gray-400 hover:text-[#0F6435] transition-colors cursor-pointer">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="py-24 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-8 text-center relative">
            <div className="absolute top-0 left-8 bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-500">
              • Cultiva Legacy
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-5xl font-medium text-[#1a1a1a] leading-tight mt-8"
            >
              Our platform is built to support farmers, agribusinesses, and agricultural innovators
              <span className="text-gray-400"> by delivering </span>
              <span className="inline-flex items-center align-middle mx-2">
                <div className="w-16 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                  <Image src="/images/plant-1.png" alt="Nature" fill className="object-cover" />
                </div>
              </span>
              <span className="text-gray-400"> practical tools that respect the land while improving productivity.</span>
            </motion.h2>
          </div>
        </div>

        {/* Strategies / Solutions Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-500 w-fit mb-6">
                • About FarmQuest
              </div>
              <h2 className="text-5xl font-medium text-[#1a1a1a] mb-2">
                Smart Farming Solutions
              </h2>
              <h3 className="text-5xl font-serif italic text-[#1a1a1a] mb-8">
                That Deliver Real Results
              </h3>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "Proven Farm Productivity",
                  content: "Our systems have been tested across 500+ farms, showing an average yield increase of 25% within the first harvest cycle."
                },
                {
                  title: "Intelligent Crop Optimization",
                  content: "Our AI powered system analyzes soil health, weather patterns, irrigation cycles, and crop growth data to recommend the most effective actions automatically, improving yield and reducing risk.",
                  isOpen: true,
                  icon: <Leaf className="w-5 h-5 text-[#0F6435]" />
                },
                {
                  title: "Seamless Farm System Integration",
                  content: "Connect with your existing John Deere, Kubota, and other smart farming equipment through our universal API."
                },
                {
                  title: "Smart Water & Resource Management",
                  content: "Reduce water usage by up to 40% with precision irrigation schedules customized for your crop type and soil conditions."
                }
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-2xl transition-all duration-300 ${activeSolution === i ? 'bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div
                    className="flex justify-between items-start cursor-pointer group"
                    onClick={() => setActiveSolution(activeSolution === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      {activeSolution === i && (
                        <div className="bg-[#D2F04E] p-2 rounded-lg">
                          {item.icon || <Leaf className="w-5 h-5 text-[#0F6435]" />}
                        </div>
                      )}
                      <h4 className="text-xl font-medium text-[#1a1a1a]">{item.title}</h4>
                    </div>
                    {activeSolution === i ? <Minus className="w-6 h-6 text-[#1a1a1a]" /> : <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#1a1a1a]" />}
                  </div>

                  {activeSolution === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pl-14 text-gray-600 leading-relaxed"
                    >
                      {item.content}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-gray-600 text-lg">
                We empower farmers with intelligent tools and data-driven insights to increase yields, reduce costs, and build a more sustainable agricultural future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="group cursor-pointer">
                <div className="relative h-[500px] rounded-[2rem] overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700">
                    <Image src="/images/background.png" alt="Automation" fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-3xl font-medium text-[#1a1a1a] mb-3">Automation</h3>
                <p className="text-gray-600 text-lg">Streamline planting, harvesting, and operations to save time, cut costs, and boost efficiency.</p>
              </div>

              {/* Card 2 */}
              <div className="group cursor-pointer mt-12 md:mt-0">
                <div className="relative h-[500px] rounded-[2rem] overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700">
                    <Image src="/images/globe.png" alt="Sustainable" fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-3xl font-medium text-[#1a1a1a] mb-3">Sustainable Agriculture</h3>
                <p className="text-gray-600 text-lg">Protect soil, conserve resources, and grow healthy crops for the long term.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Credits Impact Section - NEW */}
        <div className="py-24 bg-black relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#77AD3F" strokeWidth="1" />
                </pattern>
                <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#0F6435" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#circles)" />
            </svg>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#77AD3F] filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0F6435] filter blur-[120px] opacity-15"></div>

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-[#77AD3F]/30 text-[#77AD3F] rounded-full text-sm font-medium mb-4">
                Environmental Impact
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Our Carbon Credit Ecosystem</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Together, we&apos;re making a measurable difference in the fight against climate change
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  value: "2.7M",
                  label: "Trees Planted",
                  icon: <Leaf className="h-6 w-6" />,
                  trend: "+12% this month"
                },
                {
                  value: "45K",
                  label: "Active Farmers",
                  icon: <Users className="h-6 w-6" />,
                  trend: "+8% this month"
                },
                {
                  value: "186K",
                  label: "Carbon Credits",
                  icon: <Globe className="h-6 w-6" />,
                  trend: "+15% this month"
                },
                {
                  value: "97%",
                  label: "Sustainability Score",
                  icon: <Award className="h-6 w-6" />,
                  trend: "+3% this month"
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 hover:bg-gray-800 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#77AD3F]/20 p-3 rounded-full">
                      <div className="text-[#77AD3F]">{stat.icon}</div>
                    </div>
                    <span className="text-[#77AD3F] text-sm font-medium">{stat.trend}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Graph and Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left side - Graph */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 relative overflow-hidden"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Carbon Credits Generated (2023-2024)</h3>

                {/* SVG Graph */}
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid lines */}
                    <g className="grid-lines">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={i * 50}
                          x2="400"
                          y2={i * 50}
                          stroke="#333"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />
                      ))}
                    </g>

                    {/* X-axis labels */}
                    <g className="x-labels text-xs" textAnchor="middle">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                        <text key={i} x={i * 33 + 16} y="220" fill="#999">{month}</text>
                      ))}
                    </g>

                    {/* Area chart */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#77AD3F" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0F6435" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* Line chart */}
                    <path
                      d="M0,180 C20,160 40,150 60,140 C80,130 100,120 120,100 C140,80 160,70 180,60 C200,50 220,45 240,40 C260,35 280,30 300,25 C320,20 340,15 360,10 C380,5 400,0 400,0"
                      fill="none"
                      stroke="#77AD3F"
                      strokeWidth="3"
                    />

                    {/* Area under the line */}
                    <path
                      d="M0,180 C20,160 40,150 60,140 C80,130 100,120 120,100 C140,80 160,70 180,60 C200,50 220,45 240,40 C260,35 280,30 300,25 C320,20 340,15 360,10 C380,5 400,0 400,0 V200 H0 Z"
                      fill="url(#greenGradient)"
                    />

                    {/* Data points */}
                    {[
                      { x: 0, y: 180 }, { x: 33, y: 150 }, { x: 66, y: 140 },
                      { x: 99, y: 100 }, { x: 132, y: 60 }, { x: 165, y: 40 },
                      { x: 198, y: 30 }, { x: 231, y: 25 }, { x: 264, y: 20 },
                      { x: 297, y: 15 }, { x: 330, y: 10 }, { x: 363, y: 5 }
                    ].map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#77AD3F"
                        stroke="#0F6435"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>

                  {/* Y-axis labels */}
                  <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                    <span>200K</span>
                    <span>150K</span>
                    <span>100K</span>
                    <span>50K</span>
                    <span>0</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#77AD3F]"></div>
                    <span className="text-gray-400 text-sm">Carbon Credits</span>
                  </div>
                  <span className="text-[#77AD3F] font-medium">+186% YoY Growth</span>
                </div>
              </motion.div>

              {/* Right side - Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white">How Our Carbon Credit System Works</h3>
                <p className="text-gray-300">
                  FarmQuest&apos;s innovative carbon credit system rewards sustainable farming practices while making a measurable impact on climate change.
                </p>

                <div className="space-y-6 mt-8">
                  {[
                    {
                      title: "Plant & Earn",
                      description: "Each plant you grow generates carbon credits based on its CO2 absorption capacity.",
                      icon: <Sprout className="h-6 w-6" />
                    },
                    {
                      title: "Verified Impact",
                      description: "Our blockchain technology ensures transparent tracking of every credit generated.",
                      icon: <ShieldCheck className="h-6 w-6" />
                    },
                    {
                      title: "Marketplace",
                      description: "Sell your carbon credits to businesses looking to offset their emissions.",
                      icon: <BarChart3 className="h-6 w-6" />
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex gap-4"
                    >
                      <div className="bg-[#77AD3F]/20 p-3 rounded-full h-fit">
                        <div className="text-[#77AD3F]">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gray-900 border border-[#77AD3F]/30 rounded-xl p-6 mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-semibold">Total Environmental Impact</h4>
                    <span className="text-[#77AD3F]">Last updated: Today</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">CO₂ Offset</p>
                      <p className="text-2xl font-bold text-white">12,450 tons</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Water Saved</p>
                      <p className="text-2xl font-bold text-white">8.3M gallons</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-16 text-center"
            >
              <button className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white hover:from-[#6A9D35] hover:to-[#0A5A2F] transition-colors duration-300 font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform flex items-center justify-center mx-auto">
                <Globe className="mr-2 h-5 w-5" /> Join Our Carbon Credit Program
              </button>
              <p className="text-gray-400 mt-4">
                Start making a difference today while earning rewards for your sustainable practices.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Testimonials Section - NEW Design */}
        <div className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-5xl text-[#0F6435] mb-6 font-serif">“</div>
              <h2 className="text-3xl md:text-5xl font-medium text-[#1a1a1a] leading-tight mb-8">
                Real-time field data completely changed how we manage our crops. We&apos;re making smarter decisions and seeing healthier yields season after season.
              </h2>
              <div>
                <h4 className="font-bold text-lg text-[#1a1a1a]">Sarah Williams</h4>
                <p className="text-gray-500">CropSense, California</p>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative h-[600px] w-full bg-gray-100 rounded-[2rem] overflow-hidden">
              <Image src="/images/background.png" alt="Testimonial" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-8 text-center mb-16">
            <div className="bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-500 w-fit mx-auto mb-6">
              • FAQ
            </div>
            <h2 className="text-5xl font-medium text-[#1a1a1a]">
              Common Farmer <span className="font-serif italic">Questions</span>
            </h2>
            <p className="text-gray-600 mt-4">
              Got questions? We&apos;ve got answers to help you get the most out of FarmQuest.
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-8 space-y-4">
            {[
              { q: "How does FarmQuest help with crop rotation?", a: "Our AI analyzes your soil history and recommends optimal crop rotation schedules to maintain soil health and maximize yields." },
              { q: "Can I integrate my existing irrigation system?", a: "Yes, FarmQuest is compatible with major smart irrigation systems including John Deere, Netafim, and Rain Bird via our universal API." },
              { q: "Is the platform suitable for small-scale organic farms?", a: "Absolutely. We have specific modules designed for organic certification tracking and small-scale resource management." },
              { q: "How accurate are the weather predictions?", a: "We aggregate data from local stations, satellite imagery, and global models to provide hyper-local forecasts with 90%+ accuracy." },
              { q: "Does FarmQuest support sustainable farming?", a: "Sustainability is our core mission. We provide tools for carbon footprint tracking, water conservation, and regenerative farming practices." }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#F9F9F9] rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium text-[#1a1a1a]">{item.q}</h4>
                  {activeFAQ === i ? <Minus className="w-5 h-5 text-[#1a1a1a]" /> : <Plus className="w-5 h-5 text-gray-400" />}
                </div>
                {activeFAQ === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 text-gray-600 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="py-12 px-4 md:px-8 bg-white pb-0">
          <div className="max-w-7xl mx-auto relative rounded-t-[3rem] bg-[#FAFAFA] overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white/50 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 pt-24 px-8 pb-32 text-center">
              <h2 className="text-4xl md:text-6xl font-medium text-[#1a1a1a] max-w-4xl mx-auto leading-tight mb-4">
                Make farming smarter,
                <br />
                <span className="font-serif italic">stronger, and simpler</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-10">
                Straightforward answers to help you make confident decisions for your farm.
              </p>
              <button className="bg-[#1F4529] text-white px-8 py-4 rounded-full font-medium hover:bg-[#15301c] transition-colors shadow-lg shadow-[#1F4529]/20">
                Contact Us
              </button>
            </div>

            {/* Footer Links - Glassmorphism Card */}
            <div className="relative z-20 mx-4 md:mx-8 mb-8 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                    <Logo />
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    FarmQuest empowers farmers with smart tools for better yields and sustainable growth.
                  </p>
                  <div className="flex gap-4">
                    {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#D2F04E] hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-6">Quick Links</h4>
                  <ul className="space-y-4 text-gray-500 text-sm">
                    {['Home', 'About', 'Services', 'Contact'].map(item => (
                      <li key={item}><a href="#" className="hover:text-[#0F6435] transition-colors">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-6">Services</h4>
                  <ul className="space-y-4 text-gray-500 text-sm">
                    {['Smart Crop Monitoring', 'Precision Irrigation Systems', 'Soil & Weather Analytics', 'Maintenance & Support'].map(item => (
                      <li key={item}><a href="#" className="hover:text-[#0F6435] transition-colors">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#1a1a1a] mb-6">Company</h4>
                  <ul className="space-y-4 text-gray-500 text-sm">
                    {['Contact Us', 'Emergency Help', 'FAQ', 'Privacy Policy'].map(item => (
                      <li key={item}><a href="#" className="hover:text-[#0F6435] transition-colors">{item}</a></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>© 2026 FarmQuest. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-gray-600">Terms of Service</a>
                  <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            className="bg-gradient-to-r from-[#77AD3F] to-[#0F6435] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Chat with us"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
              <span className="pl-2">Chat with us</span>
            </span>
          </button>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-50 bg-white text-[#0F6435] p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#77AD3F]/10 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>

        {/* Cookie consent banner */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#77AD3F]/20 shadow-lg p-4"
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <p className="text-gray-700">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </button>
              <button className="bg-gradient-to-br from-[#77AD3F] to-[#0F6435] text-white px-4 py-2 rounded-md transition-colors">
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      </div>


    </main>
  );
}