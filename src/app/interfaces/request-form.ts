import { bloodGroup } from "./bloodGroup";

export interface RequestForm {
    name: string;
    email: string;
    reqdate: Date;
    bloodGroup: bloodGroup;
    address: string;
    contact: string;
}
