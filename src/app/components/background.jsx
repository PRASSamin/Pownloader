"use client"
import { useRef, useEffect } from "react";

const BackgroundAnimation = () => {
    const canvasRefs = useRef([]);

    useEffect(() => {
        const config = {
            circle: {
                amount: 18,
                layer: 3,
                color: [120, 55, 209],
                alpha: 0.3,
            },
            line: {
                amount: 12,
                layer: 3,
                color: [255, 255, 255],
                alpha: 0.3,
            },
            speed: 0.5,
            angle: 20,
        };

        const background = canvasRefs.current[0];
        const foreground1 = canvasRefs.current[1];
        const foreground2 = canvasRefs.current[2];

        if (background && foreground1 && foreground2) {
            const bctx = background.getContext("2d");
            const fctx1 = foreground1.getContext("2d");
            const fctx2 = foreground2.getContext("2d");
            const M = Math;
            const degree = (config.angle / 360) * M.PI * 2;

            let wWidth, wHeight;
            let circles = [];
            let lines = [];
            let timer;

            const setCanvasSize = () => {
                wWidth = window.innerWidth;
                wHeight = window.innerHeight;
                canvasRefs.current.forEach((canvas) => {
                    if (canvas) {
                        canvas.width = wWidth;
                        canvas.height = wHeight;
                    }
                });
            };

            const drawCircle = (x, y, radius, color, alpha) => {
                const gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
                gradient.addColorStop(0, `rgba(${color.join(",")},${alpha})`);
                gradient.addColorStop(1, `rgba(${color.join(",")},${alpha - 0.1})`);

                fctx1.beginPath();
                fctx1.arc(x, y, radius, 0, M.PI * 2, true);
                fctx1.fillStyle = gradient;
                fctx1.fill();
            };

            const drawLine = (x, y, width, color, alpha) => {
                const endX = x + M.sin(degree) * width;
                const endY = y - M.cos(degree) * width;
                const gradient = fctx2.createLinearGradient(x, y, endX, endY);
                gradient.addColorStop(0, `rgba(${color.join(",")},${alpha})`);
                gradient.addColorStop(1, `rgba(${color.join(",")},${alpha - 0.1})`);

                fctx2.beginPath();
                fctx2.moveTo(x, y);
                fctx2.lineTo(endX, endY);
                fctx2.lineWidth = 3;
                fctx2.lineCap = "round";
                fctx2.strokeStyle = gradient;
                fctx2.stroke();
            };

            const drawBack = () => {
                bctx.clearRect(0, 0, wWidth, wHeight);

                const gradient1 = bctx.createRadialGradient(
                    wWidth * 0.3,
                    wHeight * 0.1,
                    0,
                    wWidth * 0.3,
                    wHeight * 0.1,
                    wWidth * 0.9
                );
                gradient1.addColorStop(0, "rgb(0, 26, 77)");
                gradient1.addColorStop(1, "transparent");

                bctx.beginPath();
                bctx.fillStyle = gradient1;
                bctx.fillRect(0, 0, wWidth, wHeight);
            };

            const animate = () => {
                const sin = M.sin(degree);
                const cos = M.cos(degree);

                if (config.circle.amount > 0 && config.circle.layer > 0) {
                    fctx1.clearRect(0, 0, wWidth, wHeight);
                    circles.forEach((item) => {
                        const { radius, speed } = item;

                        item.x =
                            item.x > wWidth + radius
                                ? -radius
                                : item.x < -radius
                                    ? wWidth + radius
                                    : item.x + sin * speed;

                        item.y =
                            item.y > wHeight + radius
                                ? -radius
                                : item.y < -radius
                                    ? wHeight + radius
                                    : item.y - cos * speed;

                        drawCircle(item.x, item.y, radius, item.color, item.alpha);
                    });
                }

                if (config.line.amount > 0 && config.line.layer > 0) {
                    fctx2.clearRect(0, 0, wWidth, wHeight);
                    lines.forEach((item) => {
                        const { width, speed } = item;

                        item.x =
                            item.x > wWidth + width * sin
                                ? -width * sin
                                : item.x < -width * sin
                                    ? wWidth + width * sin
                                    : item.x + sin * speed;

                        item.y =
                            item.y > wHeight + width * cos
                                ? -width * cos
                                : item.y < -width * cos
                                    ? wHeight + width * cos
                                    : item.y - cos * speed;

                        drawLine(item.x, item.y, width, item.color, item.alpha);
                    });
                }

                timer = requestAnimationFrame(animate);
            };

            const createItems = () => {
                circles = [];
                lines = [];

                for (let i = 0; i < config.circle.amount / config.circle.layer; i++) {
                    for (let j = 0; j < config.circle.layer; j++) {
                        circles.push({
                            x: M.random() * wWidth,
                            y: M.random() * wHeight,
                            radius: M.random() * (20 + j * 5) + (20 + j * 5),
                            color: config.circle.color,
                            alpha: M.random() * 0.2 + (config.circle.alpha - j * 0.1),
                            speed: config.speed * (1 + j * 0.5),
                        });
                    }
                }

                for (let i = 0; i < config.line.amount / config.line.layer; i++) {
                    for (let j = 0; j < config.line.layer; j++) {
                        lines.push({
                            x: M.random() * wWidth,
                            y: M.random() * wHeight,
                            width: M.random() * (20 + j * 5) + (20 + j * 5),
                            color: config.line.color,
                            alpha: M.random() * 0.2 + (config.line.alpha - j * 0.1),
                            speed: config.speed * (1 + j * 0.5),
                        });
                    }
                }

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animate);
                drawBack();
            };

            setCanvasSize();
            createItems();

            window.addEventListener("resize", () => {
                setCanvasSize();
                createItems();
            });

            return () => {
                cancelAnimationFrame(timer);
                window.removeEventListener("resize", setCanvasSize);
            };
        }
    }, []);

    return (
        <div id="bg" className="fixed top-0 left-0 z-[-1] h-full w-full">
            <canvas className="hidden" ref={(el) => (canvasRefs.current[0] = el)} />
            <canvas ref={(el) => (canvasRefs.current[1] = el)} />
            <canvas className="fixed top-0 left-0 z-[-1]" ref={(el) => (canvasRefs.current[2] = el)} />
        </div>
    );
};

export default BackgroundAnimation;