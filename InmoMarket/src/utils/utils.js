const API_BASE_URL = 'https://inmomarket.me/api/v1';

export const saveToken = (token) => {
  localStorage.setItem("token", token);
  console.log("Token guardado en local storage:", token);
  return token;
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  console.log("Usuario guardado en local storage:", user);
  return user;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  console.log("Usuario obtenido del local storage:", parsedUser);
  return parsedUser;
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token obtenido del local storage:", token);
  return token || null;
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check`, {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    });
    
    if (!response.ok) {
      throw new Error('Auth check failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking auth:', error);
    throw error;
  }
};