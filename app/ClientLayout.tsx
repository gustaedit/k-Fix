"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [hasOrganization, setHasOrganization] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Verificar se há organização selecionada
    const selectedOrg = localStorage.getItem("selectedOrganization")
    if (!selectedOrg && pathname !== "/select-organization" && pathname !== "/login") {
      setHasOrganization(false)
      router.push("/select-organization")
    }
  }, [pathname, router])

  // Se não há organização e não está na página de seleção, não renderizar o layout principal
  if (!hasOrganization && pathname !== "/select-organization" && pathname !== "/login") {
    return (
      <html lang="pt-BR">
        <body className={inter.className}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Carregando...</p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  // Para páginas de login e seleção de organização, renderizar sem sidebar
  if (pathname === "/login" || pathname === "/select-organization") {
    return (
      <html lang="pt-BR">
        <body className={inter.className}>{children}</body>
      </html>
    )
  }

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
