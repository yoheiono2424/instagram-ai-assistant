'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  MoreHorizontal,
  Eye,
  Hash,
  MapPin,
  Users,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
  Instagram
} from 'lucide-react'

// ダミーデータ
const getPostById = (id: string) => {
  const posts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=600&fit=crop',
      caption: '本日のおすすめランチ🍽️\n新鮮な野菜をたっぷり使ったヘルシーボウル。\n栄養バランスも完璧で、見た目も鮮やか！\n\n#ヘルシーランチ #野菜たっぷり',
      hashtags: ['#ヘルシーランチ', '#野菜たっぷり', '#カフェランチ', '#東京カフェ', '#渋谷ランチ'],
      scheduledDate: '2025-01-28',
      scheduledTime: '12:00',
      status: 'scheduled' as const,
      engagement: {
        likes: 0,
        comments: 0,
        saves: 0,
        reach: 0
      },
      location: '東京, 渋谷',
      taggedUsers: ['@user1', '@user2']
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop',
      caption: '落ち着いた空間で過ごす午後のひととき☕\n\n仕事や勉強にも最適な環境です。',
      hashtags: ['#カフェ', '#コーヒー', '#作業スペース'],
      scheduledDate: '2025-01-26',
      scheduledTime: '15:00',
      status: 'published' as const,
      publishedAt: '2025-01-26T15:00:00',
      engagement: {
        likes: 245,
        comments: 12,
        saves: 38,
        reach: 1842
      }
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=600&fit=crop',
      caption: '週末限定スペシャルメニュー登場！🎉\n\n数量限定なのでお早めに。',
      hashtags: ['#週末限定', '#スペシャルメニュー', '#グルメ'],
      scheduledDate: '2025-02-01',
      scheduledTime: '18:00',
      status: 'draft' as const,
      engagement: {
        likes: 0,
        comments: 0,
        saves: 0,
        reach: 0
      }
    }
  ]

  return posts.find(p => p.id === id) || posts[0]
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const postId = params?.id as string
    const postData = getPostById(postId)
    setPost(postData)
  }, [params])

  if (!post) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">読み込み中...</div>
        </div>
      </DashboardLayout>
    )
  }

  const handleEdit = () => {
    // 編集画面への遷移（実際には編集ページを作る必要がある）
    router.push(`/posts/create?edit=${post.id}`)
  }

  const handleDelete = () => {
    if (confirm('この投稿を削除してもよろしいですか？')) {
      setIsDeleting(true)
      setTimeout(() => {
        router.push('/posts')
      }, 1000)
    }
  }

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(post.caption)
    alert('キャプションをコピーしました')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">投稿詳細</h1>
              <p className="text-gray-600 mt-1">投稿ID: {post.id}</p>
            </div>
          </div>

          {/* ステータスバッジ */}
          <div>
            {post.status === 'published' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                公開済み
              </span>
            )}
            {post.status === 'scheduled' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                予約済み
              </span>
            )}
            {post.status === 'draft' && (
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center">
                <Edit className="w-4 h-4 mr-1" />
                下書き
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側: Instagram風プレビュー */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Instagram className="w-5 h-5 mr-2" />
                投稿プレビュー
              </h2>
            </div>

            <div className="border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
              {/* ヘッダー */}
              <div className="flex items-center p-3 border-b border-gray-200">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">your_account</p>
                  {post.location && (
                    <p className="text-xs text-gray-500">{post.location}</p>
                  )}
                </div>
                <button className="text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* 画像 */}
              <div className="aspect-square bg-gray-100">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* アクションボタン */}
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button className="text-gray-700">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="text-gray-700">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="text-gray-700">
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                  <button className="text-gray-700">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>

                {post.status === 'published' && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold">{post.engagement.likes}件のいいね</p>
                  </div>
                )}
              </div>

              {/* キャプション */}
              <div className="p-3">
                <p className="text-sm whitespace-pre-wrap">
                  <span className="font-semibold mr-2">your_account</span>
                  {post.caption}
                </p>

                {post.taggedUsers && post.taggedUsers.length > 0 && (
                  <div className="mt-2 flex items-center text-sm text-blue-600">
                    <Users className="w-4 h-4 mr-1" />
                    {post.taggedUsers.join(' ')}
                  </div>
                )}

                {post.status === 'published' && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {new Date(post.publishedAt).toLocaleString('ja-JP')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右側: 詳細情報 */}
          <div className="space-y-6">
            {/* 投稿情報 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">投稿情報</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    投稿日時
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {post.status === 'published'
                      ? new Date(post.publishedAt).toLocaleString('ja-JP')
                      : `${post.scheduledDate} ${post.scheduledTime}`
                    }
                  </span>
                </div>

                {post.location && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      位置情報
                    </span>
                    <span className="text-sm font-medium text-gray-900">{post.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Hash className="w-4 h-4 mr-2" />
                    ハッシュタグ数
                  </span>
                  <span className="text-sm font-medium text-gray-900">{post.hashtags.length}個</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">文字数</span>
                  <span className="text-sm font-medium text-gray-900">{post.caption.length}文字</span>
                </div>
              </div>
            </div>

            {/* エンゲージメント（公開済みの場合） */}
            {post.status === 'published' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">エンゲージメント</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">{post.engagement.likes}</p>
                    <p className="text-xs text-gray-600">いいね</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">{post.engagement.comments}</p>
                    <p className="text-xs text-gray-600">コメント</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bookmark className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">{post.engagement.saves}</p>
                    <p className="text-xs text-gray-600">保存</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Eye className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">{post.engagement.reach}</p>
                    <p className="text-xs text-gray-600">リーチ</p>
                  </div>
                </div>
              </div>
            )}

            {/* ハッシュタグ */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">使用ハッシュタグ</h3>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex space-x-3">
              <button
                onClick={handleCopyCaption}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                キャプションをコピー
              </button>

              {post.status !== 'published' && (
                <button
                  onClick={handleEdit}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  編集
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? '削除中...' : '削除'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}