'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Upload,
  Image as ImageIcon,
  Grid,
  Loader2
} from 'lucide-react'

export default function CreatePostPage() {
  const router = useRouter()
  const [uploadType, setUploadType] = useState<'single' | 'carousel'>('single')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleUploadTypeChange = (type: 'single' | 'carousel') => {
    setUploadType(type)
  }

  const handleImageClick = () => {
    setIsTransitioning(true)

    // Store dummy data for prototype
    const dummyImages = [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', // Coffee shop
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop', // Coffee cup
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=400&fit=crop'  // Cafe interior
    ]
    const imagesToStore = uploadType === 'single' ? [dummyImages[0]] : dummyImages
    sessionStorage.setItem('uploadedImages', JSON.stringify(imagesToStore))
    sessionStorage.setItem('uploadType', uploadType)

    setTimeout(() => {
      router.push('/posts/create/generate')
    }, 500)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新規投稿作成</h1>
          <p className="text-gray-600 mt-1">投稿タイプを選択して画像をアップロード</p>
        </div>

        {/* 投稿タイプ選択 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">投稿タイプ</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleUploadTypeChange('single')}
              className={`p-4 border-2 rounded-lg transition-all ${
                uploadType === 'single'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ImageIcon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <p className="text-sm font-medium">単一画像</p>
              <p className="text-xs text-gray-500 mt-1">1枚の画像を投稿</p>
            </button>
            <button
              onClick={() => handleUploadTypeChange('carousel')}
              className={`p-4 border-2 rounded-lg transition-all ${
                uploadType === 'carousel'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Grid className="w-6 h-6 mx-auto mb-2 text-gray-700" />
              <p className="text-sm font-medium">カルーセル</p>
              <p className="text-xs text-gray-500 mt-1">2-10枚の画像</p>
            </button>
          </div>
        </div>

        {/* 画像アップロード */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">画像を選択</h2>
            {uploadType === 'carousel' && (
              <span className="text-sm text-gray-500">
                最大10枚まで選択可能
              </span>
            )}
          </div>

          {isTransitioning ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
              <p className="text-gray-600">AI分析画面へ移動中...</p>
            </div>
          ) : (
            <div
              onClick={handleImageClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900">
                  画像をドラッグ&ドロップ
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  または クリックして選択
                </p>
                {uploadType === 'carousel' && (
                  <p className="text-xs text-purple-600 mt-2">
                    複数の画像を一度に選択できます
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-4">
                  ※ プロトタイプ版：クリックでサンプル画像を使用します
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 使い方ヒント */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 ヒント</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 高品質な画像（1080x1080px以上）を使用すると、より良い結果が得られます</li>
            <li>• カルーセル投稿では、関連性の高い画像を順番に配置してください</li>
            <li>• AIが画像を分析し、最適な投稿文とハッシュタグを自動生成します</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}