import { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({
    children,
    animation = "zoom"
}) => {

    const [visible, setVisible] =
        useState(false);

    const ref = useRef();

    useEffect(() => {

        const observer =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setVisible(true);

                        observer.unobserve(
                            entry.target
                        );
                    }
                },

                {
                    threshold: 0.15
                }
            );

        if (ref.current) {

            observer.observe(
                ref.current
            );
        }

        return () =>
            observer.disconnect();

    }, []);

    return (

        <div
    
            ref={ref}
    
            className={`
                reveal-section
                ${animation}
                ${
                    visible
                        ? "revealed"
                        : ""
                }
            `}
        >
    
            {children}
    
        </div>
    );
};

export default RevealOnScroll;