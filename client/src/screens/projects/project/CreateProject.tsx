import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProjectInput } from "src/generated/generates";
import { useCreateProject } from "src/utils/project";

const CreateProject = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateProject();
  const { register, handleSubmit } = useForm<ProjectInput>();
  const onSubmit = (data: ProjectInput) => {
    mutate({
      name_ar: data.name_ar,
      current_archive_name: data.current_archive_name as string,
    });
    navigate("/projects");
  };

  return (
    <div className="p-4">
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name_ar")}
          placeholder="اسم المشروع"
          className="border block my-4"
        />
        <input
          {...register("current_archive_name")}
          placeholder="current_archive_name"
          className="border"
        />
        <button className="border block my-3">create</button>
      </form>
    </div>
  );
};

export default CreateProject;
