import { Product, FilterState, Size, ColorVariant } from '../types';

export const DEFAULT_FILTER_STATE: FilterState = {
  sizes: [],
  colors: [],
  categories: [],
  fits: [],
  materials: [],
  priceRange: [0, 500],
  onlyInStock: false,
  onSaleOnly: false,
  searchQuery: '',
  matchMode: 'all',
};

/**
 * Checks if a specific color variant matches the size & color filter requirements
 */
export function isVariantMatchingFilter(
  variant: ColorVariant,
  selectedSizes: Size[],
  selectedColors: string[],
  matchMode: 'all' | 'any'
): boolean {
  const matchesColor = selectedColors.length === 0 || selectedColors.includes(variant.name);
  const matchesSize = selectedSizes.length === 0 || selectedSizes.some(s => variant.sizes.includes(s));

  if (selectedColors.length === 0 && selectedSizes.length === 0) {
    return true;
  }

  if (matchMode === 'all') {
    // If both color and size filters are active, the variant itself MUST support both
    if (selectedColors.length > 0 && selectedSizes.length > 0) {
      return selectedColors.includes(variant.name) && selectedSizes.some(s => variant.sizes.includes(s));
    }
    return matchesColor && matchesSize;
  } else {
    // 'any' mode
    return matchesColor || matchesSize;
  }
}

/**
 * Filter products based on all filter parameters
 */
export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    // Search query filter
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const brandMatch = product.brand.toLowerCase().includes(q);
      const categoryMatch = product.category.toLowerCase().includes(q);
      const materialMatch = product.material.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const colorMatch = product.colors.some(c => c.name.toLowerCase().includes(q));
      
      if (!nameMatch && !brandMatch && !categoryMatch && !materialMatch && !descMatch && !colorMatch) {
        return false;
      }
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Fit filter
    if (filters.fits.length > 0 && !filters.fits.includes(product.fit)) {
      return false;
    }

    // Material filter
    if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
      return false;
    }

    // Price range filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // On sale filter
    if (filters.onSaleOnly && !product.originalPrice) {
      return false;
    }

    // Size & Color Matrix Filter
    const hasSizeFilter = filters.sizes.length > 0;
    const hasColorFilter = filters.colors.length > 0;

    if (!hasSizeFilter && !hasColorFilter) {
      if (filters.onlyInStock) {
        return product.colors.some(c => c.inStock);
      }
      return true;
    }

    if (filters.matchMode === 'all') {
      // Direct combination check: At least one color variant must fulfill BOTH color & size selected
      const matchingVariants = product.colors.filter(variant => {
        if (!variant.inStock && filters.onlyInStock) return false;

        const colorOk = !hasColorFilter || filters.colors.includes(variant.name);
        // Does this variant have ANY of the selected sizes?
        const sizeOk = !hasSizeFilter || filters.sizes.some(s => variant.sizes.includes(s));

        return colorOk && sizeOk;
      });

      return matchingVariants.length > 0;
    } else {
      // 'any' mode: product matches if it has ANY selected size in any variant OR ANY selected color in any variant
      const matchingVariants = product.colors.filter(variant => {
        if (!variant.inStock && filters.onlyInStock) return false;

        const colorOk = hasColorFilter && filters.colors.includes(variant.name);
        const sizeOk = hasSizeFilter && filters.sizes.some(s => variant.sizes.includes(s));

        return colorOk || sizeOk;
      });

      return matchingVariants.length > 0;
    }
  });
}

/**
 * Returns the count of products available for each size given other active filters
 */
export function getProductCountsPerSize(
  products: Product[],
  currentFilters: FilterState
): Record<Size, number> {
  const sizes: Size[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
  const result: Record<string, number> = {};

  sizes.forEach(size => {
    // Create hypothetical filter with this size
    const tempFilter: FilterState = {
      ...currentFilters,
      sizes: [size], // evaluate with this specific size
    };
    result[size] = filterProducts(products, tempFilter).length;
  });

  return result as Record<Size, number>;
}

/**
 * Returns the count of products available for each color given other active filters
 */
export function getProductCountsPerColor(
  products: Product[],
  currentFilters: FilterState
): Record<string, number> {
  const result: Record<string, number> = {};

  products.flatMap(p => p.colors.map(c => c.name)).forEach(colorName => {
    if (!result[colorName]) {
      const tempFilter: FilterState = {
        ...currentFilters,
        colors: [colorName],
      };
      result[colorName] = filterProducts(products, tempFilter).length;
    }
  });

  return result;
}

/**
 * Gets count of active filters currently applied
 */
export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  count += filters.sizes.length;
  count += filters.colors.length;
  count += filters.categories.length;
  count += filters.fits.length;
  count += filters.materials.length;
  if (filters.onlyInStock) count += 1;
  if (filters.onSaleOnly) count += 1;
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count += 1;
  return count;
}
