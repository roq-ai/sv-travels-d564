import * as yup from 'yup';

export const ratingValidationSchema = yup.object().shape({
  rating_value: yup.number().integer().required(),
  customer_id: yup.string().nullable(),
  driver_id: yup.string().nullable(),
});
