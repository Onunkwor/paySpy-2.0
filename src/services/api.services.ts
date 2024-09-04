import { SERVER_BASE_URL } from "@/config";
import axios, { AxiosRequestConfig } from "axios";
export class ApiRequest {
  url: string;
  method: string;
  constructor(
    url: string,
    method: "get" | "post" | "put" | "patch" | "delete"
  ) {
    this.url = url;
    this.method = method;
  }
  async apiRequest(
    data: any = {},
    headers: any = {},
    accessToken: string | null
  ): Promise<any> {
    const options: AxiosRequestConfig = {
      url: this.url,
      method: this.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      withCredentials: true,
    };
    switch (this.method) {
      case "get": {
        options.params = data;
        break;
      }
      case "post":
      case "put":
      case "delete": {
        options.data = data;
        break;
      }
      default:
        throw new Error(`Unknown method ${this.method}`);
    }
    try {
      const response = axios.request(options);
      return response;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        const requestForRefreshToken = await axios.post(
          `${SERVER_BASE_URL}/api/auth/refresh`
        );

        if (requestForRefreshToken.status === 200)
          return this.apiRequest(
            data,
            headers,
            requestForRefreshToken.data.accessToken
          );
      }

      throw error;
    }
  }
}
