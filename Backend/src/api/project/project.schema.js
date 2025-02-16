const { z } = require("zod");

const projectSchema = {
    create : z.object ({
      project_name : z.string().min(1, "Name is required"),
      description  : z.string().min(1, "description is required"),
      status : z.enum([" PENDING,", "IN_PROGRESS", "COMPLETED"]).optional(),
}),

   update: z.object({
    project_name : z.string().min(1, "Name is required"),
    description  : z.string().min(1, "description is required"),
    status : z.enum([" PENDING,", "IN_PROGRESS", "COMPLETED"]).optional(),
   })

}

module.exports = {projectSchema}
