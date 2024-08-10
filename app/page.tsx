import Link from "next/link";

export default function Home() {
  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(/clay-banks-yqozBsi5ioc-unsplash.jpg)",
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Home Sweet Home</h1>
        <p className="mb-5">
        Track your work on your house. Keep it maintained and issue free.
        </p>
        <Link href="/dashboard" className="btn btn-primary">Get Started</Link>
      </div>
    </div>
  </div>
  )
}
