import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // basically this decorator stores the roles that are passed via the decorator to the entire lifecycle
