import { bloodGroup } from "./bloodGroup";
export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    dob: Date;
    bloodGroup: bloodGroup;
    designation: string;
    address: string;
    contact: string;
    isInterested: boolean;
    createdAt: Date;
    updatedAt: Date;
    lat?: number;
    lng?: number;
  }