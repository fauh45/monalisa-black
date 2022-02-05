/**
 * Create a privacy enabled data from a NIM
 *
 * @param nim NIM of a user (e.c 191524001)
 */
export const NIMtoData = async (
  nim: string
): Promise<{ [key: string]: string }> => {
  return {
    userId: await hashNIM(nim),
    batch_years: nim.substring(0, 2),
    faculty_code: nim.substring(4, 6),
    nim_personal_removed: nim.substring(0, 6) + "***",
  };
};

export const hashNIM = async (nim: string): Promise<string> => {
  const msgUint8 = new TextEncoder().encode(nim); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
};
