import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExceptionResponse } from 'src/common/exceptions/responses';

export const ApiImages = (fieldName: string) =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      required: true,
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      type: ExceptionResponse,
      description:
        '[UP001] 파일 확장자가 jpeg, jpg, png가 아닌 경우 [UP002] 파일 크기가 5MB이상인 경우 [UP003] 파일 개수를 초과한 경우 [V001] 그 외',
    })
  );
