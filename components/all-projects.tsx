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
import { Github, Play, ImageIcon, FileText, Award, Calendar } from "lucide-react"

const allProjects = [
  {
    id: 1,
    title: "Stair Climbing Robot",
    period: "February 2025 – Present",
    status: "In Progress",
    category: "Autonomous Robotics",
    description:
      "Advanced robotics project focused on developing a robot capable of navigating stairs autonomously using computer vision and mechanical design.",
    longDescription:
      "This project involves developing a sophisticated robot capable of autonomously navigating and climbing stairs. The system uses advanced computer vision algorithms for stair detection, path planning, and obstacle avoidance. The mechanical design features adaptive wheels and suspension system for optimal stair climbing performance. Key innovations include real-time image processing, dynamic balance control, and adaptive grip mechanisms.",
    technologies: ["Python", "OpenCV", "Computer Vision", "Mechanical Design", "Arduino", "Sensor Fusion"],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=Stair+Robot+Front",
      "/placeholder.svg?height=300&width=400&text=Climbing+Mechanism",
    ],
  },
  {
    id: 2,
    title: "ROV (Remotely Operated Vehicle)",
    period: "October 2024 – Present",
    status: "In Progress",
    category: "Marine Robotics",
    description:
      "Underwater remotely operated vehicle with real-time video streaming and precise control systems for marine exploration.",
    longDescription:
      "Designed and built an underwater ROV for marine exploration and research. Features waterproof design, real-time HD video streaming, precise thruster control, and modular sensor integration. The system includes advanced stabilization algorithms and emergency safety protocols. Built for MATE ROV Competition with focus on practical underwater tasks.",
    technologies: [
      "ESP32",
      "Waterproof Design",
      "Video Streaming",
      "Control Systems",
      "Thruster Control",
      "Sensor Integration",
    ],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=ROV+Assembly",
      "/placeholder.svg?height=300&width=400&text=Underwater+Test",
    ],
  },
  {
    id: 3,
    title: "Minesweeper Robot",
    period: "June 2024 – Present",
    status: "In Progress",
    category: "Safety & Detection",
    description:
      "Autonomous robot designed for detecting and marking potential hazardous objects using advanced sensor fusion and AI algorithms.",
    longDescription:
      "Safety-focused autonomous robot designed for detecting and marking potential hazardous objects in various terrains. Utilizes machine learning algorithms, multiple sensor types, and advanced path planning for safe and efficient operation in dangerous environments. Features include metal detection, ground-penetrating radar simulation, and GPS mapping.",
    technologies: [
      "Machine Learning",
      "Sensor Fusion",
      "Autonomous Navigation",
      "Safety Systems",
      "GPS",
      "Metal Detection",
    ],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=Detection+System",
      "/placeholder.svg?height=300&width=400&text=Field+Testing",
    ],
  },
  {
    id: 4,
    title: "Color Sorting Conveyor Belt Machine",
    period: "January 2025",
    status: "Completed",
    category: "Industrial Automation",
    description:
      "Automated sorting system using computer vision to identify and sort objects by color on a conveyor belt system.",
    longDescription:
      "Industrial automation project featuring a conveyor belt system with computer vision-based color sorting. The system can identify objects by color in real-time and sort them into different bins using pneumatic actuators. Includes PLC programming for industrial control and HMI interface for operator interaction.",
    technologies: [
      "Computer Vision",
      "Conveyor Systems",
      "Automation",
      "Color Detection",
      "PLC Programming",
      "Pneumatics",
    ],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=Conveyor+System",
      "/placeholder.svg?height=300&width=400&text=Color+Detection",
    ],
  },
  {
    id: 5,
    title: "Obstacle Avoidance Robot",
    period: "February 2024",
    status: "Completed",
    category: "Mobile Robotics",
    description: "Mobile robot with advanced sensor integration for real-time obstacle detection and path planning.",
    longDescription:
      "Autonomous mobile robot designed for navigation in complex environments with dynamic obstacle avoidance. Features multiple ultrasonic sensors, IMU for orientation, and advanced path planning algorithms. The robot can map its environment and find optimal paths while avoiding static and moving obstacles.",
    technologies: ["Ultrasonic Sensors", "Path Planning", "Arduino", "Real-time Processing", "IMU", "Motor Control"],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=Robot+Navigation",
      "/placeholder.svg?height=300&width=400&text=Sensor+Array",
    ],
  },
  {
    id: 6,
    title: "Electrical Energy Generator System",
    period: "2022",
    status: "Completed",
    category: "Renewable Energy",
    description: "Renewable energy generation system designed for sustainable power production.",
    longDescription:
      "Sustainable energy project focusing on renewable power generation using multiple sources. The system combines solar panels, wind generation, and energy storage with intelligent power management. Features include maximum power point tracking, battery management system, and grid-tie capability.",
    technologies: [
      "Power Electronics",
      "Energy Conversion",
      "Sustainable Design",
      "Battery Management",
      "MPPT",
      "Grid Integration",
    ],
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
    images: [
      "/placeholder.svg?height=300&width=400&text=Energy+System",
      "/placeholder.svg?height=300&width=400&text=Power+Electronics",
    ],
  },
]

export function AllProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof allProjects)[0] | null>(null)
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))]
  const filteredProjects =
    filterCategory === "All" ? allProjects : allProjects.filter((p) => p.category === filterCategory)

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">All Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete portfolio of engineering projects across robotics, automation, and digital transformation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
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
                    src={project.images?.[0] || "/placeholder.svg?height=200&width=300&text=Project+Image"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() => setSelectedProject(project)}
                    >
                      <ImageIcon className="mr-2 h-3 w-3" />
                      View Full Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {project.title}
                        <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.period}
                        </span>
                        <Badge variant="outline">{project.category}</Badge>
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Images */}
                      {project.images && (
                        <div className="grid md:grid-cols-2 gap-4">
                          {project.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Project Overview</h4>
                        <p className="text-gray-700 dark:text-gray-200">{project.longDescription}</p>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Project Objectives</h4>
                        <ul className="space-y-2">
                          {project.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Challenges */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Technical Challenges</h4>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                              <div className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Technologies & Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {project.achievements && (
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Achievements & Recognition</h4>
                          <div className="space-y-2">
                            {project.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-200">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1">
                          <Play className="mr-2 h-4 w-4" />
                          Watch Demo
                        </Button>
                        <Button variant="outline">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Documentation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
