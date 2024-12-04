const API_BASE_URL = 'https://localhost:3000/api/v1';

export const getToken = () => {
  // Since token is in cookies, you might not need this method
  return null;
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include', // Important for including cookies
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      return { authenticated: false };
    }
    
    const data = await response.json();
    return { 
      authenticated: true, 
      user: data.user // Assuming your backend returns user info
    };
  } catch (error) {
    console.error('Error checking auth:', error);
    return { authenticated: false };
  }
};

// Remove saveToken and saveUser as they're not needed for cookie-based auth