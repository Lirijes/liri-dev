import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: string[];
  index: number;
  open: boolean;
  title: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/**
 * Fullscreen image viewer. Images are shown with object-contain so full
 * screenshots stay readable, with a click-to-zoom toggle and prev/next
 * navigation. Content is driven entirely by the `images` array, so adding
 * or swapping screenshots per project only requires editing the data.
 */
const ImageLightbox = ({
  images,
  index,
  open,
  title,
  onClose,
  onIndexChange,
}: ImageLightboxProps) => {
  const [zoomed, setZoomed] = useState(false);
  const hasMultiple = images.length > 1;

  // Reset zoom whenever the image or open state changes.
  useEffect(() => {
    setZoomed(false);
  }, [index, open]);

  const goToPrevious = () =>
    onIndexChange(index === 0 ? images.length - 1 : index - 1);
  const goToNext = () =>
    onIndexChange(index === images.length - 1 ? 0 : index + 1);

  // Arrow-key navigation while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, images.length]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onClick={onClose}
        >
          <DialogPrimitive.Title className="sr-only">
            {title} — image {index + 1} of {images.length}
          </DialogPrimitive.Title>

          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 text-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium">
              {title}
              {hasMultiple && (
                <span className="text-white/60">
                  {" "}
                  · {index + 1} / {images.length}
                </span>
              )}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomed((z) => !z)}
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
              >
                {zoomed ? (
                  <ZoomOut className="h-5 w-5" />
                ) : (
                  <ZoomIn className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image — clicking the empty area around the image closes the viewer */}
          <div
            className={cn(
              "relative z-0 w-full h-full flex items-center justify-center p-4 sm:p-12",
              zoomed ? "overflow-auto" : "overflow-hidden"
            )}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`${title} — image ${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
                className={cn(
                  "rounded-lg shadow-2xl transition-transform duration-300",
                  zoomed
                    ? "max-w-none w-auto h-auto cursor-zoom-out"
                    : "max-w-full max-h-full object-contain cursor-zoom-in"
                )}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {hasMultiple && (
            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Thumbnail strip */}
          {hasMultiple && (
            <div
              className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-2 px-4 py-4 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => onIndexChange(i)}
                  className={cn(
                    "relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded-md ring-2 transition-all",
                    i === index
                      ? "ring-primary opacity-100"
                      : "ring-transparent opacity-50 hover:opacity-100"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ImageLightbox;
