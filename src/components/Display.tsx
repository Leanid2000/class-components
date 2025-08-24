import type { StoreForm } from '../interfaces/interfaces';

export const Display = ({
  data,
  formName,
}: {
  data: StoreForm | null;
  formName: string;
}) => {
  if (!data) {
    return <></>;
  }

  return (
    <div className="border-2 w-100 px-2 mt-15">
      <h1 className="text-3xl text-center">{formName}</h1>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Password: {data.password}</p>
      <p>Gender: {data.gender}</p>
      <p>Country: {data.country}</p>
      <p>Image:</p>

      <img src={data.image} alt="img" className="w-55 h-55 mx-auto" />
    </div>
  );
};
