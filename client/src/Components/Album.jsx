const Album = ({album}) => {
    
    return (
        <div className="album">
          <h3>Album: {album.id}</h3>
          <p>{album.title}</p>
          </div>
  );
};

export default Album;