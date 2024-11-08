import React from 'react'

type Props = {
  label?: string
}

const ErrorTemplate = ({ label = 'Somthing went wrong' }: Props) => {
  return (
    <div className="flex justify-center items-center w-full h-full font-semibold text-muted-foreground">
      {label}
    </div>
  )
}

export default ErrorTemplate
