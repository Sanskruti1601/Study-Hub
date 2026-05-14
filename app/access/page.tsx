"use client"

import { useState, useEffect, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, Calendar, User, BookOpen, Filter, X } from "lucide-react"

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

export default function AccessPage() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

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

  // Load notes from localStorage and add sample data if empty
  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem("studyNotes") || "[]")

        // Add sample notes if no notes exist
        if (storedNotes.length === 0) {
          const sampleNotes: StudyNote[] = [
            {
              id: "sample-1",
              title: "Calculus I - Derivatives and Limits",
              description:
                "Comprehensive notes covering fundamental calculus concepts with examples and practice problems. Includes step-by-step solutions and graphical representations.",
              subject: "Mathematics",
              fileName: "calculus-derivatives-limits.pdf",
              fileSize: 2048576,
              uploadDate: "2024-01-15T10:30:00Z",
              author: "Sarah M.",
            },
            {
              id: "sample-2",
              title: "Data Structures & Algorithms",
              description:
                "Complete guide to common data structures with implementation examples in Python and Java. Covers arrays, linked lists, trees, graphs, and sorting algorithms.",
              subject: "Computer Science",
              fileName: "data-structures-algorithms.pdf",
              fileSize: 3145728,
              uploadDate: "2024-01-14T14:20:00Z",
              author: "Alex K.",
            },
            {
              id: "sample-3",
              title: "Cell Biology Fundamentals",
              description:
                "Detailed notes on cell structure, organelles, and cellular processes with diagrams. Perfect for introductory biology courses.",
              subject: "Biology",
              fileName: "cell-biology-fundamentals.pdf",
              fileSize: 1572864,
              uploadDate: "2024-01-13T09:15:00Z",
              author: "Emma L.",
            },
            {
              id: "sample-4",
              title: "Organic Chemistry Reactions",
              description:
                "Comprehensive overview of organic chemistry reactions, mechanisms, and synthesis pathways. Includes practice problems and solutions.",
              subject: "Chemistry",
              fileName: "organic-chemistry-reactions.pdf",
              fileSize: 2621440,
              uploadDate: "2024-01-12T16:45:00Z",
              author: "Michael R.",
            },
            {
              id: "sample-5",
              title: "World War II History Notes",
              description:
                "Detailed timeline and analysis of World War II events, causes, and consequences. Includes maps and primary source excerpts.",
              subject: "History",
              fileName: "wwii-history-notes.pdf",
              fileSize: 1048576,
              uploadDate: "2024-01-11T11:30:00Z",
              author: "Jessica T.",
            },
            {
              id: "sample-6",
              title: "Introduction to Psychology",
              description:
                "Foundational concepts in psychology including cognitive, behavioral, and social psychology principles. Great for beginners.",
              subject: "Psychology",
              fileName: "intro-psychology.pdf",
              fileSize: 1835008,
              uploadDate: "2024-01-10T13:20:00Z",
              author: "David W.",
            },
          ]
          localStorage.setItem("studyNotes", JSON.stringify(sampleNotes))
          setNotes(sampleNotes)
        } else {
          setNotes(storedNotes)
        }
      } catch (error) {
        console.error("Error loading notes:", error)
        setNotes([])
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [])

  // Filter and sort notes
  const filteredAndSortedNotes = useMemo(() => {
    const filtered = notes.filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject

      return matchesSearch && matchesSubject
    })

    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case "oldest":
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.author.localeCompare(b.author)
        default:
          return 0
      }
    })

    return filtered
  }, [notes, searchQuery, selectedSubject, sortBy])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleDownload = async (note: StudyNote) => {
    setDownloadingId(note.id)

    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate download - in a real app, this would download the actual file
    const link = document.createElement("a")
    link.href = "#"
    link.download = note.fileName
    link.click()

    setDownloadingId(null)

    // Show a message since this is a demo
    alert(
      `Download started for: ${note.fileName}\n\nNote: This is a demo. In a real application, the actual file would be downloaded.`,
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSubject("all")
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery !== "" || selectedSubject !== "all" || sortBy !== "newest"

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading study notes...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 bg-clip-text text-transparent mb-4 animate-bounce-in">
              Access Study Notes
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-pretty animate-slide-up">
              Discover and download study materials shared by students worldwide. Find exactly what you need with our
              powerful search and filtering tools.
            </p>
          </div>

          <Card className="mb-8 transform hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl animate-slide-up border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-slate-500/10 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="text-gray-800">Search & Filter</span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Find the perfect study materials for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 space-y-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 animate-pulse" />
                    <Input
                      id="search"
                      placeholder="Search by title, description, or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-blue-400">
                      <SelectValue placeholder="All subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
                        All Subjects
                      </SelectItem>
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

                <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 hover:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="newest"
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      >
                        Newest First
                      </SelectItem>
                      <SelectItem
                        value="oldest"
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      >
                        Oldest First
                      </SelectItem>
                      <SelectItem
                        value="title"
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      >
                        Title A-Z
                      </SelectItem>
                      <SelectItem
                        value="author"
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      >
                        Author A-Z
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500 animate-pulse" />
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {searchQuery && (
                      <Badge
                        variant="secondary"
                        className="animate-bounce bg-gradient-to-r from-blue-100 to-indigo-100"
                      >
                        Search: {searchQuery}
                      </Badge>
                    )}
                    {selectedSubject !== "all" && (
                      <Badge
                        variant="secondary"
                        className="animate-bounce bg-gradient-to-r from-indigo-100 to-slate-100"
                      >
                        Subject: {selectedSubject}
                      </Badge>
                    )}
                    {sortBy !== "newest" && (
                      <Badge variant="secondary" className="animate-bounce bg-gradient-to-r from-slate-100 to-blue-100">
                        Sort: {sortBy}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-6 animate-slide-up">
            <p className="text-gray-600 animate-fade-in">
              {filteredAndSortedNotes.length === 0
                ? "No study notes found"
                : `${filteredAndSortedNotes.length} study note${filteredAndSortedNotes.length === 1 ? "" : "s"} found`}
            </p>
          </div>

          {filteredAndSortedNotes.length === 0 ? (
            <Card className="text-center py-12 animate-fade-in border-0 bg-white/80 backdrop-blur-sm">
              <CardContent>
                <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Notes Found</h3>
                <p className="text-gray-600 mb-6">
                  {hasActiveFilters
                    ? "Try adjusting your search criteria or clearing filters to see more results."
                    : "No study notes have been uploaded yet. Be the first to share your knowledge!"}
                </p>
                {hasActiveFilters ? (
                  <Button
                    onClick={clearFilters}
                    className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    <a href="/upload">Upload Notes</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedNotes.map((note, index) => (
                <Card
                  key={note.id}
                  className={`transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-0 bg-white/80 backdrop-blur-sm animate-slide-up ${
                    hoveredCard === note.id ? "shadow-2xl scale-105" : "hover:shadow-lg"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredCard(note.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-slate-500/5 rounded-t-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 animate-pulse"
                      >
                        {note.subject}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <Calendar className="h-3 w-3 animate-pulse" />
                        <span>{formatDate(note.uploadDate)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight text-gray-800">{note.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-gray-600">{note.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <FileText className="h-4 w-4 animate-pulse" />
                        <span className="truncate">{note.fileName}</span>
                        <span>({formatFileSize(note.fileSize)})</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                        <User className="h-4 w-4 animate-pulse" />
                        <span>By {note.author}</span>
                      </div>

                      <Button
                        onClick={() => handleDownload(note)}
                        className="w-full transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                        disabled={downloadingId === note.id}
                      >
                        {downloadingId === note.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
