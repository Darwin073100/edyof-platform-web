/**
 * Interface para configuración de API
 */
export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    defaultHeaders?: Record<string, string>;
    apiVersion?: string;
    getEndpointUrl(path: string): string;
    getAuthenticatedHeaders(token?: string): Record<string, string>;
}

/**
 * Implementación de configuración de API
 */
export class ApiConfigImpl implements ApiConfig {
    public readonly baseUrl: string;
    public readonly timeout: number;
    public readonly defaultHeaders: Record<string, string>;
    public readonly apiVersion: string;

    constructor() {
        // Configuracion de las variables de entorno
        const baseApiUrl = process.env.URL_EDYOF_PLATFORM_API || 'http://localhost:3001';
        const apiPrefix = process.env.PREFIX_EDYOF_PLATFORM_API || '/api';
        
        this.baseUrl = `${baseApiUrl}${apiPrefix}`;
        this.timeout = 30000; // 30 segundos
        this.apiVersion = 'v1';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    /**
     * Obtiene la URL completa para un endpoint
     */
    getEndpointUrl(path: string): string {
        // Asegurar que el path comience con /
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${this.baseUrl}${normalizedPath}`;
    }

    /**
     * Obtiene headers con autenticación si está disponible
     */
    getAuthenticatedHeaders(token?: string): Record<string, string> {
        const headers = { ...this.defaultHeaders };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }
}
