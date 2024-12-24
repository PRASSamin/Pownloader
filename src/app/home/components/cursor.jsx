import React from 'react'

const CursorProvider = ({ children }) => {
    React.useEffect(() => {
        const circle = document.getElementById("cursor-circle");

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            if (circle) {
                circle.style.left = `${clientX}px`;
                circle.style.top = `${clientY}px`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <React.Fragment>
            <div
                id="cursor-circle"
                className="fixed z-[1000] pointer-events-none rounded-full bg-[radial-gradient(circle,_rgba(120,_55,_209,_0.7)_0%,_rgba(255,_0,_255,_0)_60%)] w-40 h-40 -translate-x-1/2 -translate-y-1/2 scaleUp hidden md:block"
            />
            {children}
        </React.Fragment>
    )
}

export default CursorProvider
