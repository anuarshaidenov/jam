import { createClient } from 'contentful';
import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';

export default function Recipes({ recipes }) {
  return (
    <>
      <Head>
        <title>Just Add Marmide | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className="container min-h-screen py-8 w-11/12 max-w-4xl">
        <ul className="grid gap-5 md:gap-12 card-container">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </ul>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  };
};
