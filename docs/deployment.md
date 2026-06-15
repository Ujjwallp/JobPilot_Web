# Deployment Guide

JobPilot is optimized to be deployed as a static Single Page Application (SPA). The build process uses Vite and the `vite-plugin-singlefile` plugin to bundle the entire application into a single `index.html` file for optimal delivery.

## Preparing for Production

1. Ensure all environment variables are correctly set in your CI/CD pipeline or hosting provider dashboard (e.g., Netlify, Vercel).
2. Run the build command locally to verify:
   ```bash
   npm run build
   ```
3. The production-ready files will be generated in the `dist/` directory.

## Deploying to Vercel
1. Connect your GitHub repository to Vercel.
2. The framework preset should automatically detect Vite.
3. Add the environment variables found in `.env.example` to your Vercel project settings.
4. Deploy.

## Deploying to Netlify
1. Connect your repository to Netlify.
2. Set the Build Command to `npm run build`.
3. Set the Publish Directory to `dist`.
4. Configure the environment variables in Site Settings.
5. Trigger a deployment.
