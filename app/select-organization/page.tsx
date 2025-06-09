"use client"

import { OrganizationSelector } from "@/components/organization-selector"
import { useRouter } from "next/navigation"

export default function SelectOrganization() {
  const router = useRouter()

  const organizations = [
    {
      id: 1,
      name: "Tech Innovators Inc.",
      description: "A leading software development firm specializing in cloud solutions.",
      members: 45,
      failures: 127,
      solutions: 89,
      role: "Admin",
    },
    {
      id: 2,
      name: "Global Solutions Group",
      description: "A multinational corporation providing IT services and consulting.",
      members: 78,
      failures: 203,
      solutions: 156,
      role: "Member",
    },
    {
      id: 3,
      name: "Digital Frontier Enterprises",
      description: "An innovative startup focused on AI and machine learning applications.",
      members: 23,
      failures: 67,
      solutions: 45,
      role: "Developer",
    },
  ]

  const handleSelectOrganization = (org: any) => {
    // Aqui você salvaria a organização selecionada no contexto/localStorage
    localStorage.setItem("selectedOrganization", JSON.stringify(org))
    router.push("/")
  }

  return <OrganizationSelector organizations={organizations} onSelectOrganization={handleSelectOrganization} />
}
