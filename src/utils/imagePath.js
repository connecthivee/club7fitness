/**
 * Utility function to get correct image path for both development and production
 * Handles GitHub Pages base path automatically
 */
export const getImagePath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Get base URL - Vite replaces this during build
  const baseUrl = import.meta.env.BASE_URL || '/'
  // Ensure base URL ends with / and path doesn't start with /
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return `${base}${cleanPath}`
}

