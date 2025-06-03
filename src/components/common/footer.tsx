import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <div className="px-4 flex items-center justify-end h-full">
      <div className="h-full flex items-center justify-end text-xs font-bold">
        &#169; Straive {date.getFullYear()} | Version 25.03.03.01
      </div>
    </div>
  );
};

export default Footer;
