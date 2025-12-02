"use client"

import { LibraryDashboard } from "@/components/library-dashboard"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <LibraryDashboard />
      <div className="fixed bottom-4 right-4">
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"
          title="View transaction reports"
        >
          📊 Reports
        </Link>
      </div>
    </>
  )
}
