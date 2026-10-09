import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <p className="eyebrow">404 / A wrong turn</p>
      <h1>This page isn&apos;t here.</h1>
      <p>There&apos;s plenty to explore back at the portfolio.</p>
      <Link className="button button-primary" href="/">Back to the portfolio <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
