import Image from "next/image";
import { Background } from "./Background";
import { Header } from "./Header";

export default function Home() {
  return (
    <>
      <Background></Background>
      <main className="flex flex-col w-full justify-center z-1">
        <Header />
      </main>
    </>
  );
}
