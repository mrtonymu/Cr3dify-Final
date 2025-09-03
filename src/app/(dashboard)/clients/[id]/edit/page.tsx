import { Suspense } from 'react'

import type { Metadata } from 'next'

import ClientEditView from '@/views/clients/ClientEditView'

interface ClientEditPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: '编辑客户 - Cr3dify',
  description: '编辑客户信息。'
}

export default function ClientEditPage({ params }: ClientEditPageProps) {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ClientEditView clientId={params.id} />
    </Suspense>
  )
}