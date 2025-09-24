'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Sparkles,
  Save,
  RefreshCw,
  Info,
  Check,
  MessageSquare
} from 'lucide-react'

export default function AISettingsPage() {
  const [industry, setIndustry] = useState('restaurant')
  const [tone, setTone] = useState('friendly')
  const [contentLength, setContentLength] = useState('medium')
  const [targetAudience, setTargetAudience] = useState('20-40代の女性')
  const [ngWords, setNgWords] = useState('競合他社名, ネガティブな表現')
  const [customPrompt, setCustomPrompt] = useState('')
  const [savedMessage, setSavedMessage] = useState(false)

  const handleSave = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  const industries = [
    { value: 'restaurant', label: '飲食店' },
    { value: 'beauty', label: '美容・エステ' },
    { value: 'apparel', label: 'アパレル・EC' },
    { value: 'realestate', label: '不動産' },
    { value: 'medical', label: '医療・クリニック' }
  ]

  const tones = [
    { value: 'casual', label: 'カジュアル' },
    { value: 'formal', label: 'フォーマル' },
    { value: 'friendly', label: 'フレンドリー' },
    { value: 'professional', label: 'プロフェッショナル' },
    { value: 'playful', label: '遊び心のある' }
  ]

  const contentLengths = [
    { value: 'short', label: '短め（50-100文字）' },
    { value: 'medium', label: '標準（100-200文字）' },
    { value: 'long', label: '長め（200-300文字）' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI設定</h1>
            <p className="text-gray-600 mt-1">投稿文生成AIのカスタマイズ設定</p>
          </div>
          {savedMessage && (
            <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <Check className="w-4 h-4 mr-2" />
              設定を保存しました
            </div>
          )}
        </div>

        {/* 基本設定 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">基本設定</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                業種
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {industries.map(ind => (
                  <option key={ind.value} value={ind.value}>{ind.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                選択した業種に最適化された投稿文を生成します
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章のトーン
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {tones.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                ブランドイメージに合った文章スタイルを選択
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                文章の長さ
              </label>
              <select
                value={contentLength}
                onChange={(e) => setContentLength(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {contentLengths.map(len => (
                  <option key={len.value} value={len.value}>{len.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ターゲット層
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="例: 20-40代の女性、健康志向の方"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NGワード（使用を避ける単語）
              </label>
              <textarea
                value={ngWords}
                onChange={(e) => setNgWords(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="カンマ区切りで入力（例: 競合他社名, ネガティブな表現）"
              />
              <p className="text-xs text-gray-500 mt-1">
                AIが生成する文章に含めたくない単語を指定できます
              </p>
            </div>
          </div>
        </div>

        {/* カスタムプロンプト */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">カスタムプロンプト（上級者向け）</h2>
          </div>

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">カスタムプロンプトについて</p>
              <p>AIの動作を細かく制御したい場合に使用します。空欄の場合は、上記の設定に基づいて自動的にプロンプトが生成されます。</p>
            </div>
          </div>

          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
            placeholder="例: あなたは[業種]の専門家です。以下の画像について、[ターゲット層]向けに魅力的な投稿文を作成してください。文章は[トーン]で、[文字数]程度にまとめてください。"
          />
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            デフォルトに戻す
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            設定を保存
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}