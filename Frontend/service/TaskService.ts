import instance from "@/app/axios"
import { Task } from "@/app/types"


export const getAllTask = async () => {

    try {
        const res = await instance.get("/tasks/tasks")
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export const getTasksByProject = async (projectId: number) => {
    try {
        const res = await instance.get(`/tasks/project/${projectId}`);
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }

};

export const CreateTasks = async (data: any): Promise<Task[] | any> => {
    try {
        const res = await instance.post("tasks/create-task", data);
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export const AssignTasks = async ( data: { taskId: number; assignedToId: number }): Promise<Task | null> => {
  try {
    const res = await instance.put(`/tasks/assign-task/${data.taskId}`, {
      assignedToId: data.assignedToId,
    });
    console.log("Assigned Task:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error assigning task:", error.response?.data || error.message);
    return null;
  }
};


export const getTaskById = async (task_id: number): Promise<Task | null> => {
    try {
        const res = await instance.get(`/tasks/task/${task_id}`);
        console.log(res.data);
        return res.data.data;
    } catch (error: any) {
        console.error("Error fetching task:", error.response?.data || error.message);
        return null;
    }
};

export const getTasksByUser = async (userId: number): Promise<Task[] | null> => {
    try {       
        const res = await instance.get(`/tasks/by-user/${userId}`);
        console.log(res.data); // <--- this logs the actual response
        return res.data;       // <--- returns Task[] or possibly undefined/null
    } catch (error: any) {
        console.error("Error fetching tasks by user:", error.response?.data || error.message);
        return null;
    }
}


export const updateTask = async (task_id: number, task: Partial<Task>) => {

    try {
        const res = await instance.put(`tasks/update-task/${task_id}`,task);
        console.log(res.data);
        return res.data;

    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (task_id: number) => {
    try {
        const res = await instance.delete(`tasks/delete-task/${task_id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}
