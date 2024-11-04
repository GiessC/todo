const apiUrl = (...endpointSegments: string[]) => {
    return `${import.meta.env.VITE_TODO__API_URL}${endpointSegments.join('')}`;
};

function defaultHeaders(extensions?: Record<string, unknown>) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (extensions) {
        Object.assign(headers, extensions);
    }

    return headers;
}

async function api<TResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    params?: Record<string, string>,
    body?: unknown,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    const response = await fetch(
        apiUrl(endpoint, params ? `?${new URLSearchParams(params)}` : ''),
        {
            method,
            headers: defaultHeaders(headers),
            body: body ? JSON.stringify(body) : undefined,
        },
    );
    const json = await response.json();
    return json as TResponse | undefined;
}

export async function get<TResponse>(
    url: string,
    params?: Record<string, string>,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    return await api<TResponse>(url, 'GET', params, undefined, headers);
}

export async function post<TResponse>(
    url: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    return await api<TResponse>(url, 'POST', undefined, body, headers);
}

export async function patch<TResponse>(
    url: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    return await api<TResponse>(url, 'PATCH', undefined, body, headers);
}

export async function put<TResponse>(
    url: string,
    body?: Record<string, string>,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    return await api<TResponse>(url, 'PUT', undefined, body, headers);
}

export async function del<TResponse>(
    url: string,
    headers?: Record<string, unknown>,
): Promise<TResponse | undefined> {
    return await api<TResponse>(url, 'DELETE', undefined, undefined, headers);
}
