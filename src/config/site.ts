import tenant from "../../tenant.json";
const TENANT_NAME = tenant.tenantName;
export const siteConfig = {
  name: "Nepdora",
  description: "Nepdora Preview System",
  get apiBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      `https://${TENANT_NAME}.nepdora.baliyoventures.com`
    );
  },
  get mediaBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_MEDIA_URL ||
      `https://builder-api.nepdora.com/media/workspaces/${TENANT_NAME}/public`
    );
  },
  get builderBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_BUILDER_URL || `https://builder-api.nepdora.com`
    );
  },
  get endpoints() {
    const builderBase = this.builderBaseUrl;
    return {
      fetchImage: (path: string) =>
        `${this.mediaBaseUrl}/${path.startsWith("/") ? path.slice(1) : path}`,
      listImages: () => `${builderBase}/api/builder/images-map/${TENANT_NAME}/`,
      updateImageMap: () =>
        `${builderBase}/api/builder/update-image-map/${TENANT_NAME}/`,
      uploadImage: () =>
        `${builderBase}/api/builder/upload-image/${TENANT_NAME}/`,
    };
  },
};

export const getApiBaseUrl = (): string => {
  return siteConfig.apiBaseUrl;
};

export const getImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const baseUrl = siteConfig.mediaBaseUrl;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
