export interface Task {
    ssid: string;
    title: string;
    description: string;
    isDone: boolean;
};

export interface TasksState {
    tasks: Task[];
    isLoading: boolean;
}

export interface TasksResponse {
    title: string;
    desctiption: string;
    isDone: boolean;
}