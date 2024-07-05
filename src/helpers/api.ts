export enum HttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

// Entity types for API calls
export enum EntityType {
  CUSTOMER = 'customers',
  ADDRESS = 'address',
  CREDIT_CARD = 'creditCard',
  CART = 'cart',
  ORDER = 'order',
  PRODUCT = 'products',
  STAFF = 'staff',
  STOCK = 'stock',
  SUPPLIER = 'supplier',
  WAREHOUSE = 'warehouse'
}

// API URL
export const API_URL: string = 'http://localhost:3000/api/';
export const LOGIN_URL: string = `${API_URL}auth/login`;

// Build URL for API calls
// Can build URLs of form: API_URL/entity, API_URL/entity/id
export function buildOneEntityUrl(method: HttpMethod, entity: EntityType, id?: number): string {
  switch (method) {
    case HttpMethod.GET:
      if (!id) {
        return `${API_URL}${entity}`;
      }
      return `${API_URL}${entity}/${id}`;
    case HttpMethod.POST:
      return `${API_URL}${entity}`;
    case HttpMethod.PUT:
      if (!id) {
        throw new Error('ID is required for PUT method');
      }
      return `${API_URL}${entity}/${id}`;
    case HttpMethod.DELETE:
      if (!id) {
        throw new Error('ID is required for DELETE method');
      }
      return `${API_URL}${entity}/${id}`;
    default:
      throw new Error('Invalid method');
  }
}

// Build URL for API calls
// Can build URLs of form: API_URL/entity/id/entity2, API_URL/entity/id/entity2/id2
export function buildTwoEntityUrl(
  method: HttpMethod,
  entity1: EntityType,
  id1: number,
  entity2: EntityType,
  id2?: number
): string {
  const baseUrl: string = buildOneEntityUrl(method, entity1, id1);
  switch (method) {
    case HttpMethod.GET:
      if (!id2) {
        return `${baseUrl}/${entity2}`;
      }
      return `${baseUrl}/${entity2}/${id2}`;
    case HttpMethod.POST:
      return `${baseUrl}/${entity2}`;
    case HttpMethod.PUT:
      if (!id2) {
        throw new Error('ID is required for PUT method');
      }
      return `${baseUrl}/${entity2}/${id2}`;
    case HttpMethod.DELETE:
      if (!id2) {
        throw new Error('ID is required for DELETE method');
      }
      return `${baseUrl}/${entity2}/${id2}`;
    default:
      throw new Error('Invalid method');
  }
}
