import crypto from "crypto";

export const getUniqueId = (data, secret) => {
  const uniqueId = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  return uniqueId;
};
