'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Instagram, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // デモモード: メール送信のシミュレーション
    setTimeout(() => {
      if (email && email.includes('@')) {
        setSuccess(true)
      } else {
        setError('有効なメールアドレスを入力してください')
      }
      setIsLoading(false)
    }, 1000)

    /* 実際のSupabase認証（プロジェクト作成後に有効化）
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
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
          <h1 className="text-2xl font-bold text-gray-900">パスワードをリセット</h1>
          <p className="text-gray-600 mt-2">
            登録したメールアドレスにリセットリンクを送信します
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium text-green-800">メールを送信しました</p>
              </div>
              <p className="text-sm text-green-700">
                メールボックスを確認し、リンクをクリックしてパスワードをリセットしてください。
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center space-x-2 text-sm text-purple-600 hover:text-purple-500"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ログイン画面に戻る</span>
            </Link>
          </div>
        ) : (
          <>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'リセットリンクを送信'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center space-x-2 text-sm text-purple-600 hover:text-purple-500"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ログイン画面に戻る</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}