'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Image as ImageIcon
} from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  status: 'published' | 'scheduled' | 'draft'
  scheduledAt?: string
  publishedAt?: string
  imageUrl?: string
  likes: number
  comments: number
  createdAt: string
}

export default function PostsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all')
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  const posts: Post[] = [
    {
      id: '1',
      title: '週末限定スペシャルメニュー',
      content: '本日から週末限定のスペシャルメニューをご用意しました！新鮮な野菜をたっぷり使った...',
      status: 'published',
      publishedAt: '2025-01-24T10:00:00',
      imageUrl: '/api/placeholder/400/400',
      likes: 245,
      comments: 18,
      createdAt: '2025-01-24T09:00:00'
    },
    {
      id: '2',
      title: 'バレンタイン限定商品のご案内',
      content: 'バレンタインに向けて特別な商品をご用意しました。大切な人への贈り物に...',
      status: 'scheduled',
      scheduledAt: '2025-02-01T12:00:00',
      imageUrl: '/api/placeholder/400/400',
      likes: 0,
      comments: 0,
      createdAt: '2025-01-23T15:00:00'
    },
    {
      id: '3',
      title: '新商品開発中',
      content: '現在、春に向けた新商品を開発中です。どんな商品が良いか、ぜひご意見を...',
      status: 'draft',
      imageUrl: '/api/placeholder/400/400',
      likes: 0,
      comments: 0,
      createdAt: '2025-01-22T14:00:00'
    },
    {
      id: '4',
      title: '本日のランチメニュー',
      content: '本日のランチメニューはこちら！ヘルシーで美味しい料理をご用意してお待ちしています...',
      status: 'published',
      publishedAt: '2025-01-23T11:00:00',
      imageUrl: '/api/placeholder/400/400',
      likes: 189,
      comments: 12,
      createdAt: '2025-01-23T10:00:00'
    },
    {
      id: '5',
      title: '営業時間変更のお知らせ',
      content: '2月より営業時間を変更させていただきます。詳細はこちらをご確認ください...',
      status: 'scheduled',
      scheduledAt: '2025-01-30T09:00:00',
      likes: 0,
      comments: 0,
      createdAt: '2025-01-21T16:00:00'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            公開済み
          </span>
        )
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            予約済み
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            下書き
          </span>
        )
      default:
        return null
    }
  }

  const filteredPosts = posts.filter(post => {
    if (filterStatus !== 'all' && post.status !== filterStatus) {
      return false
    }
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">投稿管理</h1>
          <p className="text-gray-600 mt-1">すべての投稿を管理・編集できます</p>
        </div>

        {/* フィルター */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="投稿を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'published'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                公開済み
              </button>
              <button
                onClick={() => setFilterStatus('scheduled')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'scheduled'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                予約済み
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'draft'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                下書き
              </button>
            </div>
          </div>
        </div>

        {/* 投稿リスト */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                <div className="flex items-start space-x-4">
                  {post.imageUrl && (
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          {getStatusBadge(post.status)}
                          {post.publishedAt && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                            </span>
                          )}
                          {post.scheduledAt && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(post.scheduledAt).toLocaleDateString('ja-JP')} 予定
                            </span>
                          )}
                          {post.status === 'published' && (
                            <>
                              <span className="text-xs text-gray-500">
                                ❤️ {post.likes}
                              </span>
                              <span className="text-xs text-gray-500">
                                💬 {post.comments}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedPost(selectedPost === post.id ? null : post.id)
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {selectedPost === post.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/posts/${post.id}`)
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <Eye className="w-4 h-4 mr-2" />
                              詳細を見る
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <Edit2 className="w-4 h-4 mr-2" />
                              編集
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                              <Copy className="w-4 h-4 mr-2" />
                              複製
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                              <Trash2 className="w-4 h-4 mr-2" />
                              削除
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">投稿が見つかりませんでした</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}