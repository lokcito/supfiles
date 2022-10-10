import {createClient} from '@supabase/supabase-js';
import {SUPABASE_URL, SUPABASE_KEY} from './constants';

if (!SUPABASE_URL) throw new Error("SUPABASE_URL not defined.");
if (!SUPABASE_KEY) throw new Error("SUPABASE_KEY not defined.");

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);



//https://css-tricks.com/using-nuxt-and-supabase-for-a-multi-user-blogging-app/