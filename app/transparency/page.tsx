"use client"

import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicBudgetView } from "@/components/public-budget-view"
import { PublicExpenditureView } from "@/components/public-expenditure-view"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, TrendingUp, FileText, ArrowLeft } from "lucide-react"

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="outline" className="mb-6 gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Budget Transparency Portal</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Access comprehensive information about Enugu State's budget allocation and expenditure. Our commitment to
            transparency ensures citizens have access to accurate financial data.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Total Budget 2024</p>
                <p className="text-2xl font-bold">₦54.4B</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Total Expenditure</p>
                <p className="text-2xl font-bold">₦28.5B</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Budget Utilization</p>
                <p className="text-2xl font-bold">52.4%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
            <TabsTrigger value="expenditure">Expenditures</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="budget">
            <PublicBudgetView />
          </TabsContent>

          <TabsContent value="expenditure">
            <PublicExpenditureView />
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About the Budget Transparency Portal</h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  The Enugu Budget Intelligence System (EBIS) Transparency Portal is designed to provide citizens,
                  stakeholders, and civil society organizations with access to comprehensive budget and expenditure
                  information.
                </p>
                <p>
                  <strong>Our Mission:</strong> To promote fiscal transparency, accountability, and citizen engagement
                  in the budgeting process of Enugu State Government.
                </p>
                <p>
                  <strong>Data Updates:</strong> This portal is updated monthly with the latest budget allocations and
                  expenditure records. All data is verified and approved by the State Ministry of Finance.
                </p>
                <p>
                  <strong>Data Accuracy:</strong> We are committed to providing accurate and timely information. If you
                  notice any discrepancies, please contact us at transparency@enugu.gov.ng
                </p>
                <p>
                  <strong>Accessibility:</strong> This portal is designed to be accessible to all citizens. For
                  assistance or to request data in alternative formats, please reach out to our support team.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 Enugu State Government. All rights reserved.</p>
          <p className="text-sm mt-2">
            For inquiries, contact:{" "}
            <a href="mailto:info@enugu.gov.ng" className="text-primary hover:underline">
              info@enugu.gov.ng
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
