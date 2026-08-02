"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FAQModal } from "./FAQModal";

export function Footer() {
  return (
    <footer className="w-full border-t border-secondary/50 bg-background/95 mt-auto text-text/80">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight text-text">FixIt<span className="text-primary">Now</span></span>
            </Link>
            <p className="text-sm">
              Your trusted platform for booking qualified home service professionals. Reliable, fast, and secure.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Facebook will be added soon"); }} className="hover:text-primary transition-colors"><FaFacebook className="h-5 w-5" /></Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("X will be added soon"); }} className="hover:text-primary transition-colors"><FaTwitter className="h-5 w-5" /></Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Instagram will be added soon"); }} className="hover:text-primary transition-colors"><FaInstagram className="h-5 w-5" /></Link>
            </div>
          </div>


          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">All Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="https://arafat-sany.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <FAQModal>
                  <button className="hover:text-primary transition-colors">FAQ</button>
                </FAQModal>
              </li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Road 33 , Sector 7<br />Uttara Dhaka -1230</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+8801636445632</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>human.sany7@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-secondary/30 flex flex-col md:flex-row items-center justify-between text-xs text-text/60">
          <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
