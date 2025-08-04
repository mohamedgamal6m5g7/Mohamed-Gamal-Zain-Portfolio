"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { Moon, Sun, Download, Mail, Phone, MapPin, Globe, Menu, X, ChevronDown, Award, Star, Zap, Linkedin, Building, Calendar, CheckCircle, Trophy } from "lucide-react"
import { CleanTimeline } from "@/components/clean-timeline"
import { CleanProjects } from "@/components/clean-projects"
import { CleanExperience } from "@/components/clean-experience"
import { InteractiveSkills } from "@/components/interactive-skills"
import { ProfessionalDevelopment } from "@/components/professional-development"
import { VolunteeringActivities } from "@/components/volunteering-activities"
import { Testimonials } from "@/components/testimonials"
import { WorkingContactForm } from "@/components/working-contact-form"
import type { PortfolioData } from "@/lib/portfolio-data"

export default function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio")
        if (response.ok) {
          const data = await response.json()
          setPortfolioData(data)
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "about", name: "About" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "experience", name: "Experience" },
    { id: "development", name: "Development" },
    { id: "activities", name: "Activities" },
    { id: "testimonials", name: "Testimonials" },
    { id: "contact", name: "Contact" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">Failed to load portfolio data</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-900/95">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {portfolioData.personalInfo.name.split(" ")[0]}
                </h1>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium opacity-70 hover:opacity-100"
                  >
                    {item.name}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2 opacity-70 hover:opacity-100"
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full justify-start opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-6xl mx-auto text-center">
            {/* Profile Photo */}
            <div className="mb-12 mt-8">
              {/* Modern Hexagonal Profile Photo */}
              <div className="relative inline-block">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20 animate-pulse scale-110"></div>
                {/* Main hexagonal container */}
                <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-1 rounded-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                  {/* Inner container with photo */}
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    <img
                      src={portfolioData.personalInfo.photo || "/placeholder.svg"}
                      alt="Profile"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-cover object-center"
                      style={{ objectPosition: 'center center' }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              {portfolioData.personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
              {portfolioData.personalInfo.title}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              {portfolioData.personalInfo.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Mail className="h-4 w-4" />
                Contact Me
              </Button>
            </div>

            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4" />
                <span>{portfolioData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4" />
                <span>{portfolioData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <MapPin className="h-4 w-4" />
                <span>{portfolioData.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn Profile</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Background</h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      I am a passionate Mechatronics Engineering student with a strong focus on industrial digital transformation, 
                      robotics, and automation. My journey combines technical expertise with innovative problem-solving approaches.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Industrial Automation</Badge>
                      <Badge variant="secondary">Robotics</Badge>
                      <Badge variant="secondary">Digital Transformation</Badge>
                      <Badge variant="secondary">IoT</Badge>
                      <Badge variant="secondary">Control Systems</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Mechatronics Engineering</h4>
                    <p className="text-gray-700 dark:text-gray-200">E-JUST University (September 2022 – June 2027)</p>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">CGPA: 3.17 / 4.00 • 75% Scholarship Recipient</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">High School</h4>
                    <p className="text-gray-700 dark:text-gray-200">Beni Suef STEM School (September 2018 – June 2022)</p>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">GPA: 3.7 / 4.00</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Clean Timeline Section */}
        <CleanTimeline />

        {/* Interactive Skills Section */}
        <section id="skills">
          <InteractiveSkills skillCategories={portfolioData.skillCategories} />
        </section>

        {/* Clean Projects Section */}
        <section id="projects">
          <CleanProjects />
        </section>

        {/* Clean Experience Section */}
        <section id="experience">
          <CleanExperience />
        </section>

        {/* Professional Development Section */}
        <section id="development">
          <ProfessionalDevelopment courses={portfolioData.courses} />
        </section>

        {/* Volunteering & Activities Section */}
        <section id="activities">
          <VolunteeringActivities 
            volunteering={portfolioData.volunteering}
            activities={portfolioData.activities}
            competitions={portfolioData.competitions}
            awards={portfolioData.awards}
          />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <Testimonials testimonials={portfolioData.testimonials} />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <WorkingContactForm />
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 {portfolioData.personalInfo.name}. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{selectedItem.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedItem.period}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                    {selectedItem.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {selectedItem.responsibilities && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedItem.responsibilities?.map((resp: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.achievements && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {selectedItem.achievements?.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                          <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.technologies && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies & Skills Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies?.map((tech: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
