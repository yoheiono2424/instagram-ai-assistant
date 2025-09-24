import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 開発用のダミーURL（実際のSupabaseプロジェクトを作成後に置き換えてください）
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key'

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}