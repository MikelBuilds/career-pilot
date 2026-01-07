import Link from "next/link";
import { Twitter, Instagram, Linkedin, Heart, Rocket, Mail, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="relative border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold gradient-title">CareerPilot</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Empowering professionals to break barriers and achieve their career goals through AI-driven guidance.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-violet-100 dark:hover:bg-violet-950/50 transition-colors">
                <Twitter className="h-4 w-4 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400" />
              </Link>
              <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-pink-100 dark:hover:bg-pink-950/50 transition-colors">
                <Instagram className="h-4 w-4 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/resume" className="hover:text-foreground transition-colors">Resume Builder</Link></li>
              <li><Link href="/ai-cover-letter" className="hover:text-foreground transition-colors">Cover Letters</Link></li>
              <li><Link href="/interview" className="hover:text-foreground transition-colors">Mock Interviews</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Industry Insights</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Career Blog</Link></li>
              <li><Link href="/guides" className="hover:text-foreground transition-colors">Career Guides</Link></li>
              <li><Link href="/success-stories" className="hover:text-foreground transition-colors">Success Stories</Link></li>
              <li><Link href="/support" className="hover:text-foreground transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl border bg-background">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold">Stay Updated</h3>
              </div>
              <p className="text-sm text-muted-foreground">Get career tips and insights delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="gap-2 shadow-lg shadow-blue-500/20">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} <span className="font-semibold gradient-title">CareerPilot</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for professionals worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;