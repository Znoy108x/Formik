import Image from "next/image";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <main className="h-full flex flex-col bg-background max-h-screen">
      <Navbar />
    </main>
  );
}
