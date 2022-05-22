import { IsString } from 'class-validator';

class CreateCommentDto {
  @IsString()
  public email: string;

  @IsString()
  public text: string;

}

export default CreateCommentDto;