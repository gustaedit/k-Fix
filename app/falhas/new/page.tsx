"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import Link from "next/link"

export default function NewFailure() {
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState("")

  const addTechnology = () => {
    if (newTech && !technologies.includes(newTech)) {
      setTechnologies([...technologies, newTech])
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cadastrar Nova Falha</h1>
        <p className="text-gray-600">Registre uma nova falha no sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Falha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Falha *</Label>
              <Input id="title" placeholder="Ex: Erro de autenticação no login" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Contexto da Falha</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o contexto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Desenvolvimento</SelectItem>
                  <SelectItem value="testing">Teste</SelectItem>
                  <SelectItem value="staging">Homologação</SelectItem>
                  <SelectItem value="production">Produção</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição Detalhada *</Label>
            <Textarea
              id="description"
              placeholder="Descreva detalhadamente o problema encontrado..."
              className="min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="expected">Comportamento Esperado</Label>
              <Textarea id="expected" placeholder="O que deveria acontecer..." className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observed">Comportamento Observado</Label>
              <Textarea id="observed" placeholder="O que realmente aconteceu..." className="min-h-[100px]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stacktrace">Stack Trace (Opcional)</Label>
            <Textarea
              id="stacktrace"
              placeholder="Cole aqui o stack trace do erro..."
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput
              tags={technologies}
              onTagsChange={setTechnologies}
              placeholder="Ex: React, Node.js, Authentication"
              suggestions={[
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
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="criticality">Criticidade</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a criticidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="critical">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Anexos (Opcional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Arraste arquivos aqui ou clique para selecionar</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, PDF até 10MB</p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/falhas">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button>Registrar Falha</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
