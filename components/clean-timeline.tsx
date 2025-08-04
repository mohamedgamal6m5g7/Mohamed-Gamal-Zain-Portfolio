"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Trophy, Rocket, Code } from "lucide-react"

const keyMilestones = [
  {
    year: "2025",
    icon: Rocket,
    title: "Current Leadership & Advanced Projects",
    color: "bg-blue-500",
    highlights: [
      "Vice-Chair, IEEE Robotics and Automation Society",
      "IEEE Education Week Ambassador 2025",
      "Stair Climbing Robot Development",
      "MATE ROV Competition Preparation",
    ],
  },
  {
    year: "2024",
    icon: Briefcase,
    title: "Professional Growth & Multiple Internships",
    color: "bg-green-500",
    highlights: [
      "Robotics Instructor at Ibdaa Academy",
      "7 Industry Internships (Lafarge, Industry Run, EME Borg)",
      "Advanced Robotics Projects (ROV, Minesweeper)",
      "Professional Training Programs Completed",
    ],
  },
  {
    year: "2023",
    icon: Code,
    title: "Entrepreneurship & Innovation",
    color: "bg-purple-500",
    highlights: [
      "Founded Premium Hub Startup",
      "3D Printing & Educational Services",
      "AI and Robotics Training",
      "Competition Participations",
    ],
  },
  {
    year: "2022",
    icon: GraduationCap,
    title: "University & International Recognition",
    color: "bg-orange-500",
    highlights: [
      "Started Mechatronics Engineering at E-JUST",
      "75% Merit Scholarship Recipient",
      "Beijing Government & SII India Scholarships",
      "Renewable Energy Project",
    ],
  },
  {
    year: "2019-2021",
    icon: Trophy,
    title: "Early Achievements & Competitions",
    color: "bg-red-500",
    highlights: [
      "Multiple NASA Space Apps Challenges",
      "COVID-19 Virtual Hackathon",
      "STEM School Excellence (GPA 3.7/4.0)",
      "Community Volunteering Initiatives",
    ],
  },
]

export function CleanTimeline() {
  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Key milestones in my educational and professional development
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {keyMilestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${milestone.color} shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Card className="border-border hover:shadow-lg transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                          <h3 className="text-xl font-bold">{milestone.title}</h3>
                          <Badge variant="outline" className="self-start">
                            {milestone.year}
                          </Badge>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2">
                          {milestone.highlights.map((highlight, highlightIndex) => (
                            <div key={highlightIndex} className="flex items-center gap-2 text-sm">
                              <div className={`w-2 h-2 rounded-full ${milestone.color}`}></div>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
