import React from "react"

interface Props {
  children: React.ReactNode
}

const Headling2 = ({ children }: Props) => {
  return (
    <>
      <h2 className="text-gray-400 text-md">
        {children}
      </h2>
    </>
  )
}

export default Headling2