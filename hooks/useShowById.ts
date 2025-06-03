import { useEffect, useState } from 'react';

import type { ShowType } from '@/types/show';

export const useShowById = (showId: string) => {
  const [show, setShow] = useState<ShowType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`/api/show?id=${showId}`);
        if (!response.ok) throw new Error('Failed to fetch show');
        const data = await response.json();
        setShow(data.show);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (showId) fetchShow();
  }, [showId]);

  return { show, loading, error };
};
