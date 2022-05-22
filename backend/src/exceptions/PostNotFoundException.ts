import HttpException from "./HttpException";
 
class PostNotFoundException extends HttpException {
  constructor(id: string | number) {
    super(404, `Post with id ${id} not found`);
  }
}
 
export default PostNotFoundException;