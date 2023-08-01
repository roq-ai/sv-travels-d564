const mapping: Record<string, string> = {
  bookings: 'booking',
  companies: 'company',
  drivers: 'driver',
  'loyalty-programs': 'loyalty_program',
  ratings: 'rating',
  rides: 'ride',
  'trip-histories': 'trip_history',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
