import type { FieldValues, Path, UseFormRegister } from "react-hook-form"

// Shared floating-label field. Extracted (F1) from AcademyRegistration,
// ContactForm, MasterclassRegistration and MailingList, which each carried a
// near-identical local copy.
//
// The four copies used two different type scales, and that difference is
// deliberate — it must survive as a variant, not be flattened, or the contact
// page shifts visually:
//   - "default": border-darker / text-base  (Academy, Masterclass, MailingList)
//   - "contact": border-dark   / text-lg    (ContactForm only)
export type FloatingLabelVariant = "default" | "contact"

const fieldClasses: Record<FloatingLabelVariant, string> = {
  default:
    "peer border-darker bg-lighter focus-within:border-darker 3xl:text-xl w-full border-0 border-b px-0 text-base placeholder-transparent transition-all focus-within:border-b-2 focus:ring-0 xl:text-lg",
  contact:
    "peer border-dark bg-lighter focus-within:border-dark 3xl:text-2xl w-full border-0 border-b px-0 text-lg placeholder-transparent transition-all focus-within:border-b-2 focus:ring-0 xl:text-xl",
}

const labelClasses: Record<FloatingLabelVariant, string> = {
  default:
    "text-darker peer-placeholder-shown:text-darker/80 peer-focus-within:text-darker 3xl:text-base 3xl:peer-placeholder-shown:text-xl 3xl:peer-focus-within:text-base absolute -top-3 left-0 w-full cursor-text text-sm placeholder-transparent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus-within:-top-3 peer-focus-within:text-sm xl:text-base xl:peer-placeholder-shown:text-lg xl:peer-focus-within:text-base",
  // The `3xl:peer-placeholder-shown:text-2xl` and `3xl:peer-focus-within:text-xl`
  // utilities here were previously welded into one dead token by a missing
  // space (`text-2xl3xl:peer-focus-within:text-xl`) in both arms of
  // ContactForm's duplicated branch. Split correctly as part of F1.
  contact:
    "3xl:peer-placeholder-shown:text-2xl 3xl:peer-focus-within:text-xl text-dark peer-placeholder-shown:text-dark/70 peer-focus-within:text-dark 3xl:text-xl absolute -top-3 left-0 w-full cursor-text text-base transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-focus-within:-top-3 peer-focus-within:text-base xl:-top-5 xl:text-lg xl:peer-placeholder-shown:text-xl xl:peer-focus-within:-top-5 xl:peer-focus-within:text-lg",
}

interface FloatingLabelInputProps<T extends FieldValues> {
  type: "text" | "email" | "textarea"
  id: Path<T>
  placeholder: string
  register: UseFormRegister<T>
  variant?: FloatingLabelVariant
}

const FloatingLabelInput = <T extends FieldValues>({
  type,
  id,
  placeholder,
  register,
  variant = "default",
}: FloatingLabelInputProps<T>) => {
  return (
    <div className="relative w-full cursor-text">
      {type === "textarea" ? (
        <textarea
          rows={1}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={fieldClasses[variant]}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={fieldClasses[variant]}
        />
      )}
      <label htmlFor={id} className={labelClasses[variant]}>
        {placeholder}
      </label>
    </div>
  )
}

export default FloatingLabelInput
