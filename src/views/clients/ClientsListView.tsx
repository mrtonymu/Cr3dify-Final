'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress
} from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

import { getClients, deleteClient } from '@/libs/supabase'
import type { Database, ClientsFilters } from '@/libs/supabase'

type Client = Database['public']['Tables']['clients']['Row']

const ClientsListView = () => {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })

  const [filters, setFilters] = useState<ClientsFilters>({
    search: '',
    status: undefined
  })

  // 获取客户数据
  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getClients({
        ...filters,
        limit: paginationModel.pageSize,
        offset: paginationModel.page * paginationModel.pageSize
      })

      if (response.error) {
        setError(response.error)
      } else {
        setClients(response.data)
        setTotalCount(response.count)
      }
    } catch (err) {
      setError('获取客户数据失败')
      console.error('Error fetching clients:', err)
    } finally {
      setLoading(false)
    }
  }

  // 删除客户
  const handleDeleteClient = async (id: string) => {
    if (!confirm('确定要删除这个客户吗？此操作无法撤销。')) {
      return
    }

    try {
      const response = await deleteClient(id)
      
      if (response.error) {
        setError(response.error)
      } else {
        // 重新获取数据
        fetchClients()
      }
    } catch (err) {
      setError('删除客户失败')
      console.error('Error deleting client:', err)
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

  // 表格列定义
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '姓名',
      width: 150,
      sortable: true
    },
    {
      field: 'email',
      headerName: '邮箱',
      width: 200,
      sortable: true
    },
    {
      field: 'phone',
      headerName: '电话',
      width: 150,
      sortable: false,
      renderCell: (params: any) => params.value || '-'
    },
    {
      field: 'company',
      headerName: '公司',
      width: 150,
      sortable: true,
      renderCell: (params: any) => params.value || '-'
    },
    {
      field: 'status',
      headerName: '状态',
      width: 100,
      sortable: true,
      renderCell: (params: any) => (
        <Chip
          label={getStatusText(params.value)}
          color={getStatusColor(params.value) as any}
          size="small"
        />
      )
    },
    {
      field: 'created_at',
      headerName: '创建时间',
      width: 150,
      sortable: true,
      renderCell: (params: any) => new Date(params.value).toLocaleDateString('zh-CN')
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '操作',
      width: 120,
      getActions: (params: any) => [
        <GridActionsCellItem
          key="view"
          icon={
            <Tooltip title="查看详情">
              <IconButton size="small">
                <i className="tabler-eye" />
              </IconButton>
            </Tooltip>
          }
          label="查看"
          onClick={() => router.push(`/clients/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="编辑">
              <IconButton size="small">
                <i className="tabler-edit" />
              </IconButton>
            </Tooltip>
          }
          label="编辑"
          onClick={() => router.push(`/clients/${params.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="删除">
              <IconButton size="small" color="error">
                <i className="tabler-trash" />
              </IconButton>
            </Tooltip>
          }
          label="删除"
          onClick={() => handleDeleteClient(params.id as string)}
        />
      ]
    }
  ]

  // 初始化和数据更新
  useEffect(() => {
    fetchClients()
  }, [paginationModel, filters, fetchClients])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {/* 页面标题和操作按钮 */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" component="h1">
                客户管理
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<i className="tabler-plus" />}
                onClick={() => router.push('/clients/new')}
              >
                新建客户
              </Button>
            </Box>

            {/* 搜索和过滤器 */}
            <Box display="flex" gap={2} mb={4}>
              <TextField
                placeholder="搜索客户姓名、邮箱或公司..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="tabler-search" />
                    </InputAdornment>
                  )
                }}
                sx={{ minWidth: 300 }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>状态</InputLabel>
                <Select
                  value={filters.status || ''}
                  label="状态"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                >
                  <MenuItem value="">全部</MenuItem>
                  <MenuItem value="active">活跃</MenuItem>
                  <MenuItem value="inactive">非活跃</MenuItem>
                  <MenuItem value="pending">待处理</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* 错误提示 */}
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}

            {/* 数据表格 */}
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={clients}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50]}
                rowCount={totalCount}
                paginationMode="server"
                loading={loading}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none'
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
                slots={{
                  loadingOverlay: () => (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <CircularProgress />
                    </Box>
                  ),
                  noRowsOverlay: () => (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      flexDirection="column"
                    >
                      <i className="tabler-users" style={{ fontSize: 48, opacity: 0.5 }} />
                      <Typography variant="body1" sx={{ mt: 2, opacity: 0.7 }}>
                        暂无客户数据
                      </Typography>
                    </Box>
                  )
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ClientsListView