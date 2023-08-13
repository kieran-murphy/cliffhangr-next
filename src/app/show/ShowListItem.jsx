import { userAgent } from "next/server";
import React, { useState } from "react";

const ShowListItem = ({ show }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div
      className="border border-cyan-400 cursor-pointer m-4 w-1/3"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? (
        <h1 className="text-bold">{show.title}</h1>
      ) : (
        <div>
          <h1 className="text-bold">{show.title}</h1>
          <ul>
            <li>review 1</li>
            <li>review 2</li>
            <li>review 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowListItem;
