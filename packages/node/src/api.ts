import {GET, POST, PUT, DELETE} from "./http";
import type {Mode, Tenant, User} from "./types";
import {isProduction, USERFRONT_WORKSPACE_ID} from "./env";

const config = {
  mode: isProduction ? "live" : "test" as Mode,
  workspaceId: USERFRONT_WORKSPACE_ID,
  GET: GET,
  POST: POST,
  PUT: PUT,
  DELETE: DELETE,
}

export const api = {
  ...config,
  getTenant: async function <T extends string>(id?: T) {
    return this.GET<Tenant<typeof this.mode, T>>(`/tenants/${id ?? this.workspaceId}`);
  },
  getUser: async function <T extends string>(id: T) {
    return this.GET<User<typeof this.mode, T>>(`/users/${id}`);
  }
};

/**
 * Get a specific tenant by id or the current workspace
 */
export const getTenant = api.getTenant.bind(config);

/**
 * Get a specific user by id
 */
export const getUser = api.getUser.bind(config);
