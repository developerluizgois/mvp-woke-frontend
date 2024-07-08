"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { sendData, userData } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useUserData } from "../context/UserContext";
import Link from "next/link";
import { ExitIcon } from "@radix-ui/react-icons";

const Dashboard = () => {
  const router = useRouter();
  const { setUser, user } = useUserData();
  const [formattedDateOfBirth, setFormattedDateOfBirth] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const companies = [
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook',
    'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Twitter',
    'Salesforce', 'Adobe', 'Oracle', 'IBM', 'Intel',
    'HP', 'Cisco', 'Sony', 'Samsung', 'Toyota',
  ];

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const handleSendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token-woke-mvp");

    if (!token) {
      router.push("/login");
      return;
    }

    const decode = jwtDecode<{ userId: string }>(token);

    if (!selectedCompany) {
      enqueueSnackbar("Selecione uma empresa válida.", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await sendData({ id: decode.userId, token, selectedCompany });

      if (response.error) {
        enqueueSnackbar(response.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
      }
    } catch (error: any) {
      enqueueSnackbar("Ocorreu um erro desconhecido.", {
        variant: "error",
      });
    }
  };

  const getUserData = async () => {
    const token = Cookies.get("token-woke-mvp");

    if (!token) {
      router.push("/login");
    } else {
      const decode = jwtDecode<{ userId: string }>(token);

      try {
        const response = await userData({ id: decode.userId, token });

        if (response.error) {
          router.push("/");
        } else {
          if (response.user) {
            setUser(response.user);
            formatAndSetDateOfBirth(response.user.dateOfBirth);
          } else {
            console.log("Dados do usuário ausentes na resposta");
          }
        }
      } catch (error: any) {
        console.error("Erro ao obter dados do usuário:", error.message);
        enqueueSnackbar(
          "Ocorreu um erro desconhecido ao obter dados do usuário",
          {
            variant: "error",
          }
        );
      }
    }
  };

  const formatAndSetDateOfBirth = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setFormattedDateOfBirth(formattedDate);
  };

  const logout = () => {
    Cookies.remove("token-woke-mvp");
    router.push("/");
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="h-screen w-screen">
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
      <div className="bg-[#F1F4F8] flex flex-col items-center relative h-[200px]">
        <header className="flex items-center justify-between p-4 w-full">
          <button className="bg-[#3C36FF] px-[15px] py-[7px] font-medium text-[#f2f2f2] rounded-full">
            <Link href="/">WOKE</Link>
          </button>
          <button
            className="flex items-center gap-2 font-medium"
            onClick={() => logout()}
          >
            <ExitIcon className="w-6 h-6" />
            Sair
          </button>
        </header>
        <div className="w-[150px] h-[150px] bg-[#f2f2f2] rounded-full absolute bottom-[-50px] border-[#fff] border-[5px]" />
      </div>
      <div className="flex flex-col mt-20 w-full items-center gap-2">
        <span className="text-[22px] font-medium">{user?.fullName}</span>
        <span className="text-[#7a7c7e]">{user?.email}</span>
      </div>
      <div className="bg-[#F1F4F8] w-[90vw] lg:w-[50vw] m-[auto] mt-10 flex flex-col gap-4 p-4 rounded-xl">
        <span className="text-[22px] font-medium">Informações</span>
        <span>Telefone: {user?.phone}</span>
        <span>Data de aniversário: {formattedDateOfBirth}</span>
      </div>
      <form onSubmit={handleSendData} className="flex flex-col gap-4 mt-10 p-4">
        <label htmlFor="company" className="flex flex-col gap-2 font-medium">
          Para qual empresa deseja enviar seus dados?
          <select
            id="company"
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="border-[#d6d8dc] border-[1px] p-4 rounded-lg focus:outline-[#b9bbbf]"
            required
          >
            <option value="">Selecione...</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-[#3c36ff] p-4 rounded-lg text-[#f2f2f2]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Dashboard;