export const Routes = {
  DashboardOverview: { path: "/" },
  Login: { path: "/login" },
  Register: { path: "/register" },
  ForgotPassword: { path: "/forgot-password" },

  Product: { path: "/product" },
  ProductEdit: { path: "/product/update-product/:id" },
  ProductCreate: { path: "/product/create" },
  Catalog: { path: "/product/catalog" },
  CatalogCreate: { path: "/product/create-catalog" },
  CatalogUpdate: { path: "/product/update-catalog/:id" },
  Promotion: { path: "/product/list-promotions" },
  PromotionCreate: { path: "/product/create-promotion" },
  PromotionUpdate: { path: "/product/update-promotion/:id" },

  ProductIncoming: { path: "/product/list-products-incoming" },
  ProductIncomingAdd: { path: "/product/add-product-to-store" },
  ProductIncomingUpdate: { path: "/product/update-product-incoming/:id" },

  Order: { path: "/order" },

  Blog: { path: "/blogs" },
  BlogTag: { path: "/blogs/tags" },
  BlogCategory: { path: "/blogs/categories" },
  BlogCreate: { path: "/blogs/create" },
  BlogUpdate: { path: "/blogs/update-blog/:id" },
  BlogCategoryCreate: { path: "/blogs/create-category" },
  BlogCategoryUpdate: { path: "/blogs/update-category/:id" },

  Contact: { path: "/contacts" },

  Setting: { path: "/setting" },

  Transaction: { path: "/transaction-log" },
  TransactionDetail: { path: "/transaction-log/:id" },

  Upload: { path: "/product/:id/upload" },
  NotFound: { path: "/404" },
  ServerError: { path: "/500" },
  InvalidPermission: { path: "/invalid-permission" },

  NullLink: { path: "#" },
};
