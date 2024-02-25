//utils/types.ts

export type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date;
};
