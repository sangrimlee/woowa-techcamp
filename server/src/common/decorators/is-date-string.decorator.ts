import { applyDecorators } from '@nestjs/common';
import { IsISO8601, Length } from 'class-validator';

// yyyy-mm-dd 포맷의 DateString인지 확인
export function IsDateString() {
  return applyDecorators(IsISO8601({ strict: true }), Length(10, 10));
}
