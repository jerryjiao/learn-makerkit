import { Database } from '@/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
 
import Subscription from '@/lib/subscriptions/subscription';
import getSupabaseServerClient from '@/lib/supabase/server-client';
import { cache } from 'react';

 
type Client = SupabaseClient<Database>;
 
async function getUserSubscription(client: Client, userId: string) {
  return client
    .from('customers_subscriptions')
    .select<
      string,
      {
        customerId: string;
        subscription: Subscription | undefined;
      }
    >(
      `
        customerId: customer_id,
        subscription: subscription_id (
          id,
          status,
          currency,
          interval,
          cancelAtPeriodEnd: cancel_at_period_end,
          intervalCount: interval_count,
          priceId: price_id,
          createdAt: created_at,
          periodStartsAt: period_starts_at,
          periodEndsAt: period_ends_at,
          trialStartsAt: trial_starts_at,
          trialEndsAt: trial_ends_at
        )
      `
    )
    .eq('user_id', userId)
    .throwOnError()
    .maybeSingle();
}

export const getSubscription = cache(async () => {
  const client = getSupabaseServerClient();
  const sessionResponse = await client.auth.getSession();
 
  if (sessionResponse.error) {
    throw sessionResponse.error;
  }
 
  const userId = sessionResponse.data.session?.user.id;
 
  if (!userId) {
    throw new Error('User not found');
  }
 
  const { error, data } = await getUserSubscription(client, userId);
 
  if (error) {
    throw error;
  }
 
  return data;
});