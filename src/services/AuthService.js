import HttpService from "./HttpService";

class AuthService extends HttpService {
  login = async (credentials) => {
    const response = await this.client.post("/login", credentials);
    localStorage.setItem("token", response.data.authorization.token);
    return response.data;
  };

  logout = async () => {
    await this.client.post("/logout");
    localStorage.removeItem("token");
  };

  register = async (user) => {
    const response = await this.client.post("/register", user);
    console.log(response);
    localStorage.setItem("token", response.data.authorization.token);
    return response.data;
  };

  getActiveUser = async () => {
    const response = await this.client.get("/me");
    return response.data;
  };
}

const authService = new AuthService();
export default authService;
