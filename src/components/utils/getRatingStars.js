/**
 * Builds a normalized star-rating breakdown for rendering, along with an
 * accessible label. Supports whole ratings (5) and half ratings (4.5) so
 * it can be reused anywhere in the app that displays a star rating.
 *
 * @param {number} rating - the rating value, e.g. 4.5
 * @param {number} maxRating - the maximum possible rating (default 5)
 * @returns {{
 *   stars: Array<"full"|"half"|"empty">,
 *   label: string,
 *   rating: number,
 *   maxRating: number,
 * }}
 */
export function getRatingStars(rating, maxRating = 5) {
  const safeRating = Math.min(Math.max(rating, 0), maxRating);
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill("full"),
    ...(hasHalfStar ? ["half"] : []),
    ...Array(emptyStars).fill("empty"),
  ];

  return {
    stars,
    label: `Rated ${safeRating} out of ${maxRating} stars`,
    rating: safeRating,
    maxRating,
  };
}

export default getRatingStars;
