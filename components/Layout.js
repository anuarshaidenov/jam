import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <header className="text-center flex justify-center py-12">
        <Link href="/">
          <a>
            <h2 className="uppercase font-medium text-4xl">Just Add</h2>
            <h1 className="uppercase font-bold text-6xl">Marmide</h1>
            <h3 className="uppercase font-normal text-2xl">Spread the joy</h3>
          </a>
        </Link>
      </header>
      <main>{children}</main>
      <footer className="text-center w-full bg-black text-white text-lg py-12">
        Copyright &copy; 2022
      </footer>
    </>
  );
};

export default Layout;
