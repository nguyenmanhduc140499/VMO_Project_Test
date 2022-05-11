import { IResponse } from './../interfaces/response.interface';

//success:false => errMessage, error
export class ResponseError implements IResponse {
  constructor(inforMessage: string, data?: any) {
    this.success = false;
    this.message = inforMessage;
    this.data = data;
    console.warn(
      new Date().toString() +
        '- [Response]: ' +
        inforMessage +
        (data ? ' - ' + JSON.stringify(data) : ''),
    );
  }
  message: string;
  data: any[];
  errorMessage: string;
  error: any;
  success: boolean;
}

// success:true => message, data
export class ResponseSuccess implements IResponse {
  constructor(infoMessage: string, data?: any, notLog?: boolean) {
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if (!notLog) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
        console.log(
          new Date().toString() +
            ' - [Response]: ' +
            JSON.stringify(offuscateRequest),
        );
      } catch (error) {}
    }
  }
  message: string;
  data: any[];
  errorMessage: string;
  error: any;
  success: boolean;
}
