import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import SpaceScreen, {Props as SpaceScreenProps} from "@/components/SpaceScreen";
import {getAdminArticles} from "@/servicesAdmin/Article";
import {getAdminNamespace} from "@/servicesAdmin/Namespace";
import {getAdminSpace} from "@/servicesAdmin/Space";
import Article from "@/types/Article";
import Space from "@/types/Space";
import {createArticles, createSpace} from "@/utils/faker";

export type Props = Omit<
  SpaceScreenProps,
  "articles" | "current" | "namespaceId" | "space" | "total"
> & {
  articles: string;
  namespaceId: string;
  space: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  res,
  req,
}: // eslint-disable-next-line @typescript-eslint/require-await
GetServerSidePropsContext) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=30",
  );

  if (
    req.headers.host === "sentrei.com" ||
    req.headers.host?.endsWith(".vercel.app")
  ) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  if (req.headers.host === "demo.sentrei.com") {
    const articles = createArticles();
    const space = createSpace();

    return {
      props: {
        articles: JSON.stringify(articles),
        namespaceId: JSON.stringify("demo"),
        space: JSON.stringify(space),
      },
    };
  }

  try {
    let namespaceId = "";

    if (req.headers.host?.endsWith(".sentrei.com")) {
      namespaceId = req.headers.host?.replace(".sentrei.com", "");
    } else if (req.headers.host === "localhost:3000") {
      namespaceId = "shunkakinoki";
    }

    const namespace = await getAdminNamespace(namespaceId);

    if (!namespace?.modelId) {
      throw new Error(`No modelId in namespace ${namespaceId}`);
    }

    if (namespace.model === "profiles") {
      return {
        notFound: true,
      };
    }

    const articlesReq = getAdminArticles({
      limit: 6,
      spaceId: namespace?.modelId,
      status: "published",
    });
    const spaceReq = getAdminSpace(namespace.modelId);

    const [articles, space] = await Promise.all([articlesReq, spaceReq]);

    return {
      props: {
        articles: JSON.stringify(articles),
        namespaceId: JSON.stringify(""),
        space: JSON.stringify(space),
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return {
    redirect: {
      destination: "https://sentrei.com",
      permanent: false,
    },
  };
};

const Index = ({
  articles,
  space,
  namespaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <SpaceScreen
      articles={JSON.parse(articles) as Article.Get[]}
      space={JSON.parse(space) as Space.Get}
      namespaceId={JSON.parse(namespaceId) as string}
    />
  );
};

export default Index;
