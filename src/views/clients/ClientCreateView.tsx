'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createClient, CreateClientSchema } from '@/libs/supabase'
import type { CreateClientInput } from '@/libs/supabase'

const ClientCreateView = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateClientInput>({
    resolver: zodResolver(CreateClientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: null,
      company: null,
      address: null,
      status: 'active'
    }
  })

  const onSubmit = async (data: CreateClientInput) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const response = await createClient(data)

      if (response.error) {
        setError(response.error)
      } else {
        setSuccess(true)
        reset()
        
        // 3秒后跳转到客户列表
        setTimeout(() => {
          router.push('/clients')
        }, 2000)
      }
    } catch (err) {
      setError('创建客户失败，请重试')
      console.error('Error creating client:', err)
    } finally {
      setLoading(false)
    }
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
          <Typography color="text.primary">新建客户</Typography>
        </Breadcrumbs>

        <Card>
          <CardContent>
            {/* 页面标题 */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" component="h1">
                新建客户
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/clients')}
                disabled={loading}
              >
                返回列表
              </Button>
            </Box>

            {/* 成功提示 */}
            {success && (
              <Alert severity="success" sx={{ mb: 4 }}>
                客户创建成功！即将跳转到客户列表...
              </Alert>
            )}

            {/* 错误提示 */}
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}

            {/* 表单 */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {/* 客户姓名 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="客户姓名 *"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        disabled={loading}
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
                        label="邮箱 *"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={loading}
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
                        fullWidth
                        label="电话"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        disabled={loading}
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
                        fullWidth
                        label="公司"
                        error={!!errors.company}
                        helperText={errors.company?.message}
                        disabled={loading}
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
                          disabled={loading}
                        >
                          <MenuItem value="active">活跃</MenuItem>
                          <MenuItem value="inactive">非活跃</MenuItem>
                          <MenuItem value="pending">待处理</MenuItem>
                        </Select>
                        {errors.status && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.status.message}
                          </Typography>
                        )}
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
                        fullWidth
                        label="地址"
                        multiline
                        rows={3}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        disabled={loading}
                      />
                    )}
                  />
                </Grid>

                {/* 提交按钮 */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => router.push('/clients')}
                      disabled={loading}
                    >
                      取消
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <i className="tabler-check" />}
                    >
                      {loading ? '创建中...' : '创建客户'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ClientCreateView