import { Suspense } from 'react'

import type { Metadata } from 'next'

import ClientsListView from '@/views/clients/ClientsListView'

export const metadata: Metadata = {
  title: '客户管理 - Cr3dify',
  description: '管理您的客户信息，包括查看、添加、编辑和删除客户数据。'
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ClientsListView />
    </Suspense>
  )
}