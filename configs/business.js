module.exports = {
  notifications: {
    email: {
      fromEmail: process.env.EMAILS_FROM_ADDRESS || 'no-reply@myapp.com',
      fromName: process.env.EMAILS_FROM_NAME || 'My app',
      templates: {
        signIn: process.env.EMAILS_USER_SIGN_IN_TEMPLATE || 'template-id',
        welcome: process.env.EMAILS_USER_WELCOME_TEMPLATE || 'template-id'
      }
    }
  },
  fileUploads: {
    driver: process.env.FILE_UPLOAD_DRIVER || 's3',
    bucket: process.env.FILE_UPLOADS_BUCKET,
    cdnBaseUrl: process.env.FILE_UPLOADS_CDN_HOST,
  },
  links: {
    dashboardSso: process.env.DASHBOARD_SSO || 'http://localhost:3000'
  },
  user: {
    usernameRegex: /^[a-zA-Z0-9_.-]*$/,
    usernameMax: 40,
  }
};
