'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Instagram,
  PlusCircle,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  User,
  Home,
  X,
  Menu,
  Sparkles
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  userName?: string
}

export default function DashboardLayout({ children, userName = 'デモユーザー' }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    router.push('/login')
  }

  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'ダッシュボード' },
    { href: '/posts/create', icon: PlusCircle, label: '新規投稿作成', accent: true },
    { href: '/posts', icon: FileText, label: '投稿管理' },
    { href: '/analytics', icon: BarChart3, label: '分析・レポート' },
    { href: '/ai-settings', icon: Sparkles, label: 'AI設定' },
  ]

  const bottomMenuItems = [
    { href: '/settings', icon: Settings, label: '設定' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* サイドバー */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-semibold">AI Assistant</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${item.accent ? 'text-purple-600' : ''}`} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="space-y-1">
              {bottomMenuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                )
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3" />
                ログアウト
              </button>
            </div>
          </div>

          {/* ユーザー情報 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">フリープラン</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* トップバー（モバイル用） */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 h-16 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </div>
            <Link
              href="/posts/new"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <PlusCircle className="h-6 w-6 text-purple-600" />
            </Link>
          </div>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}