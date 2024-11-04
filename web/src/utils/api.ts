export const apiUrl = (...endpointSegments: string[]) => {
    return `${import.meta.env.VITE_TODO__API_URL}${endpointSegments.join('')}`;
};
