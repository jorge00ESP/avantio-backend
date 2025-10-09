export class MyResponse {
  
  private status: number;
  private message: string;
  private object: any;

  constructor(status: number, message: string, object: any) {
    this.status = status;
    this.message = message;
    this.object = object;
  }
}