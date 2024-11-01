module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "uk"],
  },
  localePath:
    typeof window === "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("path").resolve("./public/locales")
      : "/public/locales",
};
