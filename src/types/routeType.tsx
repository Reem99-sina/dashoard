import React from "react";

export interface submenu{
    href: string,
    label: string,
    active: boolean,
    permissions: string[],
    component: React.ReactNode,

}
export interface routeType{
    href: string,
    label: string,
    active: boolean,
    permissions: string[],
    component?: React.ReactNode,
    submenu: submenu[],
    icon: React.ReactNode,
    noCollapse: boolean,
}