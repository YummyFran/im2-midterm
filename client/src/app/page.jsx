import { auth } from "@/auth"
import Homepage from "@/components/Homepage"
import Landing from "@/components/landing"

import { logOut } from "@/app/actions/auth";
import { cookies } from "next/headers";
import { getAuthUSer, getUserByEmail } from "@/lib/authService";
import Reroute from "@/components/Reroute";

const Home = async () => {
  const cookie = await cookies()
  const session = await auth();
  const token = cookie.get("auth_token")?.value;
  const isAuth = Boolean(session) || Boolean(token);

  if(!session?.user) {
    const [data, err] = await getAuthUSer(token)
    
    console.log(data)
  } 

  if(session?.user) {
    const [data, err] = await getUserByEmail(session.user.email)
    //if yes, user exist in db

    //if no, go to onboarding
    if(!data?.success || err) {
      return <Reroute url={'/onboarding'}/>
    }
  }

  if(!isAuth) return <Landing user={session?.user}/>
  return <Homepage logOut={logOut}/>
}

export default Home