import React from 'react'

interface Props {
  children: React.ReactNode
}


const LayoutEmpty = ({ children }: Props) => {
  return (
    <>
      <h1>Empty Layout</h1>
      {children}
    </>
  )

}

export default LayoutEmpty