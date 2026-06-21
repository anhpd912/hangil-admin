import { apiFetch, buildQuery } from "./api-client";
import type { AdminUser, AdminUserDetail, Paginated, UpdateUserInput } from "./types/admin-user";

type RawUsersList = { users: AdminUser[]; page: number; pageSize: number; total: number };

export const adminUsersApi = {
  async list(params: { search?: string; page?: number; pageSize?: number }): Promise<Paginated<AdminUser>> {
    const raw = await apiFetch<RawUsersList>(`/api/v1/admin/users${buildQuery(params)}`);
    return { items: raw.users, page: raw.page, pageSize: raw.pageSize, total: raw.total };
  },

  get(id: string): Promise<AdminUserDetail> {
    return apiFetch<AdminUserDetail>(`/api/v1/admin/users/${id}`);
  },

  update(id: string, body: UpdateUserInput): Promise<AdminUser> {
    return apiFetch<AdminUser>(`/api/v1/admin/users/${id}`, { method: "PATCH", body });
  },
};
