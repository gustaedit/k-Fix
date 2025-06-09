"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Upload, Star } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import Link from "next/link"

export default function NewSolution() {
  const [references, setReferences] = useState([{ url: "", description: "" }])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [effectiveness, setEffectiveness] = useState(0)

  const addReference = () => {
    setReferences([...references, { url: "", description: "" }])
  }

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index))
  }

  const updateReference = (index: number, field: string, value: string) => {
    const updated = references.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref))
    setReferences(updated)
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Adicionar Solução para Falha</h1>
        <p className="text-gray-600">Network Connection Error</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Solução</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="failure">Falha Relacionada *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a falha relacionada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network-error">Network Connection Error</SelectItem>
                <SelectItem value="login-failure">Login Authentication Failure</SelectItem>
                <SelectItem value="database-timeout">Database Connection Timeout</SelectItem>
                <SelectItem value="api-error">API Response Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Descrição da Solução (Passo a Passo) *</Label>
            <Textarea
              id="solution"
              placeholder="Descreva detalhadamente os passos para resolver o problema..."
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Links para Referências/Documentação</Label>
            {references.map((ref, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="URL"
                    value={ref.url}
                    onChange={(e) => updateReference(index, "url", e.target.value)}
                  />
                  <Input
                    placeholder="Descrição"
                    value={ref.description}
                    onChange={(e) => updateReference(index, "description", e.target.value)}
                  />
                </div>
                {references.length > 1 && (
                  <Button variant="outline" size="icon" onClick={() => removeReference(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addReference}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Link
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Eficácia da Solução</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= effectiveness ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                  onClick={() => setEffectiveness(star)}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {effectiveness > 0 ? `${effectiveness}/5` : "Não avaliado"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags/Palavras-chave (Opcional)</Label>
            <TagInput
              tags={tags}
              onTagsChange={setTags}
              placeholder="Ex: networking, connectivity, authentication"
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
                "Frontend",
                "Backend",
                "DevOps",
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label>Código da Solução (Opcional)</Label>
            <Textarea placeholder="Cole aqui o código da solução..." className="min-h-[120px] font-mono text-sm" />
          </div>

          <div className="space-y-2">
            <Label>Anexos de Arquivo (Opcional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Arraste e solte arquivos aqui</p>
              <p className="text-sm text-gray-500 mt-1">ou clique para escolher seus arquivos</p>
              <Button variant="outline" className="mt-4">
                Upload
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/solucoes">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button>Salvar Solução</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
