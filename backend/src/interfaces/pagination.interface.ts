export interface PagedResponse<T> {
    data: Array<T>;
    total: number;
    page: number;
    limit: number;
}