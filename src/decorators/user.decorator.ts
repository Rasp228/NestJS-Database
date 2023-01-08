import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../Service/users.service';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    user.isAdmin = user.Role === UserRole.Admin;
    return user;
  },
);
