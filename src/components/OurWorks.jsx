import {
    FaInstagram,
    FaPlay
} from "react-icons/fa";

import "../styles/OurWorks.css";


function OurWorks() {

    const reels = [

        {
            thumbnail: "/works/Screenshot 2026-05-24 111410.png",

            link:
                "https://www.instagram.com/reel/DWgAOGMjkEI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        },

        {
            thumbnail: "/works/Screenshot 2026-05-24 111359.png",

            link:
                "https://www.instagram.com/reel/DWdsL7uDgni/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        },

        {
            thumbnail: "/works/Screenshot 2026-05-24 111349.png",

            link:
                "https://www.instagram.com/reel/DXLkFmhucRP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        },

        {
            thumbnail: "/works/Screenshot 2026-05-24 111326.png",

            link:
                "https://www.instagram.com/reel/DXY6lzrILPk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        }
    ]


    return (

        <div className="works-section">

            <div className="container-fluid">

                <p className="works-small-title">

                    OUR WORKS

                </p>

                <h2 className="works-main-title">

                    See Our Transformations

                </h2>

                <div className="row g-4">

                    {
                        reels.map((reel, index) => (

                            <div
                                className="col-md-3"
                                key={index}
                            >

                                <a
                                    href={reel.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="work-card"
                                >

                                    <img
                                        src={reel.thumbnail}
                                        alt="Work"
                                        className="work-image"
                                    />

                                    <div className="work-overlay">

                                        <div className="play-icon">

                                            <FaPlay />

                                        </div>

                                        <div className="insta-icon">

                                            <FaInstagram />

                                        </div>

                                    </div>

                                </a>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default OurWorks