"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");


  return (
    <div className="relative">
      <Search className="absolute  size-4 top-3 left-3 dark:text-slate-300 text-slate-600" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full   md:w-[450px] pl-9  rounded-md dark:bg-neutral-900 bg-slate-100 dark:focus-visible:ring-slate-200 focus-visible:ring-slate-700"
        placeholder="Search for anything"
      />
    </div>
  );
};

export default Searchbar;

