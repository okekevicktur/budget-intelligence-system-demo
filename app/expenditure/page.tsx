"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { ExpenditureForm } from "@/components/expenditure-form"
import { ExpenditureTable } from "@/components/expenditure-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ExpenditurePage() {
  const router = useRouter()
  const { toast } = useToast()
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Expenditure Tracking</h1>
              <p className="text-muted-foreground">Record and monitor all government expenditures.</p>
            </div>

            <Tabs defaultValue="record" className="space-y-6">
              <TabsList>
                <TabsTrigger value="record">Record Expenditure</TabsTrigger>
                <TabsTrigger value="view">View All</TabsTrigger>
              </TabsList>

              <TabsContent value="record">
                <ExpenditureForm
                  onSubmit={(data) => {
                    console.log("Expenditure recorded:", data)
                    toast({
                      title: "Success",
                      description: "Expenditure recorded successfully!",
                    })
                  }}
                />
              </TabsContent>

              <TabsContent value="view">
                <ExpenditureTable />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
