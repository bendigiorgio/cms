"use client";

import { field } from "@/cms/functions/cms";
import { TypeGenerator } from "@/cms/helpers/typeGenerator";
import { schema } from "@/cms/schema";

const Test = () => {
  const testSchema = schema({
    post: field({ name: "post", label: "Post" }).object({
      title: field({ name: "title", label: "Title" }).string().required(),
      body: field({ name: "body", label: "Body" }).richText().required(),
      author: field({ name: "author", label: "Author" })
        .relatesTo(["author"])
        .required(),
      categories: field({ name: "category", label: "Category" })
        .array()
        .string(),
    }),
    author: field({ name: "author", label: "Author" }).object({
      name: field({ name: "name", label: "Name" }).string().required(),
      email: field({ name: "email", label: "Email" }).string().required(),
      posts: field({ name: "posts", label: "Posts" })
        .array()
        .setRelations(["post"]),
    }),
  });
  const typeGenerator = new TypeGenerator();
  const types = typeGenerator.generate(testSchema);
  console.log(types);

  console.log(testSchema);
  return <div>Test</div>;
};

export default Test;
