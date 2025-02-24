import { createParamDecorator } from '@nestjs/common';

export const GrpcUser = createParamDecorator((data, context) => {
  return context.switchToRpc();
});
