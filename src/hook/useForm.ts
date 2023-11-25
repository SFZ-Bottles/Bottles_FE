import { useEffect, useState } from "react";
import { UserValidation } from "../utils/userValidation";

interface UseFormProps {
  initialValues: UserValueProps;
  onSubmit: () => void;
  validate: (value: UserValueProps) => UserValidation;
}

interface UserValueProps {
  id?: string;
  pw?: string;
  name?: string;
  email?: string;
  intro?: string;
}

function useForm({ initialValues, onSubmit, validate }: UseFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<UserValidation>({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(values);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setIsLoading(true);
    event.preventDefault();
    setErrors(validate(values));
  };

  useEffect(() => {
    if (isLoading) {
      if (Object.keys(errors).length === 0) {
        onSubmit();
      }
      setIsLoading(false);
    }
  }, [errors]);

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
