import { Link } from "react-router-dom";


export default function NotFoundPage() {
  return (
    <main className="centered-page">
      <div className="empty-card">
        <p className="error-code">404</p>
        <h1>This address is not on the map.</h1>
        <p>The page may have moved or the URL may be incorrect.</p>
        <Link className="text-link" to="/">
          Return home →
        </Link>
      </div>
    </main>
  );
}
