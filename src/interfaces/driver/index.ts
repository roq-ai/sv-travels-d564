import { RatingInterface } from 'interfaces/rating';
import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DriverInterface {
  id?: string;
  availability_status: boolean;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  rating?: RatingInterface[];
  ride?: RideInterface[];
  user?: UserInterface;
  _count?: {
    rating?: number;
    ride?: number;
  };
}

export interface DriverGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
