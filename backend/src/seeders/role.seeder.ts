import mongoose, { startSession } from "mongoose";
import connectDatabase from "../config/database.config";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";

const seedRoles = async () => {
  console.log("Seeding roles started");
  try {
    await connectDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("clearing existing roles");
    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      const existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );
      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });

        await newRole.save({ session });
        console.log(`role ${role} added with permissions`);
      } else {
        console.log(`role ${role} already exists`);
      }
    }

    await session.commitTransaction();
    console.log("transaction committed");

    session.endSession();
    console.log("session ended");
    console.log("seeeding completed successfully");
  } catch (error) {
    console.log("error during seeding", error);
  }
};

seedRoles().catch((error) => {
  console.log("error running seed script", error);
});
