import React from "react";

const CardInfo = ({ icon, title, description }) => {
  return (
    <div className="flex items-center border p-2">
      {icon}
      <div className="flex flex-col ml-4">
        <span className="text-sm">{title}</span>
        <span className="text-[10px]">{description}</span>
      </div>
    </div>
  );
};

export default CardInfo;
