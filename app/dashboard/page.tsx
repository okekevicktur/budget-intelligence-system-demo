"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { KPICard } from "@/components/kpi-card"
import { BudgetChart } from "@/components/budget-chart"
import { ExpenditureTable } from "@/components/expenditure-table"
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react"

export default function DashboardPage() {
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
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col w-full">
        <TopNav />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here's your budget overview.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KPICard title="Total Budget" value="₦45.2B" change={12} icon={<DollarSign className="w-8 h-8" />} />
              <KPICard title="Total Expenditure" value="₦28.5B" change={8} icon={<TrendingUp className="w-8 h-8" />} />
              <KPICard title="Budget Utilization" value="63%" change={5} icon={<AlertCircle className="w-8 h-8" />} />
              <KPICard title="Active MDAs" value="24" change={-2} unit="" icon={<Users className="w-8 h-8" />} />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <BudgetChart />
              </div>
              <div className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-2">Budget Alert</h3>
                  <p className="text-sm text-foreground/80">
                    3 MDAs have exceeded their quarterly budget limits. Review required.
                  </p>
                </div>
              </div>
            </div>

            {/* Expenditure Table */}
            <div className="mt-8">
              <ExpenditureTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
