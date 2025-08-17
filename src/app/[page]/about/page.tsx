import { AboutUs } from '../../components/AboutUs/AboutUs';

export const Page = async ({
  params,
}: {
  params: Promise<{ page: string }>;
}) => {
  const { page } = await params;
  return <AboutUs page={page} />;
};
export default Page;
