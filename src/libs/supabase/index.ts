// Supabase客户端
export { supabase } from './client'
export type { Database } from './client'

// 客户服务
export {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  deleteClients
} from './clients'
export type {
  ClientsFilters,
  ClientsResponse
} from './clients'

// 验证模式
export {
  CreateClientSchema,
  UpdateClientSchema,
  ClientsFiltersSchema,
  ClientStatus
} from './schemas'
export type {
  CreateClientInput,
  UpdateClientInput,
  ClientsFiltersInput,
  ClientStatusType
} from './schemas'