import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { chatAPI, workspaceAPI } from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

const WorkspaceChat = () => {
  const { workspaceId } = useParams()
  const [workspace, setWorkspace] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  
  const { t } = useTranslation()
  const { user } = useAuth()
  const { showError, showSuccess } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspace()
      fetchChatHistory()
    }
  }, [workspaceId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchWorkspace = async () => {
    try {
      const response = await workspaceAPI.getById(workspaceId)
      if (response.success) {
        setWorkspace(response.workspace)
      } else {
        showError(t('workspaceNotFound'))
        navigate('/')
      }
    } catch (error) {
      showError(t('networkError'))
      navigate('/')
    }
  }

  const fetchChatHistory = async () => {
    try {
      const response = await chatAPI.getHistory(workspaceId)
      if (response.success) {
        setMessages(response.messages || [])
      }
    } catch (error) {
      showError(t('networkError'))
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    const messageText = newMessage.trim()
    setNewMessage('')
    setIsSending(true)
    setIsTyping(true)

    // Add user message to UI immediately
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await chatAPI.sendMessage(workspaceId, messageText)
      
      if (response.success) {
        // Add AI response
        const aiMessage = {
          id: Date.now() + 1,
          text: response.message,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        showError(response.error || t('messageError'))
      }
    } catch (error) {
      showError(t('networkError'))
    } finally {
      setIsSending(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (isLoading) {
    return <LoadingSpinner text={t('loadingWorkspace')} />
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Header */}
      <nav className="navbar flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="btn btn-ghost"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">
              {workspace?.name || t('workspace')}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/settings')}
              className="btn btn-outline"
            >
              {t('settings')}
            </button>
          </div>
        </div>
      </nav>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto chat-container px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-300">
                {t('noMessages')}
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {t('startConversation')}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`chat-bubble ${
                    message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-bubble chat-bubble-ai">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <span className="ml-2 text-sm">{t('aiTyping')}</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t border-slate-700 p-4">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('typingMessage')}
                className="textarea resize-none"
                rows="1"
                disabled={isSending}
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className="btn btn-primary"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkspaceChat