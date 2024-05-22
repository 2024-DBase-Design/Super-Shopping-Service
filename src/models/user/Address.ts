export interface Address {
  id: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: "delivery" | "payment";
}
