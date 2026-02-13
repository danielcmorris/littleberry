export interface BookRequest {
  ReservationSubId: number;
  AccountId: number;
  RequestByEmail: string;
  CallNumber: string;
  Prefix: string;
  BookNumber: number;
  Title: string;
  RequestDate: string;
  PackDate: string | null;
  ShipDate: string | null;
  DueDate: string | null;
  ReceivedDate: string | null;
  ReshelveDate: string | null;
  Status: string;
}
