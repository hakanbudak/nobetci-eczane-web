"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Pill, Code, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
    { href: "/#features", label: "Özellikler" },
    { href: "/pricing", label: "Fiyatlandırma" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "Hakkımızda" },
    { href: "/contact", label: "İletişim" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "glass border-b border-navy-700"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 group-hover:bg-brand-green/20 transition-colors">
                            <Pill className="w-4 h-4 text-brand-green absolute" />
                            <Code className="w-3 h-3 text-brand-blue absolute translate-x-1.5 translate-y-1.5" />
                        </div>
                        <span className="text-lg font-bold text-text-primary">
                            Pharm<span className="text-brand-green">LUSH</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm text-text-muted hover:text-text-primary transition-colors rounded-md hover:bg-white/5"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-text-muted hover:text-text-primary"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-4.5 h-4.5" />
                            ) : (
                                <Moon className="w-4.5 h-4.5" />
                            )}
                        </Button>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-navy-700 text-text-primary hover:bg-navy-700/50 bg-transparent"
                            >
                                Giriş Yap
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                size="sm"
                                className="bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold"
                            >
                                Ücretsiz Başla
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-text-primary">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-navy-900 border-navy-700 w-72"
                        >
                            <div className="flex flex-col gap-6 mt-8">
                                <nav className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className="px-4 py-3 text-sm text-text-muted hover:text-text-primary hover:bg-navy-800 rounded-lg transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-3 px-4">
                                    <Button
                                        variant="outline"
                                        onClick={toggleTheme}
                                        className="w-full border-navy-700 text-text-primary hover:bg-navy-700/50 bg-transparent justify-start gap-2"
                                    >
                                        {theme === "dark" ? (
                                            <><Sun className="w-4 h-4" /> Aydınlık Mod</>
                                        ) : (
                                            <><Moon className="w-4 h-4" /> Karanlık Mod</>
                                        )}
                                    </Button>
                                    <Link href="/login" onClick={() => setOpen(false)}>
                                        <Button
                                            variant="outline"
                                            className="w-full border-navy-700 text-text-primary hover:bg-navy-700/50 bg-transparent"
                                        >
                                            Giriş Yap
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setOpen(false)}>
                                        <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-navy-950 font-semibold">
                                            Ücretsiz Başla
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
