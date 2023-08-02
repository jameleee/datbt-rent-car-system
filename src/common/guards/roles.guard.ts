import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants';
import { JwtPayload } from 'src/module/auth/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // get the roles required
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(roles);
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    // console.log(user);
    const userRoles = user.role;
    // console.log(this.validateRoles(roles, userRoles));
    return this.validateRoles(roles, userRoles);
  }

  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some((role) => userRoles.includes(role));
  }
}
