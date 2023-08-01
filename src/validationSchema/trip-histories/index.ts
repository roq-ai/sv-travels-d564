import * as yup from 'yup';

export const tripHistoryValidationSchema = yup.object().shape({
  ride_id: yup.string().nullable(),
  customer_id: yup.string().nullable(),
});
