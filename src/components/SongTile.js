import React from "react";

const SongTile = (props) => {
  
  const handleClick = () => {
    props.handleTileClick(props.song)
  };

  return (
     <div className="w-80 h-80 m-5 bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
    <img
      src={props.song?.album.images[0].url}
      alt={`${props.song?.name} album artwork`}
      className="w-full h-32 object-contain pt-6"
    />
    <div className="p-6">
      <h2 className="text-white text-2xl font-semibold mb-2">
        {props.song?.name}
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        {props.song?.artists[0].name}
      </p>
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded" onClick={handleClick}>
        Select
      </button>
    </div>
  </div>
  );
}

export default SongTile;
