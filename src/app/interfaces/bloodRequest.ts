import { bloodGroup } from "./bloodGroup";


export interface bloodRequest {
    name: string;
    email: string;
    bloodType: bloodGroup;
    contact: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}