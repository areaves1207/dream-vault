
import React, { useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const StarsBackground = React.memo(() => {
    const particlesInit = async (engine: Engine) => {
        await loadSlim(engine);
    };

    const options = useMemo(
        () => ({
            fullScreen: {
                enable: true,
                zIndex: -9999,
            },
            background: {
                color: "",
            },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 90,
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2.0,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: { min: 1, max: 2 },
                    random: true,
                },
            },
        }),
        []
    );

    return <Particles init={particlesInit} options={options} />;
});

export default StarsBackground;


