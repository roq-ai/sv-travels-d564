import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getRideById, updateRideById } from 'apiSdk/rides';
import { rideValidationSchema } from 'validationSchema/rides';
import { RideInterface } from 'interfaces/ride';
import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { getUsers } from 'apiSdk/users';
import { getDrivers } from 'apiSdk/drivers';

function RideEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<RideInterface>(
    () => (id ? `/rides/${id}` : null),
    () => getRideById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RideInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRideById(id, values);
      mutate(updated);
      resetForm();
      router.push('/rides');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RideInterface>({
    initialValues: data,
    validationSchema: rideValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Rides',
              link: '/rides',
            },
            {
              label: 'Update Ride',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Ride
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.pickup_location}
            label={'Pickup Location'}
            props={{
              name: 'pickup_location',
              placeholder: 'Pickup Location',
              value: formik.values?.pickup_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.drop_off_location}
            label={'Drop Off Location'}
            props={{
              name: 'drop_off_location',
              placeholder: 'Drop Off Location',
              value: formik.values?.drop_off_location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ride_option}
            label={'Ride Option'}
            props={{
              name: 'ride_option',
              placeholder: 'Ride Option',
              value: formik.values?.ride_option,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<DriverInterface>
            formik={formik}
            name={'driver_id'}
            label={'Select Driver'}
            placeholder={'Select Driver'}
            fetcher={getDrivers}
            labelField={'availability_status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/rides')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'ride',
    operation: AccessOperationEnum.UPDATE,
  }),
)(RideEditPage);
