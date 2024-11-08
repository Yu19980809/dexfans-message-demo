'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthClient } from '@dfinity/auth-client'

import { canisterId, createActor } from '@/declarations/internet_identity'

const AuthContext = createContext({
  isAuth: false,
  authClient: null,
  identity: null,
  principal: null,
  actor: null,
  login: () => {},
  logout: () => {},
  setIsAuth: (status: boolean) => {}
})

const identityProvider = process.env.DFX_NETWORK === 'ic'
  ? 'https://identity.ic0.app'
  : `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true
    }
  },
  loginOptions: {
    identityProvider
  }
}

export const useAuthClient = (options = defaultOptions) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authClient, setAuthClient] = useState(null)
  const [identity, setIdentity] = useState<any>(null)
  const [principal, setPrincipal] = useState<any>(null)
  const [actor, setActor] = useState(null)

  useEffect(() => {
    AuthClient.create(options.createOptions)
      .then(async (client) => updateClient(client))
  }, [])


  const updateClient = async (client: any) => {
    const isAuthenticated = await client.isAuthenticated()
    const identity = client.getIdentity()
    const principal = await identity.getPrincipal()

    setIsAuth(isAuthenticated)
    setIdentity(identity)
    setPrincipal(principal)
    setAuthClient(client)

    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    })

    // @ts-ignore
    setActor(actor)
  }

  const login = () => {
    // @ts-ignore
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => updateClient(authClient)
    })
  }

  const logout = async () => {
    // @ts-ignore
    await authClient?.logout()
    await updateClient(authClient)
  }

  return {
    isAuth,
    authClient,
    identity,
    principal,
    actor,
    login,
    logout,
    setIsAuth
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthClient()

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
