import { useMemo } from 'react';
import { container } from '../di/container';
import { TYPES } from '../di/symbols';
import { ConfigService } from '../infra/config/ConfigService';

/**
 * Hook to access the application configuration
 * @returns ConfigService instance
 */
export const useConfig = () => {
  return useMemo(() => container.get<ConfigService>(TYPES.ConfigService), []);
};
