import { Pokemon } from '../../../utils/interfaces/pokemonInterfaces';

export async function downloadCSV(information: Pokemon[]) {
  const csvHeader = 'id,name,descriptions,img\n';
  const csvRows = information.map(
    (item) => `${item.id};\n ${item.name};\n${item.descriptions};\n${item.img}`
  );
  const csvContent = csvHeader + csvRows.join('\n');
  return csvContent;
}
