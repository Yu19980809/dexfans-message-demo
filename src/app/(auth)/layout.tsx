import AuthFooter from '@/components/auth/footer'

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col h-full max-w-6xl mx-auto">
      <div className="flex justify-center flex-1">
        {children}
      </div>

      <AuthFooter />
    </div>
  )
}

export default AuthLayout
