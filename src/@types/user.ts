export interface Patient {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "PATIENT";
  createdAt: string;
  updatedAt: string;
  licenseNumber: null;
  stripeCustomerId: string;
}
