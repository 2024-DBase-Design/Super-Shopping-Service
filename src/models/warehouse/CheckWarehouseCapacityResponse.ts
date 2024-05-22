export interface CheckWarehouseCapacityResponse {
  warehouseId: string;
  isWithinCapacity: boolean;
  availableCapacity: number;
}
