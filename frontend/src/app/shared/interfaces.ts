export interface Post {
    id?: number;
    title: string;
    content: string;
    comments: Comment[];
    imageUrl: string;
}

export interface Comment {
    id?: number;
    email: string;
    text: string;
}

export interface ConfirmDialogData {
    message: string;
}

export interface PagedResponse<T> {
    data: Array<T>;
    total: number;
    page: number;
    limit: number;
}