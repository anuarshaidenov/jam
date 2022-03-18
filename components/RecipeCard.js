import Image from 'next/image';
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;
  const thumbnailUrl = `https:${thumbnail.fields.file.url}`;
  const { width } = thumbnail.fields.file.details.image;
  const { height } = thumbnail.fields.file.details.image;
  return (
    <li className="recipe-card">
      <Image
        src={thumbnailUrl}
        alt={title}
        width="100%"
        height="50px"
        layout="responsive"
        objectFit="cover"
      />
      <div className="recipe-card__details bg-white flex flex-col translate-y-[-8px] transition-transform duration-200 hover:rotate-0 ease-linear md:rotate-[-1deg]">
        <div className="p-2 md:p-5">
          <h3 className="text-lg font-bold uppercase">{title}</h3>
          <p className="text-gray-500">
            Takes approximately {cookingTime} minutes to make
          </p>
        </div>
        <Link href={`/recipes/${slug}`}>
          <a className="bg-red-500 text-white p-2 self-end transition-colors duration-200 hover:bg-red-400">
            Cook this
          </a>
        </Link>
      </div>
    </li>
  );
};

export default RecipeCard;
