"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Eye, Heart } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Industrial Robotics in Manufacturing: Automation Strategies",
    excerpt:
      "Learn how to design and build a robot capable of autonomous stair navigation using computer vision and advanced mechanical design principles.",
    content:
      "In this comprehensive guide, I'll walk you through the entire process of creating a stair-climbing robot from concept to implementation...",
    category: "Robotics",
    readTime: "12 min read",
    publishDate: "2025-01-15",
    views: 1250,
    likes: 89,
    image: "/placeholder.svg?height=200&width=300&text=Stair+Climbing+Robot",
    tags: ["Robotics", "Computer Vision", "Mechanical Design", "Arduino"],
  },
  {
    id: 2,
    title: "IoT in Industrial Automation: Lessons from My Internships",
    excerpt:
      "Insights from working with industrial IoT systems at Lafarge Egypt and Industry Run, including practical implementation strategies.",
    content:
      "During my internships at major industrial companies, I gained valuable experience in implementing IoT solutions...",
    category: "IoT",
    readTime: "8 min read",
    publishDate: "2025-01-10",
    views: 890,
    likes: 67,
    image: "/placeholder.svg?height=200&width=300&text=Industrial+IoT",
    tags: ["IoT", "Industrial Automation", "SCADA", "Industry 4.0"],
  },
  {
    id: 3,
    title: "Digital Transformation in Manufacturing: A Student's Perspective",
    excerpt:
      "The journey of creating my 3D printing and educational services startup, including challenges, lessons learned, and growth strategies.",
    content:
      "Starting Premium Hub taught me valuable lessons about entrepreneurship, customer service, and technical service delivery...",
    category: "Entrepreneurship",
    readTime: "10 min read",
    publishDate: "2025-01-05",
    views: 1100,
    likes: 95,
    image: "/placeholder.svg?height=200&width=300&text=Startup+Journey",
    tags: ["Entrepreneurship", "3D Printing", "Business", "Startup"],
  },
  {
    id: 4,
    title: "PCB Design Best Practices: From Proteus to Production",
    excerpt:
      "Essential tips and techniques for PCB design using Altium Designer and Proteus, based on real project experience.",
    content: "Effective PCB design is crucial for any electronics project. Here are the key principles I've learned...",
    category: "Electronics",
    readTime: "15 min read",
    publishDate: "2024-12-28",
    views: 750,
    likes: 54,
    image: "/placeholder.svg?height=200&width=300&text=PCB+Design",
    tags: ["PCB Design", "Altium Designer", "Electronics", "Hardware"],
  },
  {
    id: 5,
    title: "Teaching Robotics: Making Complex Concepts Accessible",
    excerpt:
      "My approach to teaching robotics at Ibdaa Academy and creating engaging educational content for students of all levels.",
    content:
      "Teaching robotics requires breaking down complex concepts into digestible, hands-on learning experiences...",
    category: "Education",
    readTime: "7 min read",
    publishDate: "2024-12-20",
    views: 650,
    likes: 78,
    image: "/placeholder.svg?height=200&width=300&text=Teaching+Robotics",
    tags: ["Education", "Teaching", "Robotics", "Curriculum"],
  },
  {
    id: 6,
    title: "Underwater ROV Development: Challenges and Solutions",
    excerpt:
      "Technical insights from developing a remotely operated underwater vehicle, including waterproofing, control systems, and video streaming.",
    content: "Building an underwater ROV presents unique engineering challenges that require innovative solutions...",
    category: "Marine Robotics",
    readTime: "11 min read",
    publishDate: "2024-12-15",
    views: 920,
    likes: 82,
    image: "/placeholder.svg?height=200&width=300&text=Underwater+ROV",
    tags: ["ROV", "Marine Robotics", "Waterproofing", "Control Systems"],
  },
]

export function BlogSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Insights</h2>
          <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Sharing knowledge and insights from my journey in Industrial Digital Transformation and Mechatronics
            Engineering
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full group bg-transparent">
                  Read Article
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
