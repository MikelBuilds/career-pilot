"use client";

import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <main className="container mx-auto pt-24 px-4">
      <SignedIn>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-600">You are signed in.</p>

        <div className="mt-6">
          {/* <Link className="text-indigo-600 hover:underline" href="/create">
            Go to Create →
          </Link> */}
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
}