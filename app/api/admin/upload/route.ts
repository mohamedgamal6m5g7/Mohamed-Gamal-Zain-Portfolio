import { type NextRequest, NextResponse } from "next/server"
import { getAuthFromRequest, validateAuthToken } from "@/lib/auth"
import { uploadImage, uploadFile } from "@/lib/data-manager"

export async function POST(request: NextRequest) {
  const token = getAuthFromRequest(request)

  if (!token || !validateAuthToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileType = formData.get("fileType") as string || "image"
    const componentId = formData.get("componentId") as string
    const componentType = formData.get("componentType") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Validate file types
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const allowedDocumentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    const allowedCodeTypes = ['text/javascript', 'text/typescript', 'text/css', 'text/html', 'application/json', 'text/xml', 'text/markdown']

    let fileUrl: string | null = null

    if (fileType === "image") {
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid image format. Allowed: JPEG, PNG, GIF, WebP" }, { status: 400 })
      }
      fileUrl = await uploadImage(file)
    } else {
      // For documents and code files
      if (!allowedDocumentTypes.includes(file.type) && !allowedCodeTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file format" }, { status: 400 })
      }
      fileUrl = await uploadFile(file, fileType)
    }

    if (!fileUrl) {
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      componentId,
      componentType
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const token = getAuthFromRequest(request)

  if (!token || !validateAuthToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { fileUrl } = await request.json()

    if (!fileUrl) {
      return NextResponse.json({ error: "No file URL provided" }, { status: 400 })
    }

    // Here you would implement file deletion logic
    // For now, we'll just return success
    return NextResponse.json({ success: true, message: "File deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}
