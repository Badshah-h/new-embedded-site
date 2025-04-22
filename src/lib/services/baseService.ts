/**
 * Base Service Class
 *
 * This abstract class provides the foundation for all services in the application.
 * It includes common functionality and enforces a consistent interface.
 */
export abstract class BaseService {
  protected async simulateNetworkDelay(ms: number = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected handleError(error: unknown, defaultMessage: string): Error {
    return error instanceof Error ? error : new Error(defaultMessage);
  }
}
