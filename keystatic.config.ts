import { collection, config, fields, singleton } from "@keystatic/core"

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "NeeshSamsi",
      name: "yogeshsamsi",
    },
  },

  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "src/data/settings",
      format: "json",
      schema: {
        siteName: fields.text({
          label: "Site Name",
          description: "Used in the metadata.",
          validation: { length: { min: 1 } },
        }),
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. All page titles will be prepended to this title. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        url: fields.url({
          label: "Deployed URL",
          description: "Used in the site's metadata.",
          validation: { isRequired: true },
        }),
        navLinks: fields.array(
          fields.object({
            text: fields.text({
              label: "Link Text",
              validation: { length: { min: 1 } },
            }),
            path: fields.text({
              label: "Link Path",
              description:
                "This can be either a relative path (/about) or an absolute path (https://youtube.com). If it's an absolute path, consider opening the link in a new tab.",
              validation: { length: { min: 1 } },
            }),
            newWindow: fields.checkbox({
              label: "Open link in New Tab?",
              defaultValue: false,
            }),
          }),
          {
            label: "Navigation Menu Links",
            itemLabel: (props) => props.fields.text.value,
          },
        ),
        mailingListTitle: fields.text({
          label: "Title - Mailing List Widget",
          validation: {
            length: { min: 1 },
          },
        }),
        mailingListDescription: fields.text({
          label: "Description - Mailing List Widget",
          validation: {
            length: { min: 1 },
          },
        }),
        youtube: fields.url({
          label: "YouTube Channel",
          description:
            "Link to the YouTube Channel linked by the icons in the Navigation & Footer.",
          validation: {
            isRequired: true,
          },
        }),
        instagram: fields.url({
          label: "Instagram Profile",
          description:
            "Link to the Instagram Profile linked by the icons in the Navigation & Footer.",
          validation: {
            isRequired: true,
          },
        }),
        facebook: fields.url({
          label: "Facebook Page",
          description:
            "Link to the Facebook Page linked by the icons in the Navigation & Footer.",
          validation: {
            isRequired: true,
          },
        }),
        email: fields.text({
          label: "Email Contact",
          description:
            "The email displayed in the footer under the Reach out section.",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),

    home: singleton({
      label: "Home Page",
      path: "src/data/home",
      format: "json",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "/public/images/pages/home/",
          publicPath: "/images/pages/home/",
          validation: { isRequired: true },
        }),
        heroMobileImage: fields.image({
          label: "Hero Image - Mobile",
          directory: "/public/images/pages/home/",
          publicPath: "/images/pages/home/",
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({
          label: "Hero Image Alternate Text",
          description:
            "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          validation: { length: { min: 1 } },
        }),
        aboutHeadline: fields.text({
          label: "Headline - About Section",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        aboutCards: fields.array(
          fields.object({
            title: fields.text({
              label: "Card Title",
              validation: { length: { min: 1 } },
            }),
            description: fields.text({
              label: "Card Description",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Info Cards - About Section",
            itemLabel: ({ fields }) => fields.title.value,
          },
        ),
      },
    }),

    about: singleton({
      label: "About Page",
      path: "src/data/about",
      format: "json",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "/public/images/pages/about/",
          publicPath: "/images/pages/about/",
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({
          label: "Hero Image Alternate Text",
          description:
            "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          validation: { length: { min: 1 } },
        }),
        quoteText: fields.text({
          label: "Quote Text - Hero Section",
          validation: { length: { min: 1 } },
        }),
        quoteBy: fields.text({
          label: "Quote By - Hero Section",
          validation: { length: { min: 1 } },
        }),
        biodata: fields.file({
          label: "Biodata PDF",
          directory: "public/files/biodata",
          publicPath: "/files/biodata/",
          validation: { isRequired: true },
        }),

        aboutLeft: fields.array(
          fields.text({
            label: "Paragraph",
            multiline: true,
            validation: { length: { min: 1 } },
          }),
          {
            label: "Left Column - About Section",
            description:
              "List of paragraphs of information shown in the left column of the about section",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value,
          },
        ),
        aboutRight: fields.array(
          fields.text({
            label: "Paragraph",
            multiline: true,
            validation: { length: { min: 1 } },
          }),
          {
            label: "Right Column - About Section",
            description:
              "List of paragraphs of information shown in the right column of the about section",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value,
          },
        ),

        concertsLeft: fields.array(
          fields.text({ label: "Concert", validation: { length: { min: 1 } } }),
          {
            label: "Left Column - Concert Highlights",
            description:
              "List of concerts shown in the left column of the Concert Highlights",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value,
          },
        ),
        concertsRight: fields.array(
          fields.text({ label: "Concert", validation: { length: { min: 1 } } }),
          {
            label: "Right Column - Concert Highlights",
            description:
              "List of concerts shown in the right column of the Concert Highlights",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value,
          },
        ),
      },
    }),

    gallery: singleton({
      label: "Gallery Page",
      path: "src/data/gallery",
      format: "json",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        images: fields.array(
          fields.object(
            {
              image: fields.image({
                label: "Image",
                directory: "/public/images/pages/gallery/",
                publicPath: "/images/pages/gallery/",
                validation: { isRequired: true },
              }),
              alt: fields.text({
                label: "Alternate Text",
                description:
                  "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
                validation: { length: { min: 1 } },
              }),
            },
            { label: "Image" },
          ),
          {
            label: "Gallery Images",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.fields.alt.value,
          },
        ),
      },
    }),

    masterclass: singleton({
      label: "Masterclass Page",
      path: "src/data/masterclass",
      format: "json",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the page. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        active: fields.checkbox({
          label: "Active",
          description: "Is this masterclass active?",
        }),
        title: fields.text({
          label: "Masterclass Title",
          validation: {
            length: { min: 1 },
          },
        }),
        dates: fields.text({
          label: "Masterclass Dates",
          validation: {
            length: { min: 1 },
          },
        }),
        deadline: fields.text({
          label: "Registration Deadline",
          validation: {
            length: { min: 1 },
          },
        }),
        formLink: fields.url({
          label: "Google Form Link",
          description: "Link to the Google Form for registration.",
        }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "/public/images/pages/masterclass/",
          publicPath: "/images/pages/masterclass/",
          validation: { isRequired: true },
        }),
        heroMobileImage: fields.image({
          label: "Hero Image - Mobile",
          directory: "/public/images/pages/masterclass/",
          publicPath: "/images/pages/masterclass/",
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({
          label: "Hero Image Alternate Text",
          description:
            "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          validation: { length: { min: 1 } },
        }),
        details: fields.document({
          label: "Masterclass Details",

          formatting: {
            headingLevels: [2],
            inlineMarks: true,

            listTypes: true,
          },
        }),
      },
    }),

    contact: singleton({
      label: "Contact Page",
      path: "src/data/contact",
      format: "json",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        image: fields.image({
          label: "Hero Image",
          directory: "/public/images/pages/contact/",
          publicPath: "/images/pages/contact/",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Hero Image Alternate Text",
          description:
            "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          validation: { length: { min: 1 } },
        }),
      },
    }),
  },

  collections: {
    events: collection({
      label: "Upcoming Events",
      path: "src/data/events/*",
      format: "json",
      slugField: "title",
      schema: {
        date: fields.text({
          label: "Date(s)",
          description: "In YYYY-MM-DD format",
          validation: { length: { min: 1 } },
        }),
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 1 } },
          },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        name: fields.text({
          label: "Name of Venue",
          validation: { length: { min: 1 } },
        }),
        link: fields.url({
          label: "Link to Venue",
          description: "Optional",
          validation: { isRequired: false },
        }),
        ctaText: fields.text({
          label: "Button Text - Call to Action",
        }),
        ctaLink: fields.text({
          label: "Button Link - Call to Action",
        }),

        internal: fields.conditional(
          fields.checkbox({
            label: "Internal Event",
            description: "Events hosted by us - Masterclasses/Lec Dems.",
          }),
          {
            true: fields.object({
              timings: fields.text({
                label: "Timings",
                validation: { length: { min: 1 } },
              }),

              page: fields.array(
                fields.object({
                  subtitle: fields.text({
                    label: "Subtitle",
                    validation: { length: { min: 1 } },
                  }),
                  content: fields.document({
                    label: "Content",
                    links: true,
                    formatting: {
                      inlineMarks: true,
                      listTypes: true,
                    },
                  }),
                }),
                {
                  label: "Page Content",
                  validation: { length: { min: 1 } },
                  itemLabel: ({ fields }) => fields.subtitle.value,
                },
              ),
            }),
            false: fields.empty(),
          },
        ),
      },
    }),

    testimonials: collection({
      label: "News Testimonials",
      path: "src/data/testimonials/*",
      format: "json",
      slugField: "name",
      schema: {
        logo: fields.image({
          label: "Logo",
          validation: { isRequired: true },
          directory: "/public/images/testimonials/",
          publicPath: "/images/testimonials/",
        }),
        quote: fields.text({
          label: "Quote",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        name: fields.text({
          label: "Name",
          validation: { length: { min: 1 } },
        }),
      },
    }),
  },
})
