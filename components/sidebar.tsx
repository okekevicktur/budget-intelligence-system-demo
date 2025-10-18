"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, TrendingUp, Users, Settings, LogOut, Menu, X, Home, PieChart, DollarSign, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  userRole?: string
}

export function Sidebar({ userRole = "admin" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", roles: ["admin", "mda", "executive", "auditor", "public"] },
    { icon: PieChart, label: "Budget Planning", href: "/budget-planning", roles: ["admin", "mda", "executive"] },
    {
      icon: TrendingUp,
      label: "Expenditure Tracking",
      href: "/expenditure",
      roles: ["admin", "mda", "executive", "auditor"],
    },
    { icon: DollarSign, label: "Cash Flow & Forecasts", href: "/cash-flow", roles: ["admin", "executive", "auditor"] },
    { icon: FileText, label: "Reports & Exports", href: "/reports", roles: ["admin", "mda", "executive", "auditor"] },
    { icon: Eye, label: "Transparency Portal", href: "/transparency", roles: ["admin", "public"] },
    { icon: Users, label: "Admin Panel", href: "/admin", roles: ["admin"] },
    { icon: Settings, label: "Settings", href: "/settings", roles: ["admin", "mda", "executive", "auditor"] },
  ]

  const visibleItems = menuItems.filter((item) => item.roles.includes(userRole))

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-sidebar-border sticky top-0 bg-sidebar">
          <h1 className="text-xl font-bold text-sidebar-primary">EBIS</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Budget Intelligence</p>
        </div>

        <nav className="p-4 space-y-2">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content offset - fixed spacing */}
      <div className="hidden md:block md:w-64 flex-shrink-0" />
    </>
  )
}
