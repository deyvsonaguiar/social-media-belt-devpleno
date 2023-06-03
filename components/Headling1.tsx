import React from "react"

interface Props {
  children: React.ReactNode
}

const Headling1 = ({ children }: Props) => {
  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        {children}
      </h1>
    </>
  )
}

export default Headling1