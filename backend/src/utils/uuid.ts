import { v4 as uuidv4 } from "uuid";

export const generateTaskCode = () => {
  return `task-${uuidv4().replace(/-/g, "").substring(0, 3)}`;
};

export const generateInviteCode = () => {
  return uuidv4().replace(/-/g, "").substring(0, 8);
};
