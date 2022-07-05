import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import { DivisionInput, LevelInput } from "src/generated/generates";
import { useCreateDivision } from "src/utils/division";
import { useCreateLevel, useLevels } from "src/utils/levels";

const Levels = () => {
  const { levels } = useLevels();

  return (
    <div className="p-4">
      <h1>صفوف المدرسة</h1>
      <CreateLevel />
      <div className="grid grid-cols-3   gap-5 mt-5">
        {levels.map(({ id, name, divisions }) => (
          <div key={id} className="bg-gray-300 p-2">
            <div>
              <h2 className="text-cyan-800"> {name}</h2>
              <CreateDivision levelId={id} />
              {divisions?.map(({ id, name }) => (
                <div key={id}>
                  <h2 className="text-red-700">{name}</h2>
                </div>
              ))}
            </div>
          </div>
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

const CreateDivision = ({ levelId }: { levelId: string }) => {
  const { mutate } = useCreateDivision();
  const { register, handleSubmit } = useForm<DivisionInput>();

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
