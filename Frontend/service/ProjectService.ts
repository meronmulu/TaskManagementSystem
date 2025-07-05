import instance from "@/app/axios";
import { Project } from "@/app/types/index"




export const getAllProjects = async (): Promise<Project[] | any> => {
  try {
    const res = await instance.get("/projects/projects");
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error)
  }
}


export const CreateProjects = async (data: any): Promise<Project[] | any> => {
  try {
    const res = await instance.post("/projects/create-project", data);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export const getProjectById = async (project_id: number): Promise<Project[] | any> => {
  try {
     const res = await instance.get(`/projects/project/${project_id}`)
    console.log("Fetch user", res.data);
    return res.data.data
    } catch (error) {
    console.log(error)
  }

}
 
export const updateProject = async (project_id: number, project: Partial<Project[]> ) =>{
try {
  const res = await instance.put<({data: Project})>(`/projects/update-project/${project_id},`,project)
  // console.log(res.data)
  return res.data

} catch (error) {
   console.log( error)
}


}

export const deleteProject = async(project_id: number): Promise<boolean> =>{
 try {
      const res = await instance.delete(`/projects/delete-project/${project_id}`)
      console.log(res);
      return true
    } catch (error) {
      console.log(error)
      return false 
    }

  }







