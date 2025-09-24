'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Calendar,
  Image,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Stats {
  totalPosts: number
  scheduledPosts: number
  publishedToday: number
  engagementRate: number
}

interface CalendarPost {
  id: string
  title: string
  date: string
  time: string
  status: 'published' | 'scheduled' | 'draft'
}

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    scheduledPosts: 0,
    publishedToday: 0,
    engagementRate: 0
  })
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 24)) // 2025年1月24日
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const posts: CalendarPost[] = [
    {
      id: '1',
      title: 'バレンタイン限定商品',
      date: '2025-02-01',
      time: '12:00',
      status: 'scheduled'
    },
    {
      id: '2',
      title: '営業時間変更のお知らせ',
      date: '2025-01-30',
      time: '09:00',
      status: 'scheduled'
    },
    {
      id: '3',
      title: '週末ランチメニュー',
      date: '2025-01-25',
      time: '11:00',
      status: 'scheduled'
    },
    {
      id: '4',
      title: '本日のおすすめ',
      date: '2025-01-24',
      time: '10:00',
      status: 'published'
    },
    {
      id: '5',
      title: '新商品のご案内',
      date: '2025-02-14',
      time: '10:00',
      status: 'draft'
    }
  ]

  useEffect(() => {
    checkAuth()
    loadDashboardData()
  }, [])

  const checkAuth = async () => {
    // デモモード: 認証チェックをスキップ
    setUserName('デモユーザー')

    /* 実際のSupabase認証（プロジェクト作成後に有効化）
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUserName(user.user_metadata?.name || user.email?.split('@')[0] || 'ユーザー')
    }
    */
  }

  const loadDashboardData = async () => {
    setStats({
      totalPosts: 42,
      scheduledPosts: 5,
      publishedToday: 2,
      engagementRate: 4.8
    })

    // Calendar data is now loaded from the posts array above
  }


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

  return (
    <DashboardLayout userName={userName}>
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            こんにちは、{userName}さん
          </h1>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        総投稿数
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.totalPosts}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        予約投稿
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.scheduledPosts}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        本日の投稿
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.publishedToday}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 投稿カレンダー */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">投稿カレンダー</h2>
              <p className="text-gray-600 mt-1">予約投稿をカレンダー形式で管理</p>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentDate.getFullYear()}年 {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][currentDate.getMonth()]}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      今日
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-7">
                    {/* 曜日ヘッダー */}
                    {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                      <div
                        key={day}
                        className="bg-gray-50 px-2 py-3 text-center text-xs font-medium text-gray-700 border-r border-b border-gray-200 last:border-r-0"
                      >
                        {day}
                      </div>
                    ))}

                    {/* 空のセル（月の最初の日まで） */}
                    {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }, (_, i) => (
                      <div key={`empty-${i}`} className="bg-white p-2 min-h-[100px] border-r border-b border-gray-200 last:border-r-0" />
                    ))}

                    {/* 日付セル */}
                    {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                      const day = i + 1
                      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      const dayPosts = posts.filter(post => post.date === dateStr)
                      const today = new Date()
                      const isTodayDate = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth() && day === today.getDate()

                      return (
                        <div
                          key={day}
                          className={`bg-white p-2 min-h-[100px] border-r border-b border-gray-200 last:border-r-0 ${
                            isTodayDate ? 'ring-2 ring-purple-500 ring-inset' : ''
                          } hover:bg-gray-50 cursor-pointer`}
                          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${
                              isTodayDate ? 'text-purple-600' : 'text-gray-900'
                            }`}>
                              {day}
                            </span>
                            {dayPosts.length > 0 && (
                              <span className="text-xs text-gray-500">
                                {dayPosts.length}件
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {dayPosts.slice(0, 2).map((post) => (
                              <div
                                key={post.id}
                                className={`text-xs p-1 rounded truncate ${
                                  post.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : post.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/posts/${post.id}`)
                                }}
                              >
                                <span className="font-medium">{post.time}</span>
                                <span className="ml-1">{post.title}</span>
                              </div>
                            ))}
                            {dayPosts.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayPosts.length - 2}件
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 凡例 */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 rounded mr-2" />
                  <span className="text-sm text-gray-600">公開済み</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-100 rounded mr-2" />
                  <span className="text-sm text-gray-600">予約済み</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 rounded mr-2" />
                  <span className="text-sm text-gray-600">下書き</span>
                </div>
              </div>
            </div>
          </div>
    </DashboardLayout>
  )
}