import React from "react";
import AvatarSkeleton from "../avatars/AvatarSkeleton";
import Avatar from "../avatars/Avatar";
import { checkElementImages } from "../../utils/helpers";
import { Link } from "react-router-dom";

const Podcast = ({ data }) => {
  const title = data.title ? data.title.label : "-";
  const images = data["im:image"];
  const image = checkElementImages(images);
  const artist = data["im:artist"] ? data["im:artist"].label : "-";
  const id = data["id"]?.["attributes"]?.["im:id"];

  return (
    <Link to={`/podcasts/${id}`} className="w-full pt-10 h-full block">
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
    </Link>
  );
};

export default Podcast;
