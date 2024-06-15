import React from "react";
import { useY } from "react-yjs";
import * as Y from "yjs";

export const DeepStructure: React.FC = () => {
  const [yPosts] = React.useState(() => {
    // initialize a Y.Doc and get the settings
    // when the component mounts
    const yDoc = new Y.Doc();
    const yPosts = yDoc.getArray<Y.Map<string | Y.Array<string>>>("posts");
    const yPost = new Y.Map<string | Y.Array<string>>();
    yPosts.push([yPost]);
    yPost.set("title", "Notes");
    const yTags = new Y.Array<string>();
    yTags.push(["cooking", "vegetables"]);
    yPost.set("tags", yTags);
    return yPosts;
  });

  const yTagsOfFirstPost = yPosts.get(0).get("tags") as Y.Array<string>;
  const tagsOfFirstPost = useY(yTagsOfFirstPost);

  return (
    <>
      {tagsOfFirstPost.map((tag, index) => {
        return (
          <div key={`${tag}-${index}`}>
            {tag}
            <button
              onClick={() => {
                const tags = yPosts.get(0).get("tags") as Y.Array<string>;
                tags.delete(index);
              }}
            >
              x
            </button>
          </div>
        );
      })}
      <div>Result: {JSON.stringify(yPosts.toJSON(), null, 2)}</div>
    </>
  );
};
