'use client';

import { useState, useEffect, useCallback } from 'react';
import { listHouseholds, switchHousehold as apiSwitchHousehold } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export function useHouseholds() {
  const { user } = useAuth();
  const [households, setHouseholds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHouseholds = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await listHouseholds();
      setHouseholds(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHouseholds();
  }, [fetchHouseholds]);

  const switchActiveHousehold = async (householdId: string) => {
    try {
      const result = await apiSwitchHousehold(householdId);
      if (result.success) {
        // Recargar la página para limpiar estados o simplemente actualizar el user en el hook de auth
        // Para simplicidad en este MVP, recargamos.
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    households,
    isLoading,
    error,
    activeHousehold: households.find(h => h.id === user?.activeHouseholdId) || households[0],
    switchActiveHousehold,
    refresh: fetchHouseholds
  };
}
