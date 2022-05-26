import * as request from 'supertest';
import { AppDataSource } from '../data-source';
import App from '../app';
import PostController from './post.controller';
import CreatePostDto from './post.dto';
import Post from './post.entity';
import CreateCommentDto from 'comment/comment.dto';

// TO DO: Improve by creating beforeEach() -- solve entities metadata issue
// TO DO: Add tests for error cases, test middleware

describe('PostController ', () => {

    it('POST /post', () => {
        const postData: CreatePostDto = {
            title: 'My new post',
            content: 'This is the content',
            imageUrl: 'https://www.google.com'
        };
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            create: () => (postData),
            save: () => Promise.resolve(),
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .post(`${postsController.path}`)
            .send(postData)
            .expect((res) => {
                expect(res.body.title).toBe(postData.title);
                expect(res.body.content).toBe(postData.content);
                expect(res.body.imageUrl).toBe(postData.imageUrl);
            });
    });

    it('PATCH /post/:id', () => {
        const updatedPost: Post = {
            id: 1,
            title: 'My new post',
            content: 'This is the content',
            imageUrl: 'https://www.google.com',
            comments: []
        };
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            findOneBy: () => (updatedPost),
            update: () => Promise.resolve(),
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .patch(`${postsController.path}/1`)
            .expect((res) => {
                expect(res.body).toEqual(updatedPost);
            });
    });

    it('GET /post', () => {
        const posts: Post[] = [
            { id: 1, title: 'My post', content: 'blog post', imageUrl: 'https://www.google.com', comments: [] }
        ];
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            find: () => (posts),
            createQueryBuilder: (entity: string) => ({
                orderBy: () => ({
                    offset: () => ({
                        limit: () => ({
                            getManyAndCount: () => ([[], 3] as any)
                        })
                    })
                })
            }),
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .get(`${postsController.path}?page=1&limit=3`)
            .expect((res) => {
                expect(res.body).toEqual({data: [], total: 3, limit: 3, page: 1});
            });
    });

    it('GET /post/:id', () => {
        const post: Post = {
            id: 1, title: 'My post', content: 'blog post',
            imageUrl: 'https://www.google.com', comments: []
        };
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            createQueryBuilder: (entity: string) => ({
                where: () => ({
                    leftJoinAndSelect: () => ({
                        getOne: () => (post)
                    })
                })
            }),
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .get(`${postsController.path}/${post.id}`)
            .expect((res) => {
                expect(res.body).toEqual({ post });
            });
    });

    it('DELETE /post/:id', () => {
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            delete: () => ({ affected: 1 })
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .delete(`${postsController.path}/1`)
            .expect(200);
    });

    it('POST /post/:id/comment', () => {
        const post: Post = {
            id: 1, title: 'My post', content: 'blog post',
            imageUrl: 'https://www.google.com', comments: []
        };
        const commentData: CreateCommentDto = {
            email: 'john@company.com',
            text: 'Awesome post!'
        };
        AppDataSource.getRepository = jest.fn().mockReturnValue({
            create: () => ({...commentData, id: 1, post }),
            save: () => Promise.resolve(),
            findOneBy: () => Promise.resolve(post)
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .post(`${postsController.path}/${post.id}/comment`)
            .send(commentData)
            .expect((res) => {
                expect(res.body.email).toBe(commentData.email);
                expect(res.body.text).toBe(commentData.text);
                expect(res.body.id).toBe(1);
                expect(res.body.post).toEqual(post);
            });
    });
});