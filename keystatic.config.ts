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
  },

  collections: {
    events: collection({
      label: "Upcoming Events",
      path: "src/data/events/*",
      format: "json",
      slugField: "title",
      schema: {
        date: fields.array(
          fields.date({
            label: "Date",
            validation: { isRequired: true, min: new Date().toString() },
          }),
          {
            label: "Date(s)",
            description: "The date of the event. Optionally add more than 1.",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Add a date",
          },
        ),
        title: fields.text({
          label: "Title",
          validation: { length: { min: 1 } },
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
          validation: { length: { min: 1 } },
        }),
        ctaLink: fields.text({
          label: "Button Link - Call to Action",
          validation: { length: { min: 1 } },
        }),
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