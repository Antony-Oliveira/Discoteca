import React from "react";
import { Navbar as UINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import LoginFormModal from './Auth/LoginFormModal';
import RegisterModalForm from "./Auth/RegisterFormModal";
import { useAuth } from "./hooks/useAuth";
import UserDropdownMenu from "./UserDropdownMenu";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user } = useAuth();
    const menuItems = [
        "Ínicio",
        "Login",
        "Cadastro",
        "Log Out",
    ];

    return (
        <UINavbar onMenuOpenChange={setIsMenuOpen} style={{ background: '#333333' }} shouldHideOnScroll={true}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <a href="/" className="font-bold text-inherit text-white">Tião Carreiro e Pardinho</a>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link style={{ color: '#FFFFFF' }} href="/" >
                        Ínicio
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" style={{ color: '#FFFFFF' }}>
                        Contato
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link style={{ color: '#FFFFFF' }} href="#">
                        Sobre
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!user ? (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <RegisterModalForm />
                        </NavbarItem>
                        <NavbarItem>
                            <LoginFormModal >
                            </LoginFormModal>
                        </NavbarItem>
                    </>
                ) : <UserDropdownMenu user={user} />}
            </NavbarContent>
            <NavbarMenu className="text-white">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </UINavbar>
    );
}
