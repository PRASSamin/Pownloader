import React from 'react'
import { cn } from '../../../lib/utils'

const Stars = React.memo(() => {
    return (
        <>
            {
                [...Array(40)].map((_, index) => {
                    return (
                        <div key={index} className={cn(`absolute rounded-full bg-white animate-twinkle after:h-full after:w-full after:rotate-90 after:content-[''] after:absolute after:bg-white after:rounded-full before:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_60%,rgba(15,10,38,0)_100%)] before:absolute before:rounded-full before:content-[''] before:top-[-250%] before:w-[calc(100%*2)] before:aspect-square before:-left-1/2`)}
                            style={{
                                top: `${Math.random() * 100}vh`,
                                left: `${Math.random() * 100}vw`,
                                width: `${Math.random() * 10}px`,
                                aspectRatio: "16/5",
                                animationDelay: `${Math.random() * 10}s`
                            }}
                        />
                    )
                })
            }

            {
                [...Array(50)].map((_, index) => {
                    return (
                        <div key={index} className={`absolute rounded-full bg-white animate-twinkle`}
                            style={{
                                top: `${Math.random() * 100}vh`,
                                left: `${Math.random() * 100}vw`,
                                width: `${Math.random() * 5}px`,
                                aspectRatio: "1/1",
                                animationDelay: `${Math.random() * 10}s`
                            }}
                        />
                    )
                })
            }
        </>
    )
})

Stars.displayName = 'Stars'
export default Stars
