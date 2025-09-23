"use client"

import { signInWithGoogle } from "@/app/actions/auth";

const GoogleSigninBtn = () => {
  return (
    <button
      type="button"
      onClick={() => signInWithGoogle()}
      className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
};

export default GoogleSigninBtn;
