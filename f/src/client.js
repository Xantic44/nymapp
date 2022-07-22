import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "zitxzm8e",
  dataset: "production",
  apiVersion: "2022-04-09",
  useCdn: true,
  token:
    "skcAAYxkMMgv9MCJLDcZWse14n0FhjeNonr0IXthRwRCFO30KdnqJSRNUXJX8L5VcYUGGgMylkVrqfQ3qgb33Ayul0PiaWKiosUfUMD7ueAdozlZ5GEGEKGDdrJcSsQp90FJwbCQb3RP9ROxtxIwc8QdHrDul3M307U3Zz2htZ7ObomYBagv",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
