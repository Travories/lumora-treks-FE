import { blockRegistry } from "@/lib/block-registry";
import type { CmsBlock } from "@/lib/blocks";

/**
 * Renders a Wagtail page body: an ordered list of `{ type, value, id }` blocks.
 * Each block's `type` selects a component from the registry; `value` is spread
 * as props. Unknown block types are skipped (logged in dev).
 */
export default function BlockRenderer({ blocks }: { blocks: CmsBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = blockRegistry[block.type];
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`BlockRenderer: no component for block type "${block.type}"`);
          }
          return null;
        }
        return <Component key={block.id} {...block.value} />;
      })}
    </>
  );
}
