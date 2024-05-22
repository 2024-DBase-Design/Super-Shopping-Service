import { Address } from "./Address";

export interface User {
  id: string;
  name: string;
  profilePicture?: string;
  addresses: Address[];
}
