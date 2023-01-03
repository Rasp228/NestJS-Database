import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../Service/users.service';

export const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);
