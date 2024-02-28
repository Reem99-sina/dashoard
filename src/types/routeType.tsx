import React from "react";

export interface routeType{
    href: string,
    label: string,
    active: boolean,
    permissions: string[],
    component: React.ReactNode,
    submenu: any[],
    icon: React.ReactNode,
    noCollapse: boolean,
}