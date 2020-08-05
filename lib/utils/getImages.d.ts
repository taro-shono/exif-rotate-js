interface canvasOptions {
    translate: {
        x: number;
        y: number;
    };
    scale: {
        x: number;
        y: number;
    };
    rotate: {
        angle: number;
    };
}
export declare function getImages(files: Blob[]): Promise<HTMLImageElement[]>;
export declare function getSize(width: number, height: number, maxSize?: number): {
    width: number;
    height: number;
};
export declare function getOrientation(img: HTMLImageElement): number;
export declare function getCanvasOptions(width: number, height: number, orientation: number): canvasOptions;
export {};
