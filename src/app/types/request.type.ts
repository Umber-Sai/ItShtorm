export type RequestDataType = {
    name: string,
    phone: string,
    service?: string,
    type: RequestType
}

export enum RequestType {
    order = 'order',
    consultation = 'consultation'
}