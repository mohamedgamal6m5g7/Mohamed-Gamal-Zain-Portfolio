"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Eye, Calendar, Award, Target, AlertTriangle, Wrench, CheckCircle } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Stair Climbing Robot",
    period: "February 2025 – Present",
    status: "In Progress",
    category: "Autonomous Robotics",
    description: "Advanced robotics project with autonomous navigation and computer vision for stair detection.",
    image: "/placeholder.svg?height=200&width=300&text=Stair+Robot",
    technologies: ["Python", "OpenCV", "Computer Vision", "Arduino"],
    // Detailed info for popup
    longDescription:
      "This project involves developing a sophisticated robot capable of autonomously navigating and climbing stairs. The system uses advanced computer vision algorithms for stair detection, path planning, and obstacle avoidance. The mechanical design features adaptive wheels and suspension system for optimal stair climbing performance.",
    objectives: [
      "Develop autonomous stair detection algorithm",
      "Design adaptive mechanical climbing system",
      "Implement real-time balance control",
      "Create safety protocols for autonomous operation",
    ],
    challenges: [
      "Variable stair dimensions and materials",
      "Real-time processing requirements",
      "Mechanical stability during climbing",
      "Power consumption optimization",
    ],
    achievements: ["Best Innovation Award", "Technical Excellence Recognition"],
    allTechnologies: ["Python", "OpenCV", "Computer Vision", "Mechanical Design", "Arduino", "Sensor Fusion"],
    files: [
      {
        name: "Project Documentation.pdf",
        url: "/files/stair-robot-docs.pdf",
        type: "pdf" as const,
        size: "2.3 MB"
      },
      {
        name: "Robot Design Sketch.jpg",
        url: "/files/stair-robot-design.jpg",
        type: "image" as const,
        size: "1.1 MB"
      }
    ],
  },
  {
    id: 2,
    title: "ROV (Remotely Operated Vehicle)",
    period: "October 2024 – Present",
    status: "In Progress",
    category: "Marine Robotics",
    description: "Underwater remotely operated vehicle with real-time video streaming and precise control systems.",
    image: "/placeholder.svg?height=200&width=300&text=ROV+System",
    technologies: ["ESP32", "Video Streaming", "Control Systems"],
    longDescription:
      "Designed and built an underwater ROV for marine exploration and research. Features waterproof design, real-time HD video streaming, precise thruster control, and modular sensor integration. The system includes advanced stabilization algorithms and emergency safety protocols.",
    objectives: [
      "Design waterproof electronics housing",
      "Implement real-time video streaming",
      "Develop precise underwater navigation",
      "Create modular sensor platform",
    ],
    challenges: [
      "Waterproofing at depth",
      "Underwater communication latency",
      "Buoyancy and stability control",
      "Power management underwater",
    ],
    achievements: ["MATE ROV Competition Qualifier", "Engineering Excellence Award"],
    allTechnologies: [
      "ESP32",
      "Waterproof Design",
      "Video Streaming",
      "Control Systems",
      "Thruster Control",
      "Sensor Integration",
    ],
    files: [
      {
        name: "ROV Technical Specifications.pdf",
        url: "/files/rov-specs.pdf",
        type: "pdf" as const,
        size: "1.8 MB"
      },
      {
        name: "Underwater Testing Video.mp4",
        url: "/files/rov-testing.mp4",
        type: "other" as const,
        size: "15.2 MB"
      }
    ],
  },
  {
    id: 3,
    title: "Minesweeper Robot",
    period: "June 2024 – Present",
    status: "In Progress",
    category: "Safety & Detection",
    description: "Autonomous robot for detecting and marking hazardous objects using AI and sensor fusion.",
    image: "/placeholder.svg?height=200&width=300&text=Minesweeper",
    technologies: ["Machine Learning", "Sensor Fusion", "Safety Systems"],
    longDescription:
      "Safety-focused autonomous robot designed for detecting and marking potential hazardous objects in various terrains. Utilizes machine learning algorithms, multiple sensor types, and advanced path planning for safe and efficient operation in dangerous environments.",
    objectives: [
      "Develop multi-sensor detection system",
      "Implement safe autonomous navigation",
      "Create hazard mapping system",
      "Design emergency stop protocols",
    ],
    challenges: [
      "False positive reduction",
      "Terrain adaptability",
      "Safety protocol implementation",
      "Real-time decision making",
    ],
    achievements: ["Minesweeper Competition Winner", "Safety Innovation Award"],
    allTechnologies: [
      "Machine Learning",
      "Sensor Fusion",
      "Autonomous Navigation",
      "Safety Systems",
      "GPS",
      "Metal Detection",
    ],
    files: [
      {
        name: "Safety Protocol Documentation.pdf",
        url: "/files/minesweeper-safety.pdf",
        type: "pdf" as const,
        size: "3.1 MB"
      },
      {
        name: "Detection Algorithm Code.txt",
        url: "/files/detection-algorithm.txt",
        type: "text" as const,
        size: "45 KB"
      }
    ],
  },
  {
    id: 4,
    title: "Color Sorting Conveyor System",
    period: "January 2025",
    status: "Completed",
    category: "Industrial Automation",
    description: "Automated sorting system using computer vision to identify and sort objects by color.",
    image: "/placeholder.svg?height=200&width=300&text=Conveyor+System",
    technologies: ["Computer Vision", "Automation", "PLC Programming"],
    longDescription:
      "Industrial automation project featuring a conveyor belt system with computer vision-based color sorting. The system can identify objects by color in real-time and sort them into different bins using pneumatic actuators.",
    objectives: [
      "Implement real-time color detection",
      "Design efficient sorting mechanism",
      "Create user-friendly HMI interface",
      "Optimize sorting speed and accuracy",
    ],
    challenges: [
      "Lighting consistency for color detection",
      "Timing synchronization with conveyor",
      "Mechanical precision of sorting",
      "System reliability and maintenance",
    ],
    achievements: ["100% sorting accuracy achieved", "Industrial automation certification"],
    allTechnologies: [
      "Computer Vision",
      "Conveyor Systems",
      "Automation",
      "Color Detection",
      "PLC Programming",
      "Pneumatics",
    ],
    files: [
      {
        name: "PLC Programming Manual.pdf",
        url: "/files/plc-manual.pdf",
        type: "pdf" as const,
        size: "4.2 MB"
      },
      {
        name: "System Schematic.jpg",
        url: "/files/conveyor-schematic.jpg",
        type: "image" as const,
        size: "2.8 MB"
      }
    ],
  },
  {
    id: 5,
    title: "Obstacle Avoidance Robot",
    period: "February 2024",
    status: "Completed",
    category: "Mobile Robotics",
    description: "Mobile robot with advanced sensor integration for real-time obstacle detection and path planning.",
    image: "/placeholder.svg?height=200&width=300&text=Mobile+Robot",
    technologies: ["Arduino", "Ultrasonic Sensors", "Path Planning"],
    longDescription:
      "Autonomous mobile robot designed for navigation in complex environments with dynamic obstacle avoidance. Features multiple ultrasonic sensors, IMU for orientation, and advanced path planning algorithms.",
    objectives: [
      "Implement 360-degree obstacle detection",
      "Develop dynamic path planning",
      "Create smooth navigation algorithms",
      "Optimize power consumption",
    ],
    challenges: [
      "Sensor noise filtering",
      "Real-time path calculation",
      "Smooth motor control",
      "Battery life optimization",
    ],
    achievements: ["Robotics competition finalist", "Best technical implementation"],
    allTechnologies: ["Ultrasonic Sensors", "Path Planning", "Arduino", "Real-time Processing", "IMU", "Motor Control"],
    files: [
      {
        name: "Navigation Algorithm Code.txt",
        url: "/files/navigation-algorithm.txt",
        type: "text" as const,
        size: "67 KB"
      },
      {
        name: "Robot Testing Video.mp4",
        url: "/files/robot-testing.mp4",
        type: "other" as const,
        size: "8.5 MB"
      }
    ],
  },
  {
    id: 6,
    title: "Renewable Energy Generator",
    period: "2022",
    status: "Completed",
    category: "Renewable Energy",
    description: "Sustainable energy generation system with intelligent power management.",
    image: "/placeholder.svg?height=200&width=300&text=Energy+System",
    technologies: ["Power Electronics", "Energy Conversion", "MPPT"],
    longDescription:
      "Sustainable energy project focusing on renewable power generation using multiple sources. The system combines solar panels, wind generation, and energy storage with intelligent power management.",
    objectives: [
      "Design hybrid renewable energy system",
      "Implement efficient power conversion",
      "Create intelligent energy management",
      "Optimize system efficiency",
    ],
    challenges: [
      "Variable renewable energy sources",
      "Power conversion efficiency",
      "Energy storage optimization",
      "Grid synchronization",
    ],
    achievements: ["Renewable energy innovation award", "Sustainability recognition"],
    allTechnologies: [
      "Power Electronics",
      "Energy Conversion",
      "Sustainable Design",
      "Battery Management",
      "MPPT",
      "Grid Integration",
    ],
    files: [
      {
        name: "Energy System Design.pdf",
        url: "/files/energy-system-design.pdf",
        type: "pdf" as const,
        size: "5.7 MB"
      },
      {
        name: "Power Management Code.txt",
        url: "/files/power-management.txt",
        type: "text" as const,
        size: "23 KB"
      }
    ],
  },
]

export function CleanProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Engineering projects demonstrating expertise in robotics, automation, and digital transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {project.period}
                </CardDescription>
                <Badge variant="outline" className="w-fit">
                  {project.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => handleOpen(project)}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
                       {selectedProject && (
                 <Modal 
                   isOpen={isModalOpen} 
                   onClose={handleClose} 
                   title={selectedProject.title} 
                   size="lg"
                   files={selectedProject.files || []}
                 >
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedProject.title}
                </h3>
                <Badge variant={selectedProject.status === "In Progress" ? "default" : "secondary"}>
                  {selectedProject.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">{selectedProject.period}</span>
                <Badge variant="outline" className="text-xs">{selectedProject.category}</Badge>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">{selectedProject.longDescription || selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">Objectives</h4>
                  <ul className="space-y-1 text-xs">
                    {selectedProject.objectives?.slice(0, 3).map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                        <div className="w-1 h-1 bg-green-600 dark:bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.technologies.slice(0, 4).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600">
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
