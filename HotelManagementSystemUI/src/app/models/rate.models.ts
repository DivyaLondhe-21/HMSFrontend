import { Room } from './room.models';
export interface Rate {
    rateId: number;
    firstNightPrice: number;
    extensionPrice: number;
    numberOfChildren: number;
    numberOfGuests: number;
    numberOfDays: number;
    roomId: number;
    room: Room | null;
  }
  