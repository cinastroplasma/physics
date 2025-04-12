"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronRight, Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export default function QuantumComputingLabWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize quantum particle background
  useEffect(() => {
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

    // Particle class for quantum visualization
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
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `hsl(${220 + Math.random() * 40}, 70%, 60%)`
        this.alpha = Math.random() * 0.8 + 0.2
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
    const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles with lines if they're close enough
    function connectParticles() {
      const maxDistance = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 120, 255, ${0.2 * (1 - distance / maxDistance)})`
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

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
      gradient.addColorStop(1, "rgba(30, 41, 59, 1)")
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
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen text-gray-50 font-sans relative">
      {/* Quantum Particle Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-sm shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-semibold text-cyan-400">Quantum Computing Lab</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className={`${activeSection === "home" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("home")}
              >
                Home
              </a>
              <a
                href="#research"
                className={`${activeSection === "research" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("research")}
              >
                Research
              </a>
              <a
                href="#simulations"
                className={`${activeSection === "simulations" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("simulations")}
              >
                Simulations
              </a>
              <a
                href="#publications"
                className={`${activeSection === "publications" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("publications")}
              >
                Publications
              </a>
              <a
                href="#team"
                className={`${activeSection === "team" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("team")}
              >
                Team
              </a>
              <a
                href="#contact"
                className={`${activeSection === "contact" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"} transition-colors duration-200`}
                onClick={() => setActiveSection("contact")}
              >
                Contact
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-300 hover:text-white focus:outline-none" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/90 backdrop-blur-sm shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className={`${activeSection === "home" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("home")
                  setIsMenuOpen(false)
                }}
              >
                Home
              </a>
              <a
                href="#research"
                className={`${activeSection === "research" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("research")
                  setIsMenuOpen(false)
                }}
              >
                Research
              </a>
              <a
                href="#simulations"
                className={`${activeSection === "simulations" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("simulations")
                  setIsMenuOpen(false)
                }}
              >
                Simulations
              </a>
              <a
                href="#publications"
                className={`${activeSection === "publications" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("publications")
                  setIsMenuOpen(false)
                }}
              >
                Publications
              </a>
              <a
                href="#team"
                className={`${activeSection === "team" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("team")
                  setIsMenuOpen(false)
                }}
              >
                Team
              </a>
              <a
                href="#contact"
                className={`${activeSection === "contact" ? "bg-slate-700 text-cyan-400" : "text-gray-300 hover:bg-slate-700"} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => {
                  setActiveSection("contact")
                  setIsMenuOpen(false)
                }}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Quantum Computing</span>
                <span className="block text-cyan-400">Simulation Lab</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                Exploring the frontiers of quantum mechanics through high-performance simulations on CINECA's Leonardo
                supercomputing cluster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <a
                  href="#research"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                  onClick={() => setActiveSection("research")}
                >
                  Our Research
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#simulations"
                  className="inline-flex items-center justify-center px-6 py-3 border border-cyan-700 text-base font-medium rounded-md text-cyan-400 bg-transparent hover:bg-slate-800/50 transition-colors"
                  onClick={() => setActiveSection("simulations")}
                >
                  View Simulations
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg bg-slate-800/50 backdrop-blur-sm flex items-center justify-center border border-slate-700">
                <div className="relative w-full h-full">
                  <Image
                    src="/placeholder.svg?height=450&width=800"
                    alt="Quantum Simulation Visualization"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Research</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Pushing the Boundaries of Quantum Simulation
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 lg:mx-auto">
              Our lab specializes in developing advanced algorithms for quantum system simulations leveraging
              high-performance computing resources.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Quantum Algorithms</h3>
                <p className="text-gray-300">
                  Developing novel quantum algorithms optimized for execution on classical supercomputers to explore
                  quantum phenomena.
                </p>
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Many-Body Systems</h3>
                <p className="text-gray-300">
                  Studying complex quantum many-body systems and their emergent properties through large-scale
                  simulations.
                </p>
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-600">
                <h3 className="text-xl font-bold text-white mb-4">Quantum Machine Learning</h3>
                <p className="text-gray-300">
                  Exploring the intersection of quantum computing and machine learning for enhanced data analysis
                  capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulations Section */}
      <section id="simulations" className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Simulations</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">High-Performance Quantum Simulations</p>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 lg:mx-auto">
              Visualizations and results from our simulations run on CINECA's Leonardo supercomputing cluster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                <Image
                  src="/placeholder.svg?height=340&width=600"
                  alt="Quantum State Evolution"
                  width={600}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">Quantum State Evolution</h3>
                <p className="mt-2 text-gray-300">
                  Visualization of quantum state evolution in a 32-qubit system under various Hamiltonian dynamics.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                <Image
                  src="/placeholder.svg?height=340&width=600"
                  alt="Entanglement Dynamics"
                  width={600}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">Entanglement Dynamics</h3>
                <p className="mt-2 text-gray-300">
                  Study of entanglement propagation in quantum spin chains using tensor network methods.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                <Image
                  src="/placeholder.svg?height=340&width=600"
                  alt="Quantum Phase Transitions"
                  width={600}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">Quantum Phase Transitions</h3>
                <p className="mt-2 text-gray-300">
                  Simulation results showing critical behavior near quantum phase transitions in condensed matter
                  systems.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                <Image
                  src="/placeholder.svg?height=340&width=600"
                  alt="Quantum Circuit Optimization"
                  width={600}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">Quantum Circuit Optimization</h3>
                <p className="mt-2 text-gray-300">
                  Performance comparison of various quantum circuit optimization techniques for noisy intermediate-scale
                  quantum (NISQ) devices.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors"
              onClick={() => setActiveSection("contact")}
            >
              Request Access to Simulation Data
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quantum Computing Lab</h3>
              <p className="text-gray-400">
                Pioneering quantum simulation research through high-performance computing.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#research" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#simulations" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Simulations
                  </a>
                </li>
                <li>
                  <a href="#publications" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Publications
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact</h3>
              <address className="not-italic text-gray-400">
                <p>Quantum Computing Lab</p>
                <p>CINECA Supercomputing Center</p>
                <p>Bologna, Italy</p>
                <p className="mt-2">Email: info@quantumlab.cineca.it</p>
                <p>Phone: +39 051 6171411</p>
              </address>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Quantum Computing Lab. All rights reserved.</p>
            <p className="mt-2 text-sm">Powered by CINECA's Leonardo HPC infrastructure.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
