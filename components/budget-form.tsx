"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, Plus, Trash2 } from "lucide-react"

interface BudgetLineItem {
  id: string
  category: string
  amount: number
  description: string
}

interface BudgetFormProps {
  onSubmit?: (data: any) => void
}

export function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [mda, setMda] = useState("")
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear().toString())
  const [lineItems, setLineItems] = useState<BudgetLineItem[]>([
    { id: "1", category: "Personnel", amount: 0, description: "" },
  ])
  const [errors, setErrors] = useState<string[]>([])

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now().toString(), category: "", amount: 0, description: "" }])
  }

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  const updateLineItem = (id: string, field: string, value: any) => {
    setLineItems(lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!mda) newErrors.push("MDA is required")
    if (lineItems.length === 0) newErrors.push("At least one line item is required")
    if (totalAmount === 0) newErrors.push("Total budget must be greater than 0")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    onSubmit?.({ mda, fiscalYear, lineItems, totalAmount })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create Budget Proposal</h2>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          {errors.map((error, i) => (
            <div key={i} className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ministry/Department (MDA)</label>
            <Input placeholder="e.g., Ministry of Health" value={mda} onChange={(e) => setMda(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fiscal Year</label>
            <Input type="number" value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Budget Line Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addLineItem} className="gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {lineItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1 text-muted-foreground">Category</label>
                  <Input
                    placeholder="e.g., Personnel, Equipment"
                    value={item.category}
                    onChange={(e) => updateLineItem(item.id, "category", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1 text-muted-foreground">Amount (₦)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={item.amount}
                    onChange={(e) => updateLineItem(item.id, "amount", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1 text-muted-foreground">Description</label>
                  <Input
                    placeholder="Details"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(item.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Budget:</span>
            <span className="text-2xl font-bold text-primary">₦{(totalAmount / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Submit Budget Proposal
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
        </div>
      </form>
    </Card>
  )
}
