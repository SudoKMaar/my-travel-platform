import Featured from "@/components/featured";
import Search from "@/components/search";

export default function Home() {
  return (
    <main className="max-w-[100vw] overflow-x-hidden">
      <Search />
      <Featured />
    </main>
  );
}
