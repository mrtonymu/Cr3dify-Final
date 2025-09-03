'use client'

import { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material'

import { getClientById, updateClient, UpdateClientSchema } from '@/libs/supabase'
import type { Database } from '@/libs/supabase'

type Client = Database['public']['Tables']['clients']['Row']
type UpdateClientInput = Database['public']['Tables']['clients']['Update']

interface ClientEditViewProps {
  clientId: string
}

const ClientEditView = ({ clientId }: ClientEditViewProps) => {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateClientInput>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: null,
      company: null,
      address: null,
      status: 'active'
    }
  })

  // 获取客户详情
  const fetchClient = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getClientById(clientId)

      if (response.error) {
        setError(response.error)
      } else if (response.data) {
        setClient(response.data)

        // 重置表单为当前客户数据
        reset({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          company: response.data.company,
          address: response.data.address,
          status: response.data.status
        })
      }
    } catch (err) {
      setError('获取客户详情失败')
      console.error('Error fetching client:', err)
    } finally {
      setLoading(false)
    }
  }, [clientId, reset])

  // 提交表单
  const onSubmit = async (data: UpdateClientInput) => {
    try {
      setSubmitting(true)
      setError(null)

      const response = await updateClient(clientId, data)

      if (response.error) {
        setError(response.error)
      } else {
        // 更新成功，跳转到客户详情页
        router.push(`/clients/${clientId}`)
      }
    } catch (err) {
      setError('更新客户失败')
      console.error('Error updating client:', err)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchClient()
  }, [clientId, fetchClient])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    )
  }

  if (error && !client) {
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
          <Link
            color="inherit"
            href={`/clients/${clientId}`}
            onClick={(e) => {
              e.preventDefault()
              router.push(`/clients/${clientId}`)
            }}
            sx={{ cursor: 'pointer' }}
          >
            {client.name}
          </Link>
          <Typography color="text.primary">编辑</Typography>
        </Breadcrumbs>

        {/* 编辑表单 */}
        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom>
              编辑客户信息
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={3}>
                {/* 客户姓名 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="客户姓名"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                {/* 邮箱 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="邮箱"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                {/* 电话 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        fullWidth
                        label="电话"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>

                {/* 公司 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        fullWidth
                        label="公司"
                        error={!!errors.company}
                        helperText={errors.company?.message}
                      />
                    )}
                  />
                </Grid>

                {/* 状态 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.status}>
                        <InputLabel>状态</InputLabel>
                        <Select
                          {...field}
                          label="状态"
                        >
                          <MenuItem value="active">活跃</MenuItem>
                          <MenuItem value="inactive">非活跃</MenuItem>
                          <MenuItem value="pending">待处理</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* 地址 */}
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value || ''}
                        fullWidth
                        label="地址"
                        multiline
                        rows={3}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>

                {/* 操作按钮 */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => router.push(`/clients/${clientId}`)}
                      disabled={submitting}
                    >
                      取消
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitting}
                      startIcon={submitting ? <CircularProgress size={20} /> : null}
                    >
                      {submitting ? '保存中...' : '保存更改'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ClientEditView