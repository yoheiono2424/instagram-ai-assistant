'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Send,
  Clock,
  Calendar,
  MapPin,
  Users,
  Facebook,
  Check,
  ChevronLeft,
  Edit2,
  Save,
  Instagram,
  Hash,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react'

interface PostSettings {
  postType: 'now' | 'ai' | 'manual'
  scheduledDate?: string
  scheduledTime?: string
  aiScheduledDate?: string
  aiScheduledTime?: string
  addLocation: boolean
  location?: string
  addTags: boolean
  taggedUsers?: string
  shareToFacebook: boolean
}

export default function ConfirmPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [scheduledTime, setScheduledTime] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedHashtags, setEditedHashtags] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [postSettings, setPostSettings] = useState<PostSettings>({
    postType: 'now',
    addLocation: false,
    addTags: false,
    shareToFacebook: false
  })

  useEffect(() => {
    // Get data from sessionStorage
    const storedImages = sessionStorage.getItem('uploadedImages')
    const storedContent = sessionStorage.getItem('generatedContent')
    const storedHashtags = sessionStorage.getItem('selectedHashtags')
    const storedTime = sessionStorage.getItem('scheduledTime')

    if (storedImages && storedContent && storedHashtags) {
      setImages(JSON.parse(storedImages))
      setContent(storedContent)
      setHashtags(JSON.parse(storedHashtags))

      if (storedTime && storedTime !== 'null') {
        const time = JSON.parse(storedTime)
        setScheduledTime(time)
        const aiDate = new Date(time.datetime)
        setPostSettings(prev => ({
          ...prev,
          postType: 'ai',
          aiScheduledDate: aiDate.toISOString().split('T')[0],
          aiScheduledTime: aiDate.toTimeString().slice(0, 5),
          scheduledDate: aiDate.toISOString().split('T')[0],
          scheduledTime: aiDate.toTimeString().slice(0, 5)
        }))
      } else {
        setPostSettings(prev => ({ ...prev, postType: 'now' }))
      }

      setEditedContent(storedContent)
      setEditedHashtags(JSON.parse(storedHashtags).join(' '))
    } else {
      // If no data, redirect back
      router.push('/posts/create')
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setContent(editedContent)
    setHashtags(editedHashtags.split(' ').filter(tag => tag.startsWith('#')))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedContent(content)
    setEditedHashtags(hashtags.join(' '))
    setIsEditing(false)
  }

  const handlePost = async () => {
    setIsPosting(true)

    // Simulate posting
    setTimeout(() => {
      // Clear session storage
      sessionStorage.removeItem('uploadedImages')
      sessionStorage.removeItem('uploadType')
      sessionStorage.removeItem('generatedContent')
      sessionStorage.removeItem('selectedHashtags')
      sessionStorage.removeItem('scheduledTime')

      // Show success message and redirect
      const message = postSettings.postType === 'now'
        ? '投稿が完了しました！'
        : postSettings.postType === 'ai'
        ? `AIが推奨した時間（${postSettings.aiScheduledDate} ${postSettings.aiScheduledTime}）に予約しました！`
        : `指定した時間（${postSettings.scheduledDate} ${postSettings.scheduledTime}）に予約しました！`
      alert(message)
      router.push('/dashboard')
    }, 2000)
  }

  const handleSaveDraft = () => {
    alert('下書きを保存しました')
    router.push('/posts')
  }

  const fullContent = `${content}\n\n${hashtags.join(' ')}`

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">投稿の最終確認</h1>
            <p className="text-gray-600 mt-1">内容を確認して投稿してください</p>
          </div>
          <button
            onClick={() => router.push('/posts/create/generate')}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            戻る
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Instagram Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <Instagram className="inline w-5 h-5 mr-2" />
              投稿プレビュー
            </h2>

            {/* Instagram-like Preview */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center p-3 border-b border-gray-200">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                <div>
                  <p className="text-sm font-semibold">your_account</p>
                  {postSettings.addLocation && postSettings.location && (
                    <p className="text-xs text-gray-500">{postSettings.location}</p>
                  )}
                </div>
              </div>

              {/* Image */}
              {images.length > 0 && (
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={images[0]}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      <ImageIcon className="inline w-3 h-3 mr-1" />
                      {images.length}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="p-3 border-b border-gray-200">
                <div className="flex space-x-4">
                  <button className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3">
                <p className="text-sm whitespace-pre-wrap">
                  <span className="font-semibold mr-2">your_account</span>
                  {isEditing ? (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                      rows={4}
                    />
                  ) : (
                    content
                  )}
                </p>
                <div className="mt-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedHashtags}
                      onChange={(e) => setEditedHashtags(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="ハッシュタグをスペース区切りで入力"
                    />
                  ) : (
                    <p className="text-sm text-blue-600">
                      {hashtags.join(' ')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-4 flex justify-center">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    保存
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  投稿内容を編集
                </button>
              )}
            </div>
          </div>

          {/* Right: Post Settings */}
          <div className="space-y-6">
            {/* Posting Time */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">投稿設定</h3>

              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="radio"
                    name="postType"
                    checked={postSettings.postType === 'now'}
                    onChange={() => setPostSettings(prev => ({ ...prev, postType: 'now' }))}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">今すぐ投稿</p>
                    <p className="text-sm text-gray-500">すぐにInstagramに公開されます</p>
                  </div>
                </label>

                <label className="flex items-start">
                  <input
                    type="radio"
                    name="postType"
                    checked={postSettings.postType === 'ai'}
                    onChange={() => setPostSettings(prev => ({ ...prev, postType: 'ai' }))}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      <Sparkles className="inline w-4 h-4 text-purple-600 mr-1" />
                      AI推奨時間に予約投稿
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      AIが最適と判断した時間に自動投稿
                    </p>
                    {postSettings.aiScheduledDate && postSettings.aiScheduledTime && (
                      <div className="mt-2 p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">
                          推奨投稿時間: {new Date(`${postSettings.aiScheduledDate}T${postSettings.aiScheduledTime}`).toLocaleString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-xs text-purple-700 mt-1">
                          {scheduledTime?.engagement === 'high' ? '高エンゲージメント予測' :
                           scheduledTime?.engagement === 'medium' ? '中エンゲージメント予測' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                <label className="flex items-start">
                  <input
                    type="radio"
                    name="postType"
                    checked={postSettings.postType === 'manual'}
                    onChange={() => setPostSettings(prev => ({ ...prev, postType: 'manual' }))}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">手動で時間指定</p>
                    <p className="text-sm text-gray-500">お好きな日時を指定できます</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={postSettings.scheduledDate || ''}
                        onChange={(e) => setPostSettings(prev => ({
                          ...prev,
                          scheduledDate: e.target.value
                        }))}
                        disabled={postSettings.postType !== 'manual'}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                      />
                      <input
                        type="time"
                        value={postSettings.scheduledTime || ''}
                        onChange={(e) => setPostSettings(prev => ({
                          ...prev,
                          scheduledTime: e.target.value
                        }))}
                        disabled={postSettings.postType !== 'manual'}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">投稿オプション</h3>

              <div className="space-y-3">
                <div>
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">位置情報を追加</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={postSettings.addLocation}
                      onChange={(e) => setPostSettings(prev => ({
                        ...prev,
                        addLocation: e.target.checked,
                        location: e.target.checked ? prev.location : undefined
                      }))}
                      className="rounded text-purple-600"
                    />
                  </label>
                  {postSettings.addLocation && (
                    <div className="mt-2 ml-8">
                      <input
                        type="text"
                        value={postSettings.location || ''}
                        onChange={(e) => setPostSettings(prev => ({
                          ...prev,
                          location: e.target.value
                        }))}
                        placeholder="例: 東京, 渋谷"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">ユーザーをタグ付け</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={postSettings.addTags}
                      onChange={(e) => setPostSettings(prev => ({
                        ...prev,
                        addTags: e.target.checked,
                        taggedUsers: e.target.checked ? prev.taggedUsers : undefined
                      }))}
                      className="rounded text-purple-600"
                    />
                  </label>
                  {postSettings.addTags && (
                    <div className="mt-2 ml-8">
                      <input
                        type="text"
                        value={postSettings.taggedUsers || ''}
                        onChange={(e) => setPostSettings(prev => ({
                          ...prev,
                          taggedUsers: e.target.value
                        }))}
                        placeholder="@username1 @username2 (スペース区切り)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                  )}
                </div>

                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <Facebook className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Facebookにも同時投稿</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={postSettings.shareToFacebook}
                    onChange={(e) => setPostSettings(prev => ({
                      ...prev,
                      shareToFacebook: e.target.checked
                    }))}
                    className="rounded text-purple-600"
                  />
                </label>
              </div>
            </div>

            {/* Statistics Preview */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">投稿情報</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">文字数</span>
                  <span className="font-medium text-gray-900">{content.length}文字</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ハッシュタグ数</span>
                  <span className="font-medium text-gray-900">{hashtags.length}個</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">画像枚数</span>
                  <span className="font-medium text-gray-900">{images.length}枚</span>
                </div>
                {scheduledTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">予想エンゲージメント</span>
                    <span className="font-medium text-green-600">
                      {scheduledTime.engagement === 'high' ? '高' :
                       scheduledTime.engagement === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSaveDraft}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                下書き保存
              </button>
              <button
                onClick={handlePost}
                disabled={isPosting}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPosting ? (
                  <>処理中...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {postSettings.postType === 'now' ? '今すぐ投稿' :
                     postSettings.postType === 'ai' ? 'AI推奨時間に予約' : '指定時間に予約'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}