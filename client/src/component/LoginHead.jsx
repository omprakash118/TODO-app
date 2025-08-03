import React from "react";
import { CheckSquare } from "lucide-react";

export default function LoginHead(){
    return(
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center rounded-xl shadow-lg">
                <CheckSquare className="w-8 h-8 text-white"/> 
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold">TaskFlow</h1>
            
            <p className="text-muted-foreground text-gray-500">Organize your life, one task at a time</p>
        </div>
    )
}
