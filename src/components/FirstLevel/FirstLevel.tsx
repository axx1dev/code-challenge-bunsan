import { PropsLevel } from "../../interfaces/index"

const FirstLevel = ({title, allocation, classFather, classSon}: PropsLevel) => {
  return (
    <h2 className={classFather}>-<span className={classSon}>{`${title} a $${allocation}`}</span></h2>
  )
}

export default FirstLevel