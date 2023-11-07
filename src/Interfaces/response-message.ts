export interface ResponseMessage {
    messageType: ResponseMessageType,
    message: string
}

export enum ResponseMessageType {
    Error = 'error',
    Success = 'success',
    Info = 'info',
}