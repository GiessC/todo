export class SupabaseConfig {
    supabaseUrl: string;
    supabaseKey: string;

    constructor(supabaseUrl: string, supabaseKey: string) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
    }

    static fromEnvironment(): SupabaseConfig {
        return new SupabaseConfig(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_KEY,
        );
    }
}
