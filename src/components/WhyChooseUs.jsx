import {
    FaSpa,
    FaLeaf,
    FaHeart
} from "react-icons/fa";

import "../styles/WhyChooseUs.css";


function WhyChooseUs() {

    const features = [

        {
            icon: <FaSpa />,
            title: "Expert Beauticians",
            description:
                "Skilled professionals dedicated to enhancing your beauty."
        },

        {
            icon: <FaLeaf />,
            title: "Premium Products",
            description:
                "We use high-quality beauty and skincare products."
        },

        {
            icon: <FaHeart />,
            title: "Relaxing Environment",
            description:
                "Enjoy a calm, hygienic, and luxurious salon experience."
        }
    ]


    return (

        <div className="why-section">

            <div className="container">

            <p className="why-small-title">
            WHY CHOOSE US
            </p>
            <h2 className="why-title">
            Experience Beauty With Confidence
            </h2>

                <div className="row">

                    {
                        features.map((feature, index) => (

                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >

                                <div className="why-card">

                                    <div className="why-icon">

                                        {feature.icon}

                                    </div>

                                    <h4>

                                        {feature.title}

                                    </h4>

                                    <p>

                                        {feature.description}

                                    </p>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default WhyChooseUs