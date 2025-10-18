"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { ReportsGenerator } from "@/components/reports-generator"

export default function ReportsPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>("admin")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role) {
      router.push("/login")
    } else {
      setUserRole(role)
    }
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Exports</h1>
              <p className="text-muted-foreground">Generate comprehensive financial reports and export data.</p>
            </div>

            <ReportsGenerator />
          </div>
        </main>
      </div>
    </div>
  )
}
