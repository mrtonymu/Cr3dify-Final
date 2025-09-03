import { z } from 'zod'

// 客户状态枚举
export const ClientStatus = z.enum(['active', 'inactive', 'pending'])

// 客户创建表单验证模式
export const CreateClientSchema = z.object({
  name: z.string()
    .min(1, '客户姓名不能为空')
    .max(100, '客户姓名不能超过100个字符'),
  email: z.string()
    .min(1, '邮箱不能为空')
    .email('请输入有效的邮箱地址')
    .max(255, '邮箱不能超过255个字符'),
  phone: z.string()
    .max(20, '电话号码不能超过20个字符')
    .optional()
    .nullable(),
  company: z.string()
    .max(100, '公司名称不能超过100个字符')
    .optional()
    .nullable(),
  address: z.string()
    .max(500, '地址不能超过500个字符')
    .optional()
    .nullable(),
  status: ClientStatus.default('active')
})

// 客户更新表单验证模式
export const UpdateClientSchema = CreateClientSchema.partial()

// 客户搜索过滤器验证模式
export const ClientsFiltersSchema = z.object({
  search: z.string().optional(),
  status: ClientStatus.optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional()
})

// 类型导出
export type CreateClientInput = z.infer<typeof CreateClientSchema>
export type UpdateClientInput = z.infer<typeof UpdateClientSchema>
export type ClientsFiltersInput = z.infer<typeof ClientsFiltersSchema>
export type ClientStatusType = z.infer<typeof ClientStatus>