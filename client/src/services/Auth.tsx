import axios from "axios";

export const login = async (Email: string, Password: string) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    Email,
    Password,
  });
  return res;
};

export const signUp = async (Name: string, Email: string, Password: string) => {
  const res = await axios.post("http://localhost:5000/api/auth/signup", {
    Name,
    Email,
    Password,
  });
  return res;
};