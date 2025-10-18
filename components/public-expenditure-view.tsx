import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface PublicExpenditure {
  id: string
  mda: string
  category: string
  amount: number
  date: string
  description: string
}

const expenditures: PublicExpenditure[] = [
  {
    id: "1",
    mda: "Ministry of Health",
    category: "Medical Supplies",
    amount: 2500000,
    date: "2024-10-15",
    description: "Purchase of medical equipment and supplies",
  },
  {
    id: "2",
    mda: "Ministry of Education",
    category: "Infrastructure",
    amount: 5000000,
    date: "2024-10-14",
    description: "School renovation and infrastructure development",
  },
  {
    id: "3",
    mda: "Ministry of Works",
    category: "Road Maintenance",
    amount: 3200000,
    date: "2024-10-13",
    description: "Road rehabilitation and maintenance",
  },
  {
    id: "4",
    mda: "Ministry of Agriculture",
    category: "Equipment",
    amount: 1800000,
    date: "2024-10-12",
    description: "Agricultural equipment procurement",
  },
  {
    id: "5",
    mda: "Ministry of Health",
    category: "Personnel",
    amount: 4100000,
    date: "2024-10-11",
    description: "Staff salaries and allowances",
  },
]

export function PublicExpenditureView() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Expenditures</h2>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by MDA or category..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">MDA</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((exp) => (
              <tr key={exp.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">{exp.mda}</td>
                <td className="py-3 px-4">
                  <Badge variant="outline">{exp.category}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{exp.description}</td>
                <td className="py-3 px-4 text-right font-medium">₦{(exp.amount / 1000000).toFixed(1)}M</td>
                <td className="py-3 px-4 text-muted-foreground">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
