import {Roboto} from "next/font/google"
import "./globals.css"
import { ProvideAuth } from "@/components/auth/AuthContext"
export const metadata = {
    title: "Hdra - versión Kitchen",
    description: "Pagina principal de Hadria Kitchen",
    keywords:"tienda, cocina, restaurante, online, ecommerce"
}

const roboto = Roboto({
    weight: ["300", "500", "700"],
    style:["normal", "italic"],
    subsets: ["latin"]
})

export default function RootLayout({children}) {
  return (
    <html>
        <body className={roboto.className}>
          <ProvideAuth>
            {children}
          </ProvideAuth>
        </body>
    </html>
  )
}
