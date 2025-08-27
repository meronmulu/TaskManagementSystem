export interface User {
    userId: number;
    name: string;
    email: string;
    password: string;
    role: string
   [key: string]: unknown;
  }

export interface Project {
    project_id: number;
    project_name: string;
    description: string;
    status: string;
    [key: string]: unknown;
  }

export interface Task {
  data: any;
  task_id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: number;
  assignedToId: number;
  project?: {
    project_id: number;
    project_name: string;
  };
  assignedTo?: {
    name: string;
  };
}

export interface Issue{
  issue_id: number;
  title  :string;
  description  :string;
  status: string;
  priority: string;
  projectId: number;       
  reportedById: number; 
  project?: {
    project_id: number;
    project_name: string;
  };
   reportedBy?: {
    userId: number;
    name: string;
  };
}
   