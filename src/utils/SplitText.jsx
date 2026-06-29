function SplitText({

    text,

    delay = 0,

    className = ""
}) {

    return (

        <div className={`split-line ${className}`}>

            {
                text.split("").map(

                    (char, index) => (

                        <span
                            key={index}

                            style={{
                                animationDelay:
                                    `${
                                        index * 0.05 + delay
                                    }s`
                            }}
                        >

                            {
                                char === " "
                                    ? "\u00A0"
                                    : char
                            }

                        </span>
                    )
                )
            }

        </div>
    )
}

export default SplitText