import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  en: {
    translation: {
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      search: 'Search',
      
      // Authentication
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      
      // Dashboard
      dashboard: 'Dashboard',
      workspaces: 'Workspaces',
      createWorkspace: 'Create Workspace',
      workspaceName: 'Workspace Name',
      workspaceDescription: 'Workspace Description',
      
      // Chat
      chat: 'Chat',
      sendMessage: 'Send Message',
      typingMessage: 'Type your message...',
      
      // Documents
      documents: 'Documents',
      uploadDocument: 'Upload Document',
      dragAndDrop: 'Drag and drop files here, or click to select',
      
      // Settings
      settings: 'Settings',
      general: 'General',
      appearance: 'Appearance',
      theme: 'Theme',
      language: 'Language',
      
      // Admin
      admin: 'Admin',
      users: 'Users',
      analytics: 'Analytics',
      
      // Messages
      loginRequired: 'Please log in to continue',
      invalidCredentials: 'Invalid email or password',
      documentUploaded: 'Document uploaded successfully',
      documentDeleted: 'Document deleted successfully',
      workspaceCreated: 'Workspace created successfully',
      workspaceUpdated: 'Workspace updated successfully',
      workspaceDeleted: 'Workspace deleted successfully',
      
      // Errors
      networkError: 'Network error. Please check your connection.',
      serverError: 'Server error. Please try again later.',
      fileUploadError: 'Failed to upload file. Please try again.',
      
      // App specific
      appTitle: 'AnythingLLM',
      appDescription: 'Chat with your documents using AI',
      welcomeMessage: 'Welcome to AnythingLLM',
      getStarted: 'Get Started',
      
      // Placeholders
      selectWorkspace: 'Select a workspace to start chatting',
      noDocuments: 'No documents uploaded yet',
      noWorkspaces: 'No workspaces created yet',
      
      // Navigation
      home: 'Home',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      
      // File types
      supportedFiles: 'Supported files: PDF, DOC, DOCX, TXT, MD',
      
      // Validation
      required: 'This field is required',
      emailInvalid: 'Please enter a valid email address',
      passwordTooShort: 'Password must be at least 6 characters',
      passwordsDoNotMatch: 'Passwords do not match'
    }
  },
  ar: {
    translation: {
      // Common
      loading: 'جار التحميل...',
      error: 'خطأ',
      success: 'نجح',
      warning: 'تحذير',
      info: 'معلومات',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تحرير',
      create: 'إنشاء',
      update: 'تحديث',
      search: 'بحث',
      
      // Authentication
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'هل نسيت كلمة المرور؟',
      
      // Dashboard
      dashboard: 'لوحة التحكم',
      workspaces: 'مساحات العمل',
      createWorkspace: 'إنشاء مساحة عمل',
      workspaceName: 'اسم مساحة العمل',
      workspaceDescription: 'وصف مساحة العمل',
      
      // Chat
      chat: 'محادثة',
      sendMessage: 'إرسال رسالة',
      typingMessage: 'اكتب رسالتك...',
      
      // Documents
      documents: 'المستندات',
      uploadDocument: 'رفع مستند',
      dragAndDrop: 'اسحب وأسقط الملفات هنا، أو انقر للاختيار',
      
      // Settings
      settings: 'الإعدادات',
      general: 'عام',
      appearance: 'المظهر',
      theme: 'السمة',
      language: 'اللغة',
      
      // Admin
      admin: 'المسؤول',
      users: 'المستخدمون',
      analytics: 'التحليلات',
      
      // App specific
      appTitle: 'AnythingLLM',
      appDescription: 'تحدث مع مستنداتك باستخدام الذكاء الاصطناعي',
      welcomeMessage: 'مرحباً بك في AnythingLLM',
      getStarted: 'ابدأ الآن'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n