"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "var(--card)",
                        color: "var(--card-foreground)",
                        border: "1px solid var(--border)",
                    },
                    success: {
                        iconTheme: {
                            primary: "var(--primary)",
                            secondary: "var(--primary-foreground)",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "var(--primary-foreground)",
                        },
                    },
                }}
            />
        </ThemeProvider>
    );
}
