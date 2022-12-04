import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import { logout } from "../../../functions/logout";
import logo from "../../../public/SDVXDB_alpha.png";
import LoginButton from "../atoms/loginButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const TopAppBar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <Disclosure as="nav">
      {({ open }: { open: any }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-10 bg-white border-b">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-20 w-auto lg:hidden"
                    src={logo.src}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-20 w-auto lg:block"
                    src={logo.src}
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {user ? (
                        <img
                          className="h-8 w-8 rounded-full" /* @ts-ignore */
                          src={user?.photoURL}
                          alt=""
                        />
                      ) : (
                        <LoginButton />
                      )}
                    </Menu.Button>
                  </div>
                  {user ? (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }: { active: any }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {user?.email}としてログイン中です
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: { active: any }) => (
                            <Link
                              href="/mypage"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              マイページ
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: { active: any }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={logout}
                            >
                              ログアウト
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  ) : undefined}
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default TopAppBar;
