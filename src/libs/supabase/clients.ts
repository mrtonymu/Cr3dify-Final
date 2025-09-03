import { supabase } from './client'
import type { Database } from './client'

type Client = Database['public']['Tables']['clients']['Row']
type ClientInsert = Database['public']['Tables']['clients']['Insert']
type ClientUpdate = Database['public']['Tables']['clients']['Update']

export interface ClientsFilters {
  search?: string
  status?: 'active' | 'inactive' | 'pending'
  limit?: number
  offset?: number
}

export interface ClientsResponse {
  data: Client[]
  count: number
  error?: string
}

// 获取客户列表
export async function getClients(filters: ClientsFilters = {}): Promise<ClientsResponse> {
  try {
    let query = supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // 搜索过滤
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    // 状态过滤
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    // 分页
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching clients:', error)

      return { data: [], count: 0, error: error.message }
    }

    return { data: data || [], count: count || 0 }
  } catch (error) {
    console.error('Unexpected error fetching clients:', error)

    return { data: [], count: 0, error: 'Unexpected error occurred' }
  }
}

// 根据ID获取单个客户
export async function getClientById(id: string): Promise<{ data: Client | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching client:', error)

      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    console.error('Unexpected error fetching client:', error)

    return { data: null, error: 'Unexpected error occurred' }
  }
}

// 创建新客户
export async function createClient(clientData: ClientInsert): Promise<{ data: Client | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...clientData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating client:', error)

      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    console.error('Unexpected error creating client:', error)

    return { data: null, error: 'Unexpected error occurred' }
  }
}

// 更新客户
export async function updateClient(id: string, clientData: ClientUpdate): Promise<{ data: Client | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update({
        ...clientData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating client:', error)

      return { data: null, error: error.message }
    }

    return { data }
  } catch (error) {
    console.error('Unexpected error updating client:', error)

    return { data: null, error: 'Unexpected error occurred' }
  }
}

// 删除客户
export async function deleteClient(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting client:', error)

      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error deleting client:', error)

    return { success: false, error: 'Unexpected error occurred' }
  }
}

// 批量删除客户
export async function deleteClients(ids: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .in('id', ids)

    if (error) {
      console.error('Error deleting clients:', error)

      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error deleting clients:', error)

    return { success: false, error: 'Unexpected error occurred' }
  }
}