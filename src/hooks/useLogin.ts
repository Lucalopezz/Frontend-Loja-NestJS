import { LoginFormData } from "@/schemas/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
      } else {
        await router.push("/dashboard");
        router.refresh();
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};
