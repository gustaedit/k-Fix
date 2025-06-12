"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { registerAction } from "@/app/actions/auth"
import { useActionState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"

export default function Register() {
  const [state, action, isPending] = useActionState(registerAction, null)

  return (
    <div className="min-h-screen flex">
      {/* Left side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="font-bold text-2xl">K-Fix</span>
            </div>
            <CardTitle className="text-2xl">Criar Conta</CardTitle>
            <p className="text-gray-600">Preencha os dados para criar sua conta</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {state?.error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4" />
                {state.error}
              </div>
            )}

            <form action={action} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  disabled={isPending}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>

            <Button variant="outline" className="w-full" disabled={isPending}>
              Cadastrar com Google
            </Button>
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-8">
        <div className="text-center text-white">
          <Image
            src="/images/hero-illustration.png"
            alt="K-Fix Illustration"
            width={600}
            height={400}
            className="mx-auto mb-8 rounded-lg"
          />
          <h2 className="text-3xl font-bold mb-4">Join our community</h2>
          <p className="text-xl opacity-90">
            Comece a colaborar com sua equipe para resolver problemas de forma mais eficiente.
          </p>
        </div>
      </div>
    </div>
  )
}
