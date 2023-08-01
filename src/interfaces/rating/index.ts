import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { GetQueryInterface } from 'interfaces';

export interface RatingInterface {
  id?: string;
  rating_value: number;
  customer_id?: string;
  driver_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  driver?: DriverInterface;
  _count?: {};
}

export interface RatingGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  driver_id?: string;
}
