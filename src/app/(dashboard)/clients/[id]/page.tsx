import { Suspense } from 'react'

import type { Metadata } from 'next'

import ClientDetailView from '@/views/clients/ClientDetailView'

interface ClientDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: '客户详情 - Cr3dify',
  description: '查看客户的详细信息。'
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ClientDetailView clientId={params.id} />
    </Suspense>
  )
}