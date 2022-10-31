import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync, ValidationError } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV = Environment.Development;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_SECRET_KEY: string;

  @IsString()
  JWT_EXPIRES_IN: string;

  @IsString()
  AWS_S3_REGION: string;

  @IsString()
  AWS_S3_BUCKET: string;

  @IsString()
  AWS_S3_BUCKET_PATH: string;

  @IsString()
  AWS_S3_ACCESS_KEY: string;

  @IsString()
  AWS_S3_SECRET_KEY: string;

  @IsString()
  GITHUB_CLIENT_ID: string;

  @IsString()
  GITHUB_CLIENT_SECRET: string;

  @IsString()
  GITHUB_REDIRECT_URL: string;
}

function createErrorMessages(errors: ValidationError[]) {
  return 'Config Validation Failed\n' + errors.map((error) => error.toString()).join('\n');
}

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (0 < errors.length) {
    throw new Error(createErrorMessages(errors));
  }

  return validatedConfig;
}
