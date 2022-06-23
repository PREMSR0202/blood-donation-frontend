import { bloodGroup } from "./bloodGroup";


export interface bloodRequest {

    _id : string;
    name: string;
    email: string;
    bloodType: string;
    contact: string;
    address: string;
    requestDate :Date;
    createdAt: Date;
    updatedAt: Date;
}