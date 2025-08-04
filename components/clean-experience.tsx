"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Building, Calendar, MapPin, Eye, CheckCircle, Trophy } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Robotics Instructor & Course Creator",
    company: "Ibdaa Academy",
    period: "November 2024 – Present",
    location: "Cairo, Egypt",
    type: "Full-time",
    category: "Education & Training",
    description: "Design and deliver comprehensive robotics courses, create educational content, and mentor students.",
    // Detailed info for popup
    responsibilities: [
      "Develop comprehensive robotics curriculum for different skill levels",
      "Create hands-on project-based learning experiences",
      "Mentor students in robotics programming and hardware integration",
      "Design and build educational robotics kits and materials",
      "Conduct workshops and training sessions for educators",
    ],
    achievements: [
      "Trained 50+ students in robotics fundamentals",
      "Developed 5 comprehensive course modules",
      "Achieved 95% student satisfaction rating",
      "Created reusable educational robotics kits",
    ],
    technologies: ["Arduino", "Python", "Robotics", "Educational Technology", "Curriculum Development"],
    files: [
      {
        name: "Robotics Curriculum.pdf",
        url: "/files/robotics-curriculum.pdf",
        type: "pdf" as const,
        size: "3.5 MB"
      },
      {
        name: "Student Project Examples.jpg",
        url: "/files/student-projects.jpg",
        type: "image" as const,
        size: "2.1 MB"
      }
    ],
  },
  {
    id: 2,
    title: "Founder & CEO",
    company: "Premium Hub (My Startup)",
    period: "July 2023 – Present",
    location: "Cairo, Egypt",
    type: "Entrepreneurship",
    category: "Business & Technology",
    description: "Founded and manage a startup providing 3D printing, 3D modeling services, and educational solutions.",
    responsibilities: [
      "Develop business strategy and operational procedures",
      "Manage client relationships and project delivery",
      "Oversee 3D printing operations and quality control",
      "Create 3D models and prototypes for various industries",
      "Provide educational project solutions for academic institutions",
    ],
    achievements: [
      "Achieved profitability within 6 months",
      "Completed 100+ 3D printing projects",
      "Established partnerships with 10+ educational institutions",
      "Generated consistent monthly revenue growth",
    ],
    technologies: ["3D Printing", "CAD Design", "SolidWorks", "Business Management", "Project Management"],
    files: [
      {
        name: "Business Plan.pdf",
        url: "/files/business-plan.pdf",
        type: "pdf" as const,
        size: "2.8 MB"
      },
      {
        name: "3D Model Portfolio.jpg",
        url: "/files/3d-portfolio.jpg",
        type: "image" as const,
        size: "4.2 MB"
      }
    ],
  },
  {
    id: 3,
    title: "Industrial Performance & Digital Transformation Intern",
    company: "Lafarge Egypt",
    period: "2024",
    location: "Egypt",
    type: "Internship",
    category: "Industrial Engineering",
    description:
      "Worked on industrial automation projects and digital transformation initiatives in cement manufacturing.",
    responsibilities: [
      "Analyze manufacturing processes for efficiency improvements",
      "Implement digital transformation solutions in production lines",
      "Develop automation strategies for cement manufacturing",
      "Create performance monitoring dashboards and KPIs",
      "Collaborate with engineering teams on process optimization",
    ],
    achievements: [
      "Improved production efficiency by 15%",
      "Implemented IoT monitoring system for equipment",
      "Reduced manual inspection time by 40%",
      "Created comprehensive process documentation",
    ],
    technologies: ["Industrial Automation", "Process Optimization", "IoT", "Data Analysis", "Manufacturing Systems"],
    files: [
      {
        name: "Process Optimization Report.pdf",
        url: "/files/process-optimization.pdf",
        type: "pdf" as const,
        size: "1.9 MB"
      },
      {
        name: "IoT Dashboard Screenshot.jpg",
        url: "/files/iot-dashboard.jpg",
        type: "image" as const,
        size: "1.3 MB"
      }
    ],
  },
  {
    id: 4,
    title: "Automation and IIOT Intern",
    company: "Industry Run",
    period: "2024",
    location: "Egypt",
    type: "Internship",
    category: "Industrial IoT",
    description: "Developed IoT solutions for industrial applications and implemented Industry 4.0 technologies.",
    responsibilities: [
      "Design and implement Industrial IoT solutions",
      "Develop automation systems for manufacturing processes",
      "Create real-time monitoring and control systems",
      "Integrate sensors and actuators with control systems",
      "Program PLCs for industrial automation",
    ],
    achievements: [
      "Deployed IoT sensors across 5 production lines",
      "Reduced equipment downtime by 25%",
      "Implemented predictive maintenance system",
      "Created real-time production monitoring dashboard",
    ],
    technologies: ["Industrial IoT", "PLC Programming", "SCADA", "Sensor Integration", "Predictive Maintenance"],
    files: [
      {
        name: "PLC Programming Code.txt",
        url: "/files/plc-code.txt",
        type: "text" as const,
        size: "78 KB"
      },
      {
        name: "SCADA System Design.pdf",
        url: "/files/scada-design.pdf",
        type: "pdf" as const,
        size: "2.4 MB"
      }
    ],
  },
  {
    id: 5,
    title: "Fabrication, PCB Design, and IoT Intern",
    company: "EME Borg",
    period: "August 2024 – October 2024",
    location: "Egypt",
    type: "Internship",
    category: "Electronics & Fabrication",
    description: "Hands-on experience in PCB design using Altium Designer and IoT system development.",
    responsibilities: [
      "Design PCBs using Altium Designer for various applications",
      "Fabricate and assemble electronic prototypes",
      "Develop IoT devices and sensor networks",
      "Test and validate electronic circuits and systems",
      "Create technical documentation for designs",
    ],
    achievements: [
      "Designed 10+ PCBs for different applications",
      "Successfully fabricated and tested all prototypes",
      "Developed IoT sensor network for environmental monitoring",
      "Reduced PCB design time by 30% through optimization",
    ],
    technologies: ["Altium Designer", "PCB Design", "Electronics Fabrication", "IoT Development", "Circuit Testing"],
    files: [
      {
        name: "PCB Design Files.zip",
        url: "/files/pcb-designs.zip",
        type: "other" as const,
        size: "12.5 MB"
      },
      {
        name: "Circuit Schematic.pdf",
        url: "/files/circuit-schematic.pdf",
        type: "pdf" as const,
        size: "1.6 MB"
      }
    ],
  },
  {
    id: 6,
    title: "Electrical Maintenance Engineer Intern",
    company: "Abu Qir Engineering Industries Co.",
    period: "August 2024",
    location: "Egypt",
    type: "Internship",
    category: "Electrical Engineering",
    description: "Worked on electrical maintenance systems and troubleshooting industrial equipment.",
    responsibilities: [
      "Perform electrical maintenance on industrial equipment",
      "Troubleshoot electrical faults and system failures",
      "Implement preventive maintenance schedules",
      "Update electrical schematics and documentation",
      "Ensure compliance with electrical safety standards",
    ],
    achievements: [
      "Reduced electrical downtime by 20%",
      "Updated 50+ electrical schematics",
      "Implemented new preventive maintenance procedures",
      "Zero electrical safety incidents during internship",
    ],
    technologies: ["Electrical Maintenance", "Troubleshooting", "Industrial Equipment", "Safety Protocols"],
    files: [
      {
        name: "Maintenance Procedures.pdf",
        url: "/files/maintenance-procedures.pdf",
        type: "pdf" as const,
        size: "2.9 MB"
      },
      {
        name: "Electrical Schematics.jpg",
        url: "/files/electrical-schematics.jpg",
        type: "image" as const,
        size: "3.4 MB"
      }
    ],
  },
  {
    id: 7,
    title: "Instrumentation and Control Engineer Intern",
    company: "Nile Sugar",
    period: "July 2024",
    location: "Egypt",
    type: "Internship",
    category: "Control Systems",
    description: "Gained experience in instrumentation systems and process automation in sugar manufacturing.",
    responsibilities: [
      "Calibrate and maintain instrumentation equipment",
      "Monitor and optimize control system performance",
      "Implement process automation improvements",
      "Analyze process data and generate reports",
      "Support process optimization initiatives",
    ],
    achievements: [
      "Improved process control accuracy by 10%",
      "Calibrated 100+ instruments",
      "Implemented automated data logging system",
      "Reduced manual monitoring requirements by 50%",
    ],
    technologies: ["Instrumentation", "Control Systems", "Process Automation", "Data Analysis", "Calibration"],
    files: [
      {
        name: "Control System Documentation.pdf",
        url: "/files/control-system-docs.pdf",
        type: "pdf" as const,
        size: "4.1 MB"
      },
      {
        name: "Process Data Analysis.txt",
        url: "/files/process-data.txt",
        type: "text" as const,
        size: "89 KB"
      }
    ],
  },
]

export function CleanExperience() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = (exp: typeof experiences[0]) => {
    setSelectedExperience(exp)
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedExperience(null)
  }

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Work experience and internships across various engineering disciplines
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-primary font-medium text-base mb-2">
                      <Building className="h-4 w-4" />
                      {exp.company}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                      <Badge variant="outline">{exp.category}</Badge>
                    </div>
                  </div>
                  <Badge
                    variant={exp.type === "Full-time" || exp.type === "Entrepreneurship" ? "default" : "secondary"}
                  >
                    {exp.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-200 mb-4">{exp.description}</p>

                <Button variant="outline" size="sm" onClick={() => handleOpen(exp)}>
                  <Eye className="mr-2 h-3 w-3" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

                       {selectedExperience && (
                 <Modal 
                   isOpen={isModalOpen} 
                   onClose={handleClose} 
                   title={selectedExperience.title} 
                   size="lg"
                   files={selectedExperience.files || []}
                 >
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedExperience.title}
                </h3>
                <Badge variant={selectedExperience.type === "Full-time" || selectedExperience.type === "Entrepreneurship" ? "default" : "secondary"}>
                  {selectedExperience.type}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">{selectedExperience.company}</span>
                <Badge variant="outline" className="text-xs">{selectedExperience.category}</Badge>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">{selectedExperience.period}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">{selectedExperience.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">Responsibilities</h4>
                  <ul className="space-y-1 text-xs">
                    {selectedExperience.responsibilities?.slice(0, 3).map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                        <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExperience.technologies.slice(0, 4).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  )
}
