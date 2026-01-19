"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useActivePopup } from "@/hooks/use-popup";
import PopupForm from "./PopupForm";
import ImageWithFallback from "@/components/common/ImageWithFallback";

const POPUP_LAST_SHOWN_KEY = "popup_last_shown_date";

const Popup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: activePopup, isLoading } = useActivePopup();

    useEffect(() => {
        if (!isLoading && activePopup && activePopup.is_active) {
            const lastShown = localStorage.getItem(POPUP_LAST_SHOWN_KEY);
            const today = new Date().toISOString().split("T")[0];

            if (lastShown !== today) {
                setIsOpen(true);
            }
        }
    }, [activePopup, isLoading]);

    const handleClose = () => {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(POPUP_LAST_SHOWN_KEY, today);
        setIsOpen(false);
    };

    if (!activePopup || !activePopup.is_active) return null;

    const imageUrl = typeof activePopup.image === "string" ? activePopup.image : "";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[800px] p-0 overflow-hidden border-none bg-background">
                <div className="flex flex-col md:flex-row min-h-[400px]">
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
                        <ImageWithFallback
                            src={imageUrl}
                            fallbackSrc="/images/placeholder.png"
                            alt={activePopup.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl md:text-3xl font-bold">{activePopup.title}</DialogTitle>
                            {activePopup.disclaimer && (
                                <DialogDescription className="text-sm text-muted-foreground">
                                    {activePopup.disclaimer}
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {activePopup.enabled_fields && activePopup.enabled_fields.length > 0 && (
                            <div className="flex-1">
                                <PopupForm
                                    popupId={activePopup.id!}
                                    enabledFields={activePopup.enabled_fields}
                                    onSuccess={handleClose}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Popup;
