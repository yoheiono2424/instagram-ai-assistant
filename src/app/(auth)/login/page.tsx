'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Instagram, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: 'demo@example.com',
    password: 'password123'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // デモモード: メールアドレスとパスワードの簡易チェック
    // 実際のSupabaseプロジェクト作成後は、下記のコメント部分を有効化してください
    setTimeout(() => {
      if (formData.email && formData.password.length >= 8) {
        // デモ用: どんなメール/パスワードでもログイン成功
        router.push('/dashboard')
      } else if (formData.password.length < 8) {
        setError('パスワードは8文字以上で入力してください')
      } else {
        setError('メールアドレスとパスワードを入力してください')
      }
      setIsLoading(false)
    }, 1000)

    /* 実際のSupabase認証（プロジェクト作成後に有効化）
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
    */
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Instagram AI アシスタント</h1>
          <p className="text-gray-600 mt-2">アカウントにログイン</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              メールアドレス
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              パスワード
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                ログイン状態を保持
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              パスワードを忘れた方
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'ログイン'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            アカウントをお持ちでない方は{' '}
            <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
              新規登録
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}