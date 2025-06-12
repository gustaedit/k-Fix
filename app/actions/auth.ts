"use server"

import { registerUser, loginUser, logoutUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

// Schemas de validação
const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
})

export async function registerAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validar dados
    const validatedData = registerSchema.parse(rawData)

    // Registrar usuário
    const result = await registerUser(validatedData)

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      }
    }

    // Redirecionar para dashboard após sucesso
    redirect("/select-organization")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    console.error("Erro na ação de registro:", error)
    return {
      success: false,
      error: "Erro interno. Tente novamente.",
    }
  }
}

export async function loginAction(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validar dados
    const validatedData = loginSchema.parse(rawData)

    // Fazer login
    const result = await loginUser(validatedData)

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      }
    }

    // Redirecionar para dashboard após sucesso
    redirect("/select-organization")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    console.error("Erro na ação de login:", error)
    return {
      success: false,
      error: "Erro interno. Tente novamente.",
    }
  }
}

export async function logoutAction() {
  await logoutUser()
}
