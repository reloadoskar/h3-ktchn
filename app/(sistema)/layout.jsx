import { jwtVerify } from "jose";
import Navigation from "./Navigation";
import SettingsContextProvider from "./settings/settingsContext";
import { cookies } from "next/headers";


export default async function Layout({ children }) {
  const token = cookies().get('usertoken')?.value
  // console.log(token)

  try {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    return (
      <div className="flex flex-col">
        <SettingsContextProvider>
          <Navigation payload={payload} />
          {children}
        </SettingsContextProvider>
      </div>
    )
  } catch (error) {
    console.log(error)
  }
}
