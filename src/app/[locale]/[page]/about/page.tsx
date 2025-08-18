import { AboutUs } from '../../../components/AboutUs/AboutUs';

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <AboutUs page={page} />;
}
