import { useContext } from "react"
import { LangContext } from "context/langContext"

const useLang = () => useContext(LangContext)

export default useLang
