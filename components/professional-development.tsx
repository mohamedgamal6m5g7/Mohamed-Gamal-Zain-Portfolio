"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, BookOpen, Clock, Award, Eye } from "lucide-react"
import { CourseDetailModal } from "@/components/ui/modal"
import type { Course } from "@/lib/portfolio-data"

interface ProfessionalDevelopmentProps {
  courses?: Course[]
}

export function ProfessionalDevelopment({ courses = [] }: ProfessionalDevelopmentProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  if (courses.length === 0) {
    return (
      <section id="professional-development" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <GraduationCap className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Professional Development</h2>
            <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              No courses found. Add your professional development courses through the admin panel.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="professional-development" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Professional Development
            </h2>
            <p className="text-gray-700 dark:text-gray-200 max-w-2xl mx-auto text-lg">
              Continuous learning through specialized courses and training programs
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer" onClick={() => handleCourseClick(course)}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        <CardTitle className="text-lg text-blue-600 dark:text-blue-400 line-clamp-2">
                          {course.institution}
                        </CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-3 w-3" />
                        {course.period}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={course.status === "In Progress" ? "default" : "secondary"}
                      className="ml-2 flex-shrink-0"
                    >
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {course.course}
                    </h4>
                    
                    {course.courses && course.courses.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {course.courses.slice(0, 2).map((c, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            {c}
                          </Badge>
                        ))}
                        {course.courses.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                            +{course.courses.length - 2} more
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {course.status === "Completed" && (
                          <Award className="h-4 w-4 text-green-500" />
                        )}
                        <Eye className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Courses: {courses.length} • 
              Completed: {courses.filter(c => c.status === "Completed").length} • 
              In Progress: {courses.filter(c => c.status === "In Progress").length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Click on any course card to view detailed information
            </p>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      <CourseDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </>
  )
}
