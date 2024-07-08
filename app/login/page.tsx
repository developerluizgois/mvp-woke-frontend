"use client";

import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/navigation";
import Person from "../images/person/jake-nackos-IF9TK5Uy-KI-unsplash.jpg";
import Image from "next/image";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Cookies from "js-cookie"
import Link from "next/link";
import { useUserData } from "../context/UserContext";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUserData();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const loginData = usernameOrEmail.includes("@")
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    try {
      const response = await loginUser(loginData);

      if (response.error) {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        Cookies.set("token-woke-mvp", response.token);
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error: any) {
      enqueueSnackbar("Ocorreu um erro desconhecido.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col p-4 justify-between gap-10 md:p-10 lg:p-20 xl:flex-row xl:h-screen">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
      <div className="bg-[#F1F4F8] flex flex-col justify-between p-6 xl:p-16 gap-10 rounded-md xl:w-[50%] xl:h-[100%]">
        <header>
          <Link href="/" className="bg-[#3C36FF] px-[15px] py-[7px] font-medium text-[#f2f2f2] rounded-full">
            WOKE
          </Link>
        </header>
        <div className="flex flex-col gap-6">
          <h2 className="text-[32px]">Conecte-se com as melhores empresas</h2>
          <p className="text-[#7a7c7e]">
            Conosco, você tem até 3 vezes mais visibilidade e oportunidades com
            nossos melhores parceiros.
          </p>
        </div>
        <div className="bg-[#2C3243] flex flex-col gap-10 p-6 rounded-xl">
          <p className="text-[#f2f2f2]">
            {`"Minha experiência tem sido ótima, o processo é simples e o alcance é
            realmente além das expectativas. Invista no plano business e você
            não vai se arrepender."`}
          </p>
          <div className="flex items-center gap-4">
            <Image
              alt="person"
              className="w-[50px] h-[50px] rounded-full"
              style={{ objectFit: "cover" }}
              src={Person}
            />
            <div className="flex flex-col">
              <span className="text-[#f2f2f2]">Ayla</span>
              <span className="text-[#8c8c8c]">Senior product designer</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 xl:gap-20 xl:w-[50%] xl:p-16 xl:h-[100%]">
        <div className="flex flex-col gap-4">
          <span className="text-[32px]">Login</span>
          <span className="text-[#7a7c7e]">Preencha suas credenciais para continuar!</span>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label htmlFor="usernameOrEmail" className="flex flex-col gap-4 font-medium">
            Usuário ou E-mail
            <input
              type="text"
              id="usernameOrEmail"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Entre com seu e-mail ou usuário..."
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-4 font-medium">
            Senha
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <button
            type="submit"
            className="bg-[#3c36ff] p-4 rounded-lg text-[#f2f2f2]"
          >
            Entrar
          </button>
        </form>
        <div className="flex items-center justify-center">
          <span>Ainda não possui cadastro? <Link className="text-[#3c36ff]" href="/register">Quero ser Woke!</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
