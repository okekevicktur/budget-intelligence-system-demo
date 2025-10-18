"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { BudgetForm } from "@/components/budget-form"
import { BudgetList } from "@/components/budget-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/toast-provider"

export default function BudgetPlanningPage() {
  const router = useRouter()
  const { addToast } = useToast()
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Budget Planning</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Create and manage budget proposals for fiscal year 2024.
              </p>
            </div>

            <Tabs defaultValue="create" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:w-auto">
                <TabsTrigger value="create">Create Budget</TabsTrigger>
                <TabsTrigger value="list">View Proposals</TabsTrigger>
              </TabsList>

              <TabsContent value="create">
                <BudgetForm
                  onSubmit={(data) => {
                    addToast("Budget proposal submitted successfully!", "success")
                  }}
                />
              </TabsContent>

              <TabsContent value="list">
                <BudgetList />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
