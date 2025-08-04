"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  LogOut,
  Eye,
  ArrowUp,
  ArrowDown,
  ImageIcon,
  Settings,
  User,
  Briefcase,
  Trophy,
  GraduationCap,
  Heart,
  Users,
  Monitor,
  Palette,
  Upload,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Copy,
  Download,
  RefreshCw,
  FolderOpen,
  FileText,
  Code,
  Image,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import type { PortfolioData } from "@/lib/portfolio-data"

// Extended interfaces for more comprehensive data
interface Skill {
  id: string
  name: string
  level: number
  projects: number
  category: string
}

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  image: string
  rating: number
  text: string
  relationship: string
}

interface Course {
  id: string
  institution: string
  period: string
  course: string
  courses?: string[]
  status: string
}

interface Activity {
  id: string
  title: string
  organization: string
  period: string
  type: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState("personal")

  // Login form
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  // Edit dialogs
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editingType, setEditingType] = useState<string>("")
  const [previewMode, setPreviewMode] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Only run on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("admin_token")
      if (token) {
        setAuthToken(token)
        setIsAuthenticated(true)
        loadPortfolioData(token)
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      })

      const result = await response.json()

      if (result.success) {
        setAuthToken(result.token)
        setIsAuthenticated(true)
        if (typeof window !== 'undefined') {
          localStorage.setItem("admin_token", result.token)
        }
        await loadPortfolioData(result.token)
        setMessage({ type: "success", text: "Login successful!" })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login failed" })
    } finally {
      setLoading(false)
    }
  }

  const loadPortfolioData = async (token: string) => {
    try {
      const response = await fetch("/api/admin/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setPortfolioData(data)
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load portfolio data" })
    }
  }

  const savePortfolioData = async () => {
    if (!authToken || !portfolioData) return

    setLoading(true)
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(portfolioData),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Portfolio updated successfully!" })
        setUnsavedChanges(false)
        toast({
          title: "Success!",
          description: "Your portfolio has been saved successfully.",
          action: <CheckCircle className="h-4 w-4 text-green-500" />,
        })
      } else {
        setMessage({ type: "error", text: "Failed to save changes" })
        toast({
          title: "Error",
          description: "Failed to save your portfolio. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Save failed" })
      toast({
        title: "Error",
        description: "Network error. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!authToken) return null

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        return result.imageUrl
      }
    } catch (error) {
      setMessage({ type: "error", text: "Image upload failed" })
    }

    return null
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("admin_token")
    }
    setIsAuthenticated(false)
    setAuthToken(null)
    setPortfolioData(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = await uploadImage(file)
    if (imageUrl && portfolioData) {
      setPortfolioData({
        ...portfolioData,
        personalInfo: { ...portfolioData.personalInfo, [field]: imageUrl },
      })
    }
  }

  const addNewItem = (type: string, categoryId?: string) => {
    const newItem = createNewItem(type, categoryId)
    setEditingItem(newItem)
    setEditingType(type)
  }

  const createNewItem = (type: string, categoryId?: string) => {
    // Use a stable timestamp to avoid hydration issues
    const now = new Date()
    const timestamp = now.toISOString()
    const id = `item_${type}_${now.getTime()}`

    switch (type) {
      case "project":
        return {
          id,
          title: "",
          period: "",
          status: "In Progress",
          category: "",
          description: "",
          longDescription: "",
          technologies: [],
          objectives: [],
          challenges: [],
          achievements: [],
          images: [],
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "experience":
        return {
          id,
          title: "",
          company: "",
          period: "",
          location: "",
          type: "Internship",
          category: "",
          description: "",
          responsibilities: [],
          achievements: [],
          technologies: [],
          startDate: "",
          endDate: "",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "timeline":
        return {
          id,
          year: "2025",
          title: "",
          highlights: [],
          icon: "Briefcase",
          color: "bg-blue-500",
          date: timestamp,
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "skillCategory":
        return {
          id,
          title: "",
          icon: "Code",
          color: "text-blue-600",
          skills: [],
        }
      case "skill":
        return {
          id,
          name: "",
          level: 50,
          projects: 0,
          category: categoryId || "",
        }
      case "course":
        return {
          id,
          institution: "",
          period: "",
          course: "",
          status: "In Progress",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "volunteering":
        return {
          id,
          organization: "",
          period: "",
          description: "",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "activity":
        return {
          id,
          title: "",
          organization: "",
          period: "",
          type: "Technical",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "competition":
        return {
          id,
          name: "",
          year: "2025",
          status: "Upcoming",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "award":
        return {
          id,
          title: "",
          date: "",
          description: "",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      case "testimonial":
        return {
          id,
          name: "",
          title: "",
          company: "",
          image: "",
          rating: 5,
          text: "",
          relationship: "",
          createdAt: timestamp,
          updatedAt: timestamp,
        }
      default:
        return {}
    }
  }

  const saveItem = () => {
    if (!editingItem || !portfolioData || !editingType) return

    const updatedData = { ...portfolioData }

    switch (editingType) {
      case "project":
        const isNewProject = !portfolioData.projects.find((p) => p.id === editingItem.id)
        if (isNewProject) {
          updatedData.projects = [...portfolioData.projects, editingItem]
        } else {
          updatedData.projects = portfolioData.projects.map((p) => (p.id === editingItem.id ? editingItem : p))
        }
        break
      case "experience":
        const isNewExp = !portfolioData.experiences.find((e) => e.id === editingItem.id)
        if (isNewExp) {
          updatedData.experiences = [...portfolioData.experiences, editingItem]
        } else {
          updatedData.experiences = portfolioData.experiences.map((e) => (e.id === editingItem.id ? editingItem : e))
        }
        break
      case "timeline":
        const isNewTimeline = !portfolioData.timeline.find((t) => t.id === editingItem.id)
        if (isNewTimeline) {
          updatedData.timeline = [...portfolioData.timeline, editingItem]
        } else {
          updatedData.timeline = portfolioData.timeline.map((t) => (t.id === editingItem.id ? editingItem : t))
        }
        break
      case "skillCategory":
        const isNewSkillCategory = !portfolioData.skillCategories.find((c) => c.id === editingItem.id)
        if (isNewSkillCategory) {
          updatedData.skillCategories = [...portfolioData.skillCategories, editingItem]
        } else {
          updatedData.skillCategories = portfolioData.skillCategories.map((c) => (c.id === editingItem.id ? editingItem : c))
        }
        break
      case "skill":
        updatedData.skillCategories = portfolioData.skillCategories.map((category) => {
          if (category.id === editingItem.category) {
            const existingSkillIndex = category.skills.findIndex((s) => s.id === editingItem.id)
            if (existingSkillIndex >= 0) {
              // Update existing skill
              const updatedSkills = [...category.skills]
              updatedSkills[existingSkillIndex] = editingItem
              return { ...category, skills: updatedSkills }
            } else {
              // Add new skill
              return { ...category, skills: [...category.skills, editingItem] }
            }
          }
          return category
        })
        break
      case "course":
        const isNewCourse = !portfolioData.courses.find((c) => c.id === editingItem.id)
        if (isNewCourse) {
          updatedData.courses = [...portfolioData.courses, editingItem]
        } else {
          updatedData.courses = portfolioData.courses.map((c) => (c.id === editingItem.id ? editingItem : c))
        }
        break
      case "volunteering":
        const isNewVolunteering = !portfolioData.volunteering.find((v) => v.id === editingItem.id)
        if (isNewVolunteering) {
          updatedData.volunteering = [...portfolioData.volunteering, editingItem]
        } else {
          updatedData.volunteering = portfolioData.volunteering.map((v) => (v.id === editingItem.id ? editingItem : v))
        }
        break
      case "activity":
        const isNewActivity = !portfolioData.activities.find((a) => a.id === editingItem.id)
        if (isNewActivity) {
          updatedData.activities = [...portfolioData.activities, editingItem]
        } else {
          updatedData.activities = portfolioData.activities.map((a) => (a.id === editingItem.id ? editingItem : a))
        }
        break
      case "competition":
        const isNewCompetition = !portfolioData.competitions.find((c) => c.id === editingItem.id)
        if (isNewCompetition) {
          updatedData.competitions = [...portfolioData.competitions, editingItem]
        } else {
          updatedData.competitions = portfolioData.competitions.map((c) => (c.id === editingItem.id ? editingItem : c))
        }
        break
      case "award":
        const isNewAward = !portfolioData.awards.find((a) => a.id === editingItem.id)
        if (isNewAward) {
          updatedData.awards = [...portfolioData.awards, editingItem]
        } else {
          updatedData.awards = portfolioData.awards.map((a) => (a.id === editingItem.id ? editingItem : a))
        }
        break
      case "testimonial":
        const isNewTestimonial = !portfolioData.testimonials.find((t) => t.id === editingItem.id)
        if (isNewTestimonial) {
          updatedData.testimonials = [...portfolioData.testimonials, editingItem]
        } else {
          updatedData.testimonials = portfolioData.testimonials.map((t) => (t.id === editingItem.id ? editingItem : t))
        }
        break
    }

    setPortfolioData(updatedData)
    setUnsavedChanges(true)
    setEditingItem(null)
    setEditingType("")
  }

  const deleteItem = (id: string, type: string, categoryId?: string) => {
    if (!portfolioData) return

    const updatedData = { ...portfolioData }

    switch (type) {
      case "project":
        updatedData.projects = portfolioData.projects.filter((p) => p.id !== id)
        break
      case "experience":
        updatedData.experiences = portfolioData.experiences.filter((e) => e.id !== id)
        break
      case "timeline":
        updatedData.timeline = portfolioData.timeline.filter((t) => t.id !== id)
        break
      case "skillCategory":
        updatedData.skillCategories = portfolioData.skillCategories.filter((c) => c.id !== id)
        break
      case "skill":
        if (categoryId) {
          updatedData.skillCategories = portfolioData.skillCategories.map((category) => {
            if (category.id === categoryId) {
              return {
                ...category,
                skills: category.skills.filter((s) => s.id !== id),
              }
            }
            return category
          })
        }
        break
      case "course":
        updatedData.courses = portfolioData.courses.filter((c) => c.id !== id)
        break
      case "volunteering":
        updatedData.volunteering = portfolioData.volunteering.filter((v) => v.id !== id)
        break
      case "activity":
        updatedData.activities = portfolioData.activities.filter((a) => a.id !== id)
        break
      case "competition":
        updatedData.competitions = portfolioData.competitions.filter((c) => c.id !== id)
        break
      case "award":
        updatedData.awards = portfolioData.awards.filter((a) => a.id !== id)
        break
      case "testimonial":
        updatedData.testimonials = portfolioData.testimonials.filter((t) => t.id !== id)
        break
    }

    setPortfolioData(updatedData)
    setUnsavedChanges(true)
  }

  const moveItem = (id: string, type: string, direction: "up" | "down") => {
    if (!portfolioData) return

    const updatedData = { ...portfolioData }
    let items: any[] = []

    switch (type) {
      case "project":
        items = [...portfolioData.projects]
        break
      case "experience":
        items = [...portfolioData.experiences]
        break
      case "timeline":
        items = [...portfolioData.timeline]
        break
    }

    const index = items.findIndex((item) => item.id === id)
    if (index === -1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= items.length) return
    ;[items[index], items[newIndex]] = [items[newIndex], items[index]]

    switch (type) {
      case "project":
        updatedData.projects = items
        break
      case "experience":
        updatedData.experiences = items
        break
      case "timeline":
        updatedData.timeline = items
        break
    }

    setPortfolioData(updatedData)
  }

  const addArrayItem = (field: string, value: string) => {
    if (!editingItem || !value.trim()) return

    const currentArray = editingItem[field] || []
    setEditingItem({
      ...editingItem,
      [field]: [...currentArray, value.trim()],
    })
  }

  const removeArrayItem = (field: string, index: number) => {
    if (!editingItem) return

    const currentArray = editingItem[field] || []
    setEditingItem({
      ...editingItem,
      [field]: currentArray.filter((_: any, i: number) => i !== index),
    })
  }

  // Prevent hydration issues by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Portfolio Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {message && (
              <Alert
                className={`mt-4 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
              >
                <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portfolio Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your portfolio content easily</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Auto-save toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                  id="auto-save"
                />
                <Label htmlFor="auto-save" className="text-sm">Auto-save</Label>
              </div>
              
              {/* Unsaved changes indicator */}
              {unsavedChanges && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Unsaved changes
                </Badge>
              )}
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  {showPreview ? "Hide Preview" : "Live Preview"}
                </Button>
                
                <Button 
                  onClick={savePortfolioData} 
                  disabled={loading || !unsavedChanges}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open("/", "_blank")
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
          >
            <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Live Preview Section */}
        {showPreview && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Live Preview - Your Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 mx-auto mb-4">
                      <img
                        src={portfolioData.personalInfo.photo || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {portfolioData.personalInfo.name || "Your Name"}
                    </h1>
                    <p className="text-xl text-blue-600 font-semibold mb-2">
                      {portfolioData.personalInfo.title || "Your Title"}
                    </p>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      {portfolioData.personalInfo.subtitle || "Your subtitle"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{portfolioData.personalInfo.email || "email@example.com"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{portfolioData.personalInfo.phone || "+1234567890"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{portfolioData.personalInfo.location || "Location"}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">LinkedIn</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs in same order as website */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-11">
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Journey
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              Development
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="competitions" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Competitions
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Awards
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              References
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-1">
              <FolderOpen className="h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab - First as on website */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information & Hero Section
                </CardTitle>
                <p className="text-gray-600">Edit your personal details and profile information</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Profile Photo Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Profile Photo
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        <img
                          src={portfolioData.personalInfo.photo || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                        <Upload className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="photo-upload" className="text-sm font-medium">Upload New Photo</Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "photo")}
                        className="mt-2"
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: Square image, 400x400px or larger</p>
                    </div>
                  </div>
                </div>

                {/* Basic Information Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={portfolioData.personalInfo.name}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, name: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="Enter your full name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium">Professional Title *</Label>
                      <Input
                        id="title"
                        value={portfolioData.personalInfo.title}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, title: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="e.g., Software Engineer, Designer"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="subtitle" className="text-sm font-medium">Professional Summary</Label>
                    <Textarea
                      id="subtitle"
                      rows={4}
                      value={portfolioData.personalInfo.subtitle}
                      onChange={(e) => {
                        setPortfolioData({
                          ...portfolioData,
                          personalInfo: { ...portfolioData.personalInfo, subtitle: e.target.value },
                        })
                        setUnsavedChanges(true)
                      }}
                      placeholder="Brief description of your expertise and what you do..."
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">This appears as your subtitle on the portfolio</p>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={portfolioData.personalInfo.email}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, email: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="your.email@example.com"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        value={portfolioData.personalInfo.phone}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, phone: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="+1 (555) 123-4567"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <Input
                        id="location"
                        value={portfolioData.personalInfo.location}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, location: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="City, Country"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={portfolioData.personalInfo.linkedin}
                        onChange={(e) => {
                          setPortfolioData({
                            ...portfolioData,
                            personalInfo: { ...portfolioData.personalInfo, linkedin: e.target.value },
                          })
                          setUnsavedChanges(true)
                        }}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab - Second as on website */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    My Journey Timeline
                  </CardTitle>
                  <Button onClick={() => addNewItem("timeline")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Timeline Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full ${event.color} flex items-center justify-center text-white font-bold`}
                        >
                          {event.year}
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.highlights?.length || 0} highlights</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(event.id, "timeline", "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(event.id, "timeline", "down")}
                          disabled={index === portfolioData.timeline.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(event)
                            setEditingType("timeline")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(event.id, "timeline")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Technical Skills Management
                  </CardTitle>
                  <Button onClick={() => addNewItem("skillCategory")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {portfolioData.skillCategories && portfolioData.skillCategories.length > 0 ? (
                    portfolioData.skillCategories.map((category, categoryIndex) => (
                    <div key={category.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{category.title}</h3>
                          <p className="text-sm text-gray-600">{category.skills.length} skills</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addNewItem("skill", category.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Skill
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(category)
                              setEditingType("skillCategory")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteItem(category.id, "skillCategory")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.id} className="flex items-center justify-between p-3 border rounded bg-gray-50">
                            <div>
                              <h4 className="font-medium">{skill.name}</h4>
                              <p className="text-sm text-gray-600">
                                Level: {skill.level}% • {skill.projects} projects
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingItem(skill)
                                  setEditingType("skill")
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteItem(skill.id, "skill", category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No skill categories found. Add your first skill category to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Featured Projects
                  </CardTitle>
                  <Button onClick={() => addNewItem("project")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.projects.map((project, index) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {project.images && project.images.length > 0 ? (
                            <img
                              src={project.images?.[0] || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.period}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{project.status}</Badge>
                            <Badge variant="outline">{project.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(project.id, "project", "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(project.id, "project", "down")}
                          disabled={index === portfolioData.projects.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(project)
                            setEditingType("project")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(project.id, "project")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Experience
                  </CardTitle>
                  <Button onClick={() => addNewItem("experience")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.experiences.map((exp, index) => (
                    <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600">
                          {exp.period} • {exp.location}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{exp.type}</Badge>
                          <Badge variant="outline">{exp.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(exp.id, "experience", "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveItem(exp.id, "experience", "down")}
                          disabled={index === portfolioData.experiences.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(exp)
                            setEditingType("experience")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(exp.id, "experience")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Development Tab */}
          <TabsContent value="development">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Professional Development Courses
                  </CardTitle>
                  <Button onClick={() => addNewItem("course")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.courses && portfolioData.courses.length > 0 ? (
                    portfolioData.courses.map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{course.institution}</h3>
                          <p className="text-sm text-gray-600">{course.period}</p>
                          <p className="text-sm text-gray-800">{course.course}</p>
                          {course.courses && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {course.courses.map((c, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {c}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={course.status === "In Progress" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(course)
                            setEditingType("course")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(course.id, "course")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No courses found. Add your first course to get started!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <div className="space-y-6">
              {/* Volunteering Section */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Volunteering
                    </CardTitle>
                    <Button onClick={() => addNewItem("volunteering")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Volunteering
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.volunteering && portfolioData.volunteering.length > 0 ? (
                      portfolioData.volunteering.map((vol, index) => (
                      <div key={vol.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                            <Heart className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{vol.organization}</h3>
                            <p className="text-sm text-gray-600">{vol.period}</p>
                            <p className="text-sm text-gray-800">{vol.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(vol)
                              setEditingType("volunteering")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(vol.id, "volunteering")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No volunteering activities found. Add your first volunteering experience!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Activities Section */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Activities & Leadership
                    </CardTitle>
                    <Button onClick={() => addNewItem("activity")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Activity
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(portfolioData.activities || []).map((activity, index) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{activity.title}</h3>
                            <p className="text-sm text-gray-600">{activity.organization}</p>
                            <p className="text-sm text-gray-800">{activity.period}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={activity.type === "Leadership" ? "default" : "secondary"}>
                            {activity.type}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(activity)
                              setEditingType("activity")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(activity.id, "activity")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Competitions Section */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Competitions
                    </CardTitle>
                    <Button onClick={() => addNewItem("competition")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Competition
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(portfolioData.competitions || []).map((comp, index) => (
                      <div key={comp.id} className="p-4 border rounded-lg bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm leading-tight">{comp.name}</h4>
                          <Badge variant={comp.status === "Upcoming" ? "default" : "outline"} className="ml-2 flex-shrink-0">
                            {comp.year}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{comp.status}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(comp)
                              setEditingType("competition")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(comp.id, "competition")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Awards Section */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Awards & Recognition
                    </CardTitle>
                    <Button onClick={() => addNewItem("award")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Award
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(portfolioData.awards || []).map((award, index) => (
                      <div key={award.id} className="p-4 border rounded-lg bg-white">
                        <h4 className="font-semibold text-lg text-purple-600 mb-2">{award.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{award.date}</p>
                        <p className="text-sm text-muted-foreground mb-3">{award.description}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(award)
                              setEditingType("award")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteItem(award.id, "award")}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="competitions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Competitions & Challenges
                  </CardTitle>
                  <Button onClick={() => addNewItem("competition")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Competition
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(portfolioData.competitions || []).map((competition, index) => (
                    <div key={competition.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{competition.name}</h3>
                          <p className="text-sm text-gray-600">{competition.year}</p>
                          <p className="text-sm text-gray-800">{competition.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={competition.status === "Won" ? "default" : "secondary"}>
                          {competition.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(competition)
                            setEditingType("competition")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(competition.id, "competition")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Awards & Recognition
                  </CardTitle>
                  <Button onClick={() => addNewItem("award")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Award
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(portfolioData.awards || []).map((award, index) => (
                    <div key={award.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{award.title}</h4>
                          <p className="text-xs text-muted-foreground">{award.date}</p>
                          {award.organization && (
                            <p className="text-xs text-primary font-medium">{award.organization}</p>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {award.description}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(award)
                            setEditingType("award")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(award.id, "award")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Testimonials & References
                  </CardTitle>
                  <Button onClick={() => addNewItem("testimonial")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Testimonial
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(portfolioData.testimonials || []).map((testimonial, index) => (
                    <div key={testimonial.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                          <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {testimonial.relationship}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground italic mb-4 line-clamp-3">
                        "{testimonial.text}"
                      </p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(testimonial)
                            setEditingType("testimonial")
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteItem(testimonial.id, "testimonial")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <div className="space-y-6">
              {/* File Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Files
                  </CardTitle>
                  <p className="text-gray-600">Upload images, documents, and code files for your portfolio</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* General File Upload */}
                    <FileUpload
                      componentType="general"
                      onFileUploaded={(fileInfo) => {
                        toast({
                          title: "File uploaded",
                          description: `${fileInfo.name} has been uploaded successfully`,
                        })
                      }}
                      onFileDeleted={(fileUrl) => {
                        toast({
                          title: "File deleted",
                          description: "File has been deleted successfully",
                        })
                      }}
                    />

                    {/* Project Files Upload */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Project Files
                      </h3>
                      <FileUpload
                        componentType="project"
                        acceptedTypes={["image/*", "application/pdf", "text/*", "application/json"]}
                        multiple={true}
                        onFileUploaded={(fileInfo) => {
                          toast({
                            title: "Project file uploaded",
                            description: `${fileInfo.name} has been uploaded for projects`,
                          })
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File Categories */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      componentType="images"
                      acceptedTypes={["image/*"]}
                      multiple={true}
                      showPreview={true}
                    />
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      componentType="documents"
                      acceptedTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]}
                      multiple={true}
                    />
                  </CardContent>
                </Card>

                {/* Code Files */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Code Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      componentType="code"
                      acceptedTypes={["text/javascript", "text/typescript", "text/css", "text/html", "application/json", "text/xml", "text/markdown"]}
                      multiple={true}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* File Management Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    File Management Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Supported File Types</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Images: JPEG, PNG, GIF, WebP</li>
                          <li>• Documents: PDF, DOC, DOCX, TXT</li>
                          <li>• Code: JS, TS, CSS, HTML, JSON, XML, MD</li>
                          <li>• Maximum file size: 10MB per file</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Usage Instructions</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Upload files for specific components</li>
                          <li>• Copy file URLs to use in content</li>
                          <li>• Preview images before using</li>
                          <li>• Delete unused files to save space</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Universal Edit Dialog */}
        {editingItem && (
          <Dialog
            open={!!editingItem}
            onOpenChange={() => {
              setEditingItem(null)
              setEditingType("")
            }}
          >
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingType === "project" && (editingItem.title || "New Project")}
                  {editingType === "experience" && (editingItem.title || "New Experience")}
                  {editingType === "timeline" && (editingItem.title || "New Timeline Event")}
                  {editingType === "skillCategory" && (editingItem.title || "New Skill Category")}
                  {editingType === "skill" && (editingItem.name || "New Skill")}
                  {editingType === "course" && (editingItem.course || "New Course")}
                  {editingType === "volunteering" && (editingItem.organization || "New Volunteering")}
                  {editingType === "activity" && (editingItem.title || "New Activity")}
                  {editingType === "competition" && (editingItem.name || "New Competition")}
                  {editingType === "award" && (editingItem.title || "New Award")}
                  {editingType === "testimonial" && (editingItem.name || "New Testimonial")}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Basic Information</h3>

                  {editingType === "project" && (
                    <>
                      <div>
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="period">Period</Label>
                          <Input
                            id="period"
                            value={editingItem.period}
                            onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={editingItem.status}
                            onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea
                          id="description"
                          rows={3}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="longDescription">Detailed Description</Label>
                        <Textarea
                          id="longDescription"
                          rows={5}
                          value={editingItem.longDescription}
                          onChange={(e) => setEditingItem({ ...editingItem, longDescription: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {editingType === "experience" && (
                    <>
                      <div>
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={editingItem.company}
                            onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editingItem.location}
                            onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="period">Period</Label>
                          <Input
                            id="period"
                            value={editingItem.period}
                            onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={editingItem.type}
                            onValueChange={(value) => setEditingItem({ ...editingItem, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                              <SelectItem value="Part-time">Part-time</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={editingItem.category}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={4}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {editingType === "timeline" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Input
                            id="year"
                            value={editingItem.year}
                            onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Select
                            value={editingItem.color}
                            onValueChange={(value) => setEditingItem({ ...editingItem, color: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bg-blue-500">Blue</SelectItem>
                              <SelectItem value="bg-green-500">Green</SelectItem>
                              <SelectItem value="bg-purple-500">Purple</SelectItem>
                              <SelectItem value="bg-orange-500">Orange</SelectItem>
                              <SelectItem value="bg-red-500">Red</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {editingType === "skillCategory" && (
                    <>
                      <div>
                        <Label htmlFor="title">Category Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          placeholder="e.g., Programming & Scripting"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="icon">Icon</Label>
                          <Select
                            value={editingItem.icon}
                            onValueChange={(value) => setEditingItem({ ...editingItem, icon: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Code">Code</SelectItem>
                              <SelectItem value="Wrench">Wrench</SelectItem>
                              <SelectItem value="Cpu">CPU</SelectItem>
                              <SelectItem value="Zap">Zap</SelectItem>
                              <SelectItem value="Brain">Brain</SelectItem>
                              <SelectItem value="Settings">Settings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Select
                            value={editingItem.color}
                            onValueChange={(value) => setEditingItem({ ...editingItem, color: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text-blue-600">Blue</SelectItem>
                              <SelectItem value="text-green-600">Green</SelectItem>
                              <SelectItem value="text-purple-600">Purple</SelectItem>
                              <SelectItem value="text-orange-600">Orange</SelectItem>
                              <SelectItem value="text-red-600">Red</SelectItem>
                              <SelectItem value="text-indigo-600">Indigo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {editingType === "skill" && (
                    <>
                      <div>
                        <Label htmlFor="name">Skill Name</Label>
                        <Input
                          id="name"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          placeholder="e.g., Python, React, SolidWorks"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="level">Skill Level (%)</Label>
                          <Input
                            id="level"
                            type="number"
                            min="0"
                            max="100"
                            value={editingItem.level}
                            onChange={(e) => setEditingItem({ ...editingItem, level: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="projects">Number of Projects</Label>
                          <Input
                            id="projects"
                            type="number"
                            min="0"
                            value={editingItem.projects}
                            onChange={(e) => setEditingItem({ ...editingItem, projects: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {editingType === "course" && (
                    <>
                      <div>
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          value={editingItem.institution}
                          onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                          placeholder="e.g., Udemy, Coursera, University"
                        />
                      </div>
                      <div>
                        <Label htmlFor="period">Period</Label>
                        <Input
                          id="period"
                          value={editingItem.period}
                          onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                          placeholder="e.g., January 2024 - March 2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="course">Course Name</Label>
                        <Input
                          id="course"
                          value={editingItem.course}
                          onChange={(e) => setEditingItem({ ...editingItem, course: e.target.value })}
                          placeholder="e.g., Advanced React Development"
                        />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={editingItem.status}
                          onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {editingType === "volunteering" && (
                    <>
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          value={editingItem.organization}
                          onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                          placeholder="e.g., Red Cross, Local Charity"
                        />
                      </div>
                      <div>
                        <Label htmlFor="period">Period</Label>
                        <Input
                          id="period"
                          value={editingItem.period}
                          onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                          placeholder="e.g., January 2024 - Present"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={3}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          placeholder="Describe your volunteer work and responsibilities..."
                        />
                      </div>
                    </>
                  )}

                  {editingType === "activity" && (
                    <>
                      <div>
                        <Label htmlFor="title">Role/Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          placeholder="e.g., Team Lead, Committee Member"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          value={editingItem.organization}
                          onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                          placeholder="e.g., IEEE Student Branch, University Club"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="period">Period</Label>
                          <Input
                            id="period"
                            value={editingItem.period}
                            onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                            placeholder="e.g., January 2024 - Present"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={editingItem.type}
                            onValueChange={(value) => setEditingItem({ ...editingItem, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Leadership">Leadership</SelectItem>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Academic">Academic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {editingType === "competition" && (
                    <>
                      <div>
                        <Label htmlFor="name">Competition Name</Label>
                        <Input
                          id="name"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          placeholder="e.g., NASA Space Apps Challenge"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="year">Year</Label>
                          <Input
                            id="year"
                            value={editingItem.year}
                            onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={editingItem.status}
                            onValueChange={(value) => setEditingItem({ ...editingItem, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Upcoming">Upcoming</SelectItem>
                              <SelectItem value="Participated">Participated</SelectItem>
                              <SelectItem value="Won">Won</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {editingType === "award" && (
                    <>
                      <div>
                        <Label htmlFor="title">Award Title</Label>
                        <Input
                          id="title"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          placeholder="e.g., Best Student Award"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          value={editingItem.date}
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          placeholder="e.g., April 2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={3}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          placeholder="Describe the award and recognition..."
                        />
                      </div>
                    </>
                  )}

                  {editingType === "testimonial" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            placeholder="e.g., Dr. John Smith"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            placeholder="e.g., Professor, Manager"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Institution</Label>
                        <Input
                          id="company"
                          value={editingItem.company}
                          onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                          placeholder="e.g., University of Technology"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="rating">Rating</Label>
                          <Select
                            value={editingItem.rating.toString()}
                            onValueChange={(value) => setEditingItem({ ...editingItem, rating: parseInt(value) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="relationship">Relationship</Label>
                          <Select
                            value={editingItem.relationship}
                            onValueChange={(value) => setEditingItem({ ...editingItem, relationship: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Academic Supervisor">Academic Supervisor</SelectItem>
                              <SelectItem value="Internship Supervisor">Internship Supervisor</SelectItem>
                              <SelectItem value="Colleague">Colleague</SelectItem>
                              <SelectItem value="Employer">Employer</SelectItem>
                              <SelectItem value="Business Partner">Business Partner</SelectItem>
                              <SelectItem value="Client">Client</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="text">Testimonial Text</Label>
                        <Textarea
                          id="text"
                          rows={4}
                          value={editingItem.text}
                          onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                          placeholder="Write the testimonial text..."
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column - Arrays and Advanced */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Detailed Information</h3>

                  {/* Array Fields */}
                  {editingType === "project" && (
                    <>
                      <ArrayEditor
                        title="Technologies"
                        items={editingItem.technologies || []}
                        onAdd={(value) => addArrayItem("technologies", value)}
                        onRemove={(index) => removeArrayItem("technologies", index)}
                      />
                      <ArrayEditor
                        title="Objectives"
                        items={editingItem.objectives || []}
                        onAdd={(value) => addArrayItem("objectives", value)}
                        onRemove={(index) => removeArrayItem("objectives", index)}
                      />
                      <ArrayEditor
                        title="Challenges"
                        items={editingItem.challenges || []}
                        onAdd={(value) => addArrayItem("challenges", value)}
                        onRemove={(index) => removeArrayItem("challenges", index)}
                      />
                      <ArrayEditor
                        title="Achievements"
                        items={editingItem.achievements || []}
                        onAdd={(value) => addArrayItem("achievements", value)}
                        onRemove={(index) => removeArrayItem("achievements", index)}
                      />
                    </>
                  )}

                  {editingType === "experience" && (
                    <>
                      <ArrayEditor
                        title="Responsibilities"
                        items={editingItem.responsibilities || []}
                        onAdd={(value) => addArrayItem("responsibilities", value)}
                        onRemove={(index) => removeArrayItem("responsibilities", index)}
                      />
                      <ArrayEditor
                        title="Achievements"
                        items={editingItem.achievements || []}
                        onAdd={(value) => addArrayItem("achievements", value)}
                        onRemove={(index) => removeArrayItem("achievements", index)}
                      />
                      <ArrayEditor
                        title="Technologies"
                        items={editingItem.technologies || []}
                        onAdd={(value) => addArrayItem("technologies", value)}
                        onRemove={(index) => removeArrayItem("technologies", index)}
                      />
                    </>
                  )}

                  {editingType === "timeline" && (
                    <ArrayEditor
                      title="Highlights"
                      items={editingItem.highlights || []}
                      onAdd={(value) => addArrayItem("highlights", value)}
                      onRemove={(index) => removeArrayItem("highlights", index)}
                    />
                  )}
                </div>
              </div>

              {/* File Upload Section for ALL Items */}
              {(editingType === "project" || editingType === "experience" || editingType === "course" || 
                editingType === "volunteering" || editingType === "activity" || editingType === "competition" || 
                editingType === "award" || editingType === "testimonial") && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    {editingType === "project" && "Project Files"}
                    {editingType === "experience" && "Experience Files"}
                    {editingType === "course" && "Course Files"}
                    {editingType === "volunteering" && "Volunteering Files"}
                    {editingType === "activity" && "Activity Files"}
                    {editingType === "competition" && "Competition Files"}
                    {editingType === "award" && "Award Files"}
                    {editingType === "testimonial" && "Testimonial Files"}
                  </h3>
                  <div className="space-y-4">
                    {/* Main Image Upload */}
                    <div>
                      <Label htmlFor="main-image" className="text-sm font-medium">
                        {editingType === "project" && "Project Image"}
                        {editingType === "experience" && "Company Logo"}
                        {editingType === "course" && "Course Certificate"}
                        {editingType === "volunteering" && "Organization Logo"}
                        {editingType === "activity" && "Activity Image"}
                        {editingType === "competition" && "Competition Logo"}
                        {editingType === "award" && "Award Certificate"}
                        {editingType === "testimonial" && "Person Photo"}
                      </Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          {editingItem.image ? (
                            <img
                              src={editingItem.image}
                              alt={editingType}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            id="main-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                uploadImage(file).then((url) => {
                                  if (url) {
                                    setEditingItem({ ...editingItem, image: url })
                                  }
                                })
                              }
                            }}
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {editingType === "project" && "Upload project screenshot or image"}
                            {editingType === "experience" && "Upload company logo or workplace image"}
                            {editingType === "course" && "Upload course certificate or completion proof"}
                            {editingType === "volunteering" && "Upload organization logo or activity photo"}
                            {editingType === "activity" && "Upload activity screenshot or image"}
                            {editingType === "competition" && "Upload competition logo or participation proof"}
                            {editingType === "award" && "Upload award certificate or recognition image"}
                            {editingType === "testimonial" && "Upload person's photo"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Related Files Upload */}
                    <div>
                      <Label className="text-sm font-medium">
                        {editingType === "project" && "Project Files (PDF, Code, etc.)"}
                        {editingType === "experience" && "Work Documents (Reports, Certificates, etc.)"}
                        {editingType === "course" && "Course Materials (Certificates, Assignments, etc.)"}
                        {editingType === "volunteering" && "Volunteering Documents (Certificates, Reports, etc.)"}
                        {editingType === "activity" && "Activity Files (Presentations, Reports, etc.)"}
                        {editingType === "competition" && "Competition Files (Submissions, Certificates, etc.)"}
                        {editingType === "award" && "Award Documents (Certificates, Letters, etc.)"}
                        {editingType === "testimonial" && "Reference Letters (PDF, DOC, etc.)"}
                      </Label>
                      <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload files for this specific {editingType}
                          </p>
                          <Input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.txt,.js,.ts,.css,.html,.json,.xml,.md,.jpg,.jpeg,.png,.gif"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || [])
                              files.forEach((file) => {
                                uploadImage(file).then((url) => {
                                  if (url) {
                                    const newFile = {
                                      id: `file_${Date.now()}_${Math.random()}`,
                                      name: file.name,
                                      type: file.type,
                                      url: url,
                                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                                      uploadedAt: new Date().toISOString()
                                    }
                                    const currentFiles = editingItem.files || []
                                    setEditingItem({ 
                                      ...editingItem, 
                                      files: [...currentFiles, newFile] 
                                    })
                                  }
                                })
                              })
                            }}
                            className="max-w-xs mx-auto"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Supported: PDF, DOC, TXT, Code files, Images (max 10MB each)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Display Current Files */}
                    {editingItem.files && editingItem.files.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Current Files</Label>
                        <div className="mt-2 space-y-2">
                          {editingItem.files.map((file: any, index: number) => (
                            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">{file.size}</p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const updatedFiles = editingItem.files.filter((_: any, i: number) => i !== index)
                                  setEditingItem({ ...editingItem, files: updatedFiles })
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingItem(null)
                    setEditingType("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={saveItem}>
                  <Save className="mr-2 h-4 w-4" />
                  Save {editingType === "skillCategory" ? "Category" : 
                        editingType === "skill" ? "Skill" :
                        editingType === "course" ? "Course" :
                        editingType === "volunteering" ? "Volunteering" :
                        editingType === "activity" ? "Activity" :
                        editingType === "competition" ? "Competition" :
                        editingType === "award" ? "Award" :
                        editingType === "testimonial" ? "Testimonial" :
                        editingType}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Array Editor Component
function ArrayEditor({
  title,
  items,
  onAdd,
  onRemove,
}: {
  title: string
  items: string[]
  onAdd: (value: string) => void
  onRemove: (index: number) => void
}) {
  const [newItem, setNewItem] = useState("")

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem)
      setNewItem("")
    }
  }

  return (
    <div>
      <Label className="text-sm font-medium">{title}</Label>
      <div className="space-y-2 mt-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={item} readOnly className="flex-1" />
            <Button size="sm" variant="outline" onClick={() => onRemove(index)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Input
            placeholder={`Add ${title.toLowerCase()}...`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
