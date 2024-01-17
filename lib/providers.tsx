
import ReduxProvider from "@/redux/provider";
import ThemeProvider from "@/components/theme-provider"

const Providers = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
}

export default Providers;