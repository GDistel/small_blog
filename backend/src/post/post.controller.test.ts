import { AppDataSource } from '../data-source';
import * as request from 'supertest';
import App from "../app";
import PostController from "./post.controller";
import CreatePostDto from "./post.dto";

describe('The PostController ', () => {
    describe('POST /post', () => {
        it('should send the newly created post in the response', () => {
            const postData: CreatePostDto = {
                title: 'My new post',
                content: 'This is the content',
                imageUrl: 'https://www.google.com'
            };
            (AppDataSource as any).getRepository = jest.fn().mockReturnValue({
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
        })
    })
});