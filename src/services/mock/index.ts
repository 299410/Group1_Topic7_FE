export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export function mockResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
    return {
        data,
        message,
        success: true,
    };
}

export function mockError(message = 'Error occurred'): Promise<never> {
    return Promise.reject(new Error(message));
}
