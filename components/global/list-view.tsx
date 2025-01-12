import  { Children, ReactNode } from "react";

interface ListViewProps<T> {
  render: (item: T, idx: number) => ReactNode;
  items: T[];
}

/**
 * ListView component iterates over an array and renders each item using a provided render function.
 * @template T The type of items in the array.
 * @param {ListViewProps<T>} props The props for the ListView component.
 * @returns {ReactNode} The rendered elements.
 */
const ListView = <T,>({ render, items }: ListViewProps<T>): ReactNode => {
  if (!Array.isArray(items)) {
    console.error("ListView component expects an array as 'items' prop.");
    return null;
  }

  return Children.toArray(
    items.map((item: T, idx: number) => render(item, idx))
  );
};

export default ListView;
