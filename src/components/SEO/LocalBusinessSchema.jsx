const LocalBusinessSchema = () => {

    const schema = {

        "@context": "https://schema.org",

        "@type": "BeautySalon",

        name: "Angel's Beauty Parlour",

        image: "https://angels-frontend.vercel.app/logo.png",

        url: "https://angels-frontend.vercel.app",

        telephone: "+91 8075336873",

        address: {

            "@type": "PostalAddress",

            streetAddress: "Thamarassery, Kozhikode, Kerala",

            addressLocality: "Calicut",

            addressRegion: "Kerala",

            postalCode: "673573",

            addressCountry: "IN"

        },

        openingHours: [

            "Mo-Sa 09:00-19:00"

        ],
        priceRange: "₹₹",
        sameAs: [

            "https://www.instagram.com/angelsbeautyparlourspa/",
            "https://www.facebook.com/p/Angels-Beauty-Parlour-Spa-100064090293276/"

        ]

    };

    return (

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />

    );

};

export default LocalBusinessSchema;