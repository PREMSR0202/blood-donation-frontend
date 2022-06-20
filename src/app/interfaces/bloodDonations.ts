import { User } from "./user";

export interface bloodDonation { 
    user: User;
    bloodGroup: string;
    donationDate: Date;
    createdAt: Date;
    updatedAt: Date;
}