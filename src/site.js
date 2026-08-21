// site.js — every fact about the company lives here, once.
//
// Kept separate from data.js (which is the product catalogue) so contact
// details, hours and boilerplate can be corrected in one place rather than
// hunted for across six components.

// ⚠️ TODO — REPLACE BEFORE LAUNCH.
// The enquiry form opens the visitor's mail client addressed to this. It is
// currently a placeholder carried over from the template, which means form
// enquiries go nowhere. Put the real inbox here.
export const ENQUIRY_EMAIL = "support@yourlab.com";

export const COMPANY = {
  name: "CJ-DELUZ",
  legalName: "CJ-DELUZ (NIG) LTD",
  suffix: "Nig. Ltd",
  city: "Lagos",
  country: "Nigeria",
  // One sentence, used in the footer and as the meta description's basis.
  summary:
    "Chemical raw materials for food, beverage, pharmaceutical and industrial manufacturing — held in stock in Lagos and documented lot by lot.",
};

export const CONTACT = {
  phoneDisplay: "+234 704 753 5828",
  phoneHref: "tel:+2347047535828",
  whatsappDisplay: "+234 704 753 5828",
  whatsappHref: "https://wa.me/2347047535828",
  hours: "Monday – Friday, 9am – 6pm WAT",
  hoursNote: "Messages sent outside these hours are answered the next morning.",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Materials" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
