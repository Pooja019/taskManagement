import axios from "axios";

// ✅ POST: Login user
export const loginUser = (data) => {
  return axios.post("http://localhost:8080/auth/login", data);
};

export const fetchTasks = async (email) => {
  try {
    const token = sessionStorage.getItem("token"); // 👈 get token from storage
    const response = await fetch(
      `http://localhost:8080/tasks/tasks/member/email/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 pass token here
        },
      }
    );
    if (response.ok) {
      return await response.json(); // success
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// service/Api.js
// src/service/Api.js

// export const fetchTasks = async (email) => {
//   try {
//     const response = await fetch(`http://localhost:8080/tasks/leader/today/${email}`);
//     if (response.ok) {
//       return await response.json(); // assuming the response is a list of TaskDTO
//     } else {
//       throw new Error("Failed to fetch tasks");
//     }
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error;
//   }
// };
