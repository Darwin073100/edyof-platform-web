import { FloatMessageType } from '@/shared/ui/types/FloatMessageType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AuthLoginDTO } from '../application/dtos/auth.login.dto';
import { authLoginAction } from '../actions/auth-login.action';

const schema = yup.object({
    email: yup.string().email('El formato del correo no es correcto').required('El correo es obligatorio.').min(3, 'El correo debe tener al menos 3 caracteres.'),
    password: yup.string().required('La contraseña es obligatoria.').min(8, 'La contraseña debe tener al menos 8 caracteres.').max(20, 'La contraseña debe tener como máximo 20 caracteres.'),
}).required();

type FormData = yup.InferType<typeof schema>;

function useLogin() {
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    // const { product, setProduct } = useProductStore();

    const { register, handleSubmit, reset, setValue, watch, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const resetFormLogin = () => {
        // setProduct(null);
        reset({});
        clearErrors(['email', 'password']);
    }

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);

        let authLoginResponse;

        const authLogin: AuthLoginDTO = {
           email: data.email,
           password: data.password,
        }

        authLoginResponse = await authLoginAction(authLogin);

        if (authLoginResponse.ok) {
            setIsLoading(false);
            resetFormLogin();
            setFloatMessageState(() => ({
                description: 'Usuario autenticado correctamente',
                summary: '¡Correcto!',
                isActive: true,
                type: 'green'
            }));
            console.log('authLoginResponse', authLoginResponse);
            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 4000);
        } else {
            setIsLoading(false);
            setFloatMessageState(() => ({
                description: authLoginResponse && authLoginResponse.error ? authLoginResponse.error.message : 'Ocurrió un error al iniciar sesión',
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));
            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 4000);
        }
    }

    return {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        clearErrors,
        onSubmit,
        errors,
        isLoading,
        floatMessageState
    }
}

export { useLogin };