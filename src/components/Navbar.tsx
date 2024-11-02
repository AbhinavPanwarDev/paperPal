import Link from "next/link";
import MaxWidthWraper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";


const Navbar = () => {

  const { getUser } = getKindeServerSession();
  const user = getUser();


  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/80 transition-all backdrop-blur-lg">
      <MaxWidthWraper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>paperPal</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            <>




              {/* {!isAuthenticated ? (
                <>
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
              ) : (
                <>
                  
                    <Link
                      
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  
                 
                  
                    <Link
                       className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                      href="/sign-out"
                    >
                      Sign out
                    </Link>
                  
                </>
              )} 
              */}




              <Link
                
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href="/dashboard"
              >
                Dashboard
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
