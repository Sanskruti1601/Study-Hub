import { BookOpen, Mail, Github, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 border-t border-gray-700 mt-auto text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 animate-slide-up">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400 animate-pulse" />
              <span className="text-xl font-bold text-white">Study Resource Hub</span>
            </div>
            <p className="text-gray-200 mb-4 text-pretty">
              Empowering students worldwide by making quality study resources accessible to everyone. Share your
              knowledge and help build a collaborative learning community.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Heart className="h-4 w-4 text-blue-400 animate-pulse" />
              <span>
                "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
              </span>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/upload", label: "Upload Notes" },
                { href: "/access", label: "Access Notes" },
                { href: "/about", label: "About Us" },
              ].map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-200 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 inline-block transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
                <Mail className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-gray-200">support@studyhub.edu</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
                <Github className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-gray-200">github.com/studyhub</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center animate-fade-in">
          <p className="text-sm text-gray-300">
            © 2024 Study Resource Hub. Built with <Heart className="inline h-4 w-4 text-blue-400 animate-pulse" /> for
            the students, by the students.
          </p>
        </div>
      </div>
    </footer>
  )
}
