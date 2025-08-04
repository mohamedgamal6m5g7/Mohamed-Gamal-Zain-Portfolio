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
import { Github, Play, ImageIcon, FileText, Award } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Stair Climbing Robot",
    period: "February 2025 – Present",
    description:
      "Advanced robotics project demonstrating autonomous navigation capabilities applicable to industrial inspection and maintenance robots.",
    longDescription:
      "This project involves developing a sophisticated robot capable of autonomously navigating and climbing stairs. The system uses advanced computer vision algorithms for stair detection, path planning, and obstacle avoidance. The mechanical design features adaptive wheels and suspension system for optimal stair climbing performance.",
    technologies: ["Python", "OpenCV", "ROS", "3D Printing", "Computer Vision"],
    status: "In Progress",
    metrics: {
      accuracy: "95%",
      climbingAngle: "45°",
      weight: "2.5kg",
      batteryLife: "4 hours",
    },
    images: [
      "/placeholder.svg?height=300&width=400&text=Robot+Front+View",
      "/placeholder.svg?height=300&width=400&text=Climbing+Mechanism",
      "/placeholder.svg?height=300&width=400&text=Control+System",
    ],
    videoUrl: "/placeholder.svg?height=300&width=400&text=Demo+Video",
    githubUrl: "#",
    achievements: ["Best Innovation Award", "Technical Excellence Recognition"],
  },
  {
    id: 2,
    title: "ROV (Remotely Operated Vehicle)",
    period: "October 2024 – Present",
    description:
      "Underwater robotics system showcasing remote operation and control technologies relevant to industrial monitoring applications.",
    longDescription:
      "Designed and built an underwater ROV for marine exploration and research. Features waterproof design, real-time HD video streaming, precise thruster control, and modular sensor integration. The system includes advanced stabilization algorithms and emergency safety protocols.",
    technologies: ["ESP32", "Waterproof Design", "Video Streaming", "Control Systems"],
    status: "In Progress",
    metrics: {
      depth: "50m",
      runtime: "6 hours",
      videoQuality: "1080p",
      controlRange: "500m",
    },
    images: [
      "/placeholder.svg?height=300&width=400&text=ROV+Assembly",
      "/placeholder.svg?height=300&width=400&text=Underwater+Test",
      "/placeholder.svg?height=300&width=400&text=Control+Interface",
    ],
    videoUrl: "/placeholder.svg?height=300&width=400&text=Underwater+Demo",
    githubUrl: "#",
    achievements: ["MATE ROV Competition Qualifier", "Engineering Excellence Award"],
  },
  {
    id: 3,
    title: "Minesweeper Robot",
    period: "June 2024 – Present",
    description:
      "Autonomous detection system utilizing AI and sensor fusion, applicable to industrial safety and quality control processes.",
    longDescription:
      "Safety-focused autonomous robot designed for detecting and marking potential hazardous objects in various terrains. Utilizes machine learning algorithms, multiple sensor types, and advanced path planning for safe and efficient operation in dangerous environments.",
    technologies: ["Machine Learning", "Sensor Fusion", "Autonomous Navigation", "Safety Systems"],
    status: "In Progress",
    metrics: {
      detectionAccuracy: "98%",
      operatingTime: "8 hours",
      safetyRadius: "10m",
      terrainTypes: "5+",
    },
    images: [
      "/placeholder.svg?height=300&width=400&text=Detection+System",
      "/placeholder.svg?height=300&width=400&text=Field+Testing",
      "/placeholder.svg?height=300&width=400&text=Safety+Protocols",
    ],
    videoUrl: "/placeholder.svg?height=300&width=400&text=Field+Demo",
    githubUrl: "#",
    achievements: ["Minesweeper Competition Winner", "Safety Innovation Award"],
  },
]

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Engineering projects demonstrating expertise in automation, robotics, and digital transformation
            technologies
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
                <CardDescription>{project.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(project.metrics)
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-muted/50 rounded">
                        <div className="text-sm font-semibold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                      </div>
                    ))}
                </div>

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

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedProject(project)}
                      >
                        <ImageIcon className="mr-2 h-3 w-3" />
                        View Details
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
                        <DialogDescription>{project.period}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Image Gallery */}
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

                        {/* Description */}
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Project Overview</h4>
                          <p className="text-gray-700 dark:text-gray-200">{project.longDescription}</p>
                        </div>

                        {/* Metrics */}
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Technical Specifications</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
