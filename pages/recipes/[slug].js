import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';
import Skeleton from '../../components/Skeleton';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

const RecipeDetails = ({ recipe }) => {
  if (!recipe) return <Skeleton />;

  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;
  const featuredImageUrl = `https:${featuredImage.fields.file.url}`;

  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="font-bold mb-2 text-lg">{children}</h4>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} className="underline capitalize">
          {children}
        </a>
      ),
    },
  };

  return (
    <>
      <Head>
        <title>{title} Recipe Details</title>
      </Head>
      <section className="min-h-screen py-8 container max-w-4xl w-11/12">
        <Image
          src={featuredImageUrl}
          alt={title}
          width="900"
          height="300"
          objectFit="cover"
        />
        <h1 className="bg-white drop-shadow-md inline-block text-3xl font-bold uppercase p-3 translate-y-[-40px] rotate-[-3deg]">
          {title}
        </h1>
        <p className="mb-3">Takes about {cookingTime} minutes to cook</p>
        <h3 className="font-bold text-2xl uppercase mb-3">Ingredients:</h3>
        <div className="mb-3">
          {ingredients.map((ingredient, i) =>
            i + 1 === ingredients.length ? (
              <span className="" key={ingredient}>
                {ingredient}.
              </span>
            ) : (
              <span className="" key={ingredient}>
                {ingredient},{' '}
              </span>
            )
          )}
        </div>
        <h3 className="font-bold text-2xl uppercase mb-3">Method:</h3>
        <div>{documentToReactComponents(method, RICHTEXT_OPTIONS)}</div>
      </section>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipe' });

  const paths = res.items.map((recipe) => ({
    params: { slug: recipe.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      recipe: items[0],
    },
    revalidate: 1,
  };
};

export default RecipeDetails;
