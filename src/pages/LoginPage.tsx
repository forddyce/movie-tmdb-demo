import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useAuthStore } from "../stores/authStore";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, loginWithSocial } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            enqueueSnackbar(t("auth.login") + " successful", {
                variant: "success",
            });
            navigate("/");
        } catch (error) {
            enqueueSnackbar(
                error instanceof Error ? error.message : "Login failed",
                { variant: "error" }
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (
        provider: "google" | "facebook" | "apple"
    ) => {
        setIsLoading(true);
        try {
            await loginWithSocial(provider);
            enqueueSnackbar(t("auth.login") + " successful", {
                variant: "success",
            });
            navigate("/");
        } catch (error) {
            enqueueSnackbar(
                error instanceof Error ? error.message : "Social login failed",
                { variant: "error" }
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                        {t("auth.login")}
                    </h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <Input
                            label={t("auth.email")}
                            type="email"
                            placeholder={t("auth.email")}
                            {...register("email", {
                                required: t("auth.email") + " is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            error={errors.email?.message}
                            touched={!!errors.email}
                        />

                        <Input
                            label={t("auth.password")}
                            type="password"
                            placeholder={t("auth.password")}
                            {...register("password", {
                                required: t("auth.password") + " is required",
                            })}
                            error={errors.password?.message}
                            touched={!!errors.password}
                        />

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            {t("auth.login")}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    {t("auth.orContinueWith")}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Button
                                type="button"
                                variant="social"
                                fullWidth
                                onClick={() => handleSocialLogin("google")}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <img
                                        src="https://www.google.com/favicon.ico"
                                        alt="Google"
                                        className="w-5 h-5"
                                    />
                                    {t("auth.loginWithGoogle")}
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="social"
                                fullWidth
                                onClick={() => handleSocialLogin("facebook")}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <img
                                        src="https://www.facebook.com/favicon.ico"
                                        alt="Facebook"
                                        className="w-5 h-5"
                                    />
                                    {t("auth.loginWithFacebook")}
                                </span>
                            </Button>

                            <Button
                                type="button"
                                variant="social"
                                fullWidth
                                onClick={() => handleSocialLogin("apple")}
                                disabled={isLoading}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <img
                                        src="https://www.apple.com/favicon.ico"
                                        alt="Apple"
                                        className="w-5 h-5"
                                    />
                                    {t("auth.loginWithApple")}
                                </span>
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        {t("auth.dontHaveAccount")}{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            {t("auth.register")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
