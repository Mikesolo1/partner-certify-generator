
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onPrevious?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalImages?: number;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  onPrevious,
  onNext,
  currentIndex = 0,
  totalImages = 1
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && onPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && onNext) {
      onNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-full h-[90vh] p-0 bg-black border-none"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image counter */}
          {totalImages > 1 && (
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} из {totalImages}
            </div>
          )}

          {/* Previous button */}
          {totalImages > 1 && onPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {/* Image */}
          <img
            src={imageSrc}
            alt="Просмотр изображения"
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          />

          {/* Next button */}
          {totalImages > 1 && onNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
