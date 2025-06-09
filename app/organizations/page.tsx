import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, FileText } from "lucide-react"

export default function Organizations() {
  const organizations = [
    {
      id: 1,
      name: "Tech Innovators Inc.",
      description: "A leading software development firm specializing in cloud solutions.",
      logo: "/placeholder.svg?height=80&width=80",
      members: 45,
      failures: 127,
      solutions: 89,
    },
    {
      id: 2,
      name: "Global Solutions Group",
      description: "A multinational corporation providing IT services and consulting.",
      logo: "/placeholder.svg?height=80&width=80",
      members: 78,
      failures: 203,
      solutions: 156,
    },
    {
      id: 3,
      name: "Digital Frontier Enterprises",
      description: "An innovative startup focused on AI and machine learning applications.",
      logo: "/placeholder.svg?height=80&width=80",
      members: 23,
      failures: 67,
      solutions: 45,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Updated solution for 'Network Connectivity Issue' in Tech Innovators Inc.",
      time: "2 days ago",
      icon: FileText,
    },
    {
      id: 2,
      action: "Added new failure report for 'Application Crash' in Global Solutions Group",
      time: "5 days ago",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Organizações</h1>
          <p className="text-gray-600">Gerencie suas organizações e equipes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Criar Nova Organização
        </Button>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="secondary" className="text-xs mb-2">
                        Organização
                      </Badge>
                      <h3 className="font-semibold text-lg">{org.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{org.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{org.members}</p>
                      <p className="text-xs text-gray-500">Membros</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{org.failures}</p>
                      <p className="text-xs text-gray-500">Falhas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{org.solutions}</p>
                      <p className="text-xs text-gray-500">Soluções</p>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Acessar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <activity.icon className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
