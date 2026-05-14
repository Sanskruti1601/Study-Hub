"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Globe, Heart, Target, Lightbulb, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [counters, setCounters] = useState({
    students: 0,
    resources: 0,
    countries: 0,
    successRate: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.5 },
    )

    const statsSection = document.getElementById("stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateCounters = () => {
    const targets = { students: 10000, resources: 5000, countries: 50, successRate: 95 }
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounters({
        students: Math.floor(targets.students * progress),
        resources: Math.floor(targets.resources * progress),
        countries: Math.floor(targets.countries * progress),
        successRate: Math.floor(targets.successRate * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters(targets)
      }
    }, stepDuration)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-slate-600/10 py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 bg-clip-text text-transparent mb-6 text-balance animate-bounce-in">
              Democratizing Education Through Collaboration
            </h1>
            <p className="text-xl text-gray-700 mb-8 text-pretty animate-slide-up">
              Study Resource Hub is more than just a platform—it's a movement to make quality education accessible to
              every student, regardless of their background or circumstances.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-6 text-pretty">
                  We believe that knowledge should be free, accessible, and shared. Our mission is to create a global
                  community where students can collaborate, learn from each other, and succeed together.
                </p>
                <p className="text-lg text-gray-700 mb-8 text-pretty">
                  By connecting students worldwide through shared study resources, we're breaking down barriers to
                  education and fostering a culture of collaborative learning that benefits everyone.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                >
                  <Link href="/upload">
                    <Heart className="mr-2 h-5 w-5" />
                    Join Our Mission
                  </Link>
                </Button>
              </div>

              {/* Stats Cards */}
              <div id="stats-section" className="grid grid-cols-2 gap-4">
                <Card
                  className="text-center p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up border-0 bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {counters.students.toLocaleString()}+
                  </h3>
                  <p className="text-sm text-gray-600">Students Helped</p>
                </Card>

                <Card
                  className="text-center p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up border-0 bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="bg-gradient-to-r from-indigo-500/10 to-slate-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-indigo-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-slate-600 bg-clip-text text-transparent mb-2">
                    {counters.resources.toLocaleString()}+
                  </h3>
                  <p className="text-sm text-gray-600">Study Resources</p>
                </Card>

                <Card
                  className="text-center p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up border-0 bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="bg-gradient-to-r from-slate-500/10 to-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-slate-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {counters.countries}+
                  </h3>
                  <p className="text-sm text-gray-600">Countries Reached</p>
                </Card>

                <Card
                  className="text-center p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up border-0 bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {counters.successRate}%
                  </h3>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 bg-gray-50/50 animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                The Problem We're Solving
              </h2>
              <p className="text-lg text-gray-700 text-pretty animate-fade-in">
                Educational inequality is one of the most pressing challenges of our time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-gray-800">Limited Access</CardTitle>
                  <CardDescription className="text-gray-600">
                    Many students lack access to quality study materials due to financial constraints or geographic
                    limitations.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-gray-800">Isolated Learning</CardTitle>
                  <CardDescription className="text-gray-600">
                    Students often study in isolation, missing out on the benefits of collaborative learning and peer
                    support.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-gray-800">Resource Inequality</CardTitle>
                  <CardDescription className="text-gray-600">
                    Quality educational resources are often expensive or exclusive, creating barriers for
                    underprivileged students.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-20 animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Our Solution
              </h2>
              <p className="text-lg text-gray-700 text-pretty animate-fade-in">
                We're building bridges between students worldwide, creating a collaborative ecosystem where knowledge
                flows freely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-800">Global Accessibility</CardTitle>
                  <CardDescription className="text-gray-600">
                    Our platform is free and accessible to anyone with an internet connection, breaking down geographic
                    and economic barriers to quality education.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-gray-800">Peer-to-Peer Learning</CardTitle>
                  <CardDescription className="text-gray-600">
                    Students learn best from other students. Our platform facilitates knowledge sharing between peers,
                    creating a supportive learning community.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-800">Quality Assurance</CardTitle>
                  <CardDescription className="text-gray-600">
                    All uploaded resources are reviewed and rated by the community, ensuring high-quality content that
                    truly helps students succeed.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-gray-800">Recognition System</CardTitle>
                  <CardDescription className="text-gray-600">
                    We recognize and celebrate contributors, creating incentives for students to share their knowledge
                    and help others succeed.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Impact */}
        <section className="py-20 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-bounce-in">
              Creating Lasting Social Impact
            </h2>
            <p className="text-lg text-gray-700 mb-12 text-pretty animate-fade-in">
              Every note shared, every resource accessed, and every student helped contributes to a more equitable and
              educated world.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Educational Equity</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Reducing educational inequality by providing free access to quality study materials for all
                      students.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Community Building</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Fostering a global community of learners who support and uplift each other through shared
                      knowledge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Academic Success</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Improving academic outcomes by providing students with diverse perspectives and high-quality study
                      resources.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Global Reach</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Connecting students across continents, breaking down barriers and promoting cross-cultural
                      learning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Empowerment</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Empowering students to take control of their education and become active contributors to their
                      learning community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 animate-slide-up">Innovation</h3>
                    <p className="text-gray-600 text-sm animate-fade-in">
                      Pioneering new approaches to collaborative learning and knowledge sharing in the digital age.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance animate-bounce-in">
              Be Part of the Solution
            </h2>
            <p className="text-xl mb-8 opacity-90 text-pretty animate-fade-in">
              Join thousands of students who are already making a difference. Share your knowledge, access quality
              resources, and help build a more equitable future for education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Link href="/upload">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Share Your Notes
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Link href="/access">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
