import {createClient} from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export default (_, inject) => {
  inject('supabase', supabase)
}