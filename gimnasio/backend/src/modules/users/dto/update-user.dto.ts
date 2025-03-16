import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly role?: string;
} 