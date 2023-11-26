import React, { useState } from "react";
import Header from "./mobile/Header";
import Collapse from "./mobile/Collapse";

interface NavigationProps {}
const Navigation: React.FC<NavigationProps> = (props) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" h-[600px] px-[20px] lg:px-[40px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[10px]">
      <Header expanded={expanded} toggleExpanded={toggleExpanded} />
      {expanded && <Collapse className="mt-[57px]" />}
    </div>
  );
};

export default Navigation;
