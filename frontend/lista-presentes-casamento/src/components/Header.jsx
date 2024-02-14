import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";

export default function Header() {
  const [isIconVisible, setIsIconVisible] = useState(true);
  return (
    <div className="flex justify-between py-4 px-20 gap-4 items-center">
      <Link to="/">
        <h2 className="font-italianno text-4xl">M & J</h2>
      </Link>

      <div className="hidden md:flex gap-4 font-playFair text-md">
        <Link to="/presentes">PRESENTES</Link>
        <Link to="/login">ENTRAR</Link>
        <Link to="/cadastrar">CADASTRAR</Link>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${isIconVisible ? "block" : "hidden"} md:hidden`}
              onClick={() => setIsIconVisible(false)}>
              <FaBars />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              <Disclosure.Panel
                as="ul"
                className="md:hidden flex flex-col gap-2 text-center mx-auto">
                <Link to="/presentes">PRESENTES</Link>
                <Link to="/login">ENTRAR</Link>
                <Link to="/cadastrar">CADASTRAR</Link>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
