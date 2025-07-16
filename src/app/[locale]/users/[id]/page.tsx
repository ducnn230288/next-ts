import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: Props) => {
  if (id === '10') notFound();

  return <div>Page: {id}</div>;
};

export default Page;
