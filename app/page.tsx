"use client";

import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Fev", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "Mai", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
  { month: "Jul", desktop: 186, mobile: 80 },
  { month: "Ago", desktop: 305, mobile: 200 },
  { month: "Set", desktop: 237, mobile: 120 },
  { month: "Out", desktop: 73, mobile: 190 },
  { month: "Nov", desktop: 209, mobile: 130 },
  { month: "Dez", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const Home = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="p-4 flex items-center justify-between">
        <button className="bg-[#3C36FF] px-[15px] py-[7px] font-medium text-[#f2f2f2] rounded-full">
          <Link href="/">WOKE</Link>
        </button>
        <div className="flex items-center gap-6">
          <button className="font-medium">
            <Link href="/login">Entrar</Link>
          </button>
          <button className="bg-[#3C36FF] px-[15px] py-[7px] font-medium text-[#f2f2f2] rounded-full">
            <Link href="/register">Quero ser Woke!</Link>
          </button>
        </div>
      </header>
      <div className="flex flex-col p-4 gap-10">
        <div className="flex items-center gap-2 justify-center border-[#0e76a8] border-[1px] px-[15px] py-[7px] rounded-full m-[auto]">
          <LinkedInLogoIcon className="w-[24px] h-[24px] text-[#0e76a8]" />
          <span className="text-[#0e76a8]">Agora integrado com LinkedIn</span>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-[40px] xl:w-[800px] xl:text-[62px] xl:m-[auto]">
            Sua plataforma parceira quando o assunto é alcançar seus objetivos
          </h1>
          <p className="text-center text-[#7a7c7e] xl:w-[800px] xl:m-[auto]">
            Envie suas informações para empresas do seu interesse, gerencie seu
            perfil em segundos e receba dicas de posicionamento profissional.
          </p>
        </div>
      </div>
      <div className="h-full flex w-full overflow-hidden xl:w-screen">
        <ChartContainer style={{width: "100vw"}} config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Home;
