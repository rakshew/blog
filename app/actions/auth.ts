"use server"

import { auth } from "@/lib/auth/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

type AuthResult = { error?: string }
type AuthDestination = "/" | "/admin"

type AuthErrorLike = {
  name?: string
  code?: string
  message?: string
  status?: number
  statusCode?: number
}

function describeAuthError(error: unknown) {
  const value = error as AuthErrorLike
  return {
    name: value?.name,
    code: value?.code,
    message: value?.message || "Unknown authentication error",
    status: value?.status ?? value?.statusCode,
  }
}

function getAuthMessage(error: unknown) {
  const value = error as AuthErrorLike
  return value?.message || "Authentication failed"
}

async function logAuthRequestOrigin() {
  const requestHeaders = await headers()
  console.error("Neon auth request origin diagnostic", {
    origin: requestHeaders.get("origin"),
    host: requestHeaders.get("host"),
    forwardedHost: requestHeaders.get("x-forwarded-host"),
    forwardedProto: requestHeaders.get("x-forwarded-proto"),
  })
}

export async function signInAction({
  email,
  password,
  destination,
  operation = "sign-in",
}: {
  email: string
  password: string
  destination: AuthDestination
  operation?: string
}): Promise<AuthResult> {
  if (destination !== "/" && destination !== "/admin") {
    return { error: "Invalid authentication destination" }
  }

  try {
    await logAuthRequestOrigin()
    const result = await auth.signIn.email({ email, password })
    if (result.error) {
      console.error("Neon Auth error", { operation, ...describeAuthError(result.error) })
      return { error: getAuthMessage(result.error) }
    }
  } catch (error) {
    console.error("Neon Auth error", { operation, ...describeAuthError(error) })
    return { error: getAuthMessage(error) }
  }

  redirect(destination)
}

export async function signUpAction({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}): Promise<AuthResult> {
  try {
    await logAuthRequestOrigin()
    const result = await auth.signUp.email({ name, email, password })
    if (result.error) {
      console.error("Neon Auth error", { operation: "sign-up", ...describeAuthError(result.error) })
      return { error: getAuthMessage(result.error) }
    }
  } catch (error) {
    console.error("Neon Auth error", { operation: "sign-up", ...describeAuthError(error) })
    return { error: getAuthMessage(error) }
  }

  redirect("/login?registered=1")
}
