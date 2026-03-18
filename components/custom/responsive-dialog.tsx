"use client";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";

export function ResponsiveDialog({
    children,
    open,
    setOpen,
    title,
    className,
    disableEsc,
}: {
    children: React.ReactNode;
    open: boolean;
    setOpen: any;
    title: string;
    className?: string;
    disableEsc?: boolean;
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className={`px-8 ${className}`}
                    onEscapeKeyDown={(e) => {
                        if (disableEsc) {
                            e.preventDefault();
                        }
                    }}
                    onInteractOutside={(e) => {
                        if (disableEsc) {
                            e.preventDefault();
                        }
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="px-6">
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>
                <div className=" overflow-auto pb-5 space-y-3">{children}</div>
            </DrawerContent>
        </Drawer>
    );
}
