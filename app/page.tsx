import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bug, CheckCircle, TrendingUp, ArrowRight, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { getRecentFailures, getTopSolutionsByUses, failures, solutions } from "@/lib/database"

export default function Dashboard() {
  const recentFailures = getRecentFailures(3)
  const topSolutions = getTopSolutionsByUses(3)

  const stats = [
    {
      title: "Total de Falhas",
      value: failures.length.toString(),
      change: "+12%",
      icon: Bug,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Soluções Ativas",
      value: solutions.length.toString(),
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Taxa de Resolução",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Falhas Críticas",
      value: failures.filter((f) => f.priority === "Critical").length.toString(),
      change: "-8%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema K-Fix</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} vs mês anterior</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Failures */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Falhas Recentes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/falhas?sortBy=date-desc">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFailures.map((failure) => (
                <div key={failure.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">{failure.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {failure.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <Badge
                          variant={
                            failure.priority === "Critical"
                              ? "destructive"
                              : failure.priority === "High"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {failure.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{failure.date}</p>
                    <Badge variant="outline" className="text-xs">
                      {failure.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Solutions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Soluções Mais Eficazes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/solucoes?sortBy=uses">
                Ver todas <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSolutions.map((solution) => (
                <div key={solution.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{solution.title}</p>
                    {solution.tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Eficácia: {solution.effectiveness}/5</span>
                    <span>{solution.uses} usos</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(solution.effectiveness / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
