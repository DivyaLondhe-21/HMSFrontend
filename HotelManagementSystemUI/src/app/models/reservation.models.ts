export interface Reservation {
  reservationId: number;
  guestName: string;
  guestPhoneNumber: string;
  guestEmail: string;
  numberOfAdults: number;
  numberOfChildren: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  roomId: number;
  guestId: number;
}
