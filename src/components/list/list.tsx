import { FlashList, type FlashListProps, type ViewToken } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { memo, useCallback, useEffect, useRef } from 'react';

// FlashList's own default. Pass `drawDistance` to override.
const DEFAULT_DRAW_DISTANCE = 250;
const DEFAULT_PREFETCH_AHEAD = 15;

// Module-level: FlashList doesn't support changing viewabilityConfig after mount.
// 1%: a row counts as visible as soon as it peeks in, so prefetching starts as early as possible.
const viewabilityConfig = { itemVisiblePercentThreshold: 1 };

type ViewableItemsChanged<T> = NonNullable<FlashListProps<T>['onViewableItemsChanged']>;

export type ListProps<T> = Omit<FlashListProps<T>, 'viewabilityConfig' | 'viewabilityConfigCallbackPairs'> & {
  /** Image URL to prefetch for an item, or null when it has none. Enables cover prefetching. */
  getImageUrl?: (item: T) => string | null | undefined;
  /** How many rows past the last visible one to prefetch. */
  prefetchAhead?: number;
};

// FlashList v2 with the app's performance defaults. v2 measures rows itself, so it takes no
// estimatedItemSize or overrideItemLayout. With `getImageUrl`, it prefetches the images of the next
// `prefetchAhead` rows whenever the visible rows change, so covers are cached before they scroll in.
const ListInner = <T,>({
  getImageUrl,
  prefetchAhead = DEFAULT_PREFETCH_AHEAD,
  drawDistance = DEFAULT_DRAW_DISTANCE,
  onViewableItemsChanged,
  ...rest
}: ListProps<T>) => {
  // The viewability callback stays stable; it reads the current props from here.
  const latest = useRef({ data: rest.data, getImageUrl, prefetchAhead, onViewableItemsChanged });
  useEffect(() => {
    latest.current = { data: rest.data, getImageUrl, prefetchAhead, onViewableItemsChanged };
  });

  const prefetched = useRef(new Set<string>());

  const handleViewableItemsChanged: ViewableItemsChanged<T> = useCallback((info) => {
    const { data, getImageUrl, prefetchAhead, onViewableItemsChanged } = latest.current;
    onViewableItemsChanged?.(info);
    if (!getImageUrl || !data) return;

    const lastVisible = info.viewableItems.reduce(
      (max: number, token: ViewToken<T>) => (token.index !== null && token.index > max ? token.index : max),
      -1,
    );
    if (lastVisible < 0) return;

    const urls: string[] = [];
    const end = Math.min(data.length, lastVisible + 1 + prefetchAhead);
    for (let i = lastVisible + 1; i < end; i++) {
      const url = getImageUrl(data[i]);
      if (url && !prefetched.current.has(url)) {
        prefetched.current.add(url);
        urls.push(url);
      }
    }
    if (urls.length === 0) return;

    void Image.prefetch(urls).then((ok) => {
      // Let failed URLs be retried on the next scroll.
      if (!ok) urls.forEach((url) => prefetched.current.delete(url));
    });
  }, []);

  return (
    <FlashList
      {...rest}
      drawDistance={drawDistance}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={
        getImageUrl || onViewableItemsChanged ? handleViewableItemsChanged : undefined
      }
    />
  );
};

// memo loses the generic, so cast back to keep `List<T>` inference at call sites.
export const List = memo(ListInner) as typeof ListInner & { displayName?: string };

List.displayName = 'List';
