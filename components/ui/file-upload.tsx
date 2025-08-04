"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Code, 
  X, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Copy
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  componentId?: string
  componentType?: string
  onFileUploaded?: (fileInfo: FileInfo) => void
  onFileDeleted?: (fileUrl: string) => void
  acceptedTypes?: string[]
  maxSize?: number
  multiple?: boolean
  showPreview?: boolean
}

interface FileInfo {
  url: string
  name: string
  size: number
  type: string
  componentId?: string
  componentType?: string
}

export function FileUpload({
  componentId,
  componentType,
  onFileUploaded,
  onFileDeleted,
  acceptedTypes = ["image/*", "application/pdf", "text/*"],
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  showPreview = true
}: FileUploadProps) {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />
    if (fileType.includes("pdf") || fileType.includes("document")) return <FileText className="h-4 w-4" />
    if (fileType.includes("javascript") || fileType.includes("typescript") || fileType.includes("code")) return <Code className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validate file size
        if (file.size > maxSize) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds the maximum size of ${formatFileSize(maxSize)}`,
            variant: "destructive"
          })
          continue
        }

        // Validate file type
        const isAccepted = acceptedTypes.some(type => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.slice(0, -2))
          }
          return file.type === type
        })

        if (!isAccepted) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an accepted file type`,
            variant: "destructive"
          })
          continue
        }

        // Upload file
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileType", file.type.startsWith("image/") ? "image" : "documents")
        if (componentId) formData.append("componentId", componentId)
        if (componentType) formData.append("componentType", componentType)

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }

        const result = await response.json()
        
        const fileInfo: FileInfo = {
          url: result.fileUrl,
          name: result.fileName,
          size: result.fileSize,
          type: result.fileType,
          componentId: result.componentId,
          componentType: result.componentType
        }

        setUploadedFiles(prev => [...prev, fileInfo])
        onFileUploaded?.(fileInfo)
        
        setUploadProgress(((i + 1) / files.length) * 100)
        
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleFileDelete = async (fileUrl: string) => {
    try {
      const response = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fileUrl })
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      setUploadedFiles(prev => prev.filter(file => file.url !== fileUrl))
      onFileDeleted?.(fileUrl)
      
      toast({
        title: "File deleted",
        description: "File has been deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete file",
        variant: "destructive"
      })
    }
  }

  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`)
    toast({
      title: "URL copied",
      description: "File URL has been copied to clipboard",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Max size: {formatFileSize(maxSize)}
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              Choose Files
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Uploaded Files</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getFileTypeIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyFileUrl(file.url)}
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    {showPreview && file.type.startsWith("image/") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.url, "_blank")}
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, "_blank")}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFileDelete(file.url)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Type Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Images (JPEG, PNG, GIF, WebP)
          </Badge>
          <Badge variant="outline" className="text-xs">
            Documents (PDF, DOC, TXT)
          </Badge>
          <Badge variant="outline" className="text-xs">
            Code (JS, TS, CSS, HTML, JSON)
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
} 