import fs from "fs/promises"
import path from "path"
import { type PortfolioData, defaultPortfolioData } from "./portfolio-data"

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json")

export async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function loadPortfolioData(): Promise<PortfolioData> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    // If file doesn't exist, create it with default data
    await savePortfolioData(defaultPortfolioData)
    return defaultPortfolioData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await ensureDataDirectory()

  // Sort data by dates before saving
  data.projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  data.experiences.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  data.timeline.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function uploadImage(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "images")

  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadsDir, fileName)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  return `/uploads/images/${fileName}`
}

export async function uploadFile(file: File, fileType: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", fileType)

  try {
    await fs.access(uploadsDir)
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true })
  }

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(uploadsDir, fileName)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(filePath, buffer)

  return `/uploads/${fileType}/${fileName}`
}

export async function deleteFile(fileUrl: string): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), "public", fileUrl)
    await fs.unlink(filePath)
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}

export async function getFileInfo(fileUrl: string) {
  try {
    const filePath = path.join(process.cwd(), "public", fileUrl)
    const stats = await fs.stat(filePath)
    return {
      exists: true,
      size: stats.size,
      modified: stats.mtime
    }
  } catch {
    return {
      exists: false,
      size: 0,
      modified: null
    }
  }
}

export async function listUploadedFiles(): Promise<Array<{ name: string; url: string; size: number; type: string }>> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  const files: Array<{ name: string; url: string; size: number; type: string }> = []

  try {
    const categories = await fs.readdir(uploadsDir)
    
    for (const category of categories) {
      const categoryPath = path.join(uploadsDir, category)
      const categoryStats = await fs.stat(categoryPath)
      
      if (categoryStats.isDirectory()) {
        const categoryFiles = await fs.readdir(categoryPath)
        
        for (const fileName of categoryFiles) {
          const filePath = path.join(categoryPath, fileName)
          const fileStats = await fs.stat(filePath)
          
          if (fileStats.isFile()) {
            files.push({
              name: fileName,
              url: `/uploads/${category}/${fileName}`,
              size: fileStats.size,
              type: category
            })
          }
        }
      }
    }
  } catch (error) {
    console.error("Error listing uploaded files:", error)
  }

  return files
}
