import { User } from "./User";

export interface Staff extends User {
  salary: number;
  jobTitle: string;
}
