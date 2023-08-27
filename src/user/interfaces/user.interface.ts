import { Role } from '../entities/user.entity';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  role: Role;
}
