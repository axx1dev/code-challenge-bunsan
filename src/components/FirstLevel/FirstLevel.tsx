import React from 'react'
interface PropsLevel1 {
  title: string
  allocation: number
  classFather?: string
  classSon?: string
} 

const FirstLevel = ({title, allocation, classFather, classSon}: PropsLevel1) => {
  return (
    <h2 className={classFather}>-<span className={classSon}>{`${title} a $${allocation}`}</span></h2>
  )
}

export default FirstLevel