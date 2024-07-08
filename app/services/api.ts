import axios from "axios";

export interface LoginResponse {
  token: string;
  user?: any;
  error?: boolean;
  message?: string;
  data?: any;
}

export interface LoginParams {
  username?: string;
  email?: string;
  password: string;
}

export interface GetUserParams {
  id: string;
  token: string;
}

export interface SendDataParams {
  id: string;
  token: string;
  selectedCompany: string;
}

export interface RegisterParams {
  username?: string;
  fullName?: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
}

export const loginUser = async ({ username, email, password }: LoginParams): Promise<LoginResponse> => {
  try {
    let payload: { username?: string; email?: string; password: string } = { password };

    if (email) {
      payload.email = email;
    } else if (username) {
      payload.username = username;
    }

    const response = await axios.post<LoginResponse>("http://localhost:3001/api/v1/user/login", payload);

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const registerUser = async ({ username, fullName, email, password, phone, dateOfBirth }: RegisterParams): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("http://localhost:3001/api/v1/user/register", { username, fullName, email, password, phone, dateOfBirth });

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const userData = async ({ id, token }: GetUserParams): Promise<LoginResponse> => {
  try {
    const response = await axios.get<LoginResponse>(`http://localhost:3001/api/v1/user/${id}`, {
      headers: { "Authorization": token }
    });

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const sendData = async ({ id, token, selectedCompany }: SendDataParams) => {
  try {
    const response = await axios.post<LoginResponse>(`http://localhost:3001/api/v1/send/${id}`, {
      company: selectedCompany,
    }, {
      headers: { "Authorization": token },
    });

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error: any): LoginResponse => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Request failed with status:", error.response.status);
      return {
        error: true,
        message: error.response.data.message,
        token: "",
      };
    } else if (error.request) {
      console.error("Request made but no response received:", error.request);
      return {
        error: true,
        message: "No response received from the server",
        token: "",
      };
    } else {
      console.error("Error setting up the request:", error.message);
      return {
        error: true,
        message: error.message,
        token: "",
      };
    }
  } else {
    console.error("Unknown error:", error);
    return {
      error: true,
      message: "An unknown error occurred",
      token: "",
    };
  }
};

