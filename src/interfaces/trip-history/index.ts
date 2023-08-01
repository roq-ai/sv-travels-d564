import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TripHistoryInterface {
  id?: string;
  ride_id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  ride?: RideInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TripHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  ride_id?: string;
  customer_id?: string;
}
