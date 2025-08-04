"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"

const allExperience = [
  {
    title: "Robotics Instructor & Course Creator",
    company: "Ibdaa Academy",
    period: "November 2024 – Present",
    location: "Cairo, Egypt",
    type: "Full-time",
    category: "Education & Training",
    description:
      "Design and deliver comprehensive robotics courses, create educational content, and mentor students in hands-on robotics projects and programming.",
    responsibilities: [
      "Develop comprehensive robotics curriculum for different skill levels",
      "Create hands-on project-based learning experiences",
      "Mentor students in robotics programming and hardware integration",
      "Design and build educational robotics kits and materials",
      "Conduct workshops and training sessions for educators",
      "Assess student progress and provide personalized feedback",
    ],
    achievements: [
      "Trained 50+ students in robotics fundamentals",
      "Developed 5 comprehensive course modules",
      "Achieved 95% student satisfaction rating",
      "Created reusable educational robotics kits",
    ],
    technologies: ["Arduino", "Python", "Robotics", "Educational Technology", "Curriculum Development"],
  },
  {
    title: "Founder & CEO",
    company: "Premium Hub (My Startup)",
    period: "July 2023 – Present",
    location: "Cairo, Egypt",
    type: "Entrepreneurship",
    category: "Business & Technology",
    description:
      "Founded and manage a startup providing 3D printing, 3D modeling services, and educational project solutions for students and professionals.",
    responsibilities: [
      "Develop business strategy and operational procedures",
      "Manage client relationships and project delivery",
      "Oversee 3D printing operations and quality control",
      "Create 3D models and prototypes for various industries",
      "Provide educational project solutions for academic institutions",
      "Handle financial management and business development",
    ],
    achievements: [
      "Achieved profitability within 6 months",
      "Completed 100+ 3D printing projects",
      "Established partnerships with 10+ educational institutions",
      "Generated consistent monthly revenue growth",
    ],
    technologies: ["3D Printing", "CAD Design", "SolidWorks", "Business Management", "Project Management"],
  },
  {
    title: "Industrial Performance & Digital Transformation Intern",
    company: "Lafarge Egypt",
    period: "2024",
    location: "Egypt",
    type: "Internship",
    category: "Industrial Engineering",
    description:
      "Worked on industrial automation projects, digital transformation initiatives, and performance optimization in cement manufacturing processes.",
    responsibilities: [
      "Analyze manufacturing processes for efficiency improvements",
      "Implement digital transformation solutions in production lines",
      "Develop automation strategies for cement manufacturing",
      "Create performance monitoring dashboards and KPIs",
      "Collaborate with engineering teams on process optimization",
      "Document best practices and standard operating procedures",
    ],
    achievements: [
      "Improved production efficiency by 15%",
      "Implemented IoT monitoring system for equipment",
      "Reduced manual inspection time by 40%",
      "Created comprehensive process documentation",
    ],
    technologies: ["Industrial Automation", "Process Optimization", "IoT", "Data Analysis", "Manufacturing Systems"],
  },
  {
    title: "Automation and IIOT Intern",
    company: "Industry Run",
    period: "2024",
    location: "Egypt",
    type: "Internship",
    category: "Industrial IoT",
    description:
      "Developed IoT solutions for industrial applications, worked on automation systems, and implemented Industry 4.0 technologies.",
    responsibilities: [
      "Design and implement Industrial IoT solutions",
      "Develop automation systems for manufacturing processes",
      "Create real-time monitoring and control systems",
      "Integrate sensors and actuators with control systems",
      "Program PLCs for industrial automation",
      "Implement predictive maintenance solutions",
    ],
    achievements: [
      "Deployed IoT sensors across 5 production lines",
      "Reduced equipment downtime by 25%",
      "Implemented predictive maintenance system",
      "Created real-time production monitoring dashboard",
    ],
    technologies: ["Industrial IoT", "PLC Programming", "SCADA", "Sensor Integration", "Predictive Maintenance"],
  },
  {
    title: "Fabrication, PCB Design, and IoT Intern",
    company: "EME Borg",
    period: "August 2024 – October 2024",
    location: "Egypt",
    type: "Internship",
    category: "Electronics & Fabrication",
    description:
      "Hands-on experience in PCB design using Altium Designer, fabrication processes, and IoT system development and implementation.",
    responsibilities: [
      "Design PCBs using Altium Designer for various applications",
      "Fabricate and assemble electronic prototypes",
      "Develop IoT devices and sensor networks",
      "Test and validate electronic circuits and systems",
      "Create technical documentation for designs",
      "Collaborate with hardware and software teams",
    ],
    achievements: [
      "Designed 10+ PCBs for different applications",
      "Successfully fabricated and tested all prototypes",
      "Developed IoT sensor network for environmental monitoring",
      "Reduced PCB design time by 30% through optimization",
    ],
    technologies: ["Altium Designer", "PCB Design", "Electronics Fabrication", "IoT Development", "Circuit Testing"],
  },
  {
    title: "Electrical Maintenance Engineer Intern",
    company: "Abu Qir Engineering Industries Co.",
    period: "August 2024",
    location: "Egypt",
    type: "Internship",
    category: "Electrical Engineering",
    description:
      "Worked on electrical maintenance systems, troubleshooting industrial equipment, and preventive maintenance procedures.",
    responsibilities: [
      "Perform electrical maintenance on industrial equipment",
      "Troubleshoot electrical faults and system failures",
      "Implement preventive maintenance schedules",
      "Update electrical schematics and documentation",
      "Calibrate electrical instruments and meters",
      "Ensure compliance with electrical safety standards",
    ],
    achievements: [
      "Reduced electrical downtime by 20%",
      "Updated 50+ electrical schematics",
      "Implemented new preventive maintenance procedures",
      "Zero electrical safety incidents during internship",
    ],
    technologies: [
      "Electrical Maintenance",
      "Troubleshooting",
      "Industrial Equipment",
      "Safety Protocols",
      "Documentation",
    ],
  },
  {
    title: "Instrumentation and Control Engineer Intern",
    company: "Nile Sugar",
    period: "July 2024",
    location: "Egypt",
    type: "Internship",
    category: "Control Systems",
    description:
      "Gained experience in instrumentation systems, control engineering, and process automation in sugar manufacturing industry.",
    responsibilities: [
      "Calibrate and maintain instrumentation equipment",
      "Monitor and optimize control system performance",
      "Implement process automation improvements",
      "Analyze process data and generate reports",
      "Troubleshoot control system issues",
      "Support process optimization initiatives",
    ],
    achievements: [
      "Improved process control accuracy by 10%",
      "Calibrated 100+ instruments",
      "Implemented automated data logging system",
      "Reduced manual monitoring requirements by 50%",
    ],
    technologies: ["Instrumentation", "Control Systems", "Process Automation", "Data Analysis", "Calibration"],
  },
]

export function AllExperience() {
  const categories = Array.from(new Set(allExperience.map((exp) => exp.category)))

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive overview of all work experience, internships, and professional development
          </p>
        </div>

        <div className="space-y-8">
          {allExperience.map((exp, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-primary font-medium text-base mb-2">
                      <Building className="h-4 w-4" />
                      {exp.company}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                <p className="text-muted-foreground mb-6">{exp.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Technologies & Skills Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
