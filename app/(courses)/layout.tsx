import Nav from '@/components/navbar/Nav'

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header className='w-screen'>
                <Nav />
            </header>
            {children}
        </>
    )
}
