import HeaderRoot from "@/components/HeaderRoot";
import ContainerRoot from "@/components/ContainerRoot";
import FooterRoot from "@/components/FooterRoot";
import ArticleBanner from "@/components/ArticleBanner";
import ArticleAuthor from "@/components/ArticleAuthor";
import ArticleImage from "@/components/ArticleImage";
import Author from "@/types/Author";
import Article from "@/types/Article";
import dynamic from "next/dynamic";
import ArticleSubscribe from "@/components/ArticleSubscribe";
import ArticleStoryGrid from "@/components/ArticleStoryGrid";

const ArticleBody = dynamic(() => import("@/components/ArticleBody"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <div className="p-8 md:p-12 lg:p-16" />,
});

export interface Props {
  article: Article;
  authors: Author[];
  more: Article[];
  namespace: string;
}

export default function ArticleScreen({
  authors,
  article,
  more,
  namespace,
}: Props): JSX.Element {
  return (
    <ContainerRoot>
      <HeaderRoot />
      <ArticleBanner title={article.title} subtitle={article?.subtitle} />
      <ArticleAuthor
        authors={authors}
        date={article.date}
        time={article.time}
      />
      {article.image && (
        <ArticleImage title={article.title} image={article.image} />
      )}
      {article.pricing === "free" && article.body && (
        <ArticleBody body={article.body} />
      )}
      {article.pricing === "subscription" && article.excerpt && (
        <ArticleBody excerpt body={article.excerpt} />
      )}
      {article.pricing === "subscription" && (
        <ArticleSubscribe namespace={namespace} />
      )}
      <ArticleStoryGrid articles={more} namespace="demo" />
      <FooterRoot />
    </ContainerRoot>
  );
}
