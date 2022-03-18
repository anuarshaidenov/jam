import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/'), 4000);
  }, [router]);

  return (
    <section className="container max-w-4xl w-11/12 py-8 min-h-screen">
      <h1 className="font-bold mb-3 text-7xl">404</h1>
      <h2 className="font-bold text-xl mb-2">
        Oops! That page can not be found :(
      </h2>
      <p>
        Redirecting to{' '}
        <Link href="/">
          <a className="underline">homepage</a>
        </Link>{' '}
        and look at the food youre never gonna cook.
      </p>
    </section>
  );
};

export default NotFound;
