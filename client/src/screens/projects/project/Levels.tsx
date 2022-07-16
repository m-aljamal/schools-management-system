import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";
import { DivisionInput, LevelInput } from "src/generated/generates";
import { useCreateDivision } from "src/utils/division";
import { useCreateLevel, useLevelsList } from "src/utils/levels";

const Levels = () => {
  const { levels } = useLevelsList();
  const { archiveId, projectId } = useUrlParams();
  return (
    <div className="p-4">
      <h1>صفوف المدرسة</h1>
      <CreateLevel />
      <div className="grid grid-cols-3   gap-5 mt-5">
        {levels.map(({ id, name }) => (
          <Link
            to={`/projects/${projectId}/${archiveId}/levels/${id}`}
            key={id}
          >
            <div className="bg-gray-300 p-2">
              <div>
                <h2 className="text-cyan-800"> {name}</h2>
                <h2>عدد الشعب</h2>
                <h2>عدد الطلاب</h2>
                <h2>عدد المدرسين</h2>
                <p>{id}</p>

                {/* <CreateDivision levelId={id} />
              {divisions?.map(({ id, name }) => (
                <div key={id}>
                <h2 className="text-red-700">{name}</h2>
                </div>
              ))} */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Levels;

const CreateLevel = () => {
  const { archiveId } = useUrlParams();
  const { mutate } = useCreateLevel();
  const { register, handleSubmit } = useForm<LevelInput>();

  const onSubmit = (data: LevelInput) => {
    mutate({
      name: data.name,
      archiveId,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="border" placeholder="اسم الصف" {...register("name")} />
      <button type="submit">انشاء</button>
    </form>
  );
};
