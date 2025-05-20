"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function ArticleSkeleton({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl ${isLarge ? 'h-[400px]' : 'h-64'} bg-gray-200 animate-pulse`}>
      <div className={`relative w-full ${isLarge ? 'h-[240px]' : 'h-40'} bg-gray-300`} />
      <div className="p-4 space-y-3">
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-2/4 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}

export function ShopItemSkeleton({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl ${isLarge ? 'h-[360px]' : 'h-80'} bg-gray-200 animate-pulse`}>
      <div className={`relative w-full ${isLarge ? 'h-52' : 'h-44'} bg-gray-300`} />
      <div className="p-4 space-y-3">
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-6 w-2/3 bg-gray-300 rounded" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
          <div className="h-8 w-8 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ShopGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(count).fill(0).map((_, i) => (
        <ShopItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function HighlightsSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="relative aspect-video bg-gray-200 rounded-lg animate-pulse overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 animate-pulse">
      <div className="bg-gray-100 p-4">
        {Array(columns).fill(0).map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded mb-2 last:mb-0" style={{ width: `${Math.floor(Math.random() * 40) + 50}%` }} />
        ))}
      </div>
      {Array(rows).fill(0).map((_, rowIndex) => (
        <div key={rowIndex} className="border-t border-gray-200 p-4">
          <div className="space-y-2">
            {Array(columns).fill(0).map((_, colIndex) => (
              <div 
                key={colIndex} 
                className="h-4 bg-gray-200 rounded" 
                style={{ width: `${Math.floor(Math.random() * 60) + 30}%` }} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdSkeleton() {
  return (
    <div className="h-48 md:h-64 w-full bg-gray-200 animate-pulse rounded-lg" />
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-8 bg-gray-300 w-64 mx-auto rounded" />
          <div className="h-4 bg-gray-300 w-96 mx-auto rounded" />
          <div className="h-10 bg-gray-300 w-36 mx-auto rounded-full mt-6" />
        </div>
      </div>
    </div>
  );
}

export function GenericSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}
