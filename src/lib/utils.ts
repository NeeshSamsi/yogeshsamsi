import { getPlaiceholder } from "plaiceholder"

export const getBlurDataURL = async (src: string) => {
  const { base64, img } = await getPlaiceholder(src, { size: 10 })

  return { base64, img }
}
