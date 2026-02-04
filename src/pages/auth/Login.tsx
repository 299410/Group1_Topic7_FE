import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@franchise.com',
            password: 'password',
        },
    });

    const onSubmit = async (data: LoginForm) => {
        setError(null);
        const success = await login(data.email, data.password);

        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your credentials to access the admin panel
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="admin@franchise.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                >
                    Sign in
                </Button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
                <p>Demo Credentials:</p>
                <p>Email: admin@franchise.com</p>
                <p>Password: any</p>
            </div>
        </div>
    );
};
