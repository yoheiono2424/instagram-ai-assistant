'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import {
  User,
  Mail,
  Building,
  Instagram,
  Save,
  Check,
  AlertCircle,
  ChevronRight,
  Key,
  Copy,
  Eye,
  EyeOff,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [savedMessage, setSavedMessage] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'デモユーザー',
    email: 'demo@example.com',
    company: '株式会社サンプル',
    industry: 'restaurant',
    phone: '03-1234-5678'
  })

  const [instagramSettings, setInstagramSettings] = useState({
    accessToken: '',
    businessAccountId: '',
    isConnected: false
  })
  const [showToken, setShowToken] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)

  const handleSave = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'instagram', label: 'Instagram連携', icon: Instagram }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">設定</h1>
            <p className="text-gray-600 mt-1">アカウントと環境設定を管理</p>
          </div>
          {savedMessage && (
            <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <Check className="w-4 h-4 mr-2" />
              設定を保存しました
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* サイドメニュー */}
          <div className="w-full lg:w-64">
            <nav className="bg-white rounded-lg shadow">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                      activeTab === tab.id ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600' : 'text-gray-700'
                    } ${tab.id === tabs[0].id ? 'rounded-t-lg' : ''} ${tab.id === tabs[tabs.length - 1].id ? 'rounded-b-lg' : ''}`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )
              })}
            </nav>
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">プロフィール設定</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        お名前
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        会社名
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        電話番号
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      変更を保存
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'instagram' && (
              <div className="space-y-6">
                {/* Instagram API設定 */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Instagram API連携設定</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Instagram Graph APIのアクセストークンを設定してください
                      </p>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open('/instagram-api-manual.html', '_blank');
                      }}
                      className="flex items-center px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 mr-1" />
                      設定方法を確認
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>

                  <div className="space-y-6">
                    {/* 接続ステータス */}
                    {instagramSettings.isConnected ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                          <div>
                            <p className="font-medium text-green-800">連携済み</p>
                            <p className="text-sm text-green-700 mt-1">
                              Instagram APIと正常に接続されています
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                          <div>
                            <p className="font-medium text-yellow-800">未連携</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              以下のフォームにAPIキーを入力して連携を設定してください
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* アクセストークン入力 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Key className="inline w-4 h-4 mr-1" />
                        アクセストークン
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showToken ? 'text' : 'password'}
                          value={instagramSettings.accessToken}
                          onChange={(e) => setInstagramSettings({
                            ...instagramSettings,
                            accessToken: e.target.value
                          })}
                          placeholder="EAABwzLixnjYBOZDZD..."
                          className="w-full px-3 py-2 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setShowToken(!showToken)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(instagramSettings.accessToken);
                              setCopiedToken(true);
                              setTimeout(() => setCopiedToken(false), 2000);
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            {copiedToken ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Meta for DevelopersのInstagram Graph APIから取得したトークン
                      </p>
                    </div>

                    {/* ビジネスアカウントID入力 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Instagram className="inline w-4 h-4 mr-1" />
                        ビジネスアカウントID
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={instagramSettings.businessAccountId}
                        onChange={(e) => setInstagramSettings({
                          ...instagramSettings,
                          businessAccountId: e.target.value
                        })}
                        placeholder="17841444355555555"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        InstagramビジネスアカウントのID（数字のみ）
                      </p>
                    </div>

                    {/* 注意事項 */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-900 mb-2">📝 設定前の確認事項</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Instagramアカウントがビジネスアカウントまたはクリエイターアカウントであること</li>
                        <li>• FacebookページとInstagramアカウントが連携されていること</li>
                        <li>• アクセストークンに必要な権限が付与されていること</li>
                        <li>• トークンの有効期限を定期的に確認すること（60日で失効）</li>
                      </ul>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          // テスト接続の実装
                          alert('接続テスト機能は開発中です');
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        接続テスト
                      </button>
                      <button
                        onClick={() => {
                          handleSave();
                          setInstagramSettings({ ...instagramSettings, isConnected: true });
                        }}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                        disabled={!instagramSettings.accessToken || !instagramSettings.businessAccountId}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        設定を保存
                      </button>
                    </div>
                  </div>
                </div>

                {/* OAuth認証（将来実装） */}
                <div className="bg-gray-50 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <div className="opacity-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      簡単連携（OAuth認証）
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      ワンクリックでInstagramアカウントと連携できます
                    </p>
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium">
                      <Instagram className="inline w-5 h-5 mr-2" />
                      Instagramでログイン
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}