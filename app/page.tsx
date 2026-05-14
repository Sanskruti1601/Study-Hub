"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Upload, Search, Users, Star, Download, GraduationCap, Library, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [typedText, setTypedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const words = ["Learn", "Study", "Research", "Collaborate", "Excel"]

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }, 2000)
      }
    }, 150)

    return () => clearInterval(typeInterval)
  }, [currentWordIndex])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-slate-900/20">
      <Navigation />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-slate-600/10" />
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-700 bg-clip-text text-transparent">
                Study Resource Hub
              </span>
            </h1>
          </div>

          <div className="text-2xl md:text-3xl font-semibold mb-8 h-12">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="animate-pulse text-blue-600">|</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto text-pretty">
            A collaborative academic platform where students share study materials and build knowledge together.
            Empowering education through peer-to-peer learning and resource sharing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Share Study Notes
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/access">
                <Search className="mr-2 h-5 w-5" />
                Browse Resources
                <Library className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-700 bg-clip-text text-transparent">
              Enhance Your Academic Journey
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-pretty">
              Join a community of dedicated students committed to academic excellence and collaborative learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Share Knowledge",
                description:
                  "Contribute to the academic community by sharing your study notes, research, and learning materials with fellow students.",
                gradient: "from-blue-600 to-indigo-600",
                bgGradient: "from-blue-50 to-indigo-50",
              },
              {
                icon: Library,
                title: "Access Resources",
                description:
                  "Discover comprehensive study materials across various subjects, curated and shared by students worldwide.",
                gradient: "from-indigo-600 to-slate-600",
                bgGradient: "from-indigo-50 to-slate-50",
              },
              {
                icon: Users,
                title: "Academic Community",
                description:
                  "Connect with like-minded students, form study groups, and collaborate on academic projects and research.",
                gradient: "from-slate-600 to-blue-600",
                bgGradient: "from-slate-50 to-blue-50",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`text-center transform transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:shadow-lg ${
                  hoveredFeature === index ? "scale-105 shadow-xl" : ""
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className={`bg-gradient-to-r ${feature.bgGradient} rounded-t-lg`}>
                  <div
                    className={`mx-auto bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-full flex items-center justify-center mb-4 transform transition-all duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent text-xl`}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-700 bg-clip-text text-transparent">
              Quality Study Materials
            </h2>
            <p className="text-lg text-gray-700">Explore high-quality academic resources shared by top students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                subject: "Mathematics",
                title: "Advanced Calculus - Integration Techniques",
                description:
                  "Comprehensive study guide covering integration by parts, substitution methods, and partial fractions with solved examples.",
                author: "Sarah M. - Mathematics Major",
                rating: 4.8,
                gradient: "from-blue-600 to-indigo-600",
                badgeColor: "bg-blue-600",
              },
              {
                subject: "Computer Science",
                title: "Algorithm Analysis & Design Patterns",
                description:
                  "In-depth notes on algorithmic complexity, design patterns, and optimization techniques with code implementations.",
                author: "Alex K. - CS Graduate Student",
                rating: 4.9,
                gradient: "from-indigo-600 to-slate-600",
                badgeColor: "bg-indigo-600",
              },
              {
                subject: "Biology",
                title: "Molecular Biology Research Methods",
                description:
                  "Laboratory techniques, experimental design, and data analysis methods for molecular biology research.",
                author: "Emma L. - Biology PhD Candidate",
                rating: 4.7,
                gradient: "from-slate-600 to-blue-600",
                badgeColor: "bg-slate-600",
              },
            ].map((note, index) => (
              <Card
                key={index}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border border-gray-200 bg-white"
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className={`${note.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {note.subject}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-700 font-semibold">{note.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{note.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{note.author}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/access">
                Browse All Resources
                <Library className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="h-16 w-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance text-white">
            Contribute to Academic Excellence
          </h2>
          <p className="text-xl mb-8 text-white/95 text-pretty">
            Share your knowledge and help build a comprehensive library of academic resources for students worldwide.
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 bg-white text-blue-700 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href="/upload">
              <GraduationCap className="mr-2 h-5 w-5" />
              Start Contributing
              <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
