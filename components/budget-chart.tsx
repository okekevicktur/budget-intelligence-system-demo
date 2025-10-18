"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const data = [
  { month: "Jan", allocated: 4000, spent: 2400, forecast: 2210 },
  { month: "Feb", allocated: 3000, spent: 1398, forecast: 2221 },
  { month: "Mar", allocated: 2000, spent: 9800, forecast: 2290 },
  { month: "Apr", allocated: 2780, spent: 3908, forecast: 2000 },
  { month: "May", allocated: 1890, spent: 4800, forecast: 2181 },
  { month: "Jun", allocated: 2390, spent: 3800, forecast: 2500 },
]

export function BudgetChart() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar")

  return (
    <Card className="p-4 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Budget vs Expenditure</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              chartType === "bar" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              chartType === "line" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Line
          </button>
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="allocated" fill="var(--color-primary)" />
              <Bar dataKey="spent" fill="var(--color-chart-2)" />
              <Bar dataKey="forecast" fill="var(--color-muted)" />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="allocated" stroke="var(--color-primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="spent" stroke="var(--color-chart-2)" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" stroke="var(--color-muted)" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
