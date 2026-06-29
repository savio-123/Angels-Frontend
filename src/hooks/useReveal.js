import { useEffect, useRef, useState } from "react";

const useReveal = () => {

    const ref = useRef();

    const [visible, setVisible] =
        useState(false);

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

    return [ref, visible];
};

export default useReveal;