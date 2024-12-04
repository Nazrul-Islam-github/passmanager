"use client";
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { useDebounce } from "@uidotdev/usehooks";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
//
export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);


 





  return (
    <div className="relative w-3/4 mr-1">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <SidebarInput
        id="search"
        placeholder="Search password..."
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="pl-8 h-12 inline-block"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </div>
  );
}
