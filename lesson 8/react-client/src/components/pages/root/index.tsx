import { Outlet } from "react-router-dom";
import AppMenu from "./apps-menu";
import { useState } from "react";

export function Root() {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div>
            <AppMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <div style={{ marginLeft: true ? "250px" : "0px" }}>
                <Outlet />
            </div>
        </div>
    );
}