"use server";
 
import type { ChatCompletion } from 'openai/resources/chat';
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

import getOpenAIClient from '@/lib/openai-client';
import getSupabaseServerClient from "@/lib/supabase/server-client";
import { insertPost, updatePost, deletePost } from "@/lib/mutations/posts";
 
interface GeneratePostParams {
  title: string;
}
 
const MODEL = `gpt-3.5-turbo`;
 
async function generatePostContent(params: GeneratePostParams) {
  const client = getOpenAIClient();
  const content = getCreatePostPrompt(params);
 
  const response = await client.chat.completions.create({
    temperature: 0.8,
    model: MODEL,
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  });
 
  const usage = response.usage?.total_tokens ?? 0;
  const text = getResponseContent(response);
 
  return {
    text,
    usage,
  };
}
 
function getCreatePostPrompt(params: GeneratePostParams) {
  return `
    Write a blog post under 500 words whose title is "${params.title}".
  `;
}
 
function getResponseContent(response: ChatCompletion) {
  return (response.choices ?? []).reduce((acc, choice) => {
    return acc + (choice.message?.content ?? '');
  }, '');
}

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
 
  const { text: content } = await generatePostContent({
    title,
  });
 
  // log the content to see the result!
  console.log(content);
 
  const client = getSupabaseServerClient();
  const { data, error } = await client.auth.getUser();
 
  if (error) {
    throw error;
  }
 
  const { uuid } = await insertPost(client, {
    title,
    content,
    user_id: data.user.id
  });
 
  revalidatePath(`/dashboard`);
 
  // redirect to the post page.
  // NB: it will return a 404 error since we haven't implemented the post page yet
  return redirect(`/dashboard/${uuid}`);
}

export async function updatePostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | undefined;
  const content = formData.get('content') as string;
  const uid = formData.get('uid') as string;
 
  const client = getSupabaseServerClient();
 
  await updatePost(client, {
    title,
    content,
    description,
    uid,
  });
 
  const postPath = `/dashboard/${uid}`;
 
  revalidatePath(postPath);
 
  return redirect(postPath);
}

export async function deletePostAction(uid: string) {
  const client = getSupabaseServerClient();
  const path = `/dashboard`;
 
  await deletePost(client, uid);
 
  revalidatePath(path);
 
  return redirect(path);
}