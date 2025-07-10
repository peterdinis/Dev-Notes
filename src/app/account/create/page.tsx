import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function AccountCreatePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
				<LoginLink postLoginRedirectURL="/dashboard" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 font-semibold text-2xl`}>
						Login{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Log into an existing Lumon account.
					</p>
				</LoginLink>

				<RegisterLink className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
					<h2 className={`mb-3 font-semibold text-2xl`}>
						Register{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Create a new Lumon account.
					</p>
				</RegisterLink>
			</div>
		</main>
	);
}
