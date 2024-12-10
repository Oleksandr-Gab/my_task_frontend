import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <Link to="/">Back to home page!</Link>
      <b>Opps! Not Found!</b>
    </div>
  );
}
