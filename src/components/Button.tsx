export const Button = ({
  changeSortParams,
  sortParam,
}: {
  changeSortParams: (param: string) => void;
  sortParam: string;
}) => {
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value)
    changeSortParams(event.currentTarget.value);
  };
  return (
    <input
      type="button"
      className="rounded w-30 h-7 bg-amber-500"
      value={sortParam}
      onClick={onClick}
    ></input>
  );
};
