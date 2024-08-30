import Link from "next/link";



const NotAuthorized = () => {
  return (
    <div
    className="hero min-h-screen">
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Home Sweet Home</h1>
        <p className="mb-5">
        You are not authorized to view this content or take this action.
        </p>
        <Link href="/dashboard" className="btn btn-primary">Get Back</Link>
      </div>
    </div>
  </div>
  )
}

export default NotAuthorized