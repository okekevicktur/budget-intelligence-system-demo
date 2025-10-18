"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Lock, Unlock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "mda" | "executive" | "auditor"
  mda?: string
  status: "active" | "inactive"
  lastLogin: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Chioma Okafor",
    email: "chioma.okafor@enugu.gov.ng",
    role: "admin",
    status: "active",
    lastLogin: "2024-10-18",
  },
  {
    id: "2",
    name: "Emeka Nwankwo",
    email: "emeka.nwankwo@health.enugu.gov.ng",
    role: "mda",
    mda: "Ministry of Health",
    status: "active",
    lastLogin: "2024-10-17",
  },
  {
    id: "3",
    name: "Ngozi Eze",
    email: "ngozi.eze@education.enugu.gov.ng",
    role: "mda",
    mda: "Ministry of Education",
    status: "active",
    lastLogin: "2024-10-16",
  },
  {
    id: "4",
    name: "Chukwu Obi",
    email: "chukwu.obi@enugu.gov.ng",
    role: "auditor",
    status: "inactive",
    lastLogin: "2024-09-20",
  },
]

function getRoleColor(role: string) {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800"
    case "mda":
      return "bg-blue-100 text-blue-800"
    case "executive":
      return "bg-green-100 text-green-800"
    case "auditor":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [showForm, setShowForm] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "mda" as const })

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        ...newUser,
        status: "active",
        lastLogin: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "mda" })
      setShowForm(false)
      alert("User added successfully!")
    }
  }

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-muted rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="mda">MDA Officer</option>
              <option value="executive">Executive</option>
              <option value="auditor">Auditor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90">
              Create User
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">MDA</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Login</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                <td className="py-3 px-4">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{user.mda || "-"}</td>
                <td className="py-3 px-4">
                  <Badge
                    className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{user.lastLogin}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleUserStatus(user.id)}
                      title={user.status === "active" ? "Deactivate" : "Activate"}
                    >
                      {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => deleteUser(user.id)}
                    >
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
