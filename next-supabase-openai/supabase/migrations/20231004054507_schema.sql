create table users (
  id uuid references auth.users not null primary key,
  photo_url text,
  display_name text,
  created_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name, photo_url)
  values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data
  ->> 'photo_url');
  return new;
end;
$$;
 
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table users enable row level security;

create policy "Users can read and update data belonging only their records" on
users
  for all
    using (auth.uid () = users.id)
    with check (auth.uid () = users.id);

create table posts (
  id bigint generated always as identity primary key,
  uuid uuid not null unique default gen_random_uuid(),
  user_id uuid not null references public.users on delete cascade,
  title text not null,
  content text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table posts enable row level security;
 
create policy "Users can read and update only the posts belonging to them" on
posts
  for all
    using (auth.uid () = posts.user_id)
    with check (auth.uid () = posts.user_id);

create type subscription_status as ENUM (
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete',
  'incomplete_expired',
  'paused'
);
 
create table subscriptions (
  id text not null primary key,
  price_id text not null,
  status subscription_status not null,
  cancel_at_period_end bool not null,
  currency text,
  interval text,
  interval_count int,
  created_at timestamptz not null,
  period_starts_at timestamptz not null,
  period_ends_at timestamptz not null,
  trial_starts_at timestamptz,
  trial_ends_at timestamptz,
  user_id uuid not null references public.users (id) on delete cascade
);

alter table subscriptions enable row level security;
 
create policy "Users can only read their own subscriptions" on
subscriptions
  for select
    using (auth.uid () = user_id);
    
create table customers_subscriptions (
  id bigint generated always as identity primary key,
  customer_id text unique not null,
  user_id uuid not null references public.users (id) on delete cascade,
  subscription_id text unique references public.subscriptions (id) on delete
  set null
);

alter table customers_subscriptions enable row level security;
 
create policy "Users can only read their own customers subscriptions" on
customers_subscriptions
  for select
    using (auth.uid () = user_id);