import { type Data, type Parameters } from '../interfaces/interfaces';

const Table = ({
  data,
  checkedParams,
}: {
  data: Data;
  checkedParams: Parameters[];
}) => {
  return (
    <table className="border w-250">
      <thead>
        <tr>
          {checkedParams.map((parameter, num) => (
            <th className="w-60 text-center" key={num}>
              {parameter.parameter}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {checkedParams.map((parameter, num) => {
            let param = data[parameter.parameter as keyof Data];
            if (param) {
              param = Number.isInteger(param)
                ? param
                : Number(param?.toFixed(3));
            }
            return (
              <td className="w-60 text-center" key={num}>
                {param || 'N/A'}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};
export default Table;
