/**
 *
 *
 * @param nim
 */

export interface NIMData {
  batch_years: string;
  faculty_code: string;
  nim_personal_removed: string;
}

/**
 * Create a privacy enabled data from a NIM
 *
 * @param nim NIM of a user (e.c 191524001)
 */
export const NIMtoData = (nim: string): { [key: string]: string } => {
  return {
    batch_years: nim.substring(0, 2),
    faculty_code: nim.substring(4, 6),
    nim_personal_removed: nim.substring(0, 7) + "***",
  };
};
