import * as yup from 'yup';

export const loyaltyProgramValidationSchema = yup.object().shape({
  points: yup.number().integer().required(),
  customer_id: yup.string().nullable(),
});
