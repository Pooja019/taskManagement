import axios from "axios";
import { API_URL, getUserId } from "./Config";
import { getToken, getUsername } from './Config';


export const loginUser = (data) => {
	return axios.post(`${API_URL}/auth/login`, data);
};


export const fetchTasks = async () => {
	const username = getUsername();
	const token = getToken();

	if (!username || !token) return [];

	try {
		const response = await axios.get(
			`${API_URL}/tasks/tasks/member/email/${username}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return [];
	}
};


export const getProjects = async () => {
	const token = getToken();

	if ( !token) return [];

	try {
		return await axios.get(`${API_URL}/Project/getAllProjects`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log("fetching project error", error);
	}
}


export const getMember = async () => {
	const token = getToken();
	const userId = getUserId()

	if ( !token || !userId) return [];
	try {
		return await axios.get(`${API_URL}/team-members/${userId}`,  {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	} catch (error) {
		console.log(error)
	}
}

export const updateProfilePhoto = async (image) => {
	const token = getToken();
	const userId = getUserId()


	if ( !token) return [];
	const formData = new FormData()
	formData.append("imageFile", image)
	try {
		return await axios.put(`${API_URL}/team-members/update-image-url/${userId}`, formData,  {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	} catch (error) {
		console.log(error)
	}
}

export const updateStatus = async (data, taskID) => {
	const token = getToken();

	if ( !token) return [];
	try {
		return await axios.put(`${API_URL}/tasks/task-status-and-task-status-bar/${taskID}`, data,  {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	} catch (error) {
		console.log(error)
	}
}