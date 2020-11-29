import { allowedgrades } from "../../../../../util/config";

export const isAllowed = (grade: string) => {
    return allowedgrades.findIndex(x => x === grade) !== -1;
  };
