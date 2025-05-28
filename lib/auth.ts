// Simple authentication system for demo purposes
// In a real app, you'd use NextAuth.js or similar

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("current-user")
  return stored ? JSON.parse(stored) : null
}

export const login = (email: string, password: string): User | null => {
  // Simple demo login - in real app, this would validate against a database
  if (email && password) {
    const user: User = {
      id: Date.now().toString(),
      username: email.split("@")[0],
      email,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("current-user", JSON.stringify(user))
    return user
  }
  return null
}

export const logout = () => {
  localStorage.removeItem("current-user")
  window.location.href = "/"
}

export const signup = (email: string, password: string, username: string): User | null => {
  // Simple demo signup - in real app, this would create a user in the database
  if (email && password && username) {
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("current-user", JSON.stringify(user))
    return user
  }
  return null
}
