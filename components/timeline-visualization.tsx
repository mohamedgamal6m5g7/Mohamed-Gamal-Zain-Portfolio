"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, Trophy, Award, Rocket } from "lucide-react"

const timelineEvents = [
  {
    year: "2025",
    type: "achievement",
    icon: Award,
    title: "IEEE Education Week Ambassador",
    description: "Selected as ambassador for IEEE Education Week 2025",
    color: "bg-purple-500",
    items: [
      "Vice-Chair, IEEE Robotics and Automation Society",
      "RiseUp Summit'25 Volunteer",
      "IC-SIT'2025 Competition",
      "MATE ROV Competition",
    ],
  },
  {
    year: "2024",
    type: "work",
    icon: Briefcase,
    title: "Professional Growth",
    description: "Started teaching and multiple internships",
    color: "bg-blue-500",
    items: [
      "Robotics Instructor at Ibdaa Academy",
      "EME Borg - Fabrication & IoT Intern",
      "Abu Qir Engineering - Electrical Maintenance",
      "Nile Sugar - Instrumentation & Control",
    ],
  },
  {
    year: "2023",
    type: "startup",
    icon: Rocket,
    title: "Entrepreneurship",
    description: "Founded Premium Hub startup",
    color: "bg-green-500",
    items: [
      "Premium Hub Startup Launch",
      "3D Printing & Modeling Services",
      "Educational Project Services",
      "Zewail City AI Training",
    ],
  },
  {
    year: "2022",
    type: "education",
    icon: GraduationCap,
    title: "University Journey Begins",
    description: "Started Mechatronics Engineering at E-JUST",
    color: "bg-orange-500",
    items: [
      "E-JUST University Admission",
      "75% Scholarship Recipient",
      "Beijing Government Scholarship",
      "SII Scholarship, India",
    ],
  },
  {
    year: "2019-2021",
    type: "competitions",
    icon: Trophy,
    title: "Early Achievements",
    description: "High school competitions and projects",
    color: "bg-red-500",
    items: [
      "NASA Space Apps Challenges",
      "COVID-19 Virtual Hackathon",
      "Let's Goal Robotics Competition",
      "Water Treatment Project",
    ],
  },
]

export function TimelineVisualization() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            A timeline of my educational, professional, and entrepreneurial milestones
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${event.color} shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Card className="border-border">
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-gray-700 dark:text-gray-200">{event.description}</p>
                          </div>
                          <Badge variant="outline" className="self-start">
                            {event.year}
                          </Badge>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2">
                          {event.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 text-sm">
                              <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                              <span>{item}</span>
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
