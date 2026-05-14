"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StudyNote {
  id: string
  title: string
  description: string
  subject: string
  fileName: string
  fileSize: number
  uploadDate: string
  author: string
}

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    author: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  const subjects = [
    "Mathematics",
    "Computer Science",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Literature",
    "Psychology",
    "Economics",
    "Engineering",
    "Other",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileSelect = (file: File) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/jpeg",
      "image/png",
    ]

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF, Word document, text file, or image.",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.subject || !formData.author || !selectedFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a file.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 20
        })
      }, 200)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      const newNote: StudyNote = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadDate: new Date().toISOString(),
        author: formData.author,
      }

      const existingNotes = JSON.parse(localStorage.getItem("studyNotes") || "[]")
      const updatedNotes = [...existingNotes, newNote]
      localStorage.setItem("studyNotes", JSON.stringify(updatedNotes))

      setShowSuccess(true)

      toast({
        title: "Upload successful!",
        description: "Your study notes have been uploaded successfully.",
      })

      setTimeout(() => {
        setFormData({ title: "", description: "", subject: "", author: "" })
        setSelectedFile(null)
        setShowSuccess(false)
        setUploadProgress(0)
      }, 2000)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 bg-clip-text text-transparent mb-4 animate-bounce-in">
              Upload Study Notes
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-pretty animate-slide-up">
              Share your knowledge with the community. Upload your study notes and help fellow students succeed.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl animate-slide-up border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-slate-500/10 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="text-gray-800">Upload Your Notes</span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill in the details below and upload your study materials. All uploads are reviewed to ensure quality.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {showSuccess && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg flex items-center justify-center z-10 animate-fade-in">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold text-green-700 mb-2">Upload Successful!</h3>
                    <p className="text-green-600">Your notes have been shared with the community</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Calculus I - Derivatives and Limits"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="author">Your Name *</Label>
                  <Input
                    id="author"
                    placeholder="e.g., John Doe"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-blue-400">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem
                          key={subject}
                          value={subject}
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                        >
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your notes cover, key topics, and any special features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <Label>File Upload *</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 transform hover:scale-[1.02] ${
                      isDragOver
                        ? "border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 scale-105 shadow-lg"
                        : selectedFile
                          ? "border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg"
                          : "border-border hover:border-blue-600/50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {selectedFile ? (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-8 w-8 text-blue-600 animate-bounce" />
                          <span className="text-lg font-medium text-gray-800">File Selected</span>
                        </div>
                        <div className="bg-card p-4 rounded-lg transform hover:scale-105 transition-transform duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-6 w-6 text-blue-600 animate-pulse" />
                              <div className="text-left">
                                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                                <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeFile}
                              className="hover:bg-red-100 hover:text-red-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-600 mx-auto animate-bounce" />
                        <div>
                          <p className="text-lg font-medium text-gray-800 mb-2">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-sm text-gray-600">Supported formats: PDF, Word, Text, Images (Max 10MB)</p>
                        </div>
                        <input
                          type="file"
                          onChange={handleFileInputChange}
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          className="hidden"
                          id="file-input"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("file-input")?.click()}
                          className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                        >
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  {isUploading && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 animate-pulse"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full transform hover:scale-105 transition-all duration-300 hover:shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Notes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto mt-8 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg animate-slide-up border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="text-gray-800">Upload Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Ensure your notes are original or properly attributed",
                  "Use clear, descriptive titles and comprehensive descriptions",
                  "Files should be well-organized and easy to read",
                  "Maximum file size is 10MB",
                  "Supported formats: PDF, Word documents, text files, and images",
                  "All uploads are reviewed to maintain quality standards",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 hover:text-gray-800 transition-colors duration-300 animate-slide-up"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
