import Link from "next/link";
import MaxWidthWraper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, BookOpenText, Sparkles } from "lucide-react";
import MobileNav from "./MobileNav";


const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="sticky h-18 inset-x-0 top-0 z-30 w-full bg-slate-950/85 backdrop-blur-xl">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent opacity-70"></div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent opacity-70"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-500/20 blur-[80px] rounded-full"></div>
      
      <MaxWidthWraper>
        <div className="flex h-18 items-center justify-between py-3">
          <Link 
            href="/" 
            className="flex items-center gap-3 z-40 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600/30 to-blue-600/30 rounded-xl border border-indigo-500/40 shadow-lg shadow-indigo-500/10 backdrop-blur-sm">
              <BookOpenText className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full border border-indigo-500/50 shadow-md shadow-indigo-500/20" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-300 via-blue-300 to-indigo-200 bg-clip-text text-transparent tracking-tight leading-none">
                  paperPal
                </span>
                <Sparkles className="h-3 w-3 text-indigo-300/70" />
              </div>
              <span className="text-[0.65rem] text-indigo-300/70 font-medium tracking-wide leading-none -mt-0.5">
                Smart PDF Assistant
              </span>
            </div>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center sm:flex space-x-5">
            <>
              <Link
                className="relative group overflow-hidden px-5 py-2 rounded-md text-sm font-medium text-indigo-200 transition-all duration-300 
                          border border-indigo-500/40 hover:border-indigo-400/70 hover:text-white flex items-center gap-1.5"
                href="/dashboard"
              >
                <span className="relative z-10 tracking-wide">Dashboard</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
                  
              <LoginLink
                className="group relative overflow-hidden px-5 py-2 rounded-md text-sm font-medium text-indigo-200 transition-all duration-300
                          border border-indigo-500/40 hover:border-indigo-400/70 hover:text-white"
              >
                <span className="relative z-10 tracking-wide">Sign In</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </LoginLink>

              <RegisterLink
                className="relative overflow-hidden group flex items-center gap-1.5 px-6 py-2 rounded-md text-sm font-medium text-white 
                          transition-all duration-300 shadow-lg shadow-indigo-500/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 z-0"></span>
                <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 tracking-wide">Get Started</span>
                <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWraper>
    </nav>
  );
};

export default Navbar;