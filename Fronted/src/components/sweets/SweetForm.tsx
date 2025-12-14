import { useState, useEffect } from 'react';
import { Sweet, SweetCategory, SWEET_CATEGORIES } from '@/types/sweet';
import { useSweets } from '@/contexts/SweetContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Save, Package } from 'lucide-react';

interface SweetFormProps {
  sweet?: Sweet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SweetForm = ({ sweet, open, onOpenChange }: SweetFormProps) => {
  const { addSweet, updateSweet, restockSweet } = useSweets();
  const isEditing = !!sweet;

  const [formData, setFormData] = useState({
    name: '',
    category: 'candy' as SweetCategory,
    price: 0,
    quantity: 0,
    description: '',
  });

  const [restockAmount, setRestockAmount] = useState(10);
  const [showRestock, setShowRestock] = useState(false);

  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
        description: sweet.description || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'candy',
        price: 0,
        quantity: 0,
        description: '',
      });
    }
    setShowRestock(false);
  }, [sweet, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && sweet) {
      updateSweet(sweet.id, formData);
    } else {
      addSweet(formData);
    }
    
    onOpenChange(false);
  };

  const handleRestock = () => {
    if (sweet && restockAmount > 0) {
      restockSweet(sweet.id, restockAmount);
      setShowRestock(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            {isEditing ? (
              <>
                <Save className="h-5 w-5 text-primary" />
                Edit Sweet
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 text-primary" />
                Add New Sweet
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Delicious Chocolate Bar"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: SweetCategory) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SWEET_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Initial Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A delicious treat that everyone loves..."
              rows={3}
            />
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRestock(!showRestock)}
                className="gap-2"
              >
                <Package className="h-4 w-4" />
                Restock
              </Button>
            )}
            <Button type="submit" className="gap-2 shadow-candy">
              {isEditing ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isEditing ? 'Save Changes' : 'Add Sweet'}
            </Button>
          </DialogFooter>
        </form>

        {/* Restock Section */}
        {showRestock && isEditing && (
          <div className="mt-4 animate-fade-in rounded-lg border border-accent/30 bg-accent/10 p-4">
            <Label className="mb-2 block text-sm font-medium">
              Restock Amount
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={restockAmount}
                onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                className="w-24"
              />
              <Button onClick={handleRestock} className="gap-2">
                <Package className="h-4 w-4" />
                Add Stock
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
