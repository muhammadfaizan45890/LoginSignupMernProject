import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookA, LogOut, User, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getData } from '@/context/userContext';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
  const { user, setUser } = getData();
  const accessToken = localStorage.getItem("accessToken");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/user/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success(res.data.message || "Logged out successfully!");
      }
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 
      ${isScrolled ? "shadow-md" : ""} bg-white border-b`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-wide text-black">
            <span className="font-light"></span>
          </h1>
        </Link>

        {/* Desktop Section */}
        <div className="hidden md:flex items-center gap-10 font-medium text-black">

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer ring-1 ring-black/20 hover:ring-black transition-all duration-300">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl shadow-lg bg-white border"
              >
                <DropdownMenuLabel className="text-black">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 transition">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 transition">
                  <BookA className="mr-2 h-4 w-4" /> About
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="cursor-pointer text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="relative group text-black hover:text-gray-600 transition"
            >
              Login
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black hover:text-gray-600 transition"
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 
        ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 pt-2 bg-white border-t">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-black">
                  {user?.username}
                </span>
              </div>

              <button className="flex items-center gap-2 text-black hover:text-gray-600 transition">
                <User className="h-4 w-4" /> Profile
              </button>

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block text-black hover:text-gray-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
