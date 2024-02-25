//utils/types.ts
export type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date;
};

export interface TaskFilterProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}
