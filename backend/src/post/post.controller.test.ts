import * as request from 'supertest';
import { AppDataSource } from '../data-source';
import App from '../app';
import PostController from './post.controller';
import CreatePostDto from './post.dto';
import Post from './post.entity';

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
        });
        const postsController = new PostController();
        const appInstance = new App([postsController]);
        return request(appInstance.app)
            .get(`${postsController.path}`)
            .expect((res) => {
                expect(res.body).toEqual(posts);
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
});