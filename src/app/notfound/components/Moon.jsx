import React from 'react'
import { cn } from '../../../lib/utils'

const Moon = () => {
    return (
        <div className="sm:w-40 sm:h-40 w-[100px] h-[100px] relative rounded-full z-[2] bg-white shadow-glow
                        animate-rotate inline-block">
            <div className="top-[60%] left-[47%] absolute scale-[0.7] sm:scale-100">
                <div
                    style={{
                        boxShadow: "inset -4px -4px 4px rgba(0, 0, 0, 0.3)",
                    }}
                    className="rounded-tl-full rounded-br-full rounded-tr-full bg-[#5c3191] w-[25px] h-[25px] absolute rotate-45 animate-snore"></div>
                <div className="absolute top-[-30px] left-[-30px]">
                    {
                        [...Array(2)].map((_, index) => {
                            return (
                                <div key={index} className={cn("border-4 border-[#5c3191] w-[30px] h-[15px] rounded-bl-[100px] rounded-br-[100px] border-t-0 absolute after:absolute after:w-1 after:h-1 after:rounded-full after:bg-[#5c3191] after:-top-0.5 after:left-auto after:-right-1 before:absolute before:w-1 before:h-1 before:rounded-full before:bg-[#5c3191] before:-top-0.5 before:-left-1", `${index === 1 ? "left-[50px]" : ""}`)} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Moon
