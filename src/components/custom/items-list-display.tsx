// components/ItemListDisplay.js

import { setNavigationTarget } from "@/features/error-navigation-slice";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux-store/hook";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

type ItemListDisplayProps = {
  // items: Record<string, unknown>;
  items: any;
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
  const dispatch = useAppDispatch();

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

  const handleErrorPostionExtractor = (message: string) => {
    const pattern = /(\d+):(\d+)/;

    // 3. Use JavaScript's .match() method to find the pattern in the message
    const match = message.match(pattern);

    // 4. Check if a match was found
    if (match) {
      // upd
    }
  };

  const handleNavigateClick = (message: string) => {
    const pattern = /(\d+):(\d+)/;

    const match = message.match(pattern);

    if (match) {
      dispatch(
        setNavigationTarget({
          line: parseInt(match[1], 10),
          char: parseInt(match[2], 10),
        })
      );
    }
  };

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
          `transition-all overflow-auto duration-300 ease-in-out  pr-3`,
          isExpanded ? `max-h-[250px]` : "max-h-0"
        )}
      >
        {Object.entries(items).map(([itemKey, itemValue]) => (
          <div
            key={itemKey}
            className="mb-2 p-1 rounded-md bg-red-100  border-red-600 border-l-4 shadow-sm text-xs"
            onClick={() => handleNavigateClick(String(itemValue))}
          >
            <p className="text-red-600 break-all">{String(itemValue)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListDisplay;
