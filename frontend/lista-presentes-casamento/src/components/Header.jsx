import { useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/react";


export default function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // function handleMenuToggle() {
  //   setIsMenuOpen(!isMenuOpen);
  // }

  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <div className="md:hidden">
        <Button onClick={onOpen}>
          <FiMenu />
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody className="flex flex-col gap-2">
              <Link
                className="font-playFair hover:underline hover:text-customPink"
                to="/presentes">
                PRESENTES
              </Link>
              <Link
                className="font-playFair hover:underline hover:text-customPink"
                to="/login">
                LOGIN
              </Link>
              <Link
                className="font-playFair hover:underline hover:text-customPink"
                to="/cadastrar">
                CADASTRAR
              </Link>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

  
 

