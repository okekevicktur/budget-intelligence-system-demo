"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, BarChart3 } from "lucide-react"

interface ReportOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const reportOptions: ReportOption[] = [
  {
    id: "budget-vs-expenditure",
    name: "Budget vs Expenditure",
    description: "Compare allocated budget with actual expenditure by MDA",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: "mda-performance",
    name: "MDA Performance Report",
    description: "Detailed performance metrics for each ministry/department",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "cash-flow",
    name: "Cash Flow Analysis",
    description: "Monthly cash flow trends and forecasts",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: "audit-trail",
    name: "Audit Trail Report",
    description: "Complete transaction history and approval workflow",
    icon: <FileText className="w-6 h-6" />,
  },
]

export function ReportsGenerator() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async (reportId: string) => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      alert(`${reportOptions.find((r) => r.id === reportId)?.name} generated successfully!`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Generate Reports</h2>
        <p className="text-muted-foreground mb-6">Select a report type to generate and export financial data.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportOptions.map((report) => (
            <Card
              key={report.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedReport === report.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-primary/60">{report.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {selectedReport && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Report Options</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  defaultValue="2024-01-01"
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  defaultValue="2024-10-31"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Excel
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  CSV
                </Button>
              </div>
            </div>

            <Button
              onClick={() => handleGenerateReport(selectedReport)}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 gap-2"
            >
              <Download className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Generate & Download Report"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
