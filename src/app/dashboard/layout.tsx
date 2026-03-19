"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
    Pill,
    Code,
    LayoutDashboard,
    Key,
    CreditCard,
    Settings,
    BookOpen,
    LogOut,
    Menu,
    Bell,
    ChevronDown,
    Sun,
    Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
    { href: "/dashboard/billing", label: "Faturalandırma", icon: CreditCard },
    { href: "/dashboard/settings", label: "Ayarlar", icon: Settings },
    { href: "/dashboard/docs", label: "Dokümantasyon", icon: BookOpen },
];

function SidebarContent({ pathname, onLogout }: { pathname: string; onLogout: () => void }) {
    const user = useAppStore((s) => s.user);
    return (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/20">
                        <Pill className="w-3.5 h-3.5 text-brand-green absolute" />
                        <Code className="w-2.5 h-2.5 text-brand-blue absolute translate-x-1 translate-y-1" />
                    </div>
                    <span className="text-base font-bold text-text-primary">
                        Pharm<span className="text-brand-green">LUSH</span>
                    </span>
                </Link>
            </div>

            <div className="px-3 flex-1">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                    ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                                    : "text-text-muted hover:text-text-primary hover:bg-navy-800"
                                    }`}
                            >
                                <item.icon className="w-4.5 h-4.5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-navy-700">
                <div className="flex items-center gap-3 mb-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-semibold text-sm">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                            {user?.name || "Kullanıcı"}
                        </p>
                        <p className="text-xs text-text-muted truncate">
                            {user?.email || "user@example.com"}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-text-muted hover:text-red-400 hover:bg-red-500/5 text-sm"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                </Button>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, fetchUserProfile, fetchApiKeys } = useAppStore();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return;
        }
        if (!user) {
            fetchUserProfile().catch(() => {
                router.push('/login');
            });
            fetchApiKeys().catch(() => {});
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!mounted) {
        return <div className="min-h-screen bg-navy-950" />;
    }

    return (
        <div className="min-h-screen bg-navy-950 flex">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-60 border-r border-navy-700 bg-navy-900 fixed inset-y-0 left-0 z-30">
                <SidebarContent pathname={pathname} onLogout={handleLogout} />
            </aside>

            {/* Main area */}
            <div className="flex-1 lg:ml-60">
                {/* Topbar */}
                <header className="sticky top-0 z-20 h-16 border-b border-navy-700 bg-navy-950/80 backdrop-blur-xl flex items-center px-4 lg:px-8 justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-text-primary">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-navy-900 border-navy-700 w-60 p-0">
                                <SidebarContent pathname={pathname} onLogout={handleLogout} />
                            </SheetContent>
                        </Sheet>

                        <h1 className="text-lg font-semibold text-text-primary">
                            {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-text-muted hover:text-text-primary"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-text-muted hover:text-text-primary relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-green rounded-full" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 text-text-primary">
                                    <div className="w-7 h-7 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-semibold text-sm">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                    <span className="hidden sm:inline text-sm">
                                        {user?.name || "Kullanıcı"}
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-text-muted" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="bg-navy-900 border-navy-700 text-text-primary w-48"
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/settings" className="cursor-pointer">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Ayarlar
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-navy-700" />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-400 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Çıkış Yap
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
