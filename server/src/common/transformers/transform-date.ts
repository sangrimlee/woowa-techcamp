export class TransformDate {
  to(data: Date) {
    return data;
  }
  from(data: string): Date {
    return new Date(data);
  }
}
