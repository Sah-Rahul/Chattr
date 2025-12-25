import "dotenv/config";
import mongoose from "mongoose";
import RoleModel from "../models/roles-permission.model";
import { RolePermissions } from "../utils/role-permission";
import { connectDB } from "../config/db.config";

const seedRoles = async () => {
  console.log("Seeding roles started...");

  try {
    await connectDB();

    console.log("Clearing existing roles...");
    await RoleModel.deleteMany({});

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      const existingRole = await RoleModel.findOne({ name: role });

      if (!existingRole) {
        await RoleModel.create({
          name: role,
          permissions,
        });
        console.log(`✅ Role ${role} added`);
      } else {
        console.log(`⚠️ Role ${role} already exists`);
      }
    }

    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

seedRoles();
