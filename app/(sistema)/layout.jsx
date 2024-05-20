import { jwtVerify } from "jose";
import Navigation from "./Navigation";
import SettingsContextProvider from "./settings/settingsContext";
import { cookies } from "next/headers";
import ReservasContextProvider from "./reservas/ReservasContext";


export default async function Layout({ children }) {
  const token = cookies().get('usertoken')?.value
  // console.log(token)

  try {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    return (
      <div className="flex flex-col">
        <SettingsContextProvider>
          <ReservasContextProvider>
            <Navigation payload={payload} />
            <div className="pl-12 pr-6">
              {children}
            </div>
          </ReservasContextProvider>
        </SettingsContextProvider>
      </div>
    )
  } catch (error) {
    console.log(error)
  }
}
