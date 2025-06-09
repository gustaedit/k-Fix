"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { FailureCard } from "@/components/cards/failure-card"
import { Pagination } from "@/components/ui/pagination"
import { TagInput } from "@/components/ui/tag-input"
import { failures, searchFailures, type Failure } from "@/lib/database"
import { useSearchParams } from "next/navigation"
import { Bug } from "lucide-react" // Import Bug component

export default function FailuresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all") // Updated default value
  const [priorityFilter, setPriorityFilter] = useState("all") // Updated default value
  const [authorFilter, setAuthorFilter] = useState("")
  const [periodFilter, setPeriodFilter] = useState("all") // Updated default value
  const [sortBy, setSortBy] = useState("date-desc")
  const [filteredFailures, setFilteredFailures] = useState<Failure[]>(failures)

  const searchParams = useSearchParams()

  useEffect(() => {
    // Aplicar filtro inicial baseado nos parâmetros da URL
    const sortParam = searchParams.get("sortBy")
    if (sortParam) {
      setSortBy(sortParam)
    }
  }, [searchParams])

  useEffect(() => {
    let result = searchFailures(searchTerm, selectedTags)

    // Aplicar filtros adicionais
    if (statusFilter !== "all") {
      result = result.filter((failure) => failure.status === statusFilter)
    }
    if (priorityFilter !== "all") {
      result = result.filter((failure) => failure.priority === priorityFilter)
    }
    if (authorFilter) {
      result = result.filter((failure) => failure.author.name.toLowerCase().includes(authorFilter.toLowerCase()))
    }
    if (periodFilter !== "all") {
      const now = new Date()
      const days = periodFilter === "7days" ? 7 : periodFilter === "30days" ? 30 : 90
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      result = result.filter((failure) => failure.createdAt >= cutoff)
    }

    // Aplicar ordenação
    switch (sortBy) {
      case "date-desc":
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "date-asc":
        result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        break
      case "priority":
        const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
        result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        break
      case "status":
        result.sort((a, b) => a.status.localeCompare(b.status))
        break
    }

    setFilteredFailures(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedTags, statusFilter, priorityFilter, authorFilter, periodFilter, sortBy])

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
  const totalPages = Math.ceil(filteredFailures.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentFailures = filteredFailures.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Falhas</h1>
          <p className="text-gray-600">Explore e gerencie todas as falhas registradas</p>
        </div>
        <Link href="/falhas/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Falha
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
                  placeholder="Buscar falhas..."
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Open">Aberto</SelectItem>
                      <SelectItem value="In Analysis">Em Análise</SelectItem>
                      <SelectItem value="Resolved">Resolvido</SelectItem>
                      <SelectItem value="Closed">Fechado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Critical">Crítica</SelectItem>
                      <SelectItem value="High">Alta</SelectItem>
                      <SelectItem value="Medium">Média</SelectItem>
                      <SelectItem value="Low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input placeholder="Autor" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} />

                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger>
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
          Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFailures.length)} de{" "}
          {filteredFailures.length} falhas
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Mais recentes</SelectItem>
            <SelectItem value="date-asc">Mais antigas</SelectItem>
            <SelectItem value="priority">Prioridade</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Failures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFailures.map((failure) => (
          <FailureCard key={failure.id} failure={failure} />
        ))}
      </div>

      {/* No Results */}
      {filteredFailures.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bug className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma falha encontrada</h3>
            <p className="text-gray-600">Tente ajustar seus filtros ou criar uma nova falha</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
