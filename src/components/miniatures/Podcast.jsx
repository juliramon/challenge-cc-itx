import React from "react";
import AvatarSkeleton from "../avatars/AvatarSkeleton";
import Avatar from "../avatars/Avatar";
import checkElementImages from "../../utils/helpers";

const Podcast = ({ data }) => {
  const title = data.title ? data.title.label : "-";
  const images = data["im:image"];
  const image = checkElementImages(images);
  const artist = data["im:artist"] ? data["im:artist"].label : "-";

  return (
    <div className="w-full pt-10 h-full">
      <div className="border border-gray-200 rounded p-6 h-full shadow-md">
        {images.length === 0 || image === null ? (
          <AvatarSkeleton />
        ) : (
          <Avatar imgSrc={image} imgAlt={title} />
        )}
        <h3 className="w-full mb-2.5 text-center uppercase">{title}</h3>
        <div className="text-center text-gray-400 text-sm">
          Author: {artist}
        </div>
      </div>
    </div>
  );
};

export default Podcast;
