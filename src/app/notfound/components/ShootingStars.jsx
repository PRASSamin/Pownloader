import React, { useEffect, useState } from "react";

const ShootingStars = () => {
    const [position, setPosition] = useState(getRandomPosition());
    const [angle, setAngle] = useState(getRandomAngle());

    // Generate a random position (left or right side)
    function getRandomPosition() {
        const side = Math.random() > 0.5 ? "left" : "right";
        const randomPercent = Math.random() * 100;
        return { side, percent: randomPercent };
    }

    // Generate a random angle for the falling path
    function getRandomAngle() {
        return Math.random() * (30 - 10) + 10; 
    }

    useEffect(() => {
        // Update position and angle after each animation cycle
        const interval = setInterval(() => {
            setPosition(getRandomPosition());
            setAngle(getRandomAngle());
        }, 5000); 

        return () => clearInterval(interval); 
    }, []);

    const style = {
        [position.side]: `${position.percent}%`,
    };

    const startContainerStyle = {
        transform: `rotate(${angle}deg)`,
    };

    return (
        <div style={startContainerStyle} className="w-full h-full inset-0 absolute">
            <div
                className="absolute top-0 w-1 bg-gradient-to-tr from-white to-transparent rounded-full shadow-[0_0_16px_#fff] falling"
                style={style}
            />
        </div>
    )
}

export default ShootingStars
