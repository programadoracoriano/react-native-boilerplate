import { useFormik } from 'formik';
import { ObjectSchema } from 'yup';

import useApiCall from './useApiCall';


function useForm<F, T>(
  endpoint: string,
  initialValues: F,
  validationSchema: ObjectSchema<F>,
) {
  const [onSubmit, data, loading, errors] = useApiCall<T, F>('POST', endpoint);
  const formik = useFormik<F>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return [formik, data, loading, errors] as const;
}

export default useForm;
