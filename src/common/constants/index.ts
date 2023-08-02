import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/enum/role.enum';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const EMAIL_QUEUE = 'email';
export const EMAIL_CREATE_ORDER_SUCCESS = 'email-create-order-success';
export const EMAIL_REGISTER_ACCOUNT_SUCCESS = 'email-register-account-success';
export const TEMP_CREATE_ORDER_SUCCESS = 'd-0a72828c0d964adc9f790edd00d081fb';
export const FROM_EMAIL = 'datbt@tech.est-rouge.com';
export const TEMP_REGISTER_ACCOUNT_SUCCESS =
  'd-d56ad03eb0e6490488cc6695486ef9f4';
