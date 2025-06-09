"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Bug, Wrench, Star, ThumbsUp, Calendar, User } from "lucide-react"
import { failures, solutions, searchFailures, searchSolutions, type Failure, type Solution } from "@/lib/database"
import Link from "next/link"

type SearchResult = (Failure & { type: "failure" }) | (Solution & { type: "solution" })

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Se não há termo de busca, mostrar todos os resultados
      const allFailures: SearchResult[] = failures.map((f) => ({ ...f, type: "failure" as const }))
      const allSolutions: SearchResult[] = solutions.map((s) => ({ ...s, type: "solution" as const }))
      setSearchResults([...allFailures, ...allSolutions])
    } else {
      const failureResults: SearchResult[] = searchFailures(searchTerm).map((f) => ({ ...f, type: "failure" as const }))
      const solutionResults: SearchResult[] = searchSolutions(searchTerm).map((s) => ({
        ...s,
        type: "solution" as const,
      }))
      setSearchResults([...failureResults, ...solutionResults])
    }
  }, [searchTerm])

  const filteredResults = searchResults.filter((result) => {
    if (activeTab === "failures") return result.type === "failure"
    if (activeTab === "solutions") return result.type === "solution"
    return true
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Busca Avançada</h1>
        <p className="text-gray-600">Encontre falhas e soluções rapidamente</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por palavra-chave, código de erro, tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Código de Erro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="404">404 - Not Found</SelectItem>
                  <SelectItem value="500">500 - Internal Error</SelectItem>
                  <SelectItem value="401">401 - Unauthorized</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tecnologia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="nodejs">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Falha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="authentication">Autenticação</SelectItem>
                  <SelectItem value="database">Banco de Dados</SelectItem>
                  <SelectItem value="network">Rede</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Avaliação da Solução" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta (4-5 estrelas)</SelectItem>
                  <SelectItem value="medium">Média (3-4 estrelas)</SelectItem>
                  <SelectItem value="low">Baixa (1-3 estrelas)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
          Todos ({searchResults.length})
        </Button>
        <Button variant={activeTab === "failures" ? "default" : "outline"} onClick={() => setActiveTab("failures")}>
          <Bug className="w-4 h-4 mr-2" />
          Falhas ({searchResults.filter((r) => r.type === "failure").length})
        </Button>
        <Button variant={activeTab === "solutions" ? "default" : "outline"} onClick={() => setActiveTab("solutions")}>
          <Wrench className="w-4 h-4 mr-2" />
          Soluções ({searchResults.filter((r) => r.type === "solution").length})
        </Button>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={`${result.type}-${result.id}`} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    result.type === "failure" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  {result.type === "failure" ? <Bug className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{result.title}</h3>
                      <p className="text-gray-600 mt-1">{result.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {result.type === "failure" ? "Falha" : "Solução"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {result.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {result.author?.name || "Autor não informado"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {result.type === "failure" && (
                        <>
                          <Badge
                            variant={(result as Failure).status === "Open" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {(result as Failure).status}
                          </Badge>
                          <Badge
                            variant={(result as Failure).priority === "Critical" ? "destructive" : "default"}
                            className="text-xs"
                          >
                            {(result as Failure).priority}
                          </Badge>
                          <span>{(result as Failure).solutionCount} soluções</span>
                        </>
                      )}
                      {result.type === "solution" && (
                        <>
                          <div className="flex items-center gap-1">
                            {renderStars((result as Solution).effectiveness)}
                            <span className="ml-1">{(result as Solution).effectiveness}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {(result as Solution).likes}
                          </div>
                          <span>{(result as Solution).uses} usos</span>
                        </>
                      )}
                    </div>

                    <Link href={result.type === "failure" ? `/falhas/${result.id}` : `/solucoes/${result.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredResults.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-600">Tente ajustar seus filtros ou usar palavras-chave diferentes</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
