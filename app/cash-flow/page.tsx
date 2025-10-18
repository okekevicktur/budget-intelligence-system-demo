"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const cashFlowData = [
  { month: "Jan", inflow: 4500, outflow: 3200, balance: 1300 },
  { month: "Feb", inflow: 4200, outflow: 3800, balance: 400 },
  { month: "Mar", inflow: 5100, outflow: 4200, balance: 900 },
  { month: "Apr", inflow: 4800, outflow: 3900, balance: 900 },
  { month: "May", inflow: 5300, outflow: 4100, balance: 1200 },
  { month: "Jun", inflow: 4900, outflow: 4300, balance: 600 },
]

export default function CashFlowPage() {
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Cash Flow & Forecasts</h1>
              <p className="text-muted-foreground">Monitor cash inflows, outflows, and balance forecasts.</p>
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Monthly Cash Flow Analysis</h2>
              <div className="w-full h-64 md:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => `₦${value}M`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="inflow" stroke="var(--color-primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="outflow" stroke="var(--color-chart-2)" strokeWidth={2} />
                    <Line type="monotone" dataKey="balance" stroke="var(--color-chart-3)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
