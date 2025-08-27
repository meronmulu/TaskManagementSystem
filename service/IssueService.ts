import instance from "@/app/axios";
import { Issue } from "@/app/types";


export const getAllIssues = async (): Promise<Issue[] | any> => {
  try {
    const res = await instance.get("/issues/issues");
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export const CreateIssue = async (data: any): Promise<Issue[] | any> => {
  try {
    const res = await instance.post("/issues/create-issue", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export const getIssueById = async (issue_id: number): Promise<Issue | null> => {
  try {
    const res = await instance.get(`/issues/issue/${issue_id}`);
    return res.data.data || res.data; // Handle both response structures
  } catch (error) {
    console.error("Error fetching issue:", error);
    return null;
  }
}

export const updateIssue = async (issue_id: number, issue: Partial<Issue>): Promise<Issue | null> => {
  try {
    const res = await instance.put(`/issues/update-issue/${issue_id}`, issue);
    return res.data.data || res.data;
  } catch (error) {
    console.error("Error updating issue:", error);
    return null;
  }
}

export const deleteIssue = async(issue_id: number): Promise<boolean> =>{
 try {
      const res = await instance.delete(`/issues/delete-issue/${issue_id}`)
      console.log(res);
      return true
    } catch (error) {
      console.log(error)
      return false 
    }

  }