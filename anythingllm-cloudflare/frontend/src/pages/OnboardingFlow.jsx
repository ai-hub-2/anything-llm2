import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const OnboardingFlow = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text mb-6">
            {t('welcomeMessage')}
          </h1>
          <p className="text-gray-400 mb-8">
            {t('onboardingDescription')}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            {t('getStarted')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow