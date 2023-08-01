import { TripHistoryInterface } from 'interfaces/trip-history';
import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { GetQueryInterface } from 'interfaces';

export interface RideInterface {
  id?: string;
  pickup_location: string;
  drop_off_location: string;
  ride_option: string;
  customer_id?: string;
  driver_id?: string;
  created_at?: any;
  updated_at?: any;
  trip_history?: TripHistoryInterface[];
  user?: UserInterface;
  driver?: DriverInterface;
  _count?: {
    trip_history?: number;
  };
}

export interface RideGetQueryInterface extends GetQueryInterface {
  id?: string;
  pickup_location?: string;
  drop_off_location?: string;
  ride_option?: string;
  customer_id?: string;
  driver_id?: string;
}
