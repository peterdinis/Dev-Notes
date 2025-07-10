import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET() {
	// check if user exists
	const { getUser, getOrganization } = getKindeServerSession();
	const user = await getUser();

	if (!user || user == null || !user.id)
		throw new Error("something went wrong with authentication" + user);

	const dbUser = db.select().from(users).where(eq(users.id, user.id)).get();

	if (!dbUser) {
		db.insert(users)
			.values({
				id: user.id,
				firstName: user.given_name,
				lastName: user.given_name,
				email: user.email,
			})
			.run();
	}

	return NextResponse.redirect("http://localhost:3000/");
}
