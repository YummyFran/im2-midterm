import { auth } from "@/auth"
import Homepage from "@/components/Homepage"
import Landing from "@/components/landing"

import { logOut } from "@/app/actions/auth";
import { cookies } from "next/headers";
import { getAuthUSer } from "@/lib/authService";

const Home = async () => {
  const cookie = await cookies()
  const session = await auth();
  const token = cookie.get("auth_token")?.value;
  const isAuth = Boolean(session) || Boolean(token);

  console.log(isAuth)
  if(!session?.user) {
    const [data, err] = await getAuthUSer(token)

    console.log(data)
  } 

  if(!isAuth) return <Landing user={session?.user}/>
  return <Homepage logOut={logOut}/>
}

export default Home