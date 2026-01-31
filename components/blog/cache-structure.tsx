"use client"

import { ArrowRight } from "lucide-react"

export function CacheStructure() {
  return (
    <div className="my-8 p-6 rounded-xl bg-card/30 border border-border/50">
      {/* Simple horizontal flow - grid for perfect alignment */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
        {/* Input */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Cache Key</p>
          <div className="w-full max-w-[220px] px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
            <code className="text-sm font-mono text-blue-400">SHA256(image) + prompt</code>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-transparent mb-2 select-none" aria-hidden="true">.</p>
          <ArrowRight className="w-6 h-6 text-muted-foreground" />
        </div>

        {/* Output */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Cached Value</p>
          <div className="w-full max-w-[220px] px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
            <code className="text-sm font-mono text-green-400">embeddings + kv_cache</code>
          </div>
        </div>
      </div>

      {/* Simple note */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Same image content = same hash = cache hit (regardless of URL, base64, or file path)
      </p>
    </div>
  )
}
