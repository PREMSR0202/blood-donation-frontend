import { bloodGroup } from "./bloodGroup";

export interface RequestForm {
    name: string;
    email: string;
    requestDate: Date;
    bloodGroup: bloodGroup;
    address: string;
    contact: string;
}


