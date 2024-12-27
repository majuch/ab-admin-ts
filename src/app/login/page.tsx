'use client';
import { Form } from "@/components/Form";
import { useLoading } from "@/hooks/useLoading";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function LoginPage() {

    const { finishLoading, startLoading } = useLoading();
    const authFetch = useAuthFetch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const login = async (formData: any) => {
        startLoading();
        await authFetch({
            endpoint: 'login',
            redirectRoute: '/search',
            formData
        })
        finishLoading();
    }
    return (
        <>
            <Form 
                title="Iniciar sesión" 
                onSubmit={login}
                description="Ingresa tus datos para iniciar sesión">
                <div className="my-[10px] flex flex-col gap-4">
                    <Form.Input 
                        name="username" 
                        label="Usuario" 
                        placeholder="Ingresa tu suario" />
                    <Form.Input 
                        name="password" 
                        label="Contraseña" 
                        type="password" 
                        placeholder="Ingresa tu contraseña" />
                </div>
                <Form.SubmitButton buttonText="Iniciar sesión" isLoading={false}/>
                <Form.Footer description="¿No tienes cuenta?" textLink="Regístrate" link="/register"/>
            </Form>
        </>
    );
}