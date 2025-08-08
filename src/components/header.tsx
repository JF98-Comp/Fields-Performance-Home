import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GraduationCap, Menu } from "lucide-react";

export function Header() {
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
          isActive("/") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
        } transition-colors`}
      >
        Home
      </Link>
      <Link
        href="/resources"
        onClick={onItemClick}
        className={`${
          isActive("/resources") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
        } transition-colors`}
      >
        Resources
      </Link>
      <a
        href="#about"
        onClick={onItemClick}
        className="text-gray-600 hover:text-primary transition-colors"
      >
        About
      </a>
      <Link
        href="/contact"
        onClick={onItemClick}
        className={`${
          isActive("/contact") ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
        } transition-colors`}
      >
        Contact
      </Link>
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl text-gray-900">EduAccess</span>
          </Link>

          <NavLinks />

          <div className="hidden md:block">
            <Button>Get Started</Button>
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
                  <Button className="w-full mt-4">Get Started</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
