"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, Users, Bug, Wrench } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Organization {
  id: number
  name: string
  description: string
  members: number
  failures: number
  solutions: number
  role: string
}

interface OrganizationSelectorProps {
  organizations: Organization[]
  onSelectOrganization: (org: Organization) => void
}

export function OrganizationSelector({ organizations, onSelectOrganization }: OrganizationSelectorProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newOrgName, setNewOrgName] = useState("")
  const [newOrgDescription, setNewOrgDescription] = useState("")

  const handleCreateOrganization = () => {
    // Aqui seria feita a criação da organização
    console.log("Creating organization:", { name: newOrgName, description: newOrgDescription })
    setShowCreateDialog(false)
    setNewOrgName("")
    setNewOrgDescription("")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="font-bold text-3xl">K-Fix</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Selecione uma Organização</h1>
          <p className="text-gray-600">Escolha a organização para acessar o sistema</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {organizations.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{org.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {org.role}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{org.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">{org.members}</span>
                    </div>
                    <p className="text-xs text-gray-500">Membros</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Bug className="w-4 h-4 text-red-600" />
                      <span className="text-lg font-bold text-red-600">{org.failures}</span>
                    </div>
                    <p className="text-xs text-gray-500">Falhas</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Wrench className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600">{org.solutions}</span>
                    </div>
                    <p className="text-xs text-gray-500">Soluções</p>
                  </div>
                </div>

                <Button className="w-full" onClick={() => onSelectOrganization(org)}>
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Create New Organization Card */}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[280px]">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-gray-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Criar Nova Organização</h3>
                  <p className="text-gray-600 text-sm text-center">Configure uma nova organização para sua equipe</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Organização</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Nome da Organização</Label>
                  <Input
                    id="orgName"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="Ex: Minha Empresa Tech"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgDescription">Descrição</Label>
                  <Input
                    id="orgDescription"
                    value={newOrgDescription}
                    onChange={(e) => setNewOrgDescription(e.target.value)}
                    placeholder="Breve descrição da organização"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateOrganization}>Criar Organização</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
