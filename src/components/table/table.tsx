import { ReactNode } from 'react';

export enum ColType {
  Basic = 'basic',
  Money = 'money',
  Image = 'image'
}

export type TableCol = {
  id: number;
  name: string;
  type: ColType;
};

export class Table {
  values: Array<Array<string | number | ReactNode>> = [];
  cols: TableCol[] = [];

  constructor(c: TableCol[]) {
    this.cols = c;
  }
}

const TableComponent: React.FC<{
  table: Table;
}> = ({ table }) => {
  let keyer = 0;
  return (
    <>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              {table.cols.map((col) => (
                <th key={keyer++}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.values.map((row) => (
              <tr key={keyer++}>
                {table.cols.map((col: TableCol) => (
                  <td key={keyer++}>
                    {(() => {
                      switch (col.type) {
                        case ColType.Basic:
                          return row[col.id];
                        case ColType.Money:
                          return <div className="money">{row[col.id]}</div>;
                        case ColType.Image:
                          return <img className="rounded-full" src={row[col.id]} alt="" />;
                        default:
                          return ''; // Fallback in case of unexpected types
                      }
                    })()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
