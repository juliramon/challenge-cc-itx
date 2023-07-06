import React from "react";

const Avatar = ({ imgSrc, imgAlt }) => {
  return (
    <div className="flex justify-center -mt-16 mb-4">
      <picture className="block w-28 h-28 rounded-full overflow-hidden">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="object-cover w-full h-full"
          aria-label="Avatar"
          loading="lazy"
        />
      </picture>
    </div>
  );
};

export default Avatar;
