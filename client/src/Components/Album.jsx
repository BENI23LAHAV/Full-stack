const Album = ({album}) => {
    
    return (
        <div className="album border">
          <h3>Album: {album.id}</h3>
          <p>{album.title}</p>
          </div>
  );
};

export default Album;