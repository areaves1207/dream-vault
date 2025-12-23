import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function StarsBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
        <Particles
        init={particlesInit}
        options={{
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
        }}
        />
  );
}
