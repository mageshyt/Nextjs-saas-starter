export enum ProductStatus {
  todo = 'todo',
  inProgress = 'inProgress',
  done = 'done',
  canceled = 'canceled',
}

export enum ProductLabel {
  bug = 'bug',
  feature = 'feature',
  documentation = 'documentation',
  enhancement = 'enhancement',
}

export enum ProductPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export type Product = {
  id: string;
  code: string;
  title: string;
  status: ProductStatus;
  label: ProductLabel;
  priority: ProductPriority;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
