"use client"

import { useState, useEffect, useRef } from "react"
import { X, Calendar, MapPin, Award, Star, Clock, Building, User, FileText, Image, Download, ExternalLink, File, FileImage, FileText as FileTextIcon } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  files?: Array<{
    name: string
    url: string
    type: "image" | "pdf" | "text" | "other"
    size?: string
  }>
}

export function Modal({ isOpen, onClose, title, children, size = "md", files = [] }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const originalOverflow = useRef<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      originalOverflow.current = document.body.style.overflow
      document.body.style.overflow = "hidden"
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = originalOverflow.current || ""
      }, 150)
      return () => clearTimeout(timer)
    }
    // On unmount, always restore original overflow
    return () => {
      document.body.style.overflow = originalOverflow.current || ""
    }
  }, [isOpen])

  if (!isVisible) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "text":
        return <FileTextIcon className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const getFileColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-blue-600 dark:text-blue-400"
      case "pdf":
        return "text-red-600 dark:text-red-400"
      case "text":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-150 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} transition-opacity duration-150 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {children}
          
          {/* Files Section */}
          {files.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Related Files
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md bg-white dark:bg-gray-600 ${getFileColor(file.type)}`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                        {file.size && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                      className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-500"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



// Course Detail Modal
interface CourseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  course: any
}

export function CourseDetailModal({ isOpen, onClose, course }: CourseDetailModalProps) {
  if (!course) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Course Details" size="lg" files={course.files || []}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {course.course}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
            {course.institution}
          </p>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Duration</p>
                <p className="text-gray-600 dark:text-gray-300">{course.period}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Status</p>
                <Badge 
                  variant={course.status === "In Progress" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {course.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {course.courses && course.courses.length > 0 && (
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Course Modules</p>
                <div className="flex flex-wrap gap-2">
                  {course.courses.map((c: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Last Updated</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(course.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This course provides comprehensive training in {course.course.toLowerCase()}. 
            {course.status === "Completed" && " The course has been successfully completed with excellent results."}
            {course.status === "In Progress" && " Currently actively participating and learning from this program."}
          </p>
        </div>
      </div>
    </Modal>
  )
}

// Volunteering Detail Modal
interface VolunteeringDetailModalProps {
  isOpen: boolean
  onClose: () => void
  volunteering: any
}

export function VolunteeringDetailModal({ isOpen, onClose, volunteering }: VolunteeringDetailModalProps) {
  if (!volunteering) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Volunteering Details" size="lg" files={volunteering.files || []}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {volunteering.organization}
          </h3>
          <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            Volunteer
          </Badge>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Period</p>
                <p className="text-gray-600 dark:text-gray-300">{volunteering.period}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Location</p>
                <p className="text-gray-600 dark:text-gray-300">{volunteering.location || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Last Updated</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(volunteering.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {volunteering.description}
          </p>
        </div>
      </div>
    </Modal>
  )
}

// Activity Detail Modal
interface ActivityDetailModalProps {
  isOpen: boolean
  onClose: () => void
  activity: any
}

export function ActivityDetailModal({ isOpen, onClose, activity }: ActivityDetailModalProps) {
  if (!activity) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity Details" size="lg" files={activity.files || []}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {activity.title}
          </h3>
          <p className="text-lg text-green-600 dark:text-green-400 font-medium">
            {activity.organization}
          </p>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Period</p>
                <p className="text-gray-600 dark:text-gray-300">{activity.period}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Type</p>
                <Badge 
                  variant={activity.type === "Leadership" ? "default" : "secondary"}
                  className="mt-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                >
                  {activity.type}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Last Updated</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(activity.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {activity.description || `Active participation as ${activity.title} at ${activity.organization}.`}
          </p>
        </div>
      </div>
    </Modal>
  )
}

// Competition Detail Modal
interface CompetitionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  competition: any
}

export function CompetitionDetailModal({ isOpen, onClose, competition }: CompetitionDetailModalProps) {
  if (!competition) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Competition Details" size="md" files={competition.files || []}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {competition.name}
          </h3>
          <Badge 
            variant={competition.status === "Upcoming" ? "default" : "secondary"}
            className="text-lg px-4 py-2"
          >
            {competition.status}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Year</p>
              <p className="text-gray-600 dark:text-gray-300">{competition.year}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Participation</p>
              <p className="text-gray-600 dark:text-gray-300 capitalize">{competition.status}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {competition.status === "Upcoming" && `Preparing to participate in ${competition.name} in ${competition.year}.`}
            {competition.status === "Participated" && `Successfully participated in ${competition.name} in ${competition.year}.`}
            {competition.status === "Won" && `Achieved victory in ${competition.name} in ${competition.year}!`}
          </p>
        </div>
      </div>
    </Modal>
  )
}

// Award Detail Modal
interface AwardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  award: any
}

export function AwardDetailModal({ isOpen, onClose, award }: AwardDetailModalProps) {
  if (!award) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Award Details" size="md" files={award.files || []}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {award.title}
          </h3>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Date Received</p>
              <p className="text-gray-600 dark:text-gray-300">{award.date}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {award.description}
          </p>
        </div>
      </div>
    </Modal>
  )
} 