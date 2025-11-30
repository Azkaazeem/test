    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
     console.log (createClient);
    
    const supaKey = 'https://hjfjzwqsfnxnvzncojrc.supabase.co'
    const supaUrl = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZmp6d3FzZm54bnZ6bmNvanJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzOTU1NTUsImV4cCI6MjA3OTk3MTU1NX0.VSmP58VrnLILi5B4PIw7tuI7f_1hQdTSWKyjnpGISJ0';


    const supaBase = createClient (supaKey , supaUrl);

    export default supaBase
