"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect, Suspense } from "react";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  // Clear any potentially stale session data from local storage
  useEffect(() => {
    // Clear any cached auth data that might be causing problems
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(key => {
      if (key.includes('kinde') || key.includes('auth')) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/api/auth/login");
      }
    },
    retry: true,
    retryDelay: 500,
  });

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <h3 className="font-semibold text-xl text-white">Setting up your account...</h3>
        <p className="text-indigo-300/70">Redirecting you automatically...</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full mt-24 flex justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <h3 className="font-semibold text-xl text-white">Loading...</h3>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
};

export default Page;
