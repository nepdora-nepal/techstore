"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MediaLibrary } from "./image-manager/MediaLibrary";
import { UploadPane } from "./image-manager/UploadPane";

interface ImageManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (imagePath: string) => void;
    initialTab?: "library" | "upload";
}

export function ImageManagerModal({ isOpen, onClose, onSelect, initialTab = "library" }: ImageManagerModalProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    const handleSelect = () => {
        if (selectedImage) {
            onSelect(selectedImage);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b">
                    <DialogTitle>Image Manager</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v as "library" | "upload")} className="flex-1 flex flex-col min-h-0">
                    <div className="px-6 border-b">
                        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                            <TabsTrigger
                                value="library"
                                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                Media Library
                            </TabsTrigger>
                            <TabsTrigger
                                value="upload"
                                className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                            >
                                Upload New
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="library" className="flex-1 min-h-0 p-0 overflow-hidden relative">
                        <MediaLibrary
                            selectedImage={selectedImage}
                            onSelect={setSelectedImage}
                        />
                    </TabsContent>

                    <TabsContent value="upload" className="flex-1 min-h-0 overflow-hidden">
                        <UploadPane
                            onUploadSuccess={() => setActiveTab("library")}
                        />
                    </TabsContent>
                </Tabs>

                <div className="p-4 border-t bg-muted/20 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSelect} disabled={!selectedImage || activeTab !== 'library'}>
                        Select Image
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
