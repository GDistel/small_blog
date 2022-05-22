import { IsString, IsUrl } from 'class-validator';

class CreatePostDto {
  @IsString()
  public content: string;

  @IsString()
  public title: string;

  @IsUrl()
  public imageUrl: string;

}

export default CreatePostDto;