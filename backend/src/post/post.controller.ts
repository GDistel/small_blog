import { AppDataSource } from '../data-source';
import * as express from 'express';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import Post from './post.entity';

class PostController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private postRepository = AppDataSource.getRepository(Post);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router
      .all(`${this.path}/*`)
      .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
      .delete(`${this.path}/:id`, this.deletePost)
      .post(this.path, validationMiddleware(CreatePostDto), this.createPost);
  }

  private createPost = async (request: express.Request, response: express.Response) => {
    const postData: CreatePostDto = request.body;
    const newPost = this.postRepository.create({
      ...postData
    });
    await this.postRepository.save(newPost);
    response.send(newPost);
  }

  private getAllPosts = async (request: express.Request, response: express.Response) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  }

  private getPostById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const post = await this.postRepository.findOneBy({ id: Number(id) });
    if (post) {
      response.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  }

  private modifyPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const postData: Post = request.body;
    await this.postRepository.update(id, postData);
    const updatedPost = await this.postRepository.findOneBy({ id: Number(id) });
    if (updatedPost) {
      response.send(updatedPost);
    } else {
      next(new PostNotFoundException(id));
    }
  }

  private deletePost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const deleteResponse = await this.postRepository.delete(Number(id));
    if (deleteResponse.affected) {
      response.sendStatus(200);
    } else {
      next(new PostNotFoundException(id));
    }
  }
}

export default PostController;