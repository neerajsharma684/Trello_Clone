import axios from "axios";

const getToken = () => {
    return localStorage.getItem("token");
    }

export const getTasks = async () => {
  const res = await axios.get("http://localhost:5000/api/tasks",{
    headers: {
        Authorization: `Bearer ${getToken()}`,
        },
  });
  console.log(res);
  return res;
};

export const addTask = async (formData: any) => {
  const res = await axios.post("http://localhost:5000/api/tasks", formData, {
    headers: {
        Authorization: `Bearer ${getToken()}`,
        },
  });
  return res;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
    headers: {
        Authorization: `Bearer ${getToken()}`,
        },
  });
  return res;
};

export const updateTask = async (id: string, formData: any) => {
  const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, formData,{
    headers: {
        Authorization: `Bearer ${getToken()}`,
        },
  });
  return res;
};

