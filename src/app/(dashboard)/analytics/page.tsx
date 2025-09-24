'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days')

  const stats = {
    followers: {
      current: 12847,
      change: 523,
      percentage: 4.2,
      trend: 'up'
    },
    engagement: {
      current: 8.7,
      change: 0.9,
      percentage: 11.5,
      trend: 'up'
    },
    reach: {
      current: 45623,
      change: -2341,
      percentage: -4.9,
      trend: 'down'
    },
    impressions: {
      current: 128459,
      change: 15234,
      percentage: 13.5,
      trend: 'up'
    }
  }

  const topPosts = [
    {
      id: '1',
      title: '週末限定スペシャルメニュー',
      date: '2025-01-20',
      likes: 1245,
      comments: 89,
      shares: 45,
      saves: 234,
      reach: 8934
    },
    {
      id: '2',
      title: '新商品のご紹介',
      date: '2025-01-18',
      likes: 987,
      comments: 67,
      shares: 34,
      saves: 189,
      reach: 7652
    },
    {
      id: '3',
      title: '店内リニューアルのお知らせ',
      date: '2025-01-15',
      likes: 856,
      comments: 45,
      shares: 28,
      saves: 156,
      reach: 6789
    }
  ]


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">分析・レポート</h1>
            <p className="text-gray-600 mt-1">Instagram投稿のパフォーマンスを分析</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="7days">過去7日間</option>
              <option value="30days">過去30日間</option>
              <option value="90days">過去90日間</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              レポートをダウンロード
            </button>
          </div>
        </div>

        {/* 主要指標 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex items-center text-sm ${stats.followers.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.followers.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stats.followers.percentage}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.followers.current.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">フォロワー数</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.followers.trend === 'up' ? '+' : ''}{stats.followers.change.toLocaleString()} 前期比
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <div className={`flex items-center text-sm ${stats.engagement.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.engagement.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stats.engagement.percentage}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.engagement.current}%</h3>
            <p className="text-sm text-gray-600 mt-1">エンゲージメント率</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.engagement.trend === 'up' ? '+' : ''}{stats.engagement.change}% 前期比
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center text-sm ${stats.reach.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.reach.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(stats.reach.percentage)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.reach.current.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">リーチ数</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.reach.change.toLocaleString()} 前期比
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <div className={`flex items-center text-sm ${stats.impressions.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.impressions.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stats.impressions.percentage}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.impressions.current.toLocaleString()}</h3>
            <p className="text-sm text-gray-600 mt-1">インプレッション</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.impressions.trend === 'up' ? '+' : ''}{stats.impressions.change.toLocaleString()} 前期比
            </p>
          </div>
        </div>

        {/* 人気投稿 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">人気投稿TOP3</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topPosts.map((post, index) => (
              <div key={post.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <Calendar className="inline w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-red-500" />
                      {post.likes.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                      {post.comments}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-4 h-4 mr-1 text-green-500" />
                      {post.shares}
                    </div>
                    <div className="flex items-center">
                      <Bookmark className="w-4 h-4 mr-1 text-purple-500" />
                      {post.saves}
                    </div>
                    <div className="font-medium text-gray-900">
                      リーチ: {post.reach.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}