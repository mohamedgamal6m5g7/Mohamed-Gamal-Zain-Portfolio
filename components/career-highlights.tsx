"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Briefcase, GraduationCap, Rocket } from "lucide-react"

const highlights = [
  {
    category: "Academic Excellence",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    achievements: [
      {
        title: "75% Scholarship Recipient",
        description: "E-JUST University - Merit-based full scholarship",
        impact: "Top 5% of applicants",
      },
      {
        title: "Multiple International Scholarships",
        description: "Beijing Government & SII India scholarships",
        impact: "Global recognition",
      },
      {
        title: "CGPA 3.17/4.00",
        description: "Consistent academic performance while managing multiple projects",
        impact: "Dean's list candidate",
      },
    ],
  },
  {
    category: "Professional Experience",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    achievements: [
      {
        title: "7 Successful Internships",
        description: "Major companies: Lafarge Egypt, Industry Run, EME Borg",
        impact: "100% positive feedback",
      },
      {
        title: "Robotics Instructor",
        description: "Teaching and mentoring at Ibdaa Academy",
        impact: "50+ students trained",
      },
      {
        title: "Startup Founder",
        description: "Premium Hub - 3D printing and educational services",
        impact: "Profitable from month 6",
      },
    ],
  },
  {
    category: "Leadership & Recognition",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    achievements: [
      {
        title: "IEEE Education Week Ambassador 2025",
        description: "Selected to represent IEEE educational initiatives",
        impact: "International recognition",
      },
      {
        title: "Vice-Chair IEEE RAS",
        description: "Leading robotics and automation society at E-JUST",
        impact: "Managing 100+ members",
      },
      {
        title: "Competition Winner",
        description: "Multiple robotics and innovation competitions",
        impact: "3 major awards",
      },
    ],
  },
  {
    category: "Innovation & Impact",
    icon: Rocket,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    achievements: [
      {
        title: "15+ Technical Projects",
        description: "From concept to implementation across various domains",
        impact: "95% success rate",
      },
      {
        title: "Process Optimization",
        description: "Improved efficiency in industrial settings",
        impact: "15-40% improvements",
      },
      {
        title: "Safety Innovations",
        description: "Developed safety protocols and systems",
        impact: "Zero incidents record",
      },
    ],
  },
]

const quickStats = [
  { number: "7", label: "Industry Internships", description: "Major companies across Egypt" },
  { number: "15+", label: "Technical Projects", description: "From robotics to IoT solutions" },
  { number: "3", label: "Leadership Roles", description: "IEEE positions and team lead" },
  { number: "50+", label: "Students Mentored", description: "Through teaching and workshops" },
  { number: "10+", label: "Competitions", description: "National and international level" },
  { number: "95%", label: "Success Rate", description: "Project completion and quality" },
]

export function CareerHighlights() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Career Highlights</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            A track record of excellence, leadership, and measurable impact across academic and professional settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-border text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="border-l-2 border-primary/20 pl-4">
                        <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {achievement.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
