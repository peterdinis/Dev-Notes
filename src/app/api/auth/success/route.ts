import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user || user == null || !user.id)
		throw new Error("something went wrong with authentication" + user);

	db.insert(users)
		.values({
			id: user.id,
			firstName: user.given_name,
			lastName: user.given_name,
			email: user.email,
		})
		.run();

	return NextResponse.redirect("http://localhost:3000/");
}
