import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({
      success: false,
      message: "Not authenticated"
    }, { status: 401 });
  }

  const user: User = session.user as User;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: '$message', preserveNullAndEmptyArrays: true } },
      { $sort: { 'message.createdAt': -1 } },
      { $group: { _id: '$_id', message: { $push: '$message' } } }
    ]).exec();


    if (!userMessages || userMessages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      messages: userMessages
    }, { status: 200 });

  } catch (error) {
    console.log("Error in getting messages", error);
    return NextResponse.json({
      success: false,
      message: "Error in getting messages"
    }, { status: 500 });
  }
}

