"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bug, Calendar, User, Star, ThumbsUp, MessageSquare, Edit, Share, ArrowLeft, Wrench } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/ui/pagination"
import { getFailureById, getSolutionsByFailureId } from "@/lib/database"
import { notFound } from "next/navigation"

export default function FailureDetail({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1)

  const failureId = Number.parseInt(params.id)
  const failure = getFailureById(failureId)
  const solutions = getSolutionsByFailureId(failureId)

  if (!failure) {
    notFound()
  }

  const itemsPerPage = 5
  const totalPages = Math.ceil(solutions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSolutions = solutions.slice(startIndex, startIndex + itemsPerPage)

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/falhas">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{failure.title}</h1>
          <p className="text-gray-600">Detalhes da falha #{failure.id}</p>
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
          {/* Failure Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Bug className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{failure.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {failure.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {failure.author.name}
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge className={getStatusColor(failure.status)}>{failure.status}</Badge>
                    <Badge className={getPriorityColor(failure.priority)}>{failure.priority}</Badge>
                    <Badge variant="outline">{failure.context}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">{failure.description}</p>
              </div>

              {failure.expectedBehavior && failure.observedBehavior && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Comportamento Esperado</h3>
                    <p className="text-gray-700 text-sm">{failure.expectedBehavior}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Comportamento Observado</h3>
                    <p className="text-gray-700 text-sm">{failure.observedBehavior}</p>
                  </div>
                </div>
              )}

              {failure.stackTrace && (
                <div>
                  <h3 className="font-semibold mb-2">Stack Trace</h3>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">{failure.stackTrace}</pre>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {failure.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {failure.attachments && failure.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Anexos</h3>
                  <div className="space-y-2">
                    {failure.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{attachment.name}</span>
                        <span className="text-xs text-gray-500">({attachment.size})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Solutions Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Soluções Relacionadas ({solutions.length})
                </CardTitle>
                <Link href="/solucoes/new">
                  <Button size="sm">Adicionar Solução</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSolutions.map((solution) => (
                  <div key={solution.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Wrench className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{solution.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{solution.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {solution.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(solution.effectiveness)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1">{solution.effectiveness}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {solution.likes}
                            </div>
                            <span>{solution.date}</span>
                          </div>
                          <Link href={`/solucoes/${solution.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Solução
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {solutions.length > itemsPerPage && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}

                {solutions.length === 0 && (
                  <div className="text-center py-8">
                    <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma solução encontrada</h3>
                    <p className="text-gray-600 mb-4">Seja o primeiro a contribuir com uma solução para esta falha</p>
                    <Link href="/solucoes/new">
                      <Button>Adicionar Solução</Button>
                    </Link>
                  </div>
                )}
              </div>
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
                  <AvatarImage src={failure.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {failure.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{failure.author.name}</p>
                  <p className="text-sm text-gray-500">{failure.author.role}</p>
                </div>
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
                Útil (12)
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

          {/* Related Failures */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Falhas Similares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Token Expiration Error</h4>
                  <p className="text-xs text-gray-500">2 soluções</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Session Management Issue</h4>
                  <p className="text-xs text-gray-500">1 solução</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
