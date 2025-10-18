"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SystemSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    systemName: "Enugu Budget Intelligence System",
    fiscalYear: "2024",
    budgetThreshold: "80",
  })

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Settings saved successfully!",
    })
  }

  const handleClearData = () => {
    toast({
      title: "Warning",
      description: "This action would clear all data. Please confirm in production.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">System Name</label>
            <Input
              value={settings.systemName}
              onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fiscal Year</label>
            <Input
              type="number"
              value={settings.fiscalYear}
              onChange={(e) => setSettings({ ...settings, fiscalYear: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget Threshold Alert (%)</label>
            <Input
              type="number"
              value={settings.budgetThreshold}
              onChange={(e) => setSettings({ ...settings, budgetThreshold: e.target.value })}
            />
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Settings
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Audit & Compliance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Audit Logging</p>
              <p className="text-sm text-muted-foreground">Track all system activities</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Data Encryption</p>
              <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-destructive/20 bg-destructive/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
            <p className="text-sm text-foreground/80 mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <Button
              onClick={handleClearData}
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
            >
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
