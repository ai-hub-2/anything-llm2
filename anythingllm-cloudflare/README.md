# AnythingLLM for Cloudflare Pages

A complete replica of the AnythingLLM application optimized for deployment on Cloudflare Pages. This version provides the same functionality as the original AnythingLLM but is designed to work seamlessly with Cloudflare's serverless infrastructure.

## Features

- 🚀 **Serverless Architecture**: Fully optimized for Cloudflare Pages and Workers
- 💬 **Document Chat**: Chat with your documents using AI
- 📁 **Workspace Management**: Organize documents into workspaces
- 🔐 **Authentication**: Secure user authentication and authorization
- 🎨 **Modern UI**: Beautiful, responsive interface with dark theme
- 🌐 **Multi-language Support**: English and Arabic language support
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized for speed and efficiency

## Architecture

- **Frontend**: React 18 with Vite, Tailwind CSS, and React Router
- **Backend**: Cloudflare Functions (serverless)
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Storage**: Cloudflare R2 (for document storage)
- **Authentication**: JWT-based authentication
- **Deployment**: Cloudflare Pages

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anythingllm-cloudflare
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment variables**
   ```bash
   cp frontend/.env.example frontend/.env
   # Edit the .env file with your configuration
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy to Cloudflare Pages**
   ```bash
   npm run deploy
   ```

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=https://your-domain.pages.dev/api
VITE_APP_NAME=AnythingLLM
```

### Wrangler Configuration

Update `wrangler.toml` with your domain and configuration:

```toml
name = "anythingllm-cloudflare"
compatibility_date = "2023-11-22"
pages_build_output_dir = "frontend/dist"

[env.production]
name = "anythingllm-cloudflare"
route = { pattern = "anythingllm.yourdomain.com", zone_name = "yourdomain.com" }
```

## Deployment

### Cloudflare Pages Deployment

1. **Using Wrangler CLI**
   ```bash
   wrangler pages deploy frontend/dist --project-name=anythingllm
   ```

2. **Using Cloudflare Dashboard**
   - Go to Cloudflare Dashboard
   - Navigate to Pages
   - Create a new project
   - Connect your Git repository
   - Set build command: `npm run build`
   - Set build output directory: `frontend/dist`

3. **Environment Variables**
   Configure the following environment variables in your Cloudflare Pages project:
   - `NODE_VERSION`: `18`
   - `VITE_API_BASE_URL`: Your API base URL

### Database Setup (Optional)

If you want to use Cloudflare D1 database instead of the demo data:

1. **Create D1 database**
   ```bash
   wrangler d1 create anythingllm-db
   ```

2. **Update wrangler.toml**
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "anythingllm-db"
   database_id = "your-database-id"
   ```

3. **Run migrations**
   ```bash
   wrangler d1 migrations apply anythingllm-db
   ```

## Usage

### Default Login

For the demo version, use these credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`

### Creating Workspaces

1. Click "Create Workspace" on the dashboard
2. Enter workspace name and description
3. Click "Create" to create the workspace

### Chatting with Documents

1. Open a workspace
2. Type your message in the chat input
3. The AI will respond based on the context (demo responses)

## Development

### Project Structure

```
anythingllm-cloudflare/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React contexts
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json
├── functions/               # Cloudflare Functions
│   └── api/                # API endpoints
├── wrangler.toml           # Cloudflare configuration
└── README.md
```

### API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/workspaces` - Get all workspaces
- `POST /api/workspaces` - Create new workspace
- `GET /api/workspaces/:id/chat` - Get chat history
- `POST /api/workspaces/:id/chat` - Send chat message

### Adding New Features

1. **Frontend**: Add new components in `frontend/src/components/`
2. **Backend**: Add new endpoints in `functions/api/`
3. **Database**: Update database schema if needed
4. **Styling**: Use Tailwind CSS classes

### Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run linting
npm run lint
```

## Customization

### Theming

The application uses Tailwind CSS for styling. You can customize the theme in:
- `frontend/tailwind.config.js`
- `frontend/src/index.css`

### Translations

Add new languages or update existing translations in:
- `frontend/src/i18n.js`

### Branding

Update branding elements:
- Logo and icons in `frontend/public/`
- App title in `frontend/index.html`
- Meta tags for SEO

## Performance Optimization

The application is optimized for performance:

- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Optimized webpack configuration
- **CDN**: Cloudflare's global CDN
- **Caching**: Browser and edge caching
- **Minification**: CSS and JS minification

## Security

Security features implemented:

- **JWT Authentication**: Secure token-based authentication
- **CORS**: Proper CORS configuration
- **Input Validation**: Server-side input validation
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Enforced HTTPS connections

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Deployment Issues**
   - Verify wrangler.toml configuration
   - Check environment variables
   - Verify build output directory

3. **API Errors**
   - Check CORS configuration
   - Verify authentication headers
   - Check function logs in Cloudflare dashboard

### Debug Mode

Enable debug mode by setting:
```env
VITE_DEBUG=true
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## Acknowledgments

- Original AnythingLLM project
- Cloudflare Pages team
- React and Vite communities
- Tailwind CSS team

---

**Note**: This is a replica of the AnythingLLM application optimized for Cloudflare Pages. For production use, implement proper database integration, file storage, and LLM integrations.