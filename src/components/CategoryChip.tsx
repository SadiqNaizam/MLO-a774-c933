import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using Badge for a chip-like appearance
import { cn } from '@/lib/utils'; // For conditional class names

interface CategoryChipProps {
  categoryName: string;
  imageUrl?: string; // Optional image/icon for the chip
  isActive?: boolean;
  onClick: (categoryName: string) => void;
  className?: string;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  categoryName,
  imageUrl,
  isActive,
  onClick,
  className,
}) => {
  console.log("Rendering CategoryChip:", categoryName, "Active:", isActive);

  return (
    <button
      onClick={() => onClick(categoryName)}
      className={cn(
        "flex flex-col items-center justify-center p-2 space-y-1 text-center rounded-lg transition-all",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive ? "bg-primary/10 border border-primary text-primary" : "bg-card hover:bg-muted",
        className
      )}
      aria-pressed={isActive}
      style={{ minWidth: '80px' }} // Ensure chips have a minimum width
    >
      {imageUrl && (
        <img src={imageUrl} alt={categoryName} className="w-10 h-10 object-contain rounded-md mb-1" />
      )}
      {/* If no image, could use a placeholder or just text */}
      {!imageUrl && <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs mb-1">?</div>}
      <span className="text-xs font-medium truncate max-w-[70px]">{categoryName}</span>
    </button>
  );
};

export default CategoryChip;