// utils/types.ts
export type TaskProps = {
  task: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    deadline: Date;
  };
};
