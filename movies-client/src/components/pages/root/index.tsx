import { Outlet } from "react-router-dom";
import MoviesMenu from "./movies-menu";
import { useState } from "react";

export function Root() {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div>
            <MoviesMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <div style={{ marginLeft: isOpen ? "250px" : "0px" }}>
                <Outlet />
            </div>
        </div>
    );
}