import { Record } from "@prisma/client/runtime/library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createResource } from "@utils/index";

export const apiRoutes = {
  profile: "/api/protected/profile",
  profiles: "/api/protected/profiles",
};

export const _fetch = async ({
  path,
  params,
  options,
}: {
  path: keyof typeof apiRoutes;
  params?: Record<string, unknown>;
  options?: RequestInit;
}) => {
  const jwt = await AsyncStorage.getItem("auth_token_storage_key");

  let queryParams = new URLSearchParams();
  if (params) {
    for (const key in params) {
      const value = params[key];
      if (value != undefined) {
        queryParams.append(key, value.toString());
      }
    }
  }

  const res = await fetch(`${apiRoutes[path]}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    ...options,
  });
  return await res.json();
};

export const clientGetAllProfiles = () =>
  _fetch({
    path: "profiles",
  });

export const suspenseGetAllProfiles = createResource(() =>
  clientGetAllProfiles()
);

export const clientGetProfilesByAddresses = (addresses: string[]) =>
  _fetch({
    path: "profiles",
    params: { addresses },
  });

export const clientGetProfileByAddress = (address: string) =>
  _fetch({
    path: "profile",
    params: { address },
  });

export const clientSetOrModifyProfile = ({
  address,
  title,
  imageUrl,
  description,
  location,
}: {
  address: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  location?: Location;
}) =>
  _fetch({
    path: "profile",
    options: {
      body: JSON.stringify({
        address,
        title,
        imageUrl,
        description,
        location,
      }),
      method: "POST",
    },
  });
