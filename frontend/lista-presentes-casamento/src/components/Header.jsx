import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="flex justify-between py-4 px-10 gap-4 items-center fixed min-w-full bg-customBg">
      <Link to="/">
        <h2 className="font-italianno text-4xl">M & J</h2>
      </Link>
      <div className="hidden md:flex gap-4 font-playFair text-md ">
        <Link className="hover:text-customPink hover:underline" to="/presentes">
          PRESENTES
        </Link>
        <Link className="hover:text-customPink hover:underline" to="/login">
          ENTRAR
        </Link>
        <Link className="hover:text-customPink hover:underline" to="/cadastrar">
          CADASTRAR
        </Link>
      </div>

      <div className="md:hidden font-playFair w-auto flex flex-col  items-end">
        <Menu>
          <Menu.Button className="text-xl" onClick={handleMenuToggle}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0">
            <Menu.Items
              className={`${
                isMenuOpen ? "block" : "hidden"
              } py-2 font-medium text-gray-700 justify-end`}>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/presentes"
                    className={` flex px-4  ${
                      active ? " text-customPink underline" : "text-gray-700"
                    }`}
                    onClick={handleMenuToggle}>
                    PRESENTES
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/login"
                    className={` flex px-4 ${
                      active ? " text-customPink underline" : "text-gray-700"
                    }`}
                    onClick={handleMenuToggle}>
                    ENTRAR
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/cadastrar"
                    className={` flex px-4 ${
                      active ? " text-customPink underline" : "text-gray-700"
                    }`}
                    onClick={handleMenuToggle}>
                    CADASTRAR
                  </Link>
                )}
              </Menu.Item>
              {/* Adicione os outros itens do menu aqui */}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
