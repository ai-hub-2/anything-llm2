import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { workspaceAPI } from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' })
  const [isCreating, setIsCreating] = useState(false)
  
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { showError, showSuccess } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  const fetchWorkspaces = async () => {
    try {
      const response = await workspaceAPI.getAll()
      setWorkspaces(response.workspaces || [])
    } catch (error) {
      showError(t('networkError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateWorkspace = async (e) => {
    e.preventDefault()
    setIsCreating(true)
    
    try {
      const response = await workspaceAPI.create(newWorkspace)
      if (response.success) {
        showSuccess(t('workspaceCreated'))
        setWorkspaces([...workspaces, response.workspace])
        setShowCreateModal(false)
        setNewWorkspace({ name: '', description: '' })
      } else {
        showError(response.error || t('serverError'))
      }
    } catch (error) {
      showError(t('networkError'))
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!window.confirm(t('confirmDelete'))) return
    
    try {
      const response = await workspaceAPI.delete(workspaceId)
      if (response.success) {
        showSuccess(t('workspaceDeleted'))
        setWorkspaces(workspaces.filter(w => w.id !== workspaceId))
      } else {
        showError(response.error || t('serverError'))
      }
    } catch (error) {
      showError(t('networkError'))
    }
  }

  if (isLoading) {
    return <LoadingSpinner text={t('loadingWorkspaces')} />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <nav className="navbar">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">
            {t('appTitle')}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              {t('welcome')}, {user?.name || user?.email}
            </span>
            <button
              onClick={() => navigate('/settings')}
              className="btn btn-outline"
            >
              {t('settings')}
            </button>
            <button
              onClick={logout}
              className="btn btn-secondary"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              {t('workspaces')}
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('createWorkspace')}
            </button>
          </div>

          {workspaces.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">
                {t('noWorkspaces')}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {t('getStartedCreateWorkspace')}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('createWorkspace')}
                </button>
              </div>
            </div>
          ) : (
            <div className="workspace-grid">
              {workspaces.map((workspace) => (
                <div key={workspace.id} className="card hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {workspace.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {workspace.description || t('noDescription')}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{t('lastModified')}: {new Date(workspace.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => navigate(`/workspace/${workspace.id}`)}
                        className="btn btn-primary btn-sm"
                      >
                        {t('open')}
                      </button>
                      <button
                        onClick={() => handleDeleteWorkspace(workspace.id)}
                        className="btn btn-destructive btn-sm"
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Workspace Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {t('createWorkspace')}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateWorkspace} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('workspaceName')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="input"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                  placeholder={t('enterWorkspaceName')}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('workspaceDescription')}
                </label>
                <textarea
                  id="description"
                  className="textarea"
                  rows="3"
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                  placeholder={t('enterWorkspaceDescription')}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="btn btn-primary"
                >
                  {isCreating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('creating')}
                    </div>
                  ) : (
                    t('create')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard