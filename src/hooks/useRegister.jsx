// import { useState } from 'react'
// import { useUserContext } from './useUserContext'
// import axios from 'axios'
// import { backendLink } from '../constants/constants'
// import { useNavigation } from '@react-navigation/native'

// export const useRegister = () => {
//     const [error, setError] = useState("")
//     const { dispatch } = useUserContext()
//     const navigate = useNavigation()

//     const register = async (name, email, password) => {
//         setError(null)
//         const user = { name, email, password }
//         try {
//             await axios.post(`${backendLink}/user/register`, user)
//             navigate.navigate(`/verify/${email}`)
//             localStorage.setItem('user', JSON.stringify(user))
//             dispatch({ type: 'LOGIN', payload: { name, email } })
//         } catch (error) {
//             setError(error.response.data.error);
//         }
//     }

//     return { register, error }
// }