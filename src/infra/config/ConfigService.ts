import { injectable } from 'inversify';

@injectable()
export class ConfigService {
  get apiUrl(): string {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }
  
  get isProduction(): boolean {
    return import.meta.env.PROD;
  }
  
  get appVersion(): string {
    return import.meta.env.VITE_APP_VERSION || '1.0.0';
  }
  
  get taskRefreshInterval(): number {
    return parseInt(import.meta.env.VITE_TASK_REFRESH_INTERVAL || '500', 10);
  }
}
