import { CMSField } from "../helpers/cmsField";

export function field({ name, label }: { name: string; label: string }) {
  return new CMSField({ name, label });
}
