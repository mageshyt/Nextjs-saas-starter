import React from "react";
import MobileSidebar from "./mobile-sidebar";
import UserProfile from "./nav-user";
import Searchbar from "./search-bar";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary ">
      <div className="mx-4 sm:mx-8 flex h-16 items-center" >
        <MobileSidebar />
        {/* Search bar */}
        <div className="flex-1 flex items-center  justify-center ">
          <Searchbar />
        </div>
        {/* User Profile */}
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserProfile />
        </div>
      </div>

    </header>
  );
};

export default Navbar;

