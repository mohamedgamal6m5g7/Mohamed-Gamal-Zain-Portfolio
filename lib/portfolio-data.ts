export interface FileAttachment {
  id: string
  name: string
  type: string
  url: string
  size?: string
  uploadedAt: string
}

export interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
  linkedin: string
  photo: string
}

export interface Skill {
  id: string
  name: string
  level: number
  projects: number
  category: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  images?: string[]
  period?: string
  category?: string
  link?: string
  github?: string
  status: "Completed" | "In Progress" | "Planned"
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Experience {
  id: string
  company: string
  position: string
  title?: string
  location?: string
  type?: string
  category?: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  highlights?: string[]
  icon?: string
  color?: string
  date?: string
  type: "education" | "work" | "achievement" | "milestone"
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Course {
  id: string
  institution: string
  period: string
  course: string
  courses?: string[]
  status: "In Progress" | "Completed" | "Planned"
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Volunteering {
  id: string
  organization: string
  period: string
  description: string
  location?: string
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Activity {
  id: string
  title: string
  organization: string
  period: string
  type: "Leadership" | "Technical" | "Committee" | "Other"
  description?: string
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Competition {
  id: string
  name: string
  year: string
  status: "Upcoming" | "Participated" | "Won" | "Finalist"
  description?: string
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Award {
  id: string
  title: string
  date: string
  description: string
  organization?: string
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  image: string
  rating: number
  text: string
  relationship: string
  createdAt: string
  updatedAt: string
  files?: FileAttachment[]
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  skillCategories: SkillCategory[]
  projects: Project[]
  experiences: Experience[]
  timeline: TimelineEvent[]
  courses: Course[]
  volunteering: Volunteering[]
  activities: Activity[]
  competitions: Competition[]
  awards: Award[]
  testimonials: Testimonial[]
}

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Mohamed Gamal Zain Elabdein",
    title: "Industrial Digital Transformation Engineer",
    subtitle: "Mechatronics Engineering Student | Robotics Expert | Automation Specialist",
    email: "mohamed.gamal6m5g7@gmail.com",
    phone: "(+20) 1012510677",
    location: "Cairo, Egypt",
    linkedin: "https://www.linkedin.com/in/mohamed-gamal-zain-elabdein",
    photo: "/mohamed-photo.png"
  },
  skillCategories: [
    {
      id: "programming",
      title: "Programming & Scripting",
      icon: "Code",
      color: "text-blue-600",
      skills: [
        { id: "1", name: "Python", level: 90, projects: 15, category: "programming" },
        { id: "2", name: "Arduino IDE", level: 95, projects: 20, category: "programming" },
        { id: "3", name: "C/C++", level: 80, projects: 8, category: "programming" },
        { id: "4", name: "MATLAB", level: 75, projects: 6, category: "programming" }
      ]
    },
    {
      id: "design",
      title: "Mechanical Design",
      icon: "Wrench",
      color: "text-green-600",
      skills: [
        { id: "5", name: "SolidWorks", level: 90, projects: 12, category: "design" },
        { id: "6", name: "CorelDRAW", level: 85, projects: 10, category: "design" },
        { id: "7", name: "AutoCAD", level: 80, projects: 8, category: "design" },
        { id: "8", name: "3D Printing", level: 95, projects: 25, category: "design" }
      ]
    },
    {
      id: "electronics",
      title: "Electronics & PCB",
      icon: "Cpu",
      color: "text-purple-600",
      skills: [
        { id: "9", name: "Altium Designer", level: 85, projects: 10, category: "electronics" },
        { id: "10", name: "Proteus", level: 90, projects: 15, category: "electronics" },
        { id: "11", name: "LTspice", level: 80, projects: 8, category: "electronics" },
        { id: "12", name: "KiCad", level: 75, projects: 6, category: "electronics" }
      ]
    },
    {
      id: "iot",
      title: "IoT & Microcontrollers",
      icon: "Zap",
      color: "text-orange-600",
      skills: [
        { id: "13", name: "ESP32", level: 95, projects: 18, category: "iot" },
        { id: "14", name: "Raspberry Pi", level: 90, projects: 12, category: "iot" },
        { id: "15", name: "Arduino", level: 95, projects: 22, category: "iot" },
        { id: "16", name: "STM32", level: 80, projects: 6, category: "iot" }
      ]
    }
  ],
  projects: [],
  experiences: [],
  timeline: [],
  courses: [
    {
      id: "1",
      institution: "National Telecommunication Institute (NTI)",
      period: "December 2024 – Present",
      course: "Data Analysis: Skills for the Freelance Professional",
      status: "In Progress",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      institution: "HA Consulting Group - Training Program",
      period: "September 2024 - December 2024",
      course: "Industrial Automation Training",
      courses: ["Classic Control", "PLC Programming", "Electric Motor & Drive Programming"],
      status: "Completed",
      createdAt: "2024-09-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      institution: "ALX AiCE",
      period: "July 2024 - August 2024",
      course: "AI Career Essentials",
      status: "Completed",
      createdAt: "2024-07-01T00:00:00.000Z",
      updatedAt: "2024-08-01T00:00:00.000Z",
      files: []
    },
    {
      id: "4",
      institution: "Udemy",
      period: "June 2024",
      course: "Mechanical Design via SolidWorks",
      status: "Completed",
      createdAt: "2024-06-01T00:00:00.000Z",
      updatedAt: "2024-06-30T00:00:00.000Z",
      files: []
    }
  ],
  volunteering: [
    {
      id: "1",
      organization: "RiseUp Summit'25",
      period: "April 2025",
      description: "Volunteer at Egypt's largest entrepreneurship summit, supporting event coordination and participant assistance",
      location: "Cairo, Egypt",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      organization: "Egyptian Red Crescent",
      period: "July 2020 – August 2022",
      description: "Community service and humanitarian aid activities, providing support during emergency situations",
      location: "Beni Suef, Egypt",
      createdAt: "2020-07-01T00:00:00.000Z",
      updatedAt: "2022-08-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      organization: "Resala Charity Organization",
      period: "July 2019 – Present",
      description: "Ongoing volunteer work in community development and social services, focusing on education and healthcare support",
      location: "Cairo, Egypt",
      createdAt: "2019-07-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    }
  ],
  activities: [
    {
      id: "1",
      title: "Vice-Chair",
      organization: "IEEE Robotics and Automation Society SB at E-JUST",
      period: "April 2025 – Present",
      type: "Leadership",
      description: "Leading the robotics and automation society, organizing technical workshops and competitions",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      title: "Mechanical Team Member",
      organization: "E-JUST Robotics Club",
      period: "October 2024 – Present",
      type: "Technical",
      description: "Contributing to mechanical design and fabrication of robotics projects",
      createdAt: "2024-10-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      title: "Treasurer",
      organization: "IEEE Robotics and Automation Society SB at E-JUST",
      period: "October 2024 – April 2025",
      type: "Leadership",
      description: "Managing financial resources and budgeting for society activities",
      createdAt: "2024-10-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    }
  ],
  competitions: [
    {
      id: "1",
      name: "IC-SIT'2025 Competition",
      year: "2025",
      status: "Upcoming",
      description: "International competition focusing on innovative solutions in technology",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      name: "MATE ROV Competition",
      year: "2025",
      status: "Upcoming",
      description: "Marine Advanced Technology Education Remotely Operated Vehicle competition",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      name: "Minesweepers Competition",
      year: "2024",
      status: "Participated",
      description: "International competition for autonomous landmine detection robots",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "4",
      name: "NASA Space Apps Challenge",
      year: "2021",
      status: "Participated",
      description: "Global hackathon organized by NASA to solve real-world problems",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    }
  ],
  awards: [
    {
      id: "1",
      title: "2025 IEEE Education Week Ambassador",
      date: "April 2025",
      description: "Recognition for contributions to IEEE educational initiatives and promoting engineering education",
      organization: "IEEE",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      title: "SII Scholarship, India",
      date: "August 2022",
      description: "Merit-based scholarship for academic excellence in engineering studies",
      organization: "Study in India",
      createdAt: "2022-08-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      title: "Beijing Government Scholarship",
      date: "June 2022",
      description: "North China University of Technology scholarship recipient for international studies",
      organization: "Beijing Government",
      createdAt: "2022-06-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Dr. Ahmed Hassan",
      title: "Professor of Mechatronics",
      company: "E-JUST University",
      image: "/placeholder.svg?height=60&width=60&text=AH",
      rating: 5,
      text: "Mohamed demonstrates exceptional technical competency and leadership potential. His analytical approach to complex engineering problems and innovative solutions make him an ideal candidate for industrial engineering roles.",
      relationship: "Academic Supervisor",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "2",
      name: "Eng. Sarah Mohamed",
      title: "Industrial Performance Manager",
      company: "Lafarge Egypt",
      image: "/placeholder.svg?height=60&width=60&text=SM",
      rating: 5,
      text: "During his internship, Mohamed showed remarkable ability to understand complex industrial processes and contribute meaningful solutions. He would be a valuable addition to any digital transformation team.",
      relationship: "Internship Supervisor",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    },
    {
      id: "3",
      name: "Omar Khaled",
      title: "Robotics Team Lead",
      company: "IEEE E-JUST",
      image: "/placeholder.svg?height=60&width=60&text=OK",
      rating: 5,
      text: "Working with Mohamed on robotics projects has been incredible. His technical expertise combined with his collaborative spirit makes him an invaluable team member.",
      relationship: "Colleague",
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z",
      files: []
    }
  ]
}
