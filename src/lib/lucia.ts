import lucia from "lucia-sveltekit";
import supabase from "@lucia-sveltekit/adapter-supabase";

import { dev } from "$app/env";

const supabaseUrl = "";
const supabaseSecret = "";

export const auth = lucia<{ username: string }>({
    adapter: supabase(supabaseUrl, supabaseSecret),
    env: dev ? "DEV" : "PROD",
    secret: "",
});
