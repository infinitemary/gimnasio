import React, { ReactNode } from 'react';
import Loading from '../feedback/loading.component';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string | number;
  className?: string;
}

function Table<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  onRowClick,
  keyExtractor,
  className = '',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loading text="Cargando datos..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.className || ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((column, index) => {
                const cellContent =
                  typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : String(item[column.accessor as keyof T]);

                return (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                      column.className || ''
                    }`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table; 