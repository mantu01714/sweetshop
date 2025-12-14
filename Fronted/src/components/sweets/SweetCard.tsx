import { Sweet, SWEET_CATEGORIES } from '@/types/sweet';
import { useAuth } from '@/contexts/AuthContext';
import { useSweets } from '@/contexts/SweetContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Edit, Trash2, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SweetCardProps {
  sweet: Sweet;
  onEdit?: (sweet: Sweet) => void;
}

export const SweetCard = ({ sweet, onEdit }: SweetCardProps) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const { purchaseSweet, deleteSweet } = useSweets();

  const category = SWEET_CATEGORIES.find((c) => c.value === sweet.category);
  const isOutOfStock = sweet.quantity <= 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 5;

  const handlePurchase = () => {
    if (!isOutOfStock) {
      purchaseSweet(sweet.id);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
      {/* Category Badge */}
      <div className="absolute right-3 top-3 z-10">
        <Badge
          variant="secondary"
          className="bg-background/90 backdrop-blur-sm"
        >
          {category?.emoji} {category?.label}
        </Badge>
      </div>

      {/* Image/Emoji Display */}
      <div className="relative flex h-40 items-center justify-center bg-muted/30">
        <span className="text-7xl transition-transform duration-300 group-hover:scale-110 animate-float">
          {category?.emoji || '🍬'}
        </span>
        
        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Badge variant="destructive" className="text-sm font-semibold">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
          {sweet.name}
        </h3>
        
        {sweet.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {sweet.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary">
            ₹{sweet.price.toFixed(0)}
          </span>
          
          <div className="flex items-center gap-1.5">
            <Package className={cn(
              "h-4 w-4",
              isOutOfStock ? "text-destructive" : isLowStock ? "text-candy-orange" : "text-accent"
            )} />
            <span className={cn(
              "text-sm font-medium",
              isOutOfStock ? "text-destructive" : isLowStock ? "text-candy-orange" : "text-muted-foreground"
            )}>
              {sweet.quantity} left
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t border-border/50 p-3">
        {isAuthenticated && (
          <Button
            onClick={handlePurchase}
            disabled={isOutOfStock}
            className={cn(
              "flex-1 gap-2",
              isOutOfStock && "cursor-not-allowed opacity-50"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock ? 'Sold Out' : 'Purchase'}
          </Button>
        )}

        {isAdmin && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit?.(sweet)}
              className="shrink-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteSweet(sweet.id)}
              className="shrink-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}

        {!isAuthenticated && (
          <Button variant="secondary" className="flex-1" asChild>
            <a href="/login">Login to Purchase</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
