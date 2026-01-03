import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, Heart, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-background via-muted/20 to-muted/40 border-t pt-16 pb-8 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(139,92,246,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2 mb-4 transition-transform hover:scale-105">
              <div className="flex items-center gap-2 px-2 py-1">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">CareerPilot</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Empowering engineering students to break barriers and secure top-tier placements through AI-driven guidance.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span>AI-Powered Career Platform</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              Product
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Smart Resume Builder</Link></li>
              <li><Link href="/roadmap" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:translate-x-1 inline-block">AI Roadmap</Link></li>
              <li><Link href="/interview" className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:translate-x-1 inline-block">Mock Interviews</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-green-600 rounded-full" />
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Career Blog</Link></li>
              <li><Link href="/guides" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:translate-x-1 inline-block">Placement Guides</Link></li>
              <li><Link href="/success-stories" className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:translate-x-1 inline-block">Success Stories</Link></li>
              <li><Link href="/support" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full" />
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
              <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:translate-x-1 inline-block">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:translate-x-1 inline-block">Cookie Policy</Link></li>
            </ul>
            
            <div className="flex items-center gap-3">
                <Link href="#" className="group relative p-2 rounded-lg bg-muted/50 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all">
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Link>
                <Link href="#" className="group relative p-2 rounded-lg bg-muted/50 hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-all">
                    <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </Link>
                <Link href="#" className="group relative p-2 rounded-lg bg-muted/50 hover:bg-green-100 dark:hover:bg-green-950/50 transition-all">
                    <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 p-8 rounded-2xl border-2 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-green-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold">Stay Updated</h3>
              </div>
              <p className="text-sm text-muted-foreground">Get career tips and insights delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-lg border-2 bg-background focus:border-blue-500 outline-none transition-colors flex-1 md:w-64"
              />
              <Button className="shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">CareerPilot</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> for students in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;