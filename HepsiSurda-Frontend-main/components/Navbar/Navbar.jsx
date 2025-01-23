import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserById } from "../../network/lib/user";
import { FaShoppingBasket } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdContacts } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Çıkış yapma işlemi
  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'ı sil
    localStorage.removeItem("user_id"); // User ID'yi sil
    setIsLoggedIn(false); // Giriş durumunu güncelle
    window.location.href = "/login"; // Kullanıcıyı giriş ekranına yönlendir
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);

      getUserById(localStorage.getItem("user_id"))
        .then((res) => {
          setIsAdmin(res.data.isadmin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-500 p-6 w-screen">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            HepsiSurda
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <div className="block lg:inline-block hover:text-white mr-4">
                <VscAccount className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            <Link href="/cart">
              <div className="block lg:inline-block  hover:text-white mr-4">
                <FaShoppingBasket className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            <Link href="/contact">
              <div className="block lg:inline-block hover:text-white mr-4 cursor-pointer">
                <MdContacts className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            {/* Log Out Butonu */}
            <div
              className="block lg:inline-block hover:text-white mr-4 cursor-pointer"
              onClick={handleLogout}
            >
              Çıkış Yap
            </div>
          </>
        ) : (
          <Link href="/login">
            <div className="block lg:inline-block  hover:text-white mr-4">
              Giriş Yap/Kaydol
            </div>
          </Link>
        )}

        {isAdmin && (
          <Link href="/admin">
            <div className="block mt-4 lg:inline-block lg:mt-0  hover:text-white">
              Admin
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
