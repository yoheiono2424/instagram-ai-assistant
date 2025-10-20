'use client'

import { useState, useMemo } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  Heart,
  MessageCircle,
  Bookmark,
  Calendar,
  Download,
  X,
  TrendingUp,
  Users,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpDown
} from 'lucide-react'

// ダミーデータ（30件）
const generateDummyPosts = (count: number, isTop: boolean) => {
  const sampleTitles = [
    'シェフ特製パスタランチセット',
    '春の新作コレクション入荷',
    '週末限定セール開催中',
    '季節のデザートプレート',
    'お客様の声をご紹介',
    '本日のおすすめメニュー',
    '限定カラー入荷のお知らせ',
    '店内リニューアルオープン',
    '特別イベント開催決定',
    '新商品先行予約スタート',
    'ランチタイム限定メニュー',
    '人気商品再入荷しました',
    '週末ディナーコース',
    'スタッフおすすめコーデ',
    '期間限定キャンペーン',
    '本日の営業時間変更',
    'ビフォーアフター施術例',
    'お得なセットメニュー',
    '新作スイーツ登場',
    'プレミアムコース予約受付中'
  ]

  const sampleCaptions = [
    '本日のランチメニューをご紹介します🍽️\n\n季節の食材を使った特別なコースをご用意しました。シェフこだわりの一品をぜひお楽しみください。\n\nご予約はプロフィールのリンクから📱',
    '新商品が入荷しました✨\n\nお客様からのご要望にお応えして、待望の新作が登場！限定数量となっておりますので、お早めにチェックしてくださいね。\n\nオンラインストアでもご購入いただけます💕',
    '週末限定の特別イベント開催中🎉\n\n今週末限定で特別価格にてご提供します。この機会をお見逃しなく！\n\nご来店お待ちしております😊',
    '本日も営業しております☀️\n\nいつもご愛顧いただきありがとうございます。スタッフ一同、皆様のお越しを心よりお待ちしております。\n\n営業時間：11:00-22:00',
    'お客様の声をご紹介💬\n\n「とても満足しました！」「また利用したいです」など、嬉しいお声をたくさんいただいております。ありがとうございます！\n\n皆様のご来店をお待ちしております✨'
  ]

  const sampleHashtags = [
    '#インスタグラム #Instagram #グルメ #ランチ #ディナー #カフェ #おしゃれ #フォトジェニック',
    '#新商品 #限定 #ファッション #コーディネート #おすすめ #トレンド #プチプラ #お洒落さんと繋がりたい',
    '#週末 #イベント #キャンペーン #セール #お得 #期間限定 #チェック #見逃せない',
    '#営業中 #本日営業 #ご来店 #お待ちしております #感謝 #ありがとうございます #フォロー歓迎',
    '#お客様の声 #レビュー #口コミ #満足 #リピート #おすすめ #人気 #評判'
  ]

  return Array.from({ length: count }, (_, i) => {
    const randomDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    return {
      id: `post-${i + 1}`,
      title: sampleTitles[i % sampleTitles.length],
      imageUrl: `https://picsum.photos/seed/${i + 1}/400/400`,
      date: randomDate.toISOString().split('T')[0],
      datetime: randomDate.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      likes: isTop ? Math.floor(Math.random() * 2000) + 1000 : Math.floor(Math.random() * 100) + 10,
      comments: isTop ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 20) + 1,
      saves: isTop ? Math.floor(Math.random() * 400) + 100 : Math.floor(Math.random() * 30) + 5,
      caption: sampleCaptions[i % sampleCaptions.length],
      hashtags: sampleHashtags[i % sampleHashtags.length]
    }
  })
}

type SortKey = 'likes' | 'comments' | 'saves'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<'7days' | '30days' | 'custom'>('7days')
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)
  const [viewType, setViewType] = useState<'top' | 'worst'>('top')
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [sortBy, setSortBy] = useState<SortKey>('likes')
  const [visibleMetrics, setVisibleMetrics] = useState({
    followers: true,
    engagement: true,
    reach: true,
    impressions: true
  })

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }))
  }

  const showAllMetrics = () => {
    setVisibleMetrics({
      followers: true,
      engagement: true,
      reach: true,
      impressions: true
    })
  }

  const hideAllMetrics = () => {
    setVisibleMetrics({
      followers: false,
      engagement: false,
      reach: false,
      impressions: false
    })
  }

  // ダミーデータ生成（メモ化して再レンダリング時に再生成されないようにする）
  const topPosts = useMemo(() => generateDummyPosts(30, true), [])
  const worstPosts = useMemo(() => generateDummyPosts(30, false), [])

  const currentPosts = viewType === 'top' ? topPosts : worstPosts

  // sortByに基づいてソート
  const sortedPosts = [...currentPosts].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    return viewType === 'top' ? bValue - aValue : aValue - bValue
  })

  // 主要指標データ
  const stats = {
    followers: {
      current: 12847,
      change: 523,
      percentage: 4.2,
      trend: 'up' as 'up' | 'down'
    },
    engagement: {
      current: 8.7,
      change: 0.9,
      percentage: 11.5,
      trend: 'up' as 'up' | 'down'
    },
    reach: {
      current: 45623,
      change: -2341,
      percentage: -4.9,
      trend: 'down' as 'up' | 'down'
    },
    impressions: {
      current: 128459,
      change: 15234,
      percentage: 13.5,
      trend: 'up' as 'up' | 'down'
    }
  }

  // グラフ用ダミーデータ（7日間 or 30日間）- dateRangeが変わった時のみ再生成
  const chartData = useMemo(() => {
    const days = dateRange === '7days' ? 7 : 30
    return Array.from({ length: days }, (_, i) => {
      const baseDate = Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000
      return {
        date: new Date(baseDate).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        followers: 12000 + Math.floor(Math.random() * 1500) + i * 30,
        engagement: 7.5 + Math.random() * 2.5,
        reach: 40000 + Math.floor(Math.random() * 10000) + i * 200,
        impressions: 120000 + Math.floor(Math.random() * 20000) + i * 500
      }
    })
  }, [dateRange])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">分析・レポート</h1>
            <p className="text-gray-600 mt-1">Instagram投稿のパフォーマンスを分析</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* 期間選択 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDateRange('7days')
                  setShowCustomDatePicker(false)
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  dateRange === '7days'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                直近7日
              </button>
              <button
                onClick={() => {
                  setDateRange('30days')
                  setShowCustomDatePicker(false)
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  dateRange === '30days'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                直近30日
              </button>
              <button
                onClick={() => {
                  setDateRange('custom')
                  setShowCustomDatePicker(!showCustomDatePicker)
                }}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  dateRange === 'custom'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                期間指定
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4 mr-2" />
              レポート
            </button>
          </div>
        </div>

        {/* カスタム期間選択 */}
        {showCustomDatePicker && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">開始日:</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <span className="text-gray-500">〜</span>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">終了日:</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button
                onClick={() => {
                  // 期間適用処理
                  console.log('期間適用:', customStartDate, '〜', customEndDate)
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                適用
              </button>
            </div>
          </div>
        )}

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

        {/* アカウント指標の推移グラフ */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">アカウント指標の推移</h2>

            {/* 指標フィルター */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 全体操作ボタン */}
              <div className="flex items-center gap-2 pr-3 border-r-2 border-gray-200">
                <button
                  onClick={showAllMetrics}
                  className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
                >
                  全て
                </button>
                <button
                  onClick={hideAllMetrics}
                  className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm"
                >
                  全解除
                </button>
              </div>

              {/* 個別フィルターボタン */}
              <button
                onClick={() => toggleMetric('followers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all shadow-sm hover:shadow-md ${
                  visibleMetrics.followers
                    ? 'bg-purple-600 border-purple-600 text-white shadow-purple-200'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-purple-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${visibleMetrics.followers ? 'bg-white' : 'bg-purple-500'}`}></div>
                <span className="text-sm font-semibold">フォロワー数</span>
              </button>
              <button
                onClick={() => toggleMetric('engagement')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all shadow-sm hover:shadow-md ${
                  visibleMetrics.engagement
                    ? 'bg-pink-600 border-pink-600 text-white shadow-pink-200'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-pink-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${visibleMetrics.engagement ? 'bg-white' : 'bg-pink-500'}`}></div>
                <span className="text-sm font-semibold">エンゲージメント率</span>
              </button>
              <button
                onClick={() => toggleMetric('reach')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all shadow-sm hover:shadow-md ${
                  visibleMetrics.reach
                    ? 'bg-blue-600 border-blue-600 text-white shadow-blue-200'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${visibleMetrics.reach ? 'bg-white' : 'bg-blue-500'}`}></div>
                <span className="text-sm font-semibold">リーチ数</span>
              </button>
              <button
                onClick={() => toggleMetric('impressions')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all shadow-sm hover:shadow-md ${
                  visibleMetrics.impressions
                    ? 'bg-green-600 border-green-600 text-white shadow-green-200'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-green-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${visibleMetrics.impressions ? 'bg-white' : 'bg-green-500'}`}></div>
                <span className="text-sm font-semibold">インプレッション</span>
              </button>
            </div>
          </div>

          {/* グラフエリア */}
          <div className="relative h-96 border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white shadow-inner overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="none">
              {/* 定義セクション */}
              <defs>
                {/* グラデーション定義 */}
                <linearGradient id="gradientPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                {/* シャドウフィルター */}
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>

              {/* グリッドライン（点線） */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1="60"
                  y1={50 + i * 40}
                  x2="780"
                  y2={50 + i * 40}
                  stroke="#d1d5db"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
              ))}

              {/* フォロワー数のグラデーションエリア */}
              {visibleMetrics.followers && (
                <>
                  <path
                    d={`M ${chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.followers - 11500) / 2000) * 200
                      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                    }).join(' ')} L ${60 + ((chartData.length - 1) * (720 / (chartData.length - 1)))},250 L 60,250 Z`}
                    fill="url(#gradientPurple)"
                  />
                  <polyline
                    points={chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.followers - 11500) / 2000) * 200
                      return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* データポイント */}
                  {chartData.map((d, i) => {
                    const x = 60 + (i * (720 / (chartData.length - 1)))
                    const y = 250 - ((d.followers - 11500) / 2000) * 200
                    return (
                      <circle
                        key={`follower-point-${i}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="white"
                        stroke="#a855f7"
                        strokeWidth="2"
                      />
                    )
                  })}
                </>
              )}

              {/* エンゲージメント率のグラデーションエリア */}
              {visibleMetrics.engagement && (
                <>
                  <path
                    d={`M ${chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.engagement - 6) / 5) * 200
                      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                    }).join(' ')} L ${60 + ((chartData.length - 1) * (720 / (chartData.length - 1)))},250 L 60,250 Z`}
                    fill="url(#gradientPink)"
                  />
                  <polyline
                    points={chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.engagement - 6) / 5) * 200
                      return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* データポイント */}
                  {chartData.map((d, i) => {
                    const x = 60 + (i * (720 / (chartData.length - 1)))
                    const y = 250 - ((d.engagement - 6) / 5) * 200
                    return (
                      <circle
                        key={`engagement-point-${i}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="white"
                        stroke="#ec4899"
                        strokeWidth="2"
                      />
                    )
                  })}
                </>
              )}

              {/* リーチ数のグラデーションエリア */}
              {visibleMetrics.reach && (
                <>
                  <path
                    d={`M ${chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.reach - 38000) / 15000) * 200
                      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                    }).join(' ')} L ${60 + ((chartData.length - 1) * (720 / (chartData.length - 1)))},250 L 60,250 Z`}
                    fill="url(#gradientBlue)"
                  />
                  <polyline
                    points={chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.reach - 38000) / 15000) * 200
                      return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* データポイント */}
                  {chartData.map((d, i) => {
                    const x = 60 + (i * (720 / (chartData.length - 1)))
                    const y = 250 - ((d.reach - 38000) / 15000) * 200
                    return (
                      <circle
                        key={`reach-point-${i}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="white"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    )
                  })}
                </>
              )}

              {/* インプレッションのグラデーションエリア */}
              {visibleMetrics.impressions && (
                <>
                  <path
                    d={`M ${chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.impressions - 115000) / 30000) * 200
                      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                    }).join(' ')} L ${60 + ((chartData.length - 1) * (720 / (chartData.length - 1)))},250 L 60,250 Z`}
                    fill="url(#gradientGreen)"
                  />
                  <polyline
                    points={chartData.map((d, i) => {
                      const x = 60 + (i * (720 / (chartData.length - 1)))
                      const y = 250 - ((d.impressions - 115000) / 30000) * 200
                      return `${x},${y}`
                    }).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                  />
                  {/* データポイント */}
                  {chartData.map((d, i) => {
                    const x = 60 + (i * (720 / (chartData.length - 1)))
                    const y = 250 - ((d.impressions - 115000) / 30000) * 200
                    return (
                      <circle
                        key={`impression-point-${i}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="white"
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                    )
                  })}
                </>
              )}

              {/* X軸 */}
              <line x1="60" y1="250" x2="780" y2="250" stroke="#9ca3af" strokeWidth="2" />

              {/* X軸ラベル */}
              {chartData.filter((_, i) => i % Math.ceil(chartData.length / 7) === 0).map((d, i, arr) => {
                const index = chartData.indexOf(d)
                const x = 60 + (index * (720 / (chartData.length - 1)))
                return (
                  <text
                    key={index}
                    x={x}
                    y="275"
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {d.date}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        {/* 投稿パフォーマンスランキング */}
        <div className={`rounded-lg shadow p-6 ${viewType === 'top' ? 'bg-green-50' : 'bg-blue-50'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">投稿パフォーマンスランキング</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* ソート選択 */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="likes">いいね数</option>
                  <option value="comments">コメント数</option>
                  <option value="saves">保存数</option>
                </select>
              </div>

              {/* TOP/ワースト切り替え */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewType('top')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewType === 'top'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  人気TOP30
                </button>
                <button
                  onClick={() => setViewType('worst')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewType === 'worst'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  ワースト30
                </button>
              </div>
            </div>
          </div>

          {/* 投稿リスト */}
          <div className="space-y-2">
            {sortedPosts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 p-3">
                  {/* ランキング番号 */}
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white font-bold text-xs">
                      {index + 1}
                    </div>
                  </div>

                  {/* 画像 */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* 投稿情報 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      {/* タイトル */}
                      <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>

                      {/* 指標 */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          <span className="font-medium">{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{post.comments.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Bookmark className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{post.saves.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {/* 投稿日時 */}
                    <p className="text-xs text-gray-500">{post.datetime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 投稿詳細モーダル */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">投稿詳細</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 内容 */}
            <div className="p-6 space-y-6">
              {/* 画像 */}
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* タイトルと日時 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{selectedPost.title}</h3>
                <p className="text-sm text-gray-500">{selectedPost.datetime}</p>
              </div>

              {/* キャプション */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">投稿本文</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedPost.caption}</p>
              </div>

              {/* ハッシュタグ */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">ハッシュタグ</h4>
                <p className="text-sm text-blue-600">{selectedPost.hashtags}</p>
              </div>

              {/* 詳細指標 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">パフォーマンス指標</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-gray-600">いいね</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedPost.likes.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">コメント</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedPost.comments}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Bookmark className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-gray-600">保存</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{selectedPost.saves}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
