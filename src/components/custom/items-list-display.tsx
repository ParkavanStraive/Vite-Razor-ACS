// components/ItemListDisplay.js

import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import React, { useState } from "react";

type ItemListDisplayProps = {
  items: Record<string, unknown>;
  title: string;
  themeColor?: string;
  defaultExpanded?: boolean;
};

const ItemListDisplay = ({
  items,
  title,
  defaultExpanded = false,
}: ItemListDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!items || Object.keys(items).length === 0) {
    return (
      <p className="text-sm text-gray-500 px-2 py-1">
        No {title.toLowerCase().replace("list of ", "")} found.
      </p>
    );
  }

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const itemCount = Object.keys(items).length;

  return (
    <div className="mt-4">
      <div
        onClick={toggleExpand}
        className={`cursor-pointer  flex justify-between items-center`}
      >
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          {title} ({itemCount})
        </h3>
        <span
          className={`text-lg transform transition-transform duration-200 ease-in-out ${
            isExpanded ? "rotate-0" : "-rotate-90"
          }`}
        >
          <ArrowDown />
        </span>
      </div>
      <div
        className={cn(
          `transition-all overflow-auto duration-300 ease-in-out rounded-md pr-3`,
          isExpanded ? `max-h-[250px]` : "max-h-0"
        )}
      >
        {Object.entries(items).map(([itemKey, itemValue]) => (
          <div
            key={itemKey}
            className="mb-2 p-1 rounded bg-white shadow-sm text-xs"
          >
            <p className="text-gray-800">{String(itemValue)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListDisplay;
