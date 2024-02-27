import axios from "axios";
import { Task } from "../components/Task";

const apiUrl = import.meta.env.API_DOMAIN;
const taskEndPoint = apiUrl + "/task";

export function getTasks() {
  return axios.get(taskEndPoint);
}

export function deleteTask(id: number) {
  return axios.delete(`${taskEndPoint}/${id}`);
}

export function updateTask(data: Task | { id: number; completed: boolean }) {
  return axios.patch(`${taskEndPoint}/${data.id}`, data);
}

export function addNewTask(data: Task) {
  return axios.put(`${taskEndPoint}`, data);
}
