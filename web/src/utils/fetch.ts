const apiUrl = (...endpointSegments: string[]) => {
    return `${import.meta.env.VITE_TODO__API_URL}${endpointSegments.join('')}`;
};

function defaultHeaders(
    jwtToken?: string,
    extensions?: Record<string, unknown>,
): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (jwtToken) {
        headers.Authorization = `Bearer ${jwtToken}`;
    }

    if (extensions) {
        Object.assign(headers, extensions);
    }

    return headers;
}

export interface FetchResponse<TBody> {
    status: number;
    message?: string;
    error?: string;
    body: TBody;
}

async function api<TBody>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    jwtToken?: string,
    params?: Record<string, string>,
    body?: unknown,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TBody> | undefined> {
    const response = await fetch(
        apiUrl(endpoint, params ? `?${new URLSearchParams(params)}` : ''),
        {
            method,
            headers: defaultHeaders(jwtToken, headers),
            body: body ? JSON.stringify(body) : undefined,
        },
    );
    const json = await response.json();
    return {
        status: response.status,
        message: json.message,
        error: json.error,
        body: json,
    };
}

export async function get<TResponse>(
    url: string,
    jwtToken?: string,
    params?: Record<string, string>,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TResponse> | undefined> {
    return await api<TResponse>(
        url,
        'GET',
        jwtToken,
        params,
        undefined,
        headers,
    );
}

export async function post<TResponse>(
    url: string,
    jwtToken?: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TResponse> | undefined> {
    return await api<TResponse>(
        url,
        'POST',
        jwtToken,
        undefined,
        body,
        headers,
    );
}

export async function patch<TResponse>(
    url: string,
    jwtToken?: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TResponse> | undefined> {
    return await api<TResponse>(
        url,
        'PATCH',
        jwtToken,
        undefined,
        body,
        headers,
    );
}

export async function put<TResponse>(
    url: string,
    jwtToken?: string,
    body?: Record<string, string>,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TResponse> | undefined> {
    return await api<TResponse>(url, 'PUT', jwtToken, undefined, body, headers);
}

export async function del<TResponse>(
    url: string,
    jwtToken?: string,
    headers?: Record<string, unknown>,
): Promise<FetchResponse<TResponse> | undefined> {
    return await api<TResponse>(
        url,
        'DELETE',
        jwtToken,
        undefined,
        undefined,
        headers,
    );
}
