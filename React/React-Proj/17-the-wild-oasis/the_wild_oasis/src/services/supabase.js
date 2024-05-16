import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tlxexdqnhsrgjxqxsucn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseGV4ZHFuaHNyZ2p4cXhzdWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNDk5NDUsImV4cCI6MjAzMDcyNTk0NX0.v4E591btNShoWoSfBcynoYmHFrr5ZWGNOswvDzl_VfY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
// use supabase client to perform queries
