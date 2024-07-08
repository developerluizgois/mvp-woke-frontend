import axios from "axios";

export interface LoginResponse {
  error?: boolean;
  message?: string;
  data?: any;
}

interface LoginParams {
  username?: string;
  email?: string;
  password: string;
}

export const loginUser = async ({ username, email, password }: LoginParams): Promise<LoginResponse> => {
  try {
    let payload: { username?: string; email?: string; password: string } = { password };

    if (email) {
      payload.email = email;
    } else if (username) {
      payload.username = username;
    }

    const response = await axios({
      method: "post",
      url: `http://localhost:3001/api/v1/user/login`,
      data: payload,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Request failed with status:", error.response.status);
        return {
          error: true,
          message: error.response.data.message,
        };
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
        return {
          error: true,
          message: "No response received from the server",
        };
      } else {
        console.error("Error setting up the request:", error.message);
        return {
          error: true,
          message: error.message,
        };
      }
    } else {
      console.error("Unknown error:", error);
      return {
        error: true,
        message: "An unknown error occurred",
      };
    }
  }
};
