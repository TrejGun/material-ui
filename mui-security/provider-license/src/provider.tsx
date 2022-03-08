import { FC, useEffect, useState } from "react";

import { licenseNotFound, licenseExpired, licenseRevoked } from "@gemunion/license-messages";
import { ILicense, LicenseStatus } from "@gemunion/types-license";

import { ApiContext } from "./context";

const STORAGE_NAME = "license";

interface ILicenseProviderProps {
  licenseKey: string;
}

export const LicenseProvider: FC<ILicenseProviderProps> = props => {
  const { children, licenseKey } = props;

  const [license, setLicense] = useState<ILicense | null>(null);

  const read = (key: string): ILicense | null => {
    const license = localStorage.getItem(key);
    return license ? (JSON.parse(license) as ILicense) : null;
  };

  const save = (key: string, license: ILicense | null): void => {
    const json = JSON.stringify(license);
    localStorage.setItem(key, json);
  };

  const refresh = async (): Promise<void> => {
    const license = await window
      .fetch(`https://license.gemunion.io/${licenseKey}`)
      .then(response => {
        if (response.status !== 200) {
          return null;
        }
        return response.json();
      })
      .catch(() => null);

    if (!license) {
      const bkp = read(STORAGE_NAME);
      if (bkp && new Date(bkp.refreshAt).getTime() > Date.now()) {
        setLicense(bkp);
        return;
      }
    }

    setLicense(license);
    save(STORAGE_NAME, license);
  };

  const isValid = (): boolean => {
    if (!license) {
      console.error(licenseNotFound());
      return false;
    }

    if (license.status === LicenseStatus.EXPIRED) {
      console.error(licenseExpired());
      return false;
    }

    if (license.status === LicenseStatus.REVOKED) {
      console.error(licenseRevoked());
      return false;
    }

    return true;
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        isValid,
        refresh,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
