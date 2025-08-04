"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Trophy, Rocket, Code } from "lucide-react"

const timelineEvents = [
  {
    year: "2025",
    type: "current",
    icon: Rocket,
    title: "Current Year - Active Projects & Leadership",
    color: "bg-blue-500",
    activities: [
      {
        category: "Leadership",
        items: [
          "Vice-Chair, IEEE Robotics and Automation Society SB at E-JUST (April 2025 – Present)",
          "2025 IEEE Education Week Ambassador (April 2025)",
        ],
      },
      {
        category: "Projects",
        items: [
          "Stair Climbing Robot (February 2025 – Present) - Advanced autonomous navigation with computer vision",
          "IC-SIT'2025 Competition preparation",
          "MATE ROV Competition development",
        ],
      },
      {
        category: "Volunteering",
        items: ["RiseUp Summit'25 Volunteer (April 2025)"],
      },
    ],
  },
  {
    year: "2024",
    type: "professional",
    icon: Briefcase,
    title: "Professional Growth & Multiple Internships",
    color: "bg-green-500",
    activities: [
      {
        category: "Work Experience",
        items: [
          "Robotics Instructor & Course Creator - Ibdaa Academy (November 2024 – Present)",
          "Industrial Performance & Digital Transformation Intern - Lafarge Egypt (2024)",
          "Automation and IIOT Intern - Industry Run (2024)",
          "Fabrication, PCB Design, and IoT Intern - EME Borg (August 2024 – October 2024)",
          "Electrical Maintenance Engineer Intern - Abu Qir Engineering Industries Co. (August 2024)",
          "Instrumentation and Control Engineer Intern - Nile Sugar (July 2024)",
        ],
      },
      {
        category: "Leadership",
        items: [
          "Treasurer, IEEE Robotics and Automation Society SB at E-JUST (October 2024 – April 2025)",
          "Mechanical Team Member, E-JUST Robotics Club (October 2024 – Present)",
        ],
      },
      {
        category: "Projects",
        items: [
          "ROV (Remotely Operated Vehicle) (October 2024 – Present)",
          "Minesweeper Robot (June 2024 – Present)",
          "Obstacle Avoidance Robot (February 2024)",
        ],
      },
      {
        category: "Professional Development",
        items: [
          "Data Analysis: Skills for the Freelance Professional - NTI (December 2024 – Present)",
          "HA Consulting Group Training: Classic Control, PLC Programming, Electric Motor & Drive Programming (September 2024 - December 2024)",
          "AI Career Essentials - ALX AiCE (July 2024 - August 2024)",
          "Mechanical Design via SolidWorks - Udemy (June 2024)",
        ],
      },
      {
        category: "Competitions",
        items: [
          "Minesweepers Competition (2024)",
          "AAKRUTI Global Competition (2024)",
          "Technical & Academics Committee Member - EJUST Dragons Club (July 2023 - 2024)",
        ],
      },
    ],
  },
  {
    year: "2023",
    type: "entrepreneurship",
    icon: Code,
    title: "Entrepreneurship & Innovation",
    color: "bg-purple-500",
    activities: [
      {
        category: "Startup",
        items: [
          "Founded Premium Hub (July 2023 – Present) - 3D printing, 3D modeling services, and educational project solutions",
        ],
      },
      {
        category: "Professional Development",
        items: ["Introduction to AI and its Applications - Zewail City for Science and Technology (August 2023)"],
      },
      {
        category: "Competitions",
        items: ["Minesweepers Competition (2023)"],
      },
      {
        category: "Activities",
        items: ["Robotics Committee Member - IEEE E-JUST (October 2022 - October 2024)"],
      },
    ],
  },
  {
    year: "2022",
    type: "education",
    icon: GraduationCap,
    title: "University Journey Begins & Scholarships",
    color: "bg-orange-500",
    activities: [
      {
        category: "Education",
        items: [
          "Started Mechatronics Engineering at E-JUST University (September 2022 – June 2027)",
          "Received 75% Scholarship for academic excellence",
        ],
      },
      {
        category: "Awards & Scholarships",
        items: [
          "Beijing Government Scholarship - North China University of Technology (June 2022)",
          "SII Scholarship, India (August 2022)",
        ],
      },
      {
        category: "Projects",
        items: ["Electrical Energy Generator System (2022) - Renewable energy generation system"],
      },
      {
        category: "Volunteering",
        items: ["Egyptian Red Crescent volunteer work (July 2020 – August 2022)"],
      },
    ],
  },
  {
    year: "2019-2021",
    type: "competitions",
    icon: Trophy,
    title: "High School Achievements & Early Projects",
    color: "bg-red-500",
    activities: [
      {
        category: "Competitions",
        items: [
          "NASA Space Apps Giza (2021)",
          "NASA Space Apps EL-Minia (2021)",
          "NASA Space Apps COVID-19 Challenge Cairo (2020)",
          "COVID-19 Virtual Hackathon - ACPC, U.S. Embassy Cairo, AAST (2020)",
          "Let's Goal Robotics Competition - IEEE NU (2019)",
        ],
      },
      {
        category: "Volunteering",
        items: [
          "Resala Charity Organization (July 2019 – Present)",
          "Bahiya Hospital volunteer work (July 2019 – July 2020)",
        ],
      },
      {
        category: "Education",
        items: ["Beni Suef STEM School (September 2018 – June 2022) - GPA: 3.7 / 4.00"],
      },
    ],
  },
]

export function ComprehensiveTimeline() {
  return (
    <section id="timeline" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            A comprehensive timeline of my educational, professional, and personal development milestones
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-12">
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold">{event.title}</h3>
                          </div>
                          <Badge variant="outline" className="self-start text-lg px-3 py-1">
                            {event.year}
                          </Badge>
                        </div>

                        <div className="space-y-6">
                          {event.activities.map((activity, activityIndex) => (
                            <div key={activityIndex}>
                              <h4 className="text-lg font-semibold mb-3 text-primary">{activity.category}</h4>
                              <div className="space-y-2">
                                {activity.items.map((item, itemIndex) => (
                                  <div key={itemIndex} className="flex items-start gap-3">
                                    <div className={`w-2 h-2 rounded-full ${event.color} mt-2 flex-shrink-0`}></div>
                                    <span className="text-sm leading-relaxed">{item}</span>
                                  </div>
                                ))}
                              </div>
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
