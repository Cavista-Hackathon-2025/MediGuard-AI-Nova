import axios, { type AxiosError } from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and user data
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // Redirect to login page
      window.location.href = "/auth"
    }
    return Promise.reject(error)
  },
)

// API functions
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    await api.post("/auth/logout")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Logout error:", error)
    // Still remove token and user data even if the API call fails
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile")
    return response.data
  } catch (error) {
    throw error
  }
}

export const createAccount = async (fullName: string, email: string, password: string, phoneNumber: string) => {
    try {
      const response = await api.post("/auth/register", { fullName, email, password, phoneNumber })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      throw error
    }
  }

// Add more API functions as needed

export default api

