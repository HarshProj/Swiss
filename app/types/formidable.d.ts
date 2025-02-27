declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export class Formidable {
    parse(
      req: IncomingMessage
    ): Promise<[Fields, Files]>;
  }
}
