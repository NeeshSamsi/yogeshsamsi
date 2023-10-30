import Image from "next/image"

import reader from "@/lib/keystatic"
import ContactForm from "@/components/ContactForm"

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
        <ContactForm />
      </div>
      <div className="aspect[1/1.1] relative hidden h-full w-full lg:block">
        <Image
          src={image}
          alt={imageAlt}
          height={2354}
          width={2160}
          sizes="51.73vw"
          priority
          className="w-full object-cover lg:h-[85vh]"
        />
      </div>
    </main>
  )
}

export default Contact
