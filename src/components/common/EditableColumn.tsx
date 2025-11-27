import { JSX } from 'react';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (
    value: T[keyof T],
    item: T,
    setItem: React.Dispatch<React.SetStateAction<T>>
  ) => JSX.Element;
}

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (
    value: T[keyof T],
    item: T,
    setItem: React.Dispatch<React.SetStateAction<T>>
  ) => JSX.Element;
}

export const createColumns = <T,>(config: ColumnConfig<T>[]): Column<T>[] => {
  return config.map((col) => ({
    key: col.key,
    label: col.label,
    render: col.render,
  }));
};
