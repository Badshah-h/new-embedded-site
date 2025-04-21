import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Set initial dark mode based on system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-20 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <Sidebar
              collapsed={false}
              setCollapsed={setCollapsed}
              isMobile={true}
              setMobileOpen={setMobileOpen}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`flex flex-col transition-all ${collapsed ? "md:pl-[80px]" : "md:pl-[240px]"}`}
      >
        <Topbar
          title={pageTitle}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          setMobileOpen={setMobileOpen}
        />

        <main className="flex-1 p-4 md:p-6">
          <Outlet context={{ setPageTitle, navigate }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
