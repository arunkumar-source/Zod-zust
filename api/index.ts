// This file exports the works API for Vercel
import worksHandler from "./works.js"

export default worksHandler
export const config = {
  runtime: 'nodejs18.x'
}
