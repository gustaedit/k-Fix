"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wrench,
  Calendar,
  User,
  Star,
  ThumbsUp,
  MessageSquare,
  Edit,
  Share,
  ArrowLeft,
  Bug,
  Copy,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { getSolutionById, getFailureById } from "@/lib/database"
import { notFound } from "next/navigation"

export default function SolutionDetail({ params }: { params: { id: string } }) {
  const solutionId = Number.parseInt(params.id)
  const solution = getSolutionById(solutionId)

  if (!solution) {
    notFound()
  }

  const relatedFailure = getFailureById(solution.relatedFailureId)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const copyCode = () => {
    if (solution.code) {
      navigator.clipboard.writeText(solution.code)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/solucoes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{solution.title}</h1>
          <p className="text-gray-600">Detalhes da solução #{solution.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Solution Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{solution.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {solution.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {solution.author.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(solution.effectiveness)}
                      <span className="ml-2 font-medium">{solution.effectiveness}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{solution.likes} curtidas</span>
                    </div>
                    <span className="text-gray-500">{solution.uses} usos</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Related Failure */}
              {relatedFailure && (
                <div>
                  <h3 className="font-semibold mb-2">Falha Relacionada</h3>
                  <Link href={`/falhas/${relatedFailure.id}`}>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bug className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium">{relatedFailure.title}</p>
                          <p className="text-sm text-gray-500">{relatedFailure.description.substring(0, 100)}...</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Descrição da Solução</h3>
                <p className="text-gray-700">{solution.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {solution.code && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Código da Solução</h3>
                    <Button variant="outline" size="sm" onClick={copyCode}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{solution.code}</code>
                  </pre>
                </div>
              )}

              {solution.references && solution.references.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Referências</h3>
                  <div className="space-y-2">
                    {solution.references.map((ref, index) => (
                      <a
                        key={index}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-600">{ref.description}</p>
                          <p className="text-sm text-gray-500">{ref.url}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Autor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={solution.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {solution.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{solution.author.name}</p>
                  <p className="text-sm text-gray-500">{solution.author.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Eficácia</span>
                <div className="flex items-center gap-1">
                  {renderStars(solution.effectiveness)}
                  <span className="ml-1 font-medium">{solution.effectiveness}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Curtidas</span>
                <span className="font-medium">{solution.likes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Usos</span>
                <span className="font-medium">{solution.uses}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Curtir ({solution.likes})
              </Button>
              <Button className="w-full" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Comentar
              </Button>
              <Button className="w-full" variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Favoritar
              </Button>
            </CardContent>
          </Card>

          {/* Related Solutions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Soluções Similares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Authentication State Fix</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(4.4)}
                    <span className="text-xs text-gray-500 ml-1">4.4</span>
                  </div>
                  <p className="text-xs text-gray-500">29 usos</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Token Validation Fix</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(4.6)}
                    <span className="text-xs text-gray-500 ml-1">4.6</span>
                  </div>
                  <p className="text-xs text-gray-500">33 usos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
