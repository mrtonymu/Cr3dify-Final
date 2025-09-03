import { Suspense } from 'react'

import type { Metadata } from 'next'

import ClientCreateView from '@/views/clients/ClientCreateView'

export const metadata: Metadata = {
  title: '新建客户 - Cr3dify',
  description: '添加新的客户信息到系统中。'
}

export default function CreateClientPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ClientCreateView />
    </Suspense>
  )
}