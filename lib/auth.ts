
export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

// Store users in localStorage to persist them
const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("skincare-users")
  return stored ? JSON.parse(stored) : []
}

const saveUser = (user: User) => {
  const users = getStoredUsers()
  const existingUserIndex = users.findIndex((u) => u.email === user.email)

  if (existingUserIndex >= 0) {
    // Update existing user
    users[existingUserIndex] = user
  } else {
    // Add new user
    users.push(user)
  }

  localStorage.setItem("skincare-users", JSON.stringify(users))
}

const findUserByEmail = (email: string): User | null => {
  const users = getStoredUsers()
  return users.find((user) => user.email === email) || null
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("current-user")
  return stored ? JSON.parse(stored) : null
}

export const login = (email: string, password: string): User | null => {
  // Check if user already exists
  const existingUser = findUserByEmail(email)

  if (existingUser) {
    // User exists, log them in
    localStorage.setItem("current-user", JSON.stringify(existingUser))
    return existingUser
  } else {
    // New user, create account
    if (email && password) {
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: email.split("@")[0],
        email,
        createdAt: new Date().toISOString(),
      }

      // Save user to persistent storage
      saveUser(user)

      // Set as current user
      localStorage.setItem("current-user", JSON.stringify(user))
      return user
    }
  }
  return null
}

export const logout = () => {
  localStorage.removeItem("current-user")
  window.location.href = "/"
}

export const signup = (email: string, password: string, username: string): User | null => {
  // Check if user already exists
  const existingUser = findUserByEmail(email)

  if (existingUser) {
    // User already exists, return null to indicate signup failed
    return null
  }

  if (email && password && username) {
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username,
      email,
      createdAt: new Date().toISOString(),
    }

    // Save user to persistent storage
    saveUser(user)

    // Set as current user
    localStorage.setItem("current-user", JSON.stringify(user))
    return user
  }
  return null
}

// Helper function to check if email is already registered
export const isEmailRegistered = (email: string): boolean => {
  return findUserByEmail(email) !== null
}
