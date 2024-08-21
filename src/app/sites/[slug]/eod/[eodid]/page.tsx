import { EODItem } from "@/components/component/eoditem";
const EOD = ({ params: { slug, eodid } }: {
  params: {
    slug: string,
    eodid: string
  }
}) => {
  return (
    <EODItem />
  )
}
export default EOD;
