import * as yup from 'yup';

export const driverValidationSchema = yup.object().shape({
  availability_status: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
