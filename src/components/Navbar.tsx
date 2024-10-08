import Link from "next/link";
import MaxWidthWraper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/80 transition-all backdrop-blur-lg">
      <MaxWidthWraper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>.Paper.Pal.</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>

              <LoginLink
                //href="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Sign In
              </LoginLink>

              <RegisterLink
                //href="/login"
                className={buttonVariants({
                  
                  size: "sm",
                })}
              >
                Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWraper>
    </nav>
  );
};

export default Navbar;
