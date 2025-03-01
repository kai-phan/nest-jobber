export function serialize(data: any): Buffer {
  return Buffer.from(JSON.stringify(data));
}

export function deserialize<T>(data: Buffer) {
  return JSON.parse(data.toString()) as T;
}
