"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`backdrop-blur-sm border-b border-border sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg"
          : "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Study Resource Hub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home", gradient: "from-purple-500 to-pink-500" },
              { href: "/upload", label: "Upload Notes", gradient: "from-blue-500 to-cyan-500" },
              { href: "/access", label: "Access Notes", gradient: "from-green-500 to-emerald-500" },
              { href: "/about", label: "About", gradient: "from-orange-500 to-red-500" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-foreground font-medium transition-all duration-300 hover:scale-105 group animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10 group-hover:text-white transition-all duration-300 px-3 py-2 rounded-lg group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
            >
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-0 group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-blue-900/40 rounded-lg m-2 backdrop-blur-sm border border-white/20">
              {[
                {
                  href: "/",
                  label: "Home",
                  colors: "text-purple-700 hover:bg-purple-200 dark:text-purple-300 dark:hover:bg-purple-800/50",
                },
                {
                  href: "/upload",
                  label: "Upload Notes",
                  colors: "text-blue-700 hover:bg-blue-200 dark:text-blue-300 dark:hover:bg-blue-800/50",
                },
                {
                  href: "/access",
                  label: "Access Notes",
                  colors: "text-green-700 hover:bg-green-200 dark:text-green-300 dark:hover:bg-green-800/50",
                },
                {
                  href: "/about",
                  label: "About",
                  colors: "text-orange-700 hover:bg-orange-200 dark:text-orange-300 dark:hover:bg-orange-800/50",
                },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 font-medium transition-all duration-300 rounded-md transform hover:scale-105 hover:translate-x-2 animate-slide-up ${item.colors}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
