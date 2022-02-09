import { createContext, useContext, useReducer } from  "react"
import PropTypes from 'prop-types'

const AuthContext = createContext([{}, () => {}])
const initialState = {user: null, loading: true, isAuthenticated: false}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AuthContext.Provider value={[state, dispatch]}>
    { children }
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
