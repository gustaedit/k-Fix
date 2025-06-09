import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Star, Calendar, User, ThumbsUp } from "lucide-react"
import Link from "next/link"

interface SolutionCardProps {
  solution: {
    id: number
    title: string
    description: string
    tags: string[]
    effectiveness: number
    relatedFailure: string
    date: string
    author?: {
      name: string
      avatar?: string
      role: string
    }
    likes?: number
  }
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Wrench className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{solution.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{solution.description}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">Relacionado a:</p>
          <Badge variant="outline">{solution.relatedFailure}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {solution.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {renderStars(solution.effectiveness)}
            <span className="text-sm text-gray-600 ml-1">{solution.effectiveness.toFixed(1)}</span>
          </div>
          {solution.likes !== undefined && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4" />
              {solution.likes}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {solution.date}
          </div>
          {solution.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {solution.author.name}
            </div>
          )}
        </div>

        <Link href={`/solucoes/${solution.id}`}>
          <Button variant="outline" className="w-full" size="sm">
            Ver Solução
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
