import { DivisionInput } from "src/generated/generates";
import { useCreateDivision } from "src/utils/division";
import { useForm } from "react-hook-form";
import { useUrlParams } from "src/context/auth-context";

const CreateDivision = () => {
  const { mutate } = useCreateDivision();
  const { register, handleSubmit } = useForm<DivisionInput>();
  const { levelId } = useUrlParams();
  const onSubmit = (data: DivisionInput) => {
    mutate({
      name: data.name,
      levelId,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border"
        placeholder="اسم الشعبة"
        {...register("name")}
      />
      <button type="submit">انشاء</button>
    </form>
  );
};

export default CreateDivision;
