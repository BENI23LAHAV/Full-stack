const Photo = ({photo}) => {
    // console.log(photo);
    return (
        <div className="photo">
          <h4>Photo id: {photo.id}</h4>
          <p>{photo.title}</p>
          <img src={`${photo.thumbail_url}`} alt="thumbnailUrl error"/>
          </div>
  );
};

export default Photo;