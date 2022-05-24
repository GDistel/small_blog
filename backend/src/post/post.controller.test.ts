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
});