import Link from "next/link";

const MainLayout = ({ children }) => {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li className="hover:bg-gray-700 rounded-md p-2">
            <Link href="/show">
              <h1 className="text-xl font-semibold">Shows</h1>
            </Link>
          </li>
          <li className="hover:bg-gray-700 rounded-md p-2">
            <Link href="/user">
              <h1 className="text-xl font-semibold">Users</h1>
            </Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
