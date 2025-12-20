import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          type="submit"
          className="block py-2 my-2 rounded-md bg-indigo-600 px-4  text-sm font-medium text-white hover:bg-indigo-500 transition"
        >
          Sign in with GitHub
        </button>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
        >
          Sign in with Google
        </button>



      </form>
    </main>
  );
}
