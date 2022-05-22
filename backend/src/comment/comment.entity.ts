import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Post from '../post/post.entity';
 
@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public email: string;
 
  @Column()
  public text: string;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  public post: Post;

}
 
export default Comment;