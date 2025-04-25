import { ErrorCodeEnum } from "../enums/error-code.enum";
import { Roles } from "../enums/role-enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";

export const joinWorkspaceByInviteService = async (
  userId: string,
  inviteCode: string
) => {
  // find workspace by invite code
  const workspace = await WorkspaceModel.findOne({ inviteCode }).exec();
  if (!workspace) {
    throw new NotFoundException("Invalid invite code or workspace not found");
  }

  // check if user is already a member of the workspace
  const existingMember = await MemberModel.findOne({
    userId,
    workspaceId: workspace._id,
  }).exec();

  if (existingMember) {
    throw new BadRequestException(
      "You are already a member of this organization"
    );
  }

  const role = await RoleModel.findOne({ name: Roles.MEMBER });

  if (!role) {
    throw new NotFoundException("Role not found");
  }

  // add user to workspace as a member
  const newMember = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id,
  });
  await newMember.save();

  return { workspaceId: workspace._id, role: role.name };
};

export const getMemeberRoleInWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  // find workspace
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  // need role for a memeber in a workspace
  const memeber = await MemberModel.findOne({
    userId,
    workspaceId,
  }).populate("role");

  if (!memeber) {
    throw new UnauthorizedException(
      "You are not a menber of this workspace",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }

  const roleName = memeber.role?.name;
  return { role: roleName };
};
