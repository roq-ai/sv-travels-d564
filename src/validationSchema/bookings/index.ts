import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  scheduled_time: yup.date().required(),
  customer_id: yup.string().nullable(),
});
