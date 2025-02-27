import { lookup } from "mime-types";

import { useApiCall } from "@ethberry/react-hooks";

import { IS3Response, IS3SignDataRequest, IUseS3UploaderProps, IUseS3UploaderReturnProps } from "./interfaces";

export const getFileMimeType = (file: File): string => {
  return file.type || (lookup(file.name) as string);
};

export const scrubFilename = (filename: string) => {
  return filename.replace(/[^\w_\-.]+/gi, "");
};

/* javascript-obfuscator:disable */
// prettier-ignore
const defaultBucket =
  process.env.AWS_S3_BUCKET ||
  process.env.STORYBOOK_AWS_S3_BUCKET ||
  process.env.REACT_APP_AWS_S3_BUCKET ||
  process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
/* javascript-obfuscator:enable */

export const useS3Uploader = (props: IUseS3UploaderProps) => {
  const { onError = () => {}, onFinish = () => {}, signingUrl = "/s3/put", bucket = defaultBucket } = props;

  const { fn: getSignResultApi } = useApiCall(
    (api, data: IS3SignDataRequest) =>
      api
        .fetchJson({
          url: signingUrl,
          data,
        })
        .then((json: IS3Response) => json?.signedUrl)
        .catch((e: Error) => {
          console.error("[sign error]", e);
          throw e;
        }),
    { success: false },
  );

  async function uploadFile(file: File, signedUrl: string): Promise<any> {
    return fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": getFileMimeType(file), "x-amz-acl": "public-read" },
      mode: "cors",
      credentials: "include",
    });
  }

  return async (props: IUseS3UploaderReturnProps) => {
    const { files = [] } = props;

    async function getSignResult(file: File): Promise<string> {
      const fileName = scrubFilename(file.name);
      const data: IS3SignDataRequest = {
        objectName: fileName,
        contentType: getFileMimeType(file),
        bucket,
      };

      const headers = new Headers();
      headers.set("Content-Type", getFileMimeType(file));

      const signedUrl = await getSignResultApi(undefined, data);

      return signedUrl || "";
    }

    try {
      for (const file of files) {
        const signedUrl = await getSignResult(file);
        if (!signedUrl) {
          throw new Error("signedUrl is missing");
        }

        const response = await uploadFile(file, signedUrl);

        if (response.status !== 200) {
          throw new Error(response);
        }

        onFinish({ signedUrl }, file);
        console.info("[successfully uploaded]");
      }
    } catch (error: any) {
      console.error("[upload error]", error);
      onError(error);
    }
  };
};
