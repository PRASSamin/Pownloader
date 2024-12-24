const Bird = () => {
    return (
        <>
            {[...Array(6)].map((_, index) => (
                <div
                    style={{
                        transform: "translate3d(-100vw, 0, 0) rotateY(90deg)",
                        transformStyle: "preserve-3d",
                        animation: `bird${index + 1} 30s linear infinite forwards`,
                        animationDelay: index === 0 ? "0s" : `${Math.random() * (15 - 3 + 1) + 3}s`
                    }}
                    className="absolute z-[1000] left-1/2 top-1/2 h-10 w-12">
                    <div
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "translate3d(50px, 30px, -300px)"
                        }}
                        className="left-0 top-0 w-full h-full">
                        <div
                            style={{
                                transformStyle: "preserve-3d",
                                transformOrigin: "center bottom",
                                transform: "translate3d(0px, 0px, 0px) rotateX(-30deg)"
                            }}
                            className="absolute inset-0 rounded-[3px] z-[300] bg-gradient-to-b from-[#a58dc4] to-[#7979a8] animate-wingLeft">
                        </div>
                        <div
                            style={{
                                transformStyle: "preserve-3d",
                                transformOrigin: "center bottom",
                                transform: "translate3d(0px, 0px, 0px) rotateX(-30deg)"
                            }} className="absolute inset-0 rounded-[3px] z-[300] bg-gradient-to-b from-[#d9d3e2] to-[#b8a5d1] animate-wingRight">
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default Bird
