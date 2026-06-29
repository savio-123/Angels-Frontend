import "../styles/Gallery.css";


function Gallery() {

    const images = [

        "/gallery/photo1.png",
        "/gallery/photo2.png",
        "/gallery/photo3.png",
        "/gallery/photo4.png",
        "/gallery/photo5.png",
        "/gallery/photo6.png",
        "/gallery/photo7.png",
        "/gallery/photo8.png",
    ]
    return (
     <div className="gallery-section">
            <div className="container">

                <p className="gallery-small-title">

                    OUR GALLERY

                </p>

                <h2 className="gallery-main-title">

                    Moments Of Beauty

                </h2>

                <div className="gallery-grid">

                    {
                        images.map((image, index) => (

                            <div
                                className="gallery-item"
                                key={index}
                            >

                                <img
                                    src={image}
                                    alt="Gallery"
                                    className="gallery-image"
                                />

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default Gallery