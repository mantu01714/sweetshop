import { useState } from 'react';
import { useSweets } from '@/contexts/SweetContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sweet } from '@/types/sweet';
import { SweetCard } from './SweetCard';
import { SweetForm } from './SweetForm';
import { SweetFilters } from './SweetFilters';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

export const SweetGrid = () => {
  const { filteredSweets } = useSweets();
  const { isAdmin } = useAuth();
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedSweet(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Our Sweets Collection
          </h2>
          <p className="text-muted-foreground">
            {filteredSweets.length} delicious treats available
          </p>
        </div>

        {isAdmin && (
          <Button onClick={handleAdd} className="gap-2 shadow-candy">
            <Plus className="h-4 w-4" />
            Add New Sweet
          </Button>
        )}
      </div>

      {/* Filters */}
      <SweetFilters />

      {/* Grid */}
      {filteredSweets.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSweets.map((sweet, index) => (
            <div
              key={sweet.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SweetCard sweet={sweet} onEdit={handleEdit} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-16">
          <Package className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            No sweets found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or add new sweets
          </p>
        </div>
      )}

      {/* Form Dialog */}
      <SweetForm
        sweet={selectedSweet}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
    </div>
  );
};
