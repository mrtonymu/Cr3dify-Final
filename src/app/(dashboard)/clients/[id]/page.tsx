import { Suspense } from 'react'

import type { Metadata } from 'next'

import ClientDetailView from '@/views/clients/ClientDetailView'

interface ClientDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: '客户详情 - Cr3dify',
  description: '查看客户的详细信息。'
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params
  
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ClientDetailView clientId={id} />
    </Suspense>
  )
}