"use client";

import Link from "next/link";

export function Options() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex w-full max-w-2xl flex-col gap-4 px-4 md:flex-row">
          <Link
            href="/users"
            className="flex-1 rounded-lg bg-primary p-8 text-center text-2xl font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Users
          </Link>
          <Link
            href="/sites"
            className="flex-1 rounded-lg bg-primary p-8 text-center text-2xl font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Site
          </Link>
        </div>
        <div className="flex flex-col">
          <Link
            href="edit/products"
            className="mt-5 py-5 bg-primary/90 text-primary-foreground text-lg font-bold rounded-lg w-96 text-center transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring "
          >
            Edit Inventory Items
          </Link>
          <Link
            href="/edit/workers"
            className="my-3 py-5 bg-primary/90 text-primary-foreground text-lg font-bold rounded-lg w-96 text-center transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring "
          >
            Edit Workers
          </Link>
          <Link
            href="/msg"
            className="mb-3 py-5 bg-primary/90 text-primary-foreground text-lg font-bold rounded-lg w-96 text-center transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring "
          >
            Notify Workers 
          </Link>
        </div>
      </div>
    </main>
  );
}
