import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
               <Image 
                 src="/logo.png" 
                 alt="CareerPilot" 
                 width={120} 
                 height={40} 
                 className="h-8 w-auto"
               />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering tier-3 engineering students to break barriers and secure top-tier placements through AI-driven guidance.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Smart Resume Builder</Link></li>
              <li><Link href="/roadmap" className="hover:text-primary transition-colors">AI Roadmap</Link></li>
              <li><Link href="/interview" className="hover:text-primary transition-colors">Mock Interviews</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Career Blog</Link></li>
              <li><Link href="/guides" className="hover:text-primary transition-colors">Placement Guides</Link></li>
              <li><Link href="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
            
            <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CareerPilot. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;