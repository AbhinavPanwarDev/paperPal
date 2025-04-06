"use client";

import MaxWidthWraper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, Upload, Sparkles, Check, Cpu, Book, Brain } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background elements
      gsap.to(".bg-blob", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 5)",
      });

      // Hero animations - only if the element exists
      if (heroSectionRef.current) {
        const heroElements = heroSectionRef.current.querySelectorAll(".hero-element");
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          }
        );
      }

      // Feature cards animation
      if (featureSectionRef.current) {
        const featureCards = featureSectionRef.current.querySelectorAll(".feature-card");
        featureCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            }
          );
        });
      }

      // Steps animation
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll(".step-item");
        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,36,94,0.4),rgba(2,8,23,0.8))]"></div>
        <div className="bg-blob absolute top-0 left-0 w-[50rem] h-[50rem] -translate-x-[60%] -translate-y-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-600/20 blur-3xl"></div>
        <div className="bg-blob absolute top-1/2 right-0 w-[50rem] h-[50rem] translate-x-[60%] translate-y-[-40%] rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-600/20 blur-3xl"></div>
        <div className="bg-blob absolute bottom-0 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 translate-y-[30%] rounded-full bg-gradient-to-br from-purple-500/10 to-blue-600/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]"></div>
      </div>

      {/* Hero Section */}
      <div ref={heroSectionRef} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out ${Math.random() * 2}s infinite alternate`
              }}
            ></div>
          ))}
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 0.8; }
          }
        `}</style>

        <MaxWidthWraper className="flex flex-col items-center text-center px-4">
          <div className="hero-element mb-8 rounded-full bg-white/10 px-5 py-2 backdrop-blur-md border border-white/20">
            <p className="text-sm font-medium text-white/90">
              ✨ <span className="font-semibold text-indigo-300">PaperPal AI</span> — Your Document Assistant
            </p>
          </div>

          <h1 className="hero-element max-w-4xl text-5xl font-bold text-white sm:text-6xl md:text-7xl bg-clip-text">
            Unlock <span className="bg-gradient-to-r from-indigo-400 to-blue-300">Insights</span> from Your Documents
          </h1>

          <p className="hero-element mt-8 max-w-2xl text-lg text-indigo-100/80 leading-relaxed font-light">
            Transform PDFs into interactive knowledge bases. Ask questions, get summaries, and find
            information instantly with our powerful AI.
          </p>

          <div className="hero-element mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/dashboard"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-4 text-white font-medium shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <Link
              href="#features"
              className="text-indigo-200 hover:text-white font-medium flex items-center transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </MaxWidthWraper>
      </div>

      {/* Feature Highlight Section */}
      <div id="features" ref={featureSectionRef} className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 backdrop-blur-md bg-slate-900/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

        <MaxWidthWraper className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-indigo-500/20 backdrop-blur-sm">
              <span className="px-4 py-1 text-sm font-medium text-indigo-300 rounded-full">Features</span>
            </div>
            <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Everything you need</h2>
            <p className="mt-4 text-xl leading-8 text-indigo-100/70 max-w-2xl mx-auto">
              Powerful tools to make document interaction effortless and insightful.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mt-16">
            {/* Feature Card 1 */}
            <div className="feature-card group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm hover:bg-indigo-500/10 transition-colors duration-300 border border-indigo-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent"></div>
              <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI-Powered Chat</h3>
                <p className="text-indigo-100/70">Engage in natural conversations with your PDFs to find information quickly and accurately.</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm hover:bg-blue-500/10 transition-colors duration-300 border border-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">
                  <Brain className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Summarization</h3>
                <p className="text-indigo-100/70">Get concise summaries of long documents or specific sections with a single query.</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm hover:bg-purple-500/10 transition-colors duration-300 border border-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
              <div className="absolute -inset-px bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                  <Book className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Knowledge Extraction</h3>
                <p className="text-indigo-100/70">Extract key facts, figures, and insights from your documents automatically.</p>
              </div>
            </div>
          </div>
        </MaxWidthWraper>
      </div>

      {/* How it Works Section */}
      <div className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 backdrop-blur-md bg-slate-900/50"></div>
        <MaxWidthWraper className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-blue-500/20 backdrop-blur-sm">
              <span className="px-4 py-1 text-sm font-medium text-blue-300 rounded-full">How It Works</span>
            </div>
            <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Simple steps to insight</h2>
            <p className="mt-4 text-xl leading-8 text-indigo-100/70 max-w-2xl mx-auto">
              Start getting answers from your documents in minutes.
            </p>
          </div>

          <div ref={stepsRef} className="mt-16 space-y-16">
            {/* Step 1 */}
            <div className="step-item relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-300 mb-4">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Upload Your Documents</h3>
                  <p className="text-indigo-100/70 leading-relaxed max-w-md mx-auto md:mx-0">
                    Simply drag and drop your PDFs to our secure platform. We support various document formats and sizes.
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <div className="rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-indigo-500/20">
                  <div className="h-8 bg-slate-800 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-4">
                    <div className="rounded-lg border-2 border-dashed border-indigo-500/30 p-10 flex flex-col items-center justify-center bg-slate-800/50">
                      <Upload className="h-12 w-12 text-indigo-400 mb-4" />
                      <p className="text-indigo-200 text-center">Drag and drop your PDF here or click to browse</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-item relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 order-1">
                <div className="rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-blue-500/20">
                  <div className="h-8 bg-slate-800 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-4">
                    <div className="rounded-lg bg-slate-800/50 p-4">
                      <div className="h-6 w-24 bg-blue-500/20 rounded-full mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-700/70 rounded-full w-full"></div>
                        <div className="h-3 bg-slate-700/70 rounded-full w-5/6"></div>
                        <div className="h-3 bg-slate-700/70 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 order-2">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/20 text-blue-300 mb-4">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI Processes Your Content</h3>
                  <p className="text-indigo-100/70 leading-relaxed max-w-md mx-auto md:mx-0">
                    Our advanced AI reads and understands your document, creating a knowledge base ready for your questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-item relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-500/20 text-purple-300 mb-4">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Chat With Your Documents</h3>
                  <p className="text-indigo-100/70 leading-relaxed max-w-md mx-auto md:mx-0">
                    Ask questions naturally and get instant, accurate answers based on your document&apos;s content.
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 order-1 md:order-2">
                <div ref={imageRef} className="rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-purple-500/20">
                  <div className="h-8 bg-slate-800 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <Image
                    src="/pic-chat-pdf-3.png"
                    alt="Chat with documents"
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWraper>
      </div>

      {/* Final CTA */}
      <div className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 backdrop-blur-md bg-slate-900/50"></div>
        <MaxWidthWraper className="relative">
          <div ref={ctaRef} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/80 to-blue-900/80 p-10 md:p-16 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
            <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"></div>
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>
            
            <div className="text-center relative">
              <h2 className="text-4xl font-bold text-white sm:text-5xl mb-4">
                Ready to transform how you work?
              </h2>
              <p className="mt-6 text-xl text-indigo-100/80 max-w-2xl mx-auto mb-10">
                Join thousands of professionals who are already saving time and getting more from their documents.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-indigo-600 font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="text-indigo-200 hover:text-white font-medium flex items-center transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="mt-10 flex items-center justify-center gap-8 text-indigo-200/70 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Free tier available</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWraper>
      </div>
    </div>
  );
}
