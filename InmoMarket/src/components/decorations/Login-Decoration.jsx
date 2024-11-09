import React from "react";

export default function LoginDecoration() {
    return (
        <div className="flex flex-col items-center justify-center p-8 ">
            <h1 className="text-5xl font-semibold">
                InmoMarket
            </h1>
            <p className="font-medium text-lg text-gray-500 my-5">
                best place to find or sell your home
            </p>
            <div className="w-60 h-60 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full animate-bounce mt-20 "/>
        </div>
    )
}