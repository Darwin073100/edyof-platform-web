import { BrandEntity } from "@/features/brand/domain/entities/brand.entity";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { InventoryResponseDTO } from "@/features/inventory/domain/entities/inventory-response.dto";
import { LotEntity } from "@/features/lot/domain/entities/lot.entity";
import { SeasonEntity } from "@/features/season/domain/entities/season.entity";

export interface ProductWithLotInventoryItemDTO {
  productId: bigint;
  establishmentId: bigint;
  categoryId: bigint;
  brandId: bigint | null;
  seasonId: bigint | null;
  name: string;
  sku: string | null;
  universalBarCode: string | null;
  description: string | null;
  unitOfMeasure: string;
  minStockGlobal: number;
  imageUrl: string | null;
  season?: SeasonEntity | null;
  brand?: BrandEntity | null;
  category?: CategoryEntity | null;
  lot?: LotEntity[] | null;
  inventories?: InventoryResponseDTO |null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}