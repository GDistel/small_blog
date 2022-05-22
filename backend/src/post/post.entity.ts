import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Comment from '../comment/comment.entity';
 
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.post)
  public comments: Comment[];
}
 
export default Post;