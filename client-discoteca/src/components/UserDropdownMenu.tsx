import { Avatar, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from '@nextui-org/react'
import { User } from '../types'
import { useAuth } from './hooks/useAuth';
import { handleLogout } from '../lib/axios';

interface UserDropdownProps {
    user: User;
}

const UserDropdownMenu = ({ user } : UserDropdownProps) => {
    const { logout, token } = useAuth();

    const onPress = () => {
        handleLogout(user.id, { logout }, token);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={user.name}
                    size="sm"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2 ">
                    <p className="font-semibold text-black">{user.name}</p>
                    <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={onPress} >
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserDropdownMenu
