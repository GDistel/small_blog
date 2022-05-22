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