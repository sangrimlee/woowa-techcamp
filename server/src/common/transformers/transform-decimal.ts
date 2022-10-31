export class TransformDeciaml {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseInt(data);
  }
}
