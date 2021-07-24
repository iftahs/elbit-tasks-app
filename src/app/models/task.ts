export interface Task {
    ssid: string;
    title: string;
    description: string;
    isDone: boolean;
};

export interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error?: string;
};