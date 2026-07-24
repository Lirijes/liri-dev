import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ImageLightbox from "./ImageLightbox";

interface ProjectImageCarouselProps {
  images: string[];
  title: string;
}

const ProjectImageCarousel = ({ images, title }: ProjectImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
        <AnimatePresence mode="wait">
          <motion.button
            key={currentIndex}
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 w-full h-full cursor-zoom-in"
            aria-label={`Open ${title} image ${currentIndex + 1} in fullscreen`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        </AnimatePresence>

        {/* Expand hint */}
        <div className="pointer-events-none absolute top-2 right-2 flex items-center gap-1 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <Expand className="h-3 w-3" />
          View
        </div>

        {hasMultipleImages && (
          <>
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-8 w-8"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-8 w-8"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-primary w-4"
                      : "bg-background/60 hover:bg-background/80"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip (only with multiple images) */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition-all",
                index === currentIndex
                  ? "ring-primary opacity-100"
                  : "ring-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`Show image ${index + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={images}
        index={currentIndex}
        open={lightboxOpen}
        title={title}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
};

export default ProjectImageCarousel;
