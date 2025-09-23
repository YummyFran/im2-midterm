import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { logOut } from "@/app/actions/auth";
import LandingClient from "./LandingClient";
import { cookies } from "next/headers";

const landing = async () => {
  const cookie = await cookies()
  const session = await auth();
  const token = cookie.get("auth_token")?.value;
  const isAuth = Boolean(session) || Boolean(token);
  
  if (isAuth) return <LandingClient logOut={logOut} isAuth={isAuth} token={token} />;
  return (
    <>
      <div className="bg-accent-gradient w-full h-screen flex flex-col relative">
        <header className=" flex items-center h-16 w-full px-16">
          <h1 className="font-bold text-white text-xl">BlogPost</h1>
          <Link
            href="/login"
            className=" ml-auto  text-white border-2 border-white py-2 px-6 rounded-md "
          >
            Login
          </Link>
        </header>
        <div className="wrapper flex w-full-500 flex-1 ">
          <div className="hero flex-1 flex flex-col justify-center h-full pl-24 gap-2 ">
            <h1 className="text-6xl text-white font-bold">
              A Journal of Thoughts & Tales
            </h1>
            <p className="text-lg text-white mt-2">
              Sharing experiences, lessons, and reflections one post at a time.
            </p>
            <Link
              href="/signup"
              className="bg-accent text-white py-3 px-8 rounded-md self-start mt-8 text-lg "
            >
              Signup
            </Link>
          </div>
          <div className="image flex-1 flex relative [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)] opacity-75">
            <Image
              src="/blog1.jpg"
              width={500}
              height={500}
              alt="Picture"
              className="h-full bg-white w-full"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default landing;
