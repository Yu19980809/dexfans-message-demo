import { Toaster } from 'react-hot-toast'

import { ThemeProvider } from './theme'
import { AuthProvider } from './auth'

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Providers
