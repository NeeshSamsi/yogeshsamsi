import Image from "next/image"

import reader from "@/lib/keystatic"

import {
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/solid"

export async function generateMetadata() {
  const contact = await reader.singletons.contact.read()
  if (!contact) throw new Error("Keystatic Content Not Found - Contact Page")

  const { metaTitle: title, metaDescription: description } = contact

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/contact",
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
    },
    themeColor: "#362009",
    alternates: {
      canonical: "/contact",
    },
  }
}

const Contact = async () => {
  const contact = await reader.singletons.contact.read()
  if (!contact) throw new Error("Keystatic Content Not Found - Contact Page")

  const { image, imageAlt } = contact

  return (
    <main className="gap-8 px-8 py-12 text-dark md:py-20 lg:flex lg:px-0 lg:py-0 lg:pl-col-inner">
      <div className="mx-auto flex w-[70%] flex-col items-center justify-center lg:mx-0 lg:items-start">
        <form className="grid w-fit gap-8 xl:gap-12">
          <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
            Contact Us
          </h1>
          <div className="flex items-end gap-4 xl:gap-6">
            <UserIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
            <div className="relative w-full cursor-text">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
                className="peer w-full border-0 border-b border-dark bg-lighter px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-dark focus:ring-0 xl:text-xl 3xl:text-2xl"
              />
              <label
                htmlFor="name"
                className="absolute -top-3 left-0 w-full cursor-text text-base text-dark transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-dark/70 peer-focus-within:-top-3 peer-focus-within:text-base peer-focus-within:text-dark xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg 3xl:text-xl 3xl:peer-placeholder-shown:text-2xl 3xl:peer-focus-within:text-xl"
              >
                Full name
              </label>
            </div>
          </div>
          <div className="flex items-end gap-4 xl:gap-6">
            <EnvelopeIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
            <div className="relative w-full cursor-text">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Full name"
                className="peer w-full border-0 border-b border-dark bg-lighter px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-dark focus:ring-0 xl:text-xl 3xl:text-2xl"
              />
              <label
                htmlFor="email"
                className="absolute -top-3 left-0 w-full cursor-text text-base text-dark transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-dark/70 peer-focus-within:-top-3 peer-focus-within:text-base peer-focus-within:text-dark xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg 3xl:text-xl 3xl:peer-placeholder-shown:text-2xl 3xl:peer-focus-within:text-xl"
              >
                Email address
              </label>
            </div>
          </div>
          <div className="flex items-end gap-4 xl:gap-6">
            <ChatBubbleBottomCenterTextIcon className="aspect-square h-8 xl:h-9 3xl:h-10" />
            <div className="relative w-full cursor-text">
              <textarea
                rows={1}
                id="message"
                name="message"
                placeholder="Enter message"
                className="peer w-full border-0 border-b border-dark bg-lighter px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus-within:border-dark focus:ring-0 xl:text-xl 3xl:text-2xl"
              />
              <label
                htmlFor="message"
                className="absolute -top-3 left-0 w-full cursor-text text-base text-dark transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-dark/70 peer-focus-within:-top-3 peer-focus-within:text-base peer-focus-within:text-dark xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg 3xl:text-xl 3xl:peer-placeholder-shown:text-2xl 3xl:peer-focus-within:text-xl"
              >
                Enter message
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="flex w-fit items-center gap-4 bg-dark px-5 py-3 font-serif text-lg font-semibold tracking-wider text-lighter xl:text-xl 3xl:text-2xl"
          >
            <span>Reach out</span>
            <PaperAirplaneIcon className="aspect-square h-4 xl:h-5" />
          </button>
        </form>
      </div>
      <div className="aspect[1/1.1] relative hidden h-full w-full lg:block">
        <Image
          src={image}
          alt={imageAlt}
          height={2354}
          width={2160}
          priority
          className="w-full object-cover lg:h-[85vh]"
        />
      </div>
    </main>
  )
}

export default Contact
