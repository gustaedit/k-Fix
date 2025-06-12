"use client"

import { Button } from "@/components/ui/button"
import { logoutAction } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function LogoutButton({ variant = "ghost", size = "sm", className }: LogoutButtonProps) {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant={variant} size={size} className={className}>
        <LogOut className="h-4 w-4 mr-2" />
        Sair
      </Button>
    </form>
  )
}
