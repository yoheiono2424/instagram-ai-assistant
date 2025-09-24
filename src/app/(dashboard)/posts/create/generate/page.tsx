'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Sparkles,
  Clock,
  Hash,
  TrendingUp,
  Edit,
  Check,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Loader2,
  Calendar,
  BarChart3
} from 'lucide-react'

interface GeneratedContent {
  id: string
  type: string
  content: string
  selected: boolean
}

interface SuggestedTime {
  datetime: string
  engagement: 'high' | 'medium' | 'low'
  label: string
}

interface Hashtag {
  tag: string
  category: string
  relevance: number
  selected: boolean
}

export default function GeneratePage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [uploadType, setUploadType] = useState<string>('single')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([])
  const [suggestedTimes, setSuggestedTimes] = useState<SuggestedTime[]>([])
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const [selectedContent, setSelectedContent] = useState('')
  const [selectedTime, setSelectedTime] = useState<SuggestedTime | null>(null)
  const [customTime, setCustomTime] = useState('')
  const [editingContent, setEditingContent] = useState(false)

  useEffect(() => {
    // Get images from sessionStorage
    const storedImages = sessionStorage.getItem('uploadedImages')
    const storedType = sessionStorage.getItem('uploadType')

    if (storedImages) {
      setImages(JSON.parse(storedImages))
      setUploadType(storedType || 'single')

      // Simulate AI generation
      setTimeout(() => {
        generateContent()
      }, 3000)
    } else {
      // If no images, redirect back
      router.push('/posts/create')
    }
  }, [])

  const generateContent = () => {
    // Generate 3 different content variations
    const contents: GeneratedContent[] = [
      {
        id: '1',
        type: 'カジュアル',
        content: `新商品が入荷しました✨
みなさんお待たせしました！本日より店頭に並んでいます。
ぜひお手に取ってご覧ください😊

#新商品 #入荷情報`,
        selected: true
      },
      {
        id: '2',
        type: 'フォーマル',
        content: `【新商品入荷のお知らせ】
本日より新商品を販売開始いたします。
厳選された素材を使用し、職人が一つ一つ丁寧に仕上げました。
皆様のご来店を心よりお待ちしております。`,
        selected: false
      },
      {
        id: '3',
        type: 'トレンド重視',
        content: `DROP ALERT 🔥
待望の新作がついに登場！
限定アイテムなのでお早めに💨
ストーリーズでも詳細公開中 ➡️

今すぐチェック！`,
        selected: false
      }
    ]

    // Generate suggested posting times
    const times: SuggestedTime[] = [
      {
        datetime: new Date().toISOString(),
        engagement: 'high',
        label: '本日 19:00'
      },
      {
        datetime: new Date(Date.now() + 86400000).toISOString(),
        engagement: 'medium',
        label: '明日 12:00'
      },
      {
        datetime: new Date(Date.now() + 172800000).toISOString(),
        engagement: 'medium',
        label: '明後日 20:00'
      }
    ]

    // Generate hashtag suggestions
    const hashtagList: Hashtag[] = [
      // トレンド系
      { tag: '#新商品', category: 'トレンド', relevance: 95, selected: true },
      { tag: '#話題', category: 'トレンド', relevance: 88, selected: true },
      { tag: '#おすすめ', category: 'トレンド', relevance: 85, selected: true },
      { tag: '#人気', category: 'トレンド', relevance: 82, selected: true },
      { tag: '#注目', category: 'トレンド', relevance: 80, selected: false },

      // 業種系
      { tag: '#カフェ', category: '業種', relevance: 90, selected: true },
      { tag: '#coffee', category: '業種', relevance: 88, selected: true },
      { tag: '#コーヒー', category: '業種', relevance: 85, selected: true },
      { tag: '#cafe', category: '業種', relevance: 83, selected: true },
      { tag: '#喫茶店', category: '業種', relevance: 78, selected: false },

      // 地域系
      { tag: '#東京', category: '地域', relevance: 92, selected: true },
      { tag: '#渋谷', category: '地域', relevance: 90, selected: true },
      { tag: '#tokyo', category: '地域', relevance: 85, selected: false },
      { tag: '#shibuya', category: '地域', relevance: 83, selected: false },
      { tag: '#東京カフェ', category: '地域', relevance: 80, selected: false },

      // ブランド系
      { tag: '#自家焙煎', category: 'ブランド', relevance: 88, selected: true },
      { tag: '#スペシャルティコーヒー', category: 'ブランド', relevance: 85, selected: true },
      { tag: '#こだわりコーヒー', category: 'ブランド', relevance: 82, selected: false },
      { tag: '#ハンドドリップ', category: 'ブランド', relevance: 80, selected: false },
      { tag: '#オーガニック', category: 'ブランド', relevance: 78, selected: false }
    ]

    setGeneratedContents(contents)
    setSuggestedTimes(times)
    setHashtags(hashtagList)
    setSelectedContent(contents[0].content)
    setSelectedTime(times[0])
    setIsGenerating(false)
  }

  const handleContentSelect = (content: GeneratedContent) => {
    setGeneratedContents(generatedContents.map(c => ({
      ...c,
      selected: c.id === content.id
    })))
    setSelectedContent(content.content)
    setEditingContent(false)
  }

  const handleHashtagToggle = (tag: string) => {
    setHashtags(hashtags.map(h =>
      h.tag === tag ? { ...h, selected: !h.selected } : h
    ))
  }

  const handleRegenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      generateContent()
    }, 2000)
  }

  const handleProceed = () => {
    // Store the selected data
    sessionStorage.setItem('generatedContent', selectedContent)
    sessionStorage.setItem('selectedHashtags', JSON.stringify(
      hashtags.filter(h => h.selected).map(h => h.tag)
    ))
    sessionStorage.setItem('scheduledTime', JSON.stringify(selectedTime))

    // Navigate to confirmation page
    router.push('/posts/create/confirm')
  }

  const selectedHashtagCount = hashtags.filter(h => h.selected).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI投稿生成</h1>
            <p className="text-gray-600 mt-1">画像を分析して最適な投稿内容を生成中</p>
          </div>
          <button
            onClick={() => router.push('/posts/create')}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            戻る
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Image Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">アップロード画像</h2>
            <div className="relative">
              {images.length > 0 && (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={`Upload ${currentImageIndex + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {uploadType === 'carousel' && images.length > 1 && (
                    <>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                        disabled={currentImageIndex === 0}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
                        disabled={currentImageIndex === images.length - 1}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right: AI Generated Content */}
          <div className="space-y-6">
            {isGenerating ? (
              <div className="bg-white rounded-lg shadow p-8">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">AI分析中...</p>
                  <p className="text-sm text-gray-600">画像を分析して最適な投稿内容を生成しています</p>
                </div>
              </div>
            ) : (
              <>
                {/* Content Variations */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">投稿文案</h3>
                    <button
                      onClick={handleRegenerate}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      再生成
                    </button>
                  </div>
                  <div className="space-y-3">
                    {generatedContents.map((content) => (
                      <div
                        key={content.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          content.selected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleContentSelect(content)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-medium text-purple-600">
                            {content.type}
                          </span>
                          {content.selected && (
                            <Check className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {content.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Editable Content Area */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        選択された投稿文（編集可能）
                      </label>
                      <button
                        onClick={() => setEditingContent(!editingContent)}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      value={selectedContent}
                      onChange={(e) => setSelectedContent(e.target.value)}
                      readOnly={!editingContent}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        editingContent
                          ? 'border-purple-500 focus:ring-2 focus:ring-purple-500'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>

                {/* Suggested Posting Times */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <Clock className="inline w-5 h-5 mr-2 text-purple-600" />
                    推奨投稿時間
                  </h3>
                  <div className="space-y-2">
                    {suggestedTimes.map((time, index) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedTime?.label === time.label
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="posting-time"
                            checked={selectedTime?.label === time.label}
                            onChange={() => setSelectedTime(time)}
                            className="mr-3 text-purple-600"
                          />
                          <span className="font-medium text-gray-900">{time.label}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          time.engagement === 'high'
                            ? 'bg-green-100 text-green-800'
                            : time.engagement === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          エンゲージメント: {
                            time.engagement === 'high' ? '高' :
                            time.engagement === 'medium' ? '中' : '低'
                          }
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hashtag Suggestions */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      <Hash className="inline w-5 h-5 mr-2 text-purple-600" />
                      ハッシュタグ提案
                    </h3>
                    <span className="text-sm text-gray-600">
                      {selectedHashtagCount}/30個選択中（推奨: 10-15個）
                    </span>
                  </div>

                  {['トレンド', '業種', '地域', 'ブランド'].map((category) => (
                    <div key={category} className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{category}系</h4>
                      <div className="flex flex-wrap gap-2">
                        {hashtags
                          .filter(h => h.category === category)
                          .map((hashtag) => (
                            <button
                              key={hashtag.tag}
                              onClick={() => handleHashtagToggle(hashtag.tag)}
                              className={`px-3 py-1 rounded-full text-sm transition-all ${
                                hashtag.selected
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {hashtag.tag}
                              <span className="ml-1 text-xs opacity-75">
                                {hashtag.relevance}%
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Prediction */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <BarChart3 className="inline w-5 h-5 mr-2 text-purple-600" />
                    予測パフォーマンス
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">予想リーチ</p>
                      <p className="text-xl font-bold text-gray-900">5,000-7,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">予想エンゲージメント率</p>
                      <p className="text-xl font-bold text-gray-900">8-10%</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    ※過去の類似投稿のデータに基づく予測値です
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => router.push('/posts/create')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    画像を変更
                  </button>
                  <button
                    onClick={handleProceed}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    最終確認へ
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}