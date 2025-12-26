"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import FileExplorer from "./FileExplorer";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-md shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <button
          type="button"
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 w-64 bg-background z-40 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-16">
          <FileExplorer />
        </div>
      </aside>
    </>
  );
}
