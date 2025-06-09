"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { SolutionCard } from "@/components/cards/solution-card"
import { Pagination } from "@/components/ui/pagination"
import { TagInput } from "@/components/ui/tag-input"
import { solutions, searchSolutions, type Solution } from "@/lib/database"
import { useSearchParams } from "next/navigation"

export default function SolutionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [effectivenessFilter, setEffectivenessFilter] = useState("all")
  const [failureTypeFilter, setFailureTypeFilter] = useState("all")
  const [authorFilter, setAuthorFilter] = useState("")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [sortBy, setSortBy] = useState("effectiveness")
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>(solutions)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Aplicar filtro inicial baseado nos parâmetros da URL
    const sortParam = searchParams.get("sortBy")
    if (sortParam) {
      setSortBy(sortParam)
    }
  }, [searchParams])

  useEffect(() => {
    let result = searchSolutions(searchTerm, selectedTags)

    // Aplicar filtros adicionais
    if (effectivenessFilter !== "all") {
      const minEffectiveness = effectivenessFilter === "high" ? 4 : effectivenessFilter === "medium" ? 3 : 1
      const maxEffectiveness = effectivenessFilter === "high" ? 5 : effectivenessFilter === "medium" ? 4 : 3
      result = result.filter(
        (solution) => solution.effectiveness >= minEffectiveness && solution.effectiveness <= maxEffectiveness,
      )
    }
    if (failureTypeFilter !== "all") {
      result = result.filter((solution) =>
        solution.tags.some((tag) => tag.toLowerCase().includes(failureTypeFilter.toLowerCase())),
      )
    }
    if (authorFilter) {
      result = result.filter((solution) => solution.author.name.toLowerCase().includes(authorFilter.toLowerCase()))
    }
    if (periodFilter !== "all") {
      const now = new Date()
      const days = periodFilter === "7days" ? 7 : periodFilter === "30days" ? 30 : 90
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      result = result.filter((solution) => solution.createdAt >= cutoff)
    }

    // Aplicar ordenação
    switch (sortBy) {
      case "effectiveness":
        result.sort((a, b) => b.effectiveness - a.effectiveness)
        break
      case "uses":
        result.sort((a, b) => b.uses - a.uses)
        break
      case "date-desc":
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "date-asc":
        result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      case "likes":
        result.sort((a, b) => b.likes - a.likes)
        break
    }

    setFilteredSolutions(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedTags, effectivenessFilter, failureTypeFilter, authorFilter, periodFilter, sortBy])

  const tagSuggestions = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "PostgreSQL",
    "MongoDB",
    "API",
    "Authentication",
    "Database",
    "Network",
    "Performance",
    "Security",
    "Frontend",
    "Backend",
  ]

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSolutions = filteredSolutions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Soluções</h1>
          <p className="text-gray-600">Explore soluções eficazes para problemas comuns</p>
        </div>
        <Link href="/solucoes/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Solução
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar soluções..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>

            {showFilters && (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <TagInput
                    tags={selectedTags}
                    onTagsChange={setSelectedTags}
                    placeholder="Filtrar por tags..."
                    suggestions={tagSuggestions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={effectivenessFilter} onValueChange={setEffectivenessFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Eficácia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta (4-5★)</SelectItem>
                      <SelectItem value="medium">Média (3-4★)</SelectItem>
                      <SelectItem value="low">Baixa (1-3★)</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={failureTypeFilter} onValueChange={setFailureTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de Falha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="authentication">Autenticação</SelectItem>
                      <SelectItem value="database">Banco de Dados</SelectItem>
                      <SelectItem value="network">Rede</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input placeholder="Autor" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} />

                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="30days">Últimos 30 dias</SelectItem>
                      <SelectItem value="90days">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredSolutions.length)} de{" "}
          {filteredSolutions.length} soluções
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="effectiveness">Eficácia</SelectItem>
            <SelectItem value="uses">Mais usadas</SelectItem>
            <SelectItem value="date-desc">Mais recentes</SelectItem>
            <SelectItem value="date-asc">Mais antigas</SelectItem>
            <SelectItem value="likes">Mais curtidas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSolutions.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>

      {/* No Results */}
      {filteredSolutions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma solução encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus filtros ou criar uma nova solução</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
