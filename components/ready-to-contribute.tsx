"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Briefcase, Calendar } from "lucide-react"

const readyToStart = [
  {
    icon: Calendar,
    title: "Immediate Availability",
    description: "Ready to start immediately or within 2 weeks notice",
    status: "Available Now",
    color: "text-green-600",
  },
  {
    icon: MapPin,
    title: "Location Flexibility",
    description: "Based in Cairo, willing to relocate anywhere in Egypt or internationally",
    status: "Flexible",
    color: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Work Schedule",
    description: "Full-time preferred, open to shift work and overtime when needed",
    status: "Adaptable",
    color: "text-purple-600",
  },
  {
    icon: Briefcase,
    title: "Contract Type",
    description: "Open to permanent, contract, or internship-to-hire arrangements",
    status: "Open",
    color: "text-orange-600",
  },
]

const idealRoles = [
  "Industrial Digital Transformation Engineer",
  "Mechatronics Engineer",
  "Automation Engineer",
  "Control Systems Engineer",
  "IoT Implementation Specialist",
  "Process Optimization Engineer",
  "Robotics Engineer",
  "Industry 4.0 Specialist",
]

const whatYouGet = [
  {
    title: "Day 1 Productivity",
    description: "Strong foundation means I can contribute immediately",
    icon: "🚀",
  },
  {
    title: "Continuous Growth",
    description: "Committed to learning and staying current with technology",
    icon: "📈",
  },
  {
    title: "Team Player",
    description: "Proven ability to work well in diverse, multicultural teams",
    icon: "🤝",
  },
  {
    title: "Problem Solver",
    description: "Analytical mindset with creative approach to challenges",
    icon: "🧠",
  },
  {
    title: "Quality Focus",
    description: "Attention to detail and commitment to excellence",
    icon: "⭐",
  },
  {
    title: "Safety Conscious",
    description: "Zero incidents record with strong safety awareness",
    icon: "🛡️",
  },
]

export function ReadyToContribute() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Contribute</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Everything you need to know about my availability, expectations, and what I bring to your team
          </p>
        </div>

        {/* Availability & Logistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {readyToStart.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="border-border text-center">
                <CardHeader>
                  <Icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                  <Badge variant="outline" className={`${item.color} border-current`}>
                    {item.status}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* What You Get */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What You Get When You Hire Me</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatYouGet.map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ideal Roles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Ideal Role Matches</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {idealRoles.map((role, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Discuss Opportunities?</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                I'm excited to discuss how my skills and experience can contribute to your team's success. Let's
                schedule a conversation about your current needs and how I can help achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={scrollToContact} className="bg-primary hover:bg-primary/90">
                  Schedule Interview
                </Button>
                <Button variant="outline" size="lg">
                  Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
