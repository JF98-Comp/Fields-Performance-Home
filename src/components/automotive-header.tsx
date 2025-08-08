import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import fpLogoPath from "@assets/FP Logo White_1754038054395.png";

export function AutomotiveHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <div className={`${mobile ? "flex flex-col space-y-4" : "hidden md:flex items-baseline space-x-8"}`}>
      <Link
        href="/"
        onClick={onItemClick}
        className={`${
          isActive("/") ? "text-primary font-medium" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        } transition-colors`}
      >
        Home
      </Link>

      <Link
        href="/about"
        onClick={onItemClick}
        className={`${
          isActive("/about") ? "text-primary font-medium" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        } transition-colors`}
      >
        About Us
      </Link>
      <Link
        href="/gallery"
        onClick={onItemClick}
        className={`${
          isActive("/gallery") ? "text-primary font-medium" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        } transition-colors`}
      >
        Gallery
      </Link>
      <Link
        href="/about"
        onClick={onItemClick}
        className={`${
          isActive("/about") ? "text-primary font-medium" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        } transition-colors`}
      >
        About
      </Link>
      <Link
        href="/contact"
        onClick={onItemClick}
        className={`${
          isActive("/contact") ? "text-primary font-medium" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
        } transition-colors`}
      >
        Contact
      </Link>
    </div>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <img
              src={fpLogoPath}
              alt="Fields Performance"
              className="h-12 w-auto mr-3"
            />
            <span className="font-bold text-xl text-gray-900 dark:text-white">Fields Performance</span>
          </Link>

          <NavLinks />

          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+447123456789" 
              className="flex items-center text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm">07748 225184</span>
            </a>
            <Button asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <NavLinks mobile onItemClick={() => setOpen(false)} />
                  <Button asChild className="w-full mt-4">
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}