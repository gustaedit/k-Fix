import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_BASE_URL = "https://51pq3s0pbc.execute-api.us-east-1.amazonaws.com"

export interface AuthResponse {
  data: {
    token: string
    refreshToken: string
  }
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

// Configurações dos cookies
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
}

const TOKEN_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24, // 24 horas
}

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24 * 3, // 3 dias
}

export async function registerUser(data: RegisterData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.message || "Erro ao criar conta. Tente novamente.",
      }
    }

    const authResponse: AuthResponse = await response.json()

    // Definir cookies seguros
    const cookieStore = await cookies()
    cookieStore.set("auth-token", authResponse.data.token, TOKEN_COOKIE_OPTIONS)
    cookieStore.set("refresh-token", authResponse.data.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS)

    return { success: true }
  } catch (error) {
    console.error("Erro no registro:", error)
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    }
  }
}

export async function loginUser(data: LoginData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.message || "Email ou senha incorretos.",
      }
    }

    const authResponse: AuthResponse = await response.json()

    // Definir cookies seguros
    const cookieStore = await cookies()
    cookieStore.set("auth-token", authResponse.data.token, TOKEN_COOKIE_OPTIONS)
    cookieStore.set("refresh-token", authResponse.data.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS)

    return { success: true }
  } catch (error) {
    console.error("Erro no login:", error)
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    }
  }
}

export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("refresh-token")
  redirect("/login")
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value || null
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("refresh-token")?.value || null
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken()
  return !!token
}

// Middleware para verificar autenticação
export async function requireAuth() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect("/login")
  }
}
