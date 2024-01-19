"use client"

// STATE
import { useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// COMPONENT
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const Profile = () => {
    const { name, email } = useAppSelector((state) => state.authSlice.value);
    const dispatch = useAppDispatch();

    const handleSignout = async () => {
        dispatch(logOut())
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>{name.split(' ').map(val => val.toUpperCase().charAt(0)).join(' ')}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {name}
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile;