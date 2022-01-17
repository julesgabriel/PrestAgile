import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ValidationContainer } from '../ui/components/register/ValidationContainer';
import { Input } from '@chakra-ui/input';
import { Button, Container, Heading, Text, useToast } from '@chakra-ui/react';
import { RegistrationServicesImpl } from '../logic/registration/services/registrationServices';
import FormRegister from '../ui/components/register/FormRegister';

const Home: NextPage = () => {
  const [error, setError] = useState(false);
  const [formRegisterValue, setRegisterFormValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const toast = useToast();
  useEffect(() => {
    function handleError() {
      setError(false);
    }

    error &&
      toast({
        title: 'Erreur lors de la création du compte.',
        description: 'Réessayez ultèrieurement',
        status: 'error',
        duration: 9000,
        isClosable: true,
        onCloseComplete: handleError,
      });
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    const cloneUserBasic = (({ confirmPassword, firstName, lastName, ...o }) =>
      o)(formRegisterValue);
    const cloneUserInfo = (({ email, password, confirmPassword, ...o }) => o)(
      formRegisterValue,
    );
    if (!RegistrationServicesImpl.checkInputForApi(cloneUserBasic))
      return setError(true);
    RegistrationServicesImpl.sendDataToApi({
      ...cloneUserBasic,
      userInfo: {
        ...cloneUserInfo,
      },
    })
      .then(() => {
        toast({
          title: 'Compte créer',
          description: 'Votre compte à bien été créer',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(_ => {
        return setError(true);
      });
  }

  return (
    <Container maxW="container.md">
      <FormRegister
        submit={handleSubmit}
        data={formRegisterValue}
        change={({ target }) =>
          setRegisterFormValue({
            ...formRegisterValue,
            // @ts-ignore
            [target.id]: target.value,
          })
        }
      />
    </Container>
  );
};

export default Home;
