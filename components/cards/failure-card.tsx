import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bug, Calendar, User } from "lucide-react"
import Link from "next/link"

interface FailureCardProps {
  failure: {
    id: number
    title: string
    description: string
    tags: string[]
    status: string
    priority: string
    date: string
    author?: {
      name: string
      avatar?: string
      role: string
    }
    solutionCount?: number
  }
}

export function FailureCard({ failure }: FailureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800"
      case "In Analysis":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600 text-white"
      case "High":
        return "bg-orange-600 text-white"
      case "Medium":
        return "bg-yellow-600 text-white"
      case "Low":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Bug className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{failure.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{failure.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {failure.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {failure.date}
            </div>
            {failure.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {failure.author.name}
              </div>
            )}
          </div>
          {failure.solutionCount !== undefined && (
            <span className="text-blue-600 font-medium">{failure.solutionCount} soluções</span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <Badge className={getStatusColor(failure.status)}>{failure.status}</Badge>
          <Badge className={getPriorityColor(failure.priority)}>{failure.priority}</Badge>
        </div>

        <Link href={`/falhas/${failure.id}`}>
          <Button variant="outline" className="w-full" size="sm">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
