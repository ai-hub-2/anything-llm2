const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  // Add auth token if available
  const token = localStorage.getItem('token')
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Specific API functions
export const authAPI = {
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  logout: () => apiCall('/auth/logout', {
    method: 'POST'
  }),
  
  me: () => apiCall('/auth/me'),
  
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

export const workspaceAPI = {
  getAll: () => apiCall('/workspaces'),
  
  getById: (id) => apiCall(`/workspaces/${id}`),
  
  create: (data) => apiCall('/workspaces', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  update: (id, data) => apiCall(`/workspaces/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  delete: (id) => apiCall(`/workspaces/${id}`, {
    method: 'DELETE'
  })
}

export const chatAPI = {
  sendMessage: (workspaceId, message) => apiCall(`/workspaces/${workspaceId}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message })
  }),
  
  getHistory: (workspaceId) => apiCall(`/workspaces/${workspaceId}/chat/history`),
  
  clearHistory: (workspaceId) => apiCall(`/workspaces/${workspaceId}/chat/history`, {
    method: 'DELETE'
  })
}

export const documentAPI = {
  upload: (workspaceId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return apiCall(`/workspaces/${workspaceId}/documents`, {
      method: 'POST',
      body: formData,
      headers: {} // Remove Content-Type to let browser set it with boundary
    })
  },
  
  getAll: (workspaceId) => apiCall(`/workspaces/${workspaceId}/documents`),
  
  delete: (workspaceId, documentId) => apiCall(`/workspaces/${workspaceId}/documents/${documentId}`, {
    method: 'DELETE'
  })
}

export const settingsAPI = {
  get: () => apiCall('/settings'),
  
  update: (settings) => apiCall('/settings', {
    method: 'PUT',
    body: JSON.stringify(settings)
  })
}