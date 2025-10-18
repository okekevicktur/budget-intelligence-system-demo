import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const budgetData = [
  { name: "Ministry of Health", value: 12500000000 },
  { name: "Ministry of Education", value: 18700000000 },
  { name: "Ministry of Works", value: 9200000000 },
  { name: "Ministry of Agriculture", value: 5800000000 },
  { name: "Other Agencies", value: 8200000000 },
]

const COLORS = [
  "var(--color-primary)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function PublicBudgetView() {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">2024 Budget Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₦${(value / 1000000000).toFixed(1)}B`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-primary">₦{(totalBudget / 1000000000).toFixed(1)}B</p>
            </div>

            <div className="space-y-3">
              {budgetData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">₦{(item.value / 1000000000).toFixed(1)}B</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
