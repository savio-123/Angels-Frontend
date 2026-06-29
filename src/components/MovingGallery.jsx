import "../styles/MovingGallery.css";

const images = [

    "/gallery/photo1.png",
    "/gallery/photo2.png",
    "/gallery/photo3.png",  
    "/gallery/photo4.png",
    "/gallery/photo5.png",
    "/gallery/photo6.png",
    "/gallery/photo7.png",
    "/gallery/photo8.png",
];

function MovingGallery() {

    return (

        <section className="moving-gallery-section">

            <div className="moving-gallery-track">

                {
                    [...images, ...images].map(
                        (image, index) => (

                            <div
                                className="moving-gallery-item"
                                key={index}
                            >

                                <img
                                    src={image}
                                    alt=""
                                    className="
                                        moving-gallery-image
                                    "
                                />

                            </div>
                        )
                    )
                }

            </div>

        </section>
    )
}

export default MovingGallery;