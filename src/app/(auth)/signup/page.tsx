'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Building, Instagram, AlertCircle } from 'lucide-react'
import { IndustryType } from '@/types'

const industries: { value: IndustryType; label: string }[] = [
  { value: 'restaurant', label: '飲食店' },
  { value: 'beauty', label: '美容・エステ' },
  { value: 'apparel', label: 'アパレル・EC' },
  { value: 'realestate', label: '不動産' },
  { value: 'medical', label: '医療・クリニック' },
]

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    industry: 'restaurant' as IndustryType,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません')
      return
    }

    if (formData.password.length < 8) {
      setError('パスワードは8文字以上で設定してください')
      return
    }

    setIsLoading(true)

    // デモモード: 簡易的な登録処理
    // 実際のSupabaseプロジェクト作成後は、下記のコメント部分を有効化してください
    setTimeout(() => {
      // デモ用: 登録成功としてオンボーディングへ遷移
      router.push('/onboarding')
      setIsLoading(false)
    }, 1000)

    /* 実際のSupabase認証（プロジェクト作成後に有効化）
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            company: formData.company,
            industry: formData.industry,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else {
        router.push('/onboarding')
      }
    } catch (err) {
      setError('予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
    */
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">アカウント作成</h1>
          <p className="text-gray-600 mt-2">Instagram投稿を自動化しよう</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              お名前
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="山田 太郎"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
              会社名
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="company"
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="株式会社サンプル"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1.5">
              業種 <span className="text-red-500">*</span>
            </label>
            <select
              id="industry"
              required
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value as IndustryType })}
              disabled={isLoading}
            >
              {industries.map((industry) => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

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
                placeholder="8文字以上"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              パスワード（確認）
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="パスワードを再入力"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              'アカウント作成'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            すでにアカウントをお持ちの方は{' '}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              ログイン
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}