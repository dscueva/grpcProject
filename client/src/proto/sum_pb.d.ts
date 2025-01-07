import * as jspb from 'google-protobuf'



export class SumRequest extends jspb.Message {
  getA(): number;
  setA(value: number): SumRequest;

  getB(): number;
  setB(value: number): SumRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SumRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SumRequest): SumRequest.AsObject;
  static serializeBinaryToWriter(message: SumRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SumRequest;
  static deserializeBinaryFromReader(message: SumRequest, reader: jspb.BinaryReader): SumRequest;
}

export namespace SumRequest {
  export type AsObject = {
    a: number,
    b: number,
  }
}

export class SumReply extends jspb.Message {
  getResult(): number;
  setResult(value: number): SumReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SumReply.AsObject;
  static toObject(includeInstance: boolean, msg: SumReply): SumReply.AsObject;
  static serializeBinaryToWriter(message: SumReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SumReply;
  static deserializeBinaryFromReader(message: SumReply, reader: jspb.BinaryReader): SumReply;
}

export namespace SumReply {
  export type AsObject = {
    result: number,
  }
}

