"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ExpenditureFormProps {
  onSubmit?: (data: any) => void
}

export function ExpenditureForm({ onSubmit }: ExpenditureFormProps) {
  const [formData, setFormData] = useState({
    mda: "",
    category: "",
    description: "",
    amount: 0,
    vendor: "",
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!formData.mda) newErrors.push("MDA is required")
    if (!formData.category) newErrors.push("Category is required")
    if (formData.amount <= 0) newErrors.push("Amount must be greater than 0")
    if (!formData.vendor) newErrors.push("Vendor is required")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])
    onSubmit?.(formData)
    setFormData({
      mda: "",
      category: "",
      description: "",
      amount: 0,
      vendor: "",
      invoiceNumber: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Record Expenditure</h2>

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg space-y-2">
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
            <select
              name="mda"
              value={formData.mda}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">Select MDA</option>
              <option value="Ministry of Health">Ministry of Health</option>
              <option value="Ministry of Education">Ministry of Education</option>
              <option value="Ministry of Works">Ministry of Works</option>
              <option value="Ministry of Agriculture">Ministry of Agriculture</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="">Select Category</option>
              <option value="Personnel">Personnel</option>
              <option value="Equipment">Equipment</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the expenditure"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (₦)</label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Vendor/Supplier</label>
            <Input name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Vendor name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Invoice Number</label>
            <Input
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder="INV-2024-001"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Record Expenditure
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
