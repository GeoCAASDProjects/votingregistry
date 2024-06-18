// Define the type for the login request data
export interface LoginData {
    email: string;
    password: string;
  }
  
  // Define the type for the login response data
 export interface LoginResponse {
    token: string; // Adjust this based on your actual response
  }
  
  // Define the type for the login error (optional, you can define more specific types if needed)
 export interface LoginError {
    message: string;
  }

  interface FetchEnclosuresParams {
    signal: AbortSignal;
    
}
export interface Enclosure {
    name: string,
    address: string,
    longitude: number,
    latitude: number,
    created_at:Date,
    updated_at: Date,
    id: number
}