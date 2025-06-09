import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

export default function Reports() {
  const reportData = {
    totalFailures: 1247,
    resolvedFailures: 892,
    pendingFailures: 355,
    averageResolutionTime: "2.4h",
    topTechnologies: [
      { name: "React", failures: 234, percentage: 18.8 },
      { name: "Node.js", failures: 198, percentage: 15.9 },
      { name: "Python", failures: 156, percentage: 12.5 },
      { name: "Java", failures: 134, percentage: 10.7 },
      { name: "PostgreSQL", failures: 98, percentage: 7.9 },
    ],
    monthlyTrend: [
      { month: "Jan", failures: 89, solutions: 67 },
      { month: "Fev", failures: 102, solutions: 78 },
      { month: "Mar", failures: 95, solutions: 89 },
      { month: "Abr", failures: 87, solutions: 92 },
      { month: "Mai", failures: 76, solutions: 85 },
      { month: "Jun", failures: 68, solutions: 79 },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análise detalhada de falhas e soluções</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Falhas</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.totalFailures}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">+12% vs mês anterior</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Falhas Resolvidas</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.resolvedFailures}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+8% vs mês anterior</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Falhas Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.pendingFailures}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-500">-5% vs mês anterior</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.averageResolutionTime}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">-15% vs mês anterior</span>
                </div>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Technologies */}
        <Card>
          <CardHeader>
            <CardTitle>Falhas por Tecnologia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.topTechnologies.map((tech, index) => (
                <div key={tech.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-sm text-gray-500">{tech.failures} falhas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{tech.percentage}%</Badge>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${tech.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.monthlyTrend.map((month) => (
                <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{month.month}</div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>{month.failures} falhas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>{month.solutions} soluções</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Taxa de Resolução</h3>
              <p className="text-3xl font-bold text-blue-600">87%</p>
              <p className="text-sm text-blue-700">+5% vs período anterior</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Eficácia Média</h3>
              <p className="text-3xl font-bold text-green-600">4.2/5</p>
              <p className="text-sm text-green-700">+0.3 vs período anterior</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Reincidência</h3>
              <p className="text-3xl font-bold text-purple-600">13%</p>
              <p className="text-sm text-purple-700">-2% vs período anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
