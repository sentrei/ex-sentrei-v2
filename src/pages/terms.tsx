import {GetStaticProps, InferGetStaticPropsType} from "next";

import TermsScreen, {Props as TermsScreenProps} from "@/components/TermsScreen";
import markdown from "@/utils/markdown";

export type Props = TermsScreenProps;

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps<Props> = async () => {
  const body = markdown("terms");

  return {
    props: {
      body,
    },
  };
};

const Terms = ({
  body,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return <TermsScreen body={body} />;
};

export default Terms;
