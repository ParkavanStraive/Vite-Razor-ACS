import React from "react";

const SkeletonBase = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
  ></div>
);

// Skeleton for a line of text
const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <SkeletonBase className={`${width} ${height} ${className}`} />
);

// Skeleton for an XML attribute (name and value)
const SkeletonAttribute = ({ className = "" }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <SkeletonText width="w-16" height="h-3" /> {/* Attribute name */}
    <SkeletonText width="w-1" height="h-3" /> {/* Equals sign */}
    <SkeletonText width="w-24" height="h-3" /> {/* Attribute value */}
  </div>
);

// Skeleton for a single XML element
const SkeletonXmlElement = ({
  tagNameWidth = "w-20",
  hasAttributes = false,
  hasChildren = false,
  indentLevel = 0,
  className = "",
}) => {
  const indentClass = `ml-${indentLevel * 4}`; // e.g., ml-0, ml-4, ml-8

  return (
    <div className={`py-2 ${indentClass} ${className}`}>
      {/* Element Tag Opener */}
      <div className="flex items-center space-x-2 mb-1">
        <SkeletonText width={tagNameWidth} height="h-5" /> {/* Tag name */}
        {hasAttributes && (
          <div className="flex space-x-2">
            <SkeletonAttribute />
            {Math.random() > 0.5 && <SkeletonAttribute />}{" "}
            {/* Randomly add a second attribute */}
          </div>
        )}
      </div>

      {/* Element Content/Children */}
      {hasChildren && (
        <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600">
          {/* Nested child skeleton - could be another XmlElement or just text */}
          {React.Children.toArray(
            Array.from({ length: Math.floor(Math.random() * 2) + 1 })
          ).map((_, i) => (
            <SkeletonXmlElement
              key={i}
              tagNameWidth="w-16"
              hasAttributes={Math.random() > 0.3}
              hasChildren={indentLevel < 1 && Math.random() > 0.4} // Limit nesting depth for skeleton
              indentLevel={0} // Child elements within this component are not further indented by this prop directly
              className="my-1"
            />
          ))}
          <SkeletonText width="w-3/4" className="my-1" />
          {Math.random() > 0.5 && (
            <SkeletonText width="w-1/2" className="my-1" />
          )}
        </div>
      )}

      {/* Element Tag Closer (simplified, not showing actual closing tag) */}
      {!hasChildren && !hasAttributes && (
        <SkeletonText width="w-1/2" height="h-4" className="ml-4 my-1" />
      )}
    </div>
  );
};

export const XmlSkeleton = () => (
  <>
    <SkeletonXmlElement hasAttributes hasChildren indentLevel={0} />
    <SkeletonXmlElement
      tagNameWidth="w-24"
      hasChildren
      indentLevel={0}
      className="mt-3"
    />
    <SkeletonXmlElement
      tagNameWidth="w-28"
      hasAttributes
      indentLevel={0}
      className="mt-3"
    />
    <SkeletonXmlElement hasAttributes hasChildren indentLevel={0} />
    <SkeletonXmlElement
      tagNameWidth="w-24"
      hasChildren
      indentLevel={0}
      className="mt-3"
    />
    <SkeletonXmlElement
      tagNameWidth="w-28"
      hasAttributes
      indentLevel={0}
      className="mt-3"
    />
  </>
);
