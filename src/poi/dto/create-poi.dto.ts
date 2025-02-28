export class CreatePoiDto {
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  status: string; // enum: ONLINE/OFFLINE
}
