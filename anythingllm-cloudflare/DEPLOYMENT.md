# AnythingLLM Cloudflare Pages Deployment Guide

This guide will help you deploy the AnythingLLM replica to Cloudflare Pages.

## Prerequisites

- Cloudflare account
- Node.js 18 or higher
- Git repository (GitHub, GitLab, etc.)

## Step 1: Prepare Your Repository

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

## Step 2: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 3: Login to Cloudflare

```bash
wrangler login
```

## Step 4: Deploy Using Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Navigate to https://dash.cloudflare.com/
   - Go to "Pages" section

2. **Create a new project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose your repository

3. **Configure build settings**
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `frontend/dist`
   - Root directory: `/` (leave empty)

4. **Set environment variables**
   - `NODE_VERSION`: `18`
   - `VITE_API_BASE_URL`: Leave empty (will be auto-generated)
   - `VITE_APP_NAME`: `AnythingLLM`

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete

## Step 5: Deploy Using Wrangler CLI

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Pages**
   ```bash
   wrangler pages deploy frontend/dist --project-name=anythingllm
   ```

## Step 6: Configure Custom Domain (Optional)

1. **In Cloudflare Dashboard**
   - Go to your Pages project
   - Click "Custom domains"
   - Add your domain

2. **Update DNS**
   - Add a CNAME record pointing to your Pages domain

## Step 7: Test Your Deployment

1. **Access your application**
   - Visit your Cloudflare Pages URL
   - Or your custom domain if configured

2. **Test login**
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Test functionality**
   - Create a workspace
   - Send a chat message
   - Verify responses

## Environment Variables

Configure these in your Cloudflare Pages project:

### Required
- `NODE_VERSION`: `18`

### Optional
- `VITE_API_BASE_URL`: Auto-generated if not set
- `VITE_APP_NAME`: `AnythingLLM`
- `VITE_DEBUG`: `false`

## Troubleshooting

### Build Fails
- Check Node.js version is 18+
- Verify all dependencies are installed
- Check for TypeScript errors

### Functions Not Working
- Verify `functions/` directory is in repository root
- Check function file extensions are `.js`
- Verify CORS headers are set correctly

### Authentication Issues
- Check JWT token generation/validation
- Verify API endpoints are accessible
- Check browser console for errors

## Production Considerations

### Database
- Set up Cloudflare D1 database
- Run migrations
- Update wrangler.toml

### File Storage
- Configure Cloudflare R2 bucket
- Update file upload endpoints

### LLM Integration
- Add your preferred LLM API
- Configure API keys as secrets

### Monitoring
- Enable Cloudflare Analytics
- Set up error tracking
- Monitor function logs

## Security

### API Keys
- Use Cloudflare secrets for API keys
- Never commit sensitive data

### CORS
- Configure proper CORS headers
- Limit allowed origins in production

### Authentication
- Implement proper JWT signing
- Use secure session management

## Performance

### Caching
- Configure proper cache headers
- Use Cloudflare caching rules

### Optimization
- Enable minification
- Use code splitting
- Optimize images

## Monitoring

### Logs
- Check Cloudflare function logs
- Monitor error rates

### Analytics
- Enable Cloudflare Web Analytics
- Monitor performance metrics

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Cloudflare Pages documentation
3. Check the project repository for issues
4. Contact support if needed

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure backup strategies
3. Plan for scaling
4. Implement additional features
5. Set up CI/CD pipeline

---

**Note**: This is a demo application. For production use, implement proper security measures, database integration, and LLM API connections.