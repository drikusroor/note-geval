"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import FileExplorer from "./FileExplorer";
import { Button } from "./ui/button";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed top-4 left-4 z-50 shadow-lg"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="pt-16 h-full overflow-y-auto">
            <FileExplorer />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}