import { useState } from 'react';
import { useSweets } from '@/contexts/SweetContext';
import { SWEET_CATEGORIES, SweetCategory } from '@/types/sweet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SweetFilters = () => {
  const { filters, setFilters } = useSweets();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value || undefined });
  };

  const handleCategoryToggle = (category: SweetCategory) => {
    setFilters({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    setFilters({
      ...filters,
      minPrice: range[0] > 0 ? range[0] : undefined,
      maxPrice: range[1] < 20 ? range[1] : undefined,
    });
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, 20]);
  };

  const hasActiveFilters = filters.name || filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sweets..."
            value={filters.name || ''}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "gap-2 shrink-0",
            showFilters && "bg-muted"
          )}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="animate-fade-in space-y-4 rounded-xl border border-border bg-card p-4">
          {/* Category Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {SWEET_CATEGORIES.map((category) => (
                <Badge
                  key={category.value}
                  variant={filters.category === category.value ? 'default' : 'outline'}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    filters.category === category.value && "shadow-candy"
                  )}
                  onClick={() => handleCategoryToggle(category.value)}
                >
                  {category.emoji} {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-3 block text-sm font-medium text-foreground">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={20}
              step={0.5}
              className="py-4"
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.name && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, name: undefined })}
              />
            </Badge>
          )}
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {SWEET_CATEGORIES.find((c) => c.value === filters.category)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setFilters({ ...filters, category: undefined })}
              />
            </Badge>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.minPrice || 0} - ${filters.maxPrice || 20}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  setFilters({ ...filters, minPrice: undefined, maxPrice: undefined })
                }
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
