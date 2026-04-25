import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T extends { id: string }> = {
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends { id: string }>({ columns, rows }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/65">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-800/90 last:border-none">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn("px-4 py-3 text-slate-200", column.className)}
                  >
                    {column.render ? column.render(row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
