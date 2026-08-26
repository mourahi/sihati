import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Scene3D } from "./Scene3D";
import { useTheme } from "../lib/theme.tsx";

type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className="relative flex min-h-dvh flex-col bg-canvas text-ink">
      {theme === "three" ? <Scene3D /> : null}
      <Header />
      <main className="relative z-10 flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
