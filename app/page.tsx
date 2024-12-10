import Link from "next/link";

export default function Home() {

  return (
    <div className="grid gap-10">
      <span>Devl links</span>

      <Link href={'/providers'}>Providers</Link>
    </div>
  );
}
