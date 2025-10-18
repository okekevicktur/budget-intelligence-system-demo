import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Expenditure {
  id: string
  mda: string
  category: string
  amount: number
  status: "approved" | "pending" | "rejected"
  date: string
}

const expenditures: Expenditure[] = [
  {
    id: "1",
    mda: "Ministry of Health",
    category: "Medical Supplies",
    amount: 2500000,
    status: "approved",
    date: "2024-10-15",
  },
  {
    id: "2",
    mda: "Ministry of Education",
    category: "Infrastructure",
    amount: 5000000,
    status: "pending",
    date: "2024-10-14",
  },
  {
    id: "3",
    mda: "Ministry of Works",
    category: "Road Maintenance",
    amount: 3200000,
    status: "approved",
    date: "2024-10-13",
  },
  {
    id: "4",
    mda: "Ministry of Agriculture",
    category: "Equipment",
    amount: 1800000,
    status: "pending",
    date: "2024-10-12",
  },
  {
    id: "5",
    mda: "Ministry of Health",
    category: "Personnel",
    amount: 4100000,
    status: "approved",
    date: "2024-10-11",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ExpenditureTable() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Expenditures</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">MDA</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((exp) => (
              <tr key={exp.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">{exp.mda}</td>
                <td className="py-3 px-4">{exp.category}</td>
                <td className="py-3 px-4 text-right font-medium">₦{(exp.amount / 1000000).toFixed(1)}M</td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(exp.status)}>{exp.status}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
