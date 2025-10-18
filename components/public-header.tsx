import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PublicHeader() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/transparency" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">EBIS</h1>
            <p className="text-xs text-muted-foreground">Budget Transparency</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">
            Budget
          </Link>
          <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">
            Expenditures
          </Link>
          <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">
            Reports
          </Link>
          <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>

        <Link href="/login">
          <Button className="bg-primary hover:bg-primary/90">Sign In</Button>
        </Link>
      </div>
    </header>
  )
}
