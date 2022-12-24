export interface Child {
    type: string;
    allocation: number;
    childs?: Child[];
};

export interface PropsLevel {
    title: string
    allocation: number
    classFather?: string
    classSon?: string
} 