import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
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
            username: 'admin',
            password: '123456', // Updated default to match user's comment
        },
    });

    const onSubmit = async (data: LoginForm) => {
        setError(null);
        const errorMsg = await login(data.username, data.password);

        if (!errorMsg) {
            navigate('/');
        } else {
            setError(errorMsg);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-serif font-bold text-white">Welcome Back</h1>
                <p className="mt-2 text-sm text-gray-300">
                    Sign in to manage your restaurant
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Input
                            label="Username"
                            type="text"
                            placeholder="admin"
                            error={errors.username?.message}
                            {...register('username')}
                            className="bg-white/5 border-white/10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-gray-500 transition-all duration-200"
                            labelClassName="text-gray-300 uppercase text-xs tracking-wider"
                        />
                    </div>

                    <div className="relative">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                            className="bg-white/5 border-white/10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-gray-500 transition-all duration-200"
                            labelClassName="text-gray-300 uppercase text-xs tracking-wider"
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-400 bg-red-900/20 border border-red-900/50 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none shadow-lg hover:shadow-amber-900/20 transition-all py-2.5"
                    isLoading={isSubmitting}
                >
                    Sign in
                </Button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-400">
                <p>Demo Credentials:</p>
                <p>Username: admin</p>
                <p>Password: any</p>
            </div>
        </div>
    );
};
