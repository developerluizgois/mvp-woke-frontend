'use client'

import React, { useState } from "react";
import Image from "next/image";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Person from "../images/person/jake-nackos-IF9TK5Uy-KI-unsplash.jpg";
import Cookies from "js-cookie"
import { registerUser } from "../services/api";
import { useUserData } from "../context/UserContext";

function Register() {
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const { setUser } = useUserData();
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    
    input = input.replace(/\D/g, '');

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length > 2 && input.length <= 4) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    } else if (input.length > 4 && input.length <= 8) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
    }

    setDateOfBirth(input);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerUser({username, fullName, email, password, phone, dateOfBirth});

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
    <div className="flex flex-col p-4 justify-between gap-10 md:p-10 lg:p-20 xl:flex-row xl:h-[auto]">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
      <div className="bg-[#F1F4F8] flex flex-col justify-between p-6 xl:p-16 gap-10 rounded-md xl:w-[50%] xl:h-[100%]">
        <header>
          <span className="bg-[#3C36FF] px-[15px] py-[7px] font-medium text-[#f2f2f2] rounded-full">
            WOKE
          </span>
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
      <div className="flex flex-col gap-10 xl:gap-10 xl:w-[50%] xl:px-16 xl:h-[100%]">
        <div className="flex flex-col gap-4">
          <span className="text-[32px]">Criar conta</span>
          <span className="text-[#7a7c7e]">
            Preencha suas credenciais para continuar!
          </span>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <label htmlFor="username" className="flex flex-col gap-4 font-medium">
            Usuário
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Defina seu usuário"
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <label htmlFor="fullName" className="flex flex-col gap-4 font-medium">
            Nome Completo
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nome completo"
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-4 font-medium">
            E-mail
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Endereço de e-mail"
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <label htmlFor="phone" className="flex flex-col gap-4 font-medium">
            Número de celular
            <input
              type="tel"
              id="phone"
              pattern="[0-9]{10,11}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Número de celular (DDD + número)"
              required
              className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            />
          </label>
          <label
            htmlFor="dateOfBirth"
            className="flex flex-col gap-4 font-medium"
          >
            Data de Nascimento
            <input
              type="text"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY"
              maxLength={10}
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
            Criar conta
          </button>
        </form>
        <div className="flex items-center justify-center">
          <span>
            Já possui cadastro?{" "}
            <Link href="/login" className="text-[#3c36ff]">
              Acessar minha conta!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;