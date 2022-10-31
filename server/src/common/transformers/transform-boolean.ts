import { Transform } from 'class-transformer';

const valueToBoolean = (value: any) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === null || value === undefined) {
    return false;
  }
  return ['true', '1'].includes(value.toString().toLowerCase());
};

export const TransformBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );

  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };

  return (target: any, key: string) => {
    toPlain(target, key);
    toClass(target, key);
  };
};
