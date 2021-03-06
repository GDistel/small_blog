import * as express from 'express';
import * as multer from 'multer';
import { AppDataSource } from '../data-source';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import Post from './post.entity';
import Comment from '../comment/comment.entity';
import CreateCommentDto from '../comment/comment.dto';
import { Pagination } from '../utils/pagination';

const DISK_STORAGE = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads', ),
  filename: (req, file, callback) => callback(null, `${new Date().toISOString()}-${file.originalname}`)
});

class PostController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private postRepository = AppDataSource.getRepository(Post);
  private commentRepository = AppDataSource.getRepository(Comment);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(`${this.path}/:id/comment`, validationMiddleware(CreateCommentDto), this.createPostComment);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router
      .all(`${this.path}/*`)
      .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
      .delete(`${this.path}/:id`, this.deletePost)
      .post(
        this.path,
        multer({ storage: DISK_STORAGE }).single('image'),
        validationMiddleware(CreatePostDto),
        this.createPost
      );
  }

  private createPostComment = async (request: express.Request, response: express.Response) => {
    const commentData: CreateCommentDto = request.body;
    const post = await this.postRepository.findOneBy({ id: Number(request.params.id) });
    const newComment = this.commentRepository.create({
      ...commentData,
      post
    });
    await this.commentRepository.save(newComment);
    response.send(newComment);
  }

  private createPost = async (request: express.Request, response: express.Response) => {
    const postData: CreatePostDto = request.body;
    if (request.file) {
      postData.imageUrl = `http://localhost:${process.env.PORT}/${request.file.filename}`;
    }
    const newPost = this.postRepository.create({
      ...postData
    });
    await this.postRepository.save(newPost);
    response.send(newPost);
  }

  private getAllPosts = async (request: express.Request, response: express.Response) => {
    const pagination = new Pagination(+request.query.page, +request.query.limit);
    const postsQuery = this.postRepository.createQueryBuilder('post').orderBy('post.id', 'DESC');
    const paginatedQuery = pagination.paginateQuery<Post>(postsQuery);
    const [data, totalCount] = await paginatedQuery.getManyAndCount();
    const res = pagination.paginateItems<Post>(data, totalCount);
    response.send(res);
  }

  private getPostById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = Number(request.params.id);
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.comments', 'comments')
      .getOne();
    if (post) {
      response.send({ post });
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