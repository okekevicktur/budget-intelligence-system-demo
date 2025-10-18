import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit2, Trash2 } from "lucide-react"

interface Budget {
  id: string
  mda: string
  fiscalYear: number
  totalAmount: number
  status: "draft" | "submitted" | "approved" | "rejected"
  createdDate: string
}

const budgets: Budget[] = [
  {
    id: "1",
    mda: "Ministry of Health",
    fiscalYear: 2024,
    totalAmount: 12500000000,
    status: "approved",
    createdDate: "2024-09-15",
  },
  {
    id: "2",
    mda: "Ministry of Education",
    fiscalYear: 2024,
    totalAmount: 18700000000,
    status: "submitted",
    createdDate: "2024-09-20",
  },
  {
    id: "3",
    mda: "Ministry of Works",
    fiscalYear: 2024,
    totalAmount: 9200000000,
    status: "draft",
    createdDate: "2024-10-01",
  },
  {
    id: "4",
    mda: "Ministry of Agriculture",
    fiscalYear: 2024,
    totalAmount: 5800000000,
    status: "approved",
    createdDate: "2024-08-30",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "submitted":
      return "bg-blue-100 text-blue-800"
    case "draft":
      return "bg-gray-100 text-gray-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function BudgetList() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Budget Proposals</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">MDA</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fiscal Year</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">{budget.mda}</td>
                <td className="py-3 px-4">{budget.fiscalYear}</td>
                <td className="py-3 px-4 text-right font-medium">₦{(budget.totalAmount / 1000000000).toFixed(1)}B</td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(budget.status)}>{budget.status}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{budget.createdDate}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
