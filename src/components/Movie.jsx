export function Movie(props) {
    const {Poster: poster, Title: title, Type: type, Year: year, imdbID: id} = props;
    return <div id={id} className="card">
    <div className="card-image">
        {
            poster === 'N/A' ? (
                <img src="https://via.placeholder.com/300x400.png?text=Not+poster" alt="poster" />
            ) : (<img src={poster} alt="poster" />)
        }
    </div>
    <div className="card-content">
        <span className="card-title">{title}</span>
        <p>{year} <span className="right">{type}</span></p>
    </div>
    </div>
} 