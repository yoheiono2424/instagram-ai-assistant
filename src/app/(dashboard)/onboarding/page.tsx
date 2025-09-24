'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Instagram,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  TrendingUp,
  Check,
  ExternalLink,
  Zap,
  Target,
  Palette
} from 'lucide-react'
import { BrandTone } from '@/types'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    id: 1,
    title: 'AIが投稿文を自動生成',
    description: '画像をアップロードするだけで、業種に最適化された投稿文を3パターン生成します。',
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 2,
    title: '時間を95%削減',
    description: '週8時間かかっていた投稿作成が、たった30分で完了。空いた時間を本業に集中できます。',
    icon: <Clock className="w-8 h-8" />
  },
  {
    id: 3,
    title: 'エンゲージメント向上',
    description: 'AI が最適なハッシュタグと投稿時間を提案。平均30%のエンゲージメント向上を実現。',
    icon: <TrendingUp className="w-8 h-8" />
  }
]

const brandTones: { value: BrandTone; label: string; description: string }[] = [
  {
    value: 'casual',
    label: 'カジュアル',
    description: '親しみやすく、フレンドリーな雰囲気'
  },
  {
    value: 'formal',
    label: 'フォーマル',
    description: '丁寧で、信頼感のある表現'
  },
  {
    value: 'professional',
    label: 'プロフェッショナル',
    description: '専門的で、説得力のある内容'
  },
  {
    value: 'friendly',
    label: 'フレンドリー',
    description: '温かみがあり、親近感のある口調'
  }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedTone, setSelectedTone] = useState<BrandTone>('casual')
  const [targetAudience, setTargetAudience] = useState('')
  const [ngWords, setNgWords] = useState('')

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSettings(true)
    }
  }

  const handlePrev = () => {
    if (showSettings) {
      setShowSettings(false)
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // 設定を保存する処理
    router.push('/dashboard')
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mb-4">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">ブランド設定</h2>
            <p className="text-gray-600 mt-2">
              あなたのブランドに合わせてAIをカスタマイズします
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ブランドトーン
              </label>
              <div className="grid grid-cols-2 gap-3">
                {brandTones.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => setSelectedTone(tone.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTone === tone.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{tone.label}</p>
                        <p className="text-sm text-gray-500 mt-1">{tone.description}</p>
                      </div>
                      {selectedTone === tone.value && (
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
                ターゲット層（任意）
              </label>
              <input
                id="audience"
                type="text"
                placeholder="例：20-30代の女性、健康志向の方"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="ngwords" className="block text-sm font-medium text-gray-700 mb-2">
                NGワード（任意）
              </label>
              <textarea
                id="ngwords"
                placeholder="使用を避けたい単語をカンマ区切りで入力"
                value={ngWords}
                onChange={(e) => setNgWords(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              戻る
            </button>
            <div className="flex space-x-3">
              <button
                onClick={handleSkip}
                className="px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                スキップ
              </button>
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
              >
                完了
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Instagram AI アシスタントへようこそ
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* プログレスバー */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 ${index !== steps.length - 1 ? 'mr-2' : ''}`}
              >
                <div
                  className={`h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* ステップコンテンツ */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              currentStep === 0 ? 'bg-purple-100 text-purple-600' :
              currentStep === 1 ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}>
              {steps[currentStep].icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 text-lg">
              {steps[currentStep].description}
            </p>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              className={`flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 ${
                currentStep === 0 ? 'invisible' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              戻る
            </button>

            <div className="flex space-x-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                スキップ
              </button>
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
              >
                {currentStep === steps.length - 1 ? '設定を開始' : '次へ'}
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Instagram連携の案内 */}
        {currentStep === steps.length - 1 && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Instagram連携の準備
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  次のステップでInstagramアカウントと連携します。
                  Facebookページとビジネスアカウントが必要です。
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm text-yellow-700 hover:text-yellow-800 mt-2 font-medium"
                >
                  準備方法を確認
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}