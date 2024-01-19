
// NODE MODULES
import { usePathname } from 'next/navigation';
import { AlignJustify } from "lucide-react";

// UI
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link";

// UTILS
import { NAV_MENU } from "@/lib/constants";
import { Separator } from '@radix-ui/react-dropdown-menu';

const MobileMenu = () => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    aria-label='Open mobile menu'
                    className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors bg-background dark:border-neutral-700 dark:bg-background dark:text-white md:hidden'
                >
                    <AlignJustify />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>COURSE FINDER</SheetTitle>
                </SheetHeader>


                <div className="flex w-full flex-col gap-y-4 items-center mt-8">
                    {NAV_MENU.map(({ title, link }) => {
                        const isNavLinkActive = pathname === link;
                        const variant = isNavLinkActive ? "default" : "outline"
                        return (<Button className="min-w-full " key={title} asChild variant={variant}>
                            <Link href={link}>
                                {title}
                            </Link>
                        </Button>)
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu;


{/* className={`text-neutral-500 underline-offset-4 hover:text-primary hover:underline dark:text-neutral-400 dark:hover:text-primary ${isNavLinkActive && "text-primary dark:text-primary"}`} */}