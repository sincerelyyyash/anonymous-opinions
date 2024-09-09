import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from 'bcryptjs'


export async function POST(request: Request) {
  await dbConnect()

  try {
    const { username, email, password } = await request.json()
    const existingUsernameVerifiedUser = await UserModel.findOne({
      username,
    })

    if (existingUsernameVerifiedUser) {
      return Response.json({
        success: false,
        message: "Username is already taken"
      }, {
        status: 400
      })
    }

    const existingEmailVerifiedUser = await UserModel.findOne({ email })


    if (existingEmailVerifiedUser) {
      if (existingEmailVerifiedUser.isVerified) {
        return Response.json({
          success: false,
          message: "User already exists with this email"
        }, { status: 500 })
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingEmailVerifiedUser.password = hashedPassword;
        await existingEmailVerifiedUser.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: true,
        isAcceptingMessage: true,
        message: []
      })

      await newUser.save()
    }

    return Response.json({
      success: true,
      message: "User registered succesfully"
    }, { status: 201 })

  } catch (error) {
    console.error("Error registering user", error)
    return Response.json(
      {
        success: false,
        message: "Error registering user"
      }, {
      status: 500
    }
    )
  }
}
