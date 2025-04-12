"use client"

import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Share2,
  Facebook,
  ExternalLink,
  Users,
  GraduationCap,
  BookOpen,
  Database,
  FlaskConical,
  School,
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function AstroPhysicsLab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeResearchTab, setActiveResearchTab] = useState("areas")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize particle background
  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full width/height
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Particle class for visualization
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.color =
          theme === "dark" ? `hsl(${220 + Math.random() * 40}, 70%, 60%)` : `hsl(${220 + Math.random() * 40}, 70%, 40%)`
        this.alpha = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles with lines if they're close enough
    function connectParticles() {
      const maxDistance = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const lineColor =
              theme === "dark"
                ? `rgba(100, 120, 255, ${0.15 * (1 - distance / maxDistance)})`
                : `rgba(70, 90, 180, ${0.1 * (1 - distance / maxDistance)})`
            ctx.beginPath()
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background based on theme
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
        gradient.addColorStop(1, "rgba(30, 41, 59, 1)")
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(1, "rgba(240, 245, 250, 1)")
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [mounted, theme])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const sections = [
    { id: "about", name: "About" },
    { id: "vision", name: "Vision" },
    { id: "research", name: "Research" },
    { id: "team", name: "Team" },
    { id: "education", name: "Education" },
    { id: "news", name: "News" },
    { id: "collaborate", name: "Collaborate" },
  ]

  return (
    <div className="min-h-screen font-montserrat relative">
      {/* Particle Background (only for non-hero sections) */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Image src="/images/cineca-logo.png" alt="CINECA Logo" width={80} height={30} className="h-8 w-auto" />
              <div>
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  | SPARC
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`${
                    activeSection === section.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
                  } transition-colors duration-200`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.name}
                </a>
              ))}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => {
                    setActiveSection(section.id)
                    setIsMenuOpen(false)
                  }}
                >
                  {section.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Background Image */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/weibel-fields.png"
            alt="Plasma Physics Simulation"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Astro & Plasma Physics Lab</span>
          
          </h1>
          <p className="mt-3 text-xl text-blue-300 italic">
            "Let's continue to push the boundaries of what's possible!"
          </p>
          <p className="mt-6 text-lg md:text-xl text-gray-200 mx-auto max-w-3xl">
             Exploring the frontiers of astrophysics and plasma dynamics through advanced simulations on the{" "} 
            <span className="font-jost">CINECA</span> Leonardo supercomputer.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-blue-400 hover:bg-blue-300 transition-colors"
              onClick={() => setActiveSection("about")}
            >
              Learn More
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#research"
              className="inline-flex items-center justify-center px-8 py-3 border border-blue-500 text-base font-medium rounded-md text-blue-400 bg-transparent hover:bg-blue-900/20 transition-colors"
              onClick={() => setActiveSection("research")}
            >
              View Research
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">About</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            SPARC: Simulations in Plasma, Astrophysics, and Relativistic Cosmology
            </p>
          
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              Advancing the development of astrophysical, cosmological, and physics computational codes optimized for modern hardware architectures, 
              leveraging high-performance computing resources at <span className="font-jost">CINECA</span>.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Computational Astrophysics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Developing novel computational methods to simulate complex astrophysical phenomena across multiple
                  scales.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plasma Physics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Studying plasma dynamics in extreme environments, from stellar interiors to accretion disks around
                  black holes.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">High-Performance Computing</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Leveraging <span className="font-jost">CINECA</span>'s supercomputing resources to solve
                  computationally intensive problems in astrophysics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Vision</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Advancing Our Understanding of the Universe
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              Our vision is to support Italian and European research communities in astrophysics and plasma-related 
              research and foster collaboration to advance scientific understanding and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Long-term Goals</h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  Develop next-generation simulation frameworks for multi-scale astrophysical phenomena
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  Bridge the gap between theoretical models and observational data through advanced simulations
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  Foster international collaborations to tackle the most challenging problems in the field
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  Support Italian and European research communities in astrophysics and plasma physics
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="images/goal.png?height=400&width=600"
                  alt="Future of Astrophysics"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section with Tabs */}
      <section id="research" className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Research
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Research Activities
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              Explore our research areas, projects, publications, and infrastructure.
            </p>
          </div>

          {/* Research Tabs */}
          <div className="flex flex-wrap justify-center border-b border-gray-200 dark:border-slate-700 mb-8">
            <button
              onClick={() => setActiveResearchTab("areas")}
              className={`px-4 py-2 font-medium text-sm sm:text-base ${
                activeResearchTab === "areas"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <FlaskConical className="inline-block mr-2 h-4 w-4" />
              Research Areas
            </button>
            <button
              onClick={() => setActiveResearchTab("projects")}
              className={`px-4 py-2 font-medium text-sm sm:text-base ${
                activeResearchTab === "projects"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <BookOpen className="inline-block mr-2 h-4 w-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveResearchTab("publications")}
              className={`px-4 py-2 font-medium text-sm sm:text-base ${
                activeResearchTab === "publications"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <ExternalLink className="inline-block mr-2 h-4 w-4" />
              Publications
            </button>
            <button
              onClick={() => setActiveResearchTab("infrastructure")}
              className={`px-4 py-2 font-medium text-sm sm:text-base ${
                activeResearchTab === "infrastructure"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Database className="inline-block mr-2 h-4 w-4" />
              Infrastructure
            </button>
          </div>

          {/* Research Areas Tab Content */}
          {activeResearchTab === "areas" && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Stellar Astrophysics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Studying the formation, evolution, and dynamics of stars using advanced computational models.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plasma Dynamics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Investigating plasma behavior in extreme astrophysical environments through numerical simulations.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Computational Methods</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Developing novel algorithms and computational techniques for high-fidelity astrophysical simulations.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Galactic Dynamics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Exploring the formation and evolution of galaxies through large-scale cosmological simulations.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">High-Energy Astrophysics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Investigating energetic phenomena such as supernovae, gamma-ray bursts, and black hole accretion.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Magnetohydrodynamics</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Studying the interaction between magnetic fields and conducting fluids in astrophysical contexts.
                </p>
              </div>
            </div>
          )}

          {/* Projects Tab Content */}
          {activeResearchTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-700">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-slate-700">
                  <Image
                    src="images/space.png?height=340&width=600"
                    alt="SPACE-COE"
                    width={600}
                    height={340}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">SPACE-COE</h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Scalable Parallel Astrophysical Codes for Exascale
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-blue-600 dark:text-blue-400">2023 - Present</span>
                    <a
                      href="https://www.space-coe.eu/"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-700">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-slate-700">
                  <Image
                    src="images/reconnection.png?height=340&width=600"
                    alt="SPACE Plasma"
                    width={600}
                    height={340}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">ECsim code</h3>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                  Studying space plasma interaction with the magnetosphere and ionosphere using advanced numerical methods.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-blue-600 dark:text-blue-400">2023 - Present</span>
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Publications Tab Content */}
          {activeResearchTab === "publications" && (
            <div className="space-y-6">
              {[
              {
              title: "Exascale Computing for Astrophysical Simulations: Leveraging EuroHPC SPACE CoE at CINECA",
              authors: "Shukla N, Romeo A, et al.",
              journal: "Euro HPC, 2025, Vol. 20, pp. 100-110",
              summary:
              "The paper focuses on optimization, development, and benchmark results obtained on the CINECA Leonardo system, particularly in areas where CINECA is involved.",
              },
              {
              title: "EuroHPC SPACE CoE: Redesigning Scalable Parallel Astrophysical Codes for Exascale",
              authors: "Shukla N, Romeo A, et al.",
              journal: "Computer Frontier, 2025, Vol. x, pp. X",
              summary:
              "This paper discusses the redesign of scalable parallel astrophysical codes for exascale systems, highlighting the challenges and solutions implemented.",
              },
              {
              title: "The PLUTO Code on GPUs: a first look in the context of MHD simulations",
              authors: "Rossazza M,  Mignone A, ... Shukla N, Romeo A et al.",
              journal: "IEEE Transactions on Parallel and Distributed Systems, 2025, Vol. X, pp. X",
              summary:
              "We present preliminary performance results of gPLUTO, a GPU-optimized implementation of the PLUTO code for MHD simulations, rewritten in C++ with OpenACC for NVIDIA GPUs.",
              },
              
              ].map((paper, i) => (
              <div
              key={i}
              className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600"
              >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {i + 1}. {paper.title}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              Authors: {paper.authors}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Journal: {paper.journal}
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
              {paper.summary}
              </p>
              <div className="mt-4 flex justify-between">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
              >
                Read Paper →
              </a>
              <span className="text-sm text-gray-500 dark:text-gray-400">submited</span>
              </div>
              </div>
              ))}

              <div className="mt-10 text-center">
              <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
              >
              View All Publications
              <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              </div>
            </div>
          )}

          {/* Infrastructure Tab Content */}
          {activeResearchTab === "infrastructure" && (
            <div>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Computing Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      <span className="font-jost">CINECA</span> Leonardo Supercomputer
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      One of Europe's most powerful supercomputers, featuring over 14,000 NVIDIA A100 GPUs and 3,500
                      Intel Xeon nodes.
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Peak performance: 250 PetaFLOPS
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Storage capacity: 100 PB
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Memory: 1.2 PB RAM
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2"> 
                      Accessing <span className="font-jost">CINECA</span>  Resources
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Apply HPC research grants to access the <span className="font-jost">CINECA</span> supercomputing resources.
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        ISCRA-B: Class B projects are reviewed twice a year, with a 6-month wait for access. Each user can lead one project every 6 months.
                        </li>
                        <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        ISCRA-C: Submit anytime, reviewed monthly. Projects activate ~45 days after review. One project per user every 6 months as Principal Investigator.
                        </li>
                        <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        ISCRA-D: Twice a year, users can request storage for data linked to a computational project. Only one active project per user is allowed, subject to technical review.
                        </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Software & Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Simulation Codes</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        PLUTO (MHD code)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        OpenGadget3 (N-Body/Lagrangian cosmological code)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        PIC3D (Particle-In-Cell code)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        OSIRIS (Particle-In-Cell code)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Custom in-house codes
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HPC Tools</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Reframe (Python-based framework for regression tests and benchmarks)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Profile tools: SCOREP (Scalable Performance Measurement Infrastructure), Extra-E, NVIDIA Nsight & Compute
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        VisIVO (Visualization and analysis of astrophysical data)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        SPACK (Package manager for HPC) for customizing and installing software
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Development Environment</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        CUDA/HIP for GPU programming
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        Directive based programming (OpenACC, OpenMP) for GPU acceleration
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        MPI for distributed computing
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        OpenMP for shared memory
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                        CI/CD pipelines for testing
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Team</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Meet Our Research Team
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              Our interdisciplinary team brings together expertise in astrophysics, plasma physics, and computational
              science.
            </p>
          </div>

          {/* Team Tabs */}
          <div className="flex justify-center border-b border-gray-200 dark:border-slate-700 mb-8">
            <button
              onClick={() => setActiveSection("team-current")}
              className={`px-6 py-2 font-medium ${
                activeSection === "team-current"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Users className="inline-block mr-2 h-4 w-4" />
              Current Members
            </button>
            <button
              onClick={() => setActiveSection("team-alumni")}
              className={`px-6 py-2 font-medium ${
                activeSection === "team-alumni"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <GraduationCap className="inline-block mr-2 h-4 w-4" />
              Alumni
            </button>
          </div>

          {/* Current Members */}
          {activeSection === "team" || activeSection === "team-current" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
              {
                id: 1,
                name: "Dr. Nitin Shukla",
                role: "HPC Application Engineer/Astro-plasma Physicist",
                description:
                "Experienced in plasma simulations and high-performance computing, with over 10 years of experience. Currently leading astro and plasma-related activities at CINECA.",
                image: "images/ns.png",
              },
              {
                id: 2,
                name: "Dr. Alessandro Romeo",
                role: "HPC Application Engineer/Astro Physicist",
                description:
                "Specialist in astrophysics ",
                image: "images/ar.png",
              },
              {
                id: 3,
                name: "Michael Redenti",
                role: "HPC Engineer",
                description:
                "Dedicated to optimizing astrophysical codes for exascale computing, ensuring cutting-edge performance.",
                image: "images/mr.png",
              },
              {
                id: 4,
                name: "Dr. C Caravita",
                role: "Astrophysicst",
                description:
                "Expert in extragalactic astrophysics and in particular of stellar dynamic",
                image: "images/cc.png",
              },
              ].map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-700/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-600"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-slate-600">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                </div>
                <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  {member.description}
                </p>
                <div className="flex space-x-3">
                  <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Visit ${member.name}'s website`}
                  >
                  <ExternalLink size={16} />
                  </a>
                  <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                  <Linkedin size={16} />
                  </a>
                  <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Follow ${member.name} on Twitter`}
                  >
                  <Twitter size={16} />
                  </a>
                </div>
                </div>
              </div>
              ))}
            </div>
          ) : null}

          {/* Alumni */}
          {activeSection === "team-alumni" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-600 flex items-center"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-slate-600 overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=64&width=64`}
                        alt={`Alumni ${i}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dr. Mattia Mencagli</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">CINECA (2023-2024)</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Now at: Computational Fluid Dynamics Expert</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Education
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Educational Programs & Resources
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              We are committed to training the next generation of astrophysicists and computational scientists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <School className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">HPC School for Physists</h3>
              </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This is a week-long course designed for the Physics Department at the University of Bologna. It focuses on the latest high-performance computing techniques and their applications. The course is held every year in partnership with the University of Bologna and CINECA to provide hands-on training and practical knowledge.
                </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  PhD Students 
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">•</span>
                  MSc for Astrophysics
                </li>
            
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Learn more about our programs
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Summer Schools & Workshops</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We organize annual HPC summer schools.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Heterogenous computing: GPU and CPU programming
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    30 June - 11 July 2025 | <span className="font-jost">CINECA</span>, Bologna | In person
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                  Maximizing Performance in High-Performance Computing – Tools, Techniques, and Hands-On Sessions
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">July 23 - 25, 2024 | Hybrid</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">Introduction to GIT</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">April 22nd 2024 | SPACE-COE | Virtual </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View upcoming events
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Educational Resources</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We provide a variety of open educational resources for students and researchers interested in
              computational astrophysics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Online Courses</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Free online courses covering various aspects of parallel programing.
                </p>
                <a
                  href="#"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Browse courses →
                </a>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Code Repositories</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Open-source code repositories with examples and exerciese.
                </p>
                <a
                  href="#"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Visit GitHub →
                </a>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Lecture Notes & Tutorials</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Comprehensive Slide for self-study.
                </p>
                <a
                  href="#"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Download →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">News</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Latest News & Events
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              Stay updated with the latest developments, events, and achievements from our lab.
            </p>
          </div>

          <div className="space-y-8">
            {/* Featured News */}
            <div className="bg-gray-50 dark:bg-slate-800/70 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-slate-700">
              <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-48">
            <Image
              src="images/B2t35.png?height=200&width=200"
              alt="Featured News"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="text-sm text-blue-600 dark:text-blue-400">June 15, 2024</div>
              <div className="flex space-x-2">
                <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Share on Twitter"
                >
            <Twitter size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Share on Facebook"
                >
            <Facebook size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Share"
                >
            <Share2 size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              Extreme Benchmarks of gPluto
            </h3>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              GPU version of Pluto run on thousands of GPUs on{" "}
              <span className="font-jost">CINECA</span> Leonardo supercomputer, showing 29x speed up.
            </p>
            <div className="mt-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
              </div>
            </div>

            {/* News List */}
            <div id="news-list" className="space-y-6">
              {[
          {
            id: 1,
            date: "January 22, 2025",
            title: "Presentation at HiPEAC",
            description: "GPU Optimization Strategies for Astrophysical Simulations at HiPEAC.",
            link: "https://www.hipeac.net/2025/barcelona/#/program/sessions/8207/",
          },
          {
            id: 2,
            date: "October 12, 2024",
            title: "BSC Hackathon",
            description: "Participated in the BSC Hackathon for GPU optimization.",
            link: "#",
          },
          {
            id: 3,
            date: "June 26-28, 2023",
            title: "PASC conference",
            description: "Unleashing the Power of Multiple GPUs for ECsim Using OpenACC",
            link: "https://pasc23.pasc-conference.org/presentation/?id=msa217&sess=sess154",
          },
              ].map((news) => (
          <div
            key={news.id}
            className="bg-gray-50 dark:bg-slate-800/70 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-700"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm text-blue-600 dark:text-blue-400">{news.date}</div>
              <div className="flex space-x-1">
                <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Share on Twitter"
                >
            <Twitter size={14} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Share"
                >
            <Share2 size={14} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{news.title}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{news.description}</p>
            <div className="mt-3">
              <a
                href={news.link}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setNews((prevNews) => [
                    ...prevNews,
                    {
                      id: 4,
                      date: "February 14, 2023",
                      title: "New Research Paper Submitted",
                      description:
                        "Preliminary performance results of gPLUTO, a GPU-optimized implementation of the PLUTO code for MHD simulations, rewritten in C++ with OpenACC for NVIDIA GPUs.",
                      link: "#",
                    },
                  ]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate Section */}
      <section id="collaborate" className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Collaborate
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Collaborate With Us
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 lg:mx-auto">
              We welcome collaborations with researchers, institutions, and industry partners interested in astrophysics
              and plasma physics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Collaboration Opportunities</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-500 text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Research Partnerships</h4>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Collaborate on joint research projects in astrophysics and plasma physics using{" "}
                      <span className="font-jost">CINECA</span>'s computational resources.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-500 text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Student Exchanges</h4>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Opportunities for graduate students and postdocs to visit and work with our team at{" "}
                      <span className="font-jost">CINECA</span>.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 dark:bg-blue-500 text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Partnerships</h4>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      We are always eager to collaborate on innovative and groundbreaking projects that push the boundaries of science and technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700/50 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
              <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());

                try {
                const response = await fetch("/api/send-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  const result = await response.json();
                  if (result.success) {
                    alert("Message sent successfully!");
                  } else {
                    alert(result.message || "Failed to send message. Please try again.");
                  }
                } else {
                  const error = await response.json();
                  alert(error.message || "Failed to send message. Please try again.");
                }
                } catch (error) {
                console.error("Error sending email:", error);
                alert("An error occurred. Please try again.");
                }
              }}
              >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
                </label>
                <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization
                </label>
                <input
                type="text"
                id="organization"
                name="organization"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                placeholder="Your organization"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
                </label>
                <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                placeholder="How can we collaborate?"
                ></textarea>
              </div>
              <div>
                <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                Send Message
                </button>
              </div>
              </form>
            </div>
          </div>

          {/* Collaborators Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Collaborators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/turin.png?height=64&width=64"
                      alt="University Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">University of Turin</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Turin, Italy</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Joint efforts to optimize and port the PLUTO code for GPU architectures, enhancing its performance for large-scale astrophysical simulations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Prof. Andrea Mignone</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Professor of Computational Physics</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/inaf.png?height=64&width=64"
                      alt="Institute Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      INAF
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trieste, Italy</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Code optimization of astrophysical simulations for GPU architectures, focusing on the OpenGadget code.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dr. Luca Tornatore</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Researcher </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/nvidia.png?height=64&width=64"
                      alt="Company Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">NVIDIA Research</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cambridge, UK </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Collaborative efforts on optimizing ECsim for GPU architectures, enabling advanced plasma space simulations with enhanced performance.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Filippo Spiga</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Senior Technical Product Manager, Accelerated Compute Workloads and Performance</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/ist.png?height=64&width=64"
                      alt="Institute Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                     Instituto Superior Técnico (IST)
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lisbon Portugal</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Conducting large-scale plasma simulations to explore kinetic-scale phenomena using the OSIRIS framework.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Prof. Luis O. Silva</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Group Leader of GoLP</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/e4.png?height=64&width=64"
                      alt="University Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">E4 COMPUTER ENGINEERING SpA</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Scandiano, Italy</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Collaborating on the development and optimization of a GPU-accelerated version of the SPACE-COE code, tailored for high-performance GPU architectures to enhance computational efficiency.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Prof. Elisabetta Boella</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      HPC product Specialist
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-700/50 p-5 rounded-lg shadow-md border border-gray-200 dark:border-slate-600">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden mr-4">
                    <Image
                      src="images/ku.png?height=64&width=64"
                      alt="Observatory Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">KU Leuven</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Leuven, Belgium</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  Support to iPIC3D for Benchmarking and code optimization on GPU architectures.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Key Contact:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dr. Fabio Bacchini</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm mr-2">Position:</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Assistant Professor</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                SPARC: Simulations in Plasma, Astrophysics, and Relativistic Cosmology
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pioneering astrophysics and plasma physics research through high-performance computing at{" "}
                <span className="font-jost">CINECA</span>.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {section.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
              <address className="not-italic text-gray-600 dark:text-gray-400">
                <p>Astro & Plasma Physics Lab</p>
                <p className="font-jost">CINECA</p>
                <p>Supercomputing Center</p>
                <p>Bologna, Italy</p>
                <p className="mt-2">Email: info@astroplasma.cineca.it</p>
                <p>Phone: +39 051 6171411</p>
              </address>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-800 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Astro & Plasma Physics Lab. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Powered by <span className="font-jost">CINECA</span>'s Leonardo HPC infrastructure.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
