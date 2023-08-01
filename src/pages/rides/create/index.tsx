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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRide } from 'apiSdk/rides';
import { rideValidationSchema } from 'validationSchema/rides';
import { UserInterface } from 'interfaces/user';
import { DriverInterface } from 'interfaces/driver';
import { getUsers } from 'apiSdk/users';
import { getDrivers } from 'apiSdk/drivers';
import { RideInterface } from 'interfaces/ride';

function RideCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RideInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRide(values);
      resetForm();
      router.push('/rides');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RideInterface>({
    initialValues: {
      pickup_location: '',
      drop_off_location: '',
      ride_option: '',
      customer_id: (router.query.customer_id as string) ?? null,
      driver_id: (router.query.driver_id as string) ?? null,
    },
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
              label: 'Create Ride',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Ride
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
    operation: AccessOperationEnum.CREATE,
  }),
)(RideCreatePage);
