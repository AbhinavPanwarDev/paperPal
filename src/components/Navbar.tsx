import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, Sparkles } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className='sticky h-18 inset-x-0 top-0 z-30 w-full border-b border-indigo-500/20 bg-slate-950/80 backdrop-blur-lg transition-all'>
      {/* Subtle top gradient border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-blue-500/0"></div>
      
      {/* Subtle bottom gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-indigo-500/0"></div>
      
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out ${Math.random() * 2}s infinite alternate`
            }}
          ></div>
        ))}
      </div>
      
      <MaxWidthWrapper>
        <div className='flex h-18 items-center justify-between py-3'>
          <Link
            href='/'
            className='flex items-center z-40 space-x-2'>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-blue-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>
            <div className="flex flex-col">
              <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300'>paperPal</span>
              <span className="text-xs text-indigo-300/70 -mt-1">AI Document Assistant</span>
            </div>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'default',
                    className: 'text-indigo-200 hover:text-white hover:bg-indigo-500/20 px-5 py-2.5 tracking-wide font-medium'
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className="relative group overflow-hidden rounded-full px-6 py-3 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40">
                  <span className="relative z-10 flex items-center tracking-wide text-sm">
                    Get started{' '}
                    <ArrowRight className='ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-1' />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 transition-colors duration-300"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></span>
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'default',
                    className: 'text-indigo-200 hover:text-white hover:bg-indigo-500/20 px-5 py-2.5 tracking-wide font-medium'
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar