'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  Divider,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material'

import { getClientById, deleteClient } from '@/libs/supabase'
import type { Database } from '@/libs/supabase'

type Client = Database['public']['Tables']['clients']['Row']

interface ClientDetailViewProps {
  clientId: string
}

const ClientDetailView = ({ clientId }: ClientDetailViewProps) => {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  // 获取客户详情
  const fetchClient = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getClientById(clientId)

      if (response.error) {
        setError(response.error)
      } else {
        setClient(response.data)
      }
    } catch (err) {
      setError('获取客户详情失败')
      console.error('Error fetching client:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除客户
  const handleDeleteClient = async () => {
    if (!confirm('确定要删除这个客户吗？此操作无法撤销。')) {
      return
    }

    try {
      setDeleting(true)
      const response = await deleteClient(clientId)

      if (response.error) {
        setError(response.error)
      } else {
        // 删除成功，跳转到客户列表
        router.push('/clients')
      }
    } catch (err) {
      setError('删除客户失败')
      console.error('Error deleting client:', err)
    } finally {
      setDeleting(false)
    }
  }

  // 状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  // 状态标签文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '活跃'
      case 'inactive':
        return '非活跃'
      case 'pending':
        return '待处理'
      default:
        return status
    }
  }

  // 获取客户姓名首字母
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    fetchClient()
  }, [clientId])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            {error}
          </Alert>
          <Box mt={2}>
            <Button variant="outlined" onClick={() => router.push('/clients')}>
              返回客户列表
            </Button>
          </Box>
        </Grid>
      </Grid>
    )
  }

  if (!client) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="warning">
            客户不存在或已被删除
          </Alert>
          <Box mt={2}>
            <Button variant="outlined" onClick={() => router.push('/clients')}>
              返回客户列表
            </Button>
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* 面包屑导航 */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link
            color="inherit"
            href="/clients"
            onClick={(e) => {
              e.preventDefault()
              router.push('/clients')
            }}
            sx={{ cursor: 'pointer' }}
          >
            客户管理
          </Link>
          <Typography color="text.primary">{client.name}</Typography>
        </Breadcrumbs>

        {/* 客户基本信息卡片 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Box display="flex" alignItems="center" gap={3}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: '1.5rem',
                    bgcolor: 'primary.main'
                  }}
                >
                  {getInitials(client.name)}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {client.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                      label={getStatusText(client.status)}
                      color={getStatusColor(client.status) as any}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      创建于 {new Date(client.created_at).toLocaleDateString('zh-CN')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" gap={1}>
                <Tooltip title="编辑客户">
                  <IconButton
                    color="primary"
                    onClick={() => router.push(`/clients/${client.id}/edit`)}
                  >
                    <i className="tabler-edit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="删除客户">
                  <IconButton
                    color="error"
                    onClick={handleDeleteClient}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <CircularProgress size={20} />
                    ) : (
                      <i className="tabler-trash" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* 联系信息 */}
            <Typography variant="h6" gutterBottom>
              联系信息
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    邮箱
                  </Typography>
                  <Typography variant="body1">
                    {client.email}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    电话
                  </Typography>
                  <Typography variant="body1">
                    {client.phone || '-'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    公司
                  </Typography>
                  <Typography variant="body1">
                    {client.company || '-'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    最后更新
                  </Typography>
                  <Typography variant="body1">
                    {new Date(client.updated_at).toLocaleString('zh-CN')}
                  </Typography>
                </Box>
              </Grid>
              {client.address && (
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      地址
                    </Typography>
                    <Typography variant="body1">
                      {client.address}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* 操作按钮 */}
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => router.push('/clients')}
              >
                返回列表
              </Button>
              <Button
                variant="contained"
                startIcon={<i className="tabler-edit" />}
                onClick={() => router.push(`/clients/${client.id}/edit`)}
              >
                编辑客户
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ClientDetailView