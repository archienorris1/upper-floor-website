export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'intro'; text: string }

export type Article = {
  slug: string
  title: string
  date: string
  dateISO: string
  readTime: string
  category: string
  image: string
  thumbImage: string
  excerpt: string
  content: Block[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'what-an-ecom-content-agency-actually-does',
    title: 'What an Ecom Content Agency Actually Does (And When You Need One)',
    date: 'June 9, 2026',
    dateISO: '2026-06-09',
    readTime: '6 min read',
    category: 'Growth',
    image: '/media/poster-card-collander.jpg',
    thumbImage: '/media/poster-card-collander.jpg',
    excerpt:
      'Most ecommerce brands do not have a traffic problem. They have a creative problem. Here is what an ecom content agency actually does, and the signs you are ready for one.',
    content: [
      {
        type: 'intro',
        text: 'Most ecommerce brands do not have a traffic problem. They have a creative problem. The ads are running, the store works, the product is good. The content is what lets it all down.',
      },
      {
        type: 'p',
        text: 'An ecom content agency exists to fix exactly that. Not branding decks. Not vanity campaigns. A constant supply of content built to sell: UGC ads for paid social, organic video that builds the brand, and statics that stop the scroll.',
      },
      { type: 'h2', text: 'The job is volume with standards' },
      {
        type: 'p',
        text: 'Paid social in 2026 rewards creative volume. Meta and TikTok find your buyers for you, but only if you feed them enough variations to learn from. One hero ad is not a strategy. Winning brands test dozens of hooks, angles and formats every month, then double down on what converts.',
      },
      {
        type: 'p',
        text: 'Doing that in-house is brutal. You need scripting, filming, editing, performance analysis and a feedback loop between them. A good agency runs that engine for you: create, find the winners, scale them.',
      },
      { type: 'h2', text: 'Paid and organic are different crafts' },
      {
        type: 'p',
        text: 'Ads are heavier on the CTA. They earn attention in the first second and push to purchase. Organic does the opposite: it blends into the feed, builds familiarity and gives people a reason to trust the brand before they ever see an offer. The mistake most ecom brands make is treating these as the same thing and producing content that does neither job well.',
      },
      { type: 'h2', text: 'When you actually need an agency' },
      {
        type: 'p',
        text: 'You are spending on ads but the creative is the bottleneck. Your ROAS is decaying because the same three ads have been running for months. Your organic channels are dead because nobody owns them. You are doing six figures and every hour you spend editing video is an hour not spent running the business. Any one of these is the signal.',
      },
      {
        type: 'p',
        text: 'If none of those apply yet, keep it scrappy. Film on your phone, post daily, learn what your audience responds to. The brands that get the most out of an ecom content agency are the ones that already know content is what grows them.',
      },
      { type: 'h2', text: 'What to look for' },
      {
        type: 'p',
        text: 'Proof over promises. Ask to see the ads they have made and the numbers behind them. Ask how they decide what to make next. The right answer involves data from your account, not a content calendar template. And ask who actually makes the content. You want makers, not middlemen.',
      },
    ],
  },
  {
    slug: 'dropshipping-store-to-real-brand',
    title: 'How to Turn a Dropshipping Store Into a Brand Investors Want to Buy',
    date: 'May 28, 2026',
    dateISO: '2026-05-28',
    readTime: '7 min read',
    category: 'Strategy',
    image: '/media/poster-aurora-unboxing.jpg',
    thumbImage: '/media/poster-aurora-unboxing.jpg',
    excerpt:
      'A dropshipping store is a cash machine with a countdown timer. A brand is an asset someone will pay a multiple for. Content is the difference between the two.',
    content: [
      {
        type: 'intro',
        text: 'A dropshipping store is a cash machine with a countdown timer. A brand is an asset someone will pay a multiple for. The difference between the two is not the product. It is everything around the product.',
      },
      {
        type: 'p',
        text: 'Plenty of stores do seven figures and are worth almost nothing in a sale. The revenue depends entirely on ad spend, the product can be cloned in a week, and there is no audience that would follow the brand anywhere. Buyers and investors see straight through it.',
      },
      { type: 'h2', text: 'What buyers actually pay for' },
      {
        type: 'p',
        text: 'Acquirers value the things that survive without you: repeat purchase rate, owned audience, organic demand, brand search volume, and creative systems that keep working after the founder leaves. Every one of those is built with content.',
      },
      {
        type: 'p',
        text: 'When someone types your brand name into Google or TikTok instead of the generic product name, you stop competing on price. That is the moment a store becomes a brand, and it shows up directly in your multiple.',
      },
      { type: 'h2', text: 'Step one: stop looking like a dropshipper' },
      {
        type: 'p',
        text: 'Generic supplier photos, recycled AliExpress videos and a logo slapped on a template theme all scream short-term. Original content is the fastest signal of legitimacy: your product, in real homes, with real people, shot in a style that is recognisably yours. It costs less than most founders think and it changes how every visitor reads the store.',
      },
      { type: 'h2', text: 'Step two: build organic demand, not just paid traffic' },
      {
        type: 'p',
        text: 'Paid ads are rented attention. Organic is owned. A consistent organic presence compounds: every video that blends into the feed builds familiarity, and familiarity is what makes your ads cheaper and your repeat rate higher. We have watched brands cut acquisition costs dramatically simply because people had already seen them ten times before the first ad.',
      },
      { type: 'h2', text: 'Step three: turn winning ads into a system' },
      {
        type: 'p',
        text: 'One viral ad is luck. A documented process for producing, testing and scaling creative is an asset a buyer can underwrite. Keep the data: hooks that worked, angles that converted, audiences that responded. That playbook is part of what you are selling.',
      },
      { type: 'h2', text: 'The exit maths' },
      {
        type: 'p',
        text: 'Ecommerce businesses trade on multiples that swing wildly based on defensibility. A store with no brand might fetch two times profit. A brand with owned audience, organic demand and a creative engine can command far more. The work you do on content this year is not a marketing expense. It is enterprise value.',
      },
    ],
  },
  {
    slug: 'ugc-ads-vs-organic-content',
    title: 'UGC Ads vs Organic Content: Why Ecom Brands Need Both',
    date: 'May 14, 2026',
    dateISO: '2026-05-14',
    readTime: '5 min read',
    category: 'Strategy',
    image: '/media/poster-toasty-ugc.jpg',
    thumbImage: '/media/poster-toasty-ugc.jpg',
    excerpt:
      'Ads are built to convert. Organic is built to belong. Ecom brands that treat them as the same thing end up with content that does neither job well.',
    content: [
      {
        type: 'intro',
        text: 'Ads are built to convert. Organic is built to belong. They look similar in the feed, but they are two completely different crafts, and ecom brands that treat them as the same thing end up with content that does neither job well.',
      },
      { type: 'h2', text: 'What makes a UGC ad work' },
      {
        type: 'p',
        text: 'A UGC ad has one job: stop the right person and move them to buy. That means a hook in the first second, a clear problem and solution, social proof, and a CTA that actually asks for the sale. It feels native, but every beat is engineered. The best performing UGC ads we make are scripted to the word and still feel like a mate talking to camera.',
      },
      { type: 'h2', text: 'What makes organic work' },
      {
        type: 'p',
        text: 'Organic content lives or dies on whether it belongs in the feed. Nobody follows a brand to be sold to. They follow because the content is entertaining, useful or beautiful. Trends, transformations, behind the scenes, satisfying product moments. The sell is soft or absent. The job is familiarity, and familiarity compounds.',
      },
      { type: 'h2', text: 'Why you need both' },
      {
        type: 'p',
        text: 'Paid without organic gets expensive. Every customer sees you for the first time in an ad, so you pay full price for every ounce of trust. Organic without paid is slow. You build an audience but leave revenue on the table because nothing asks for the sale.',
      },
      {
        type: 'p',
        text: 'Together they flywheel. Organic warms the audience and makes ads cheaper. Ads fund the brand building. Your best organic posts reveal hooks worth turning into ads, and your ad data tells you what your audience actually cares about, which sharpens the organic.',
      },
      { type: 'h2', text: 'One engine, two outputs' },
      {
        type: 'p',
        text: 'You do not need two teams or two strategies. You need one content engine that understands the difference: heavier CTAs and harder hooks on the paid side, feed-native brand building on the organic side, and a feedback loop between them. That is how modern ecommerce brands grow.',
      },
    ],
  },
  {
    slug: 'creative-is-the-new-targeting',
    title: 'Creative Is the New Targeting: How Ecom Brands Win Paid Social in 2026',
    date: 'April 30, 2026',
    dateISO: '2026-04-30',
    readTime: '6 min read',
    category: 'Growth',
    image: '/media/poster-aurora-gaming.jpg',
    thumbImage: '/media/poster-aurora-gaming.jpg',
    excerpt:
      'The algorithms killed manual targeting and nobody held a funeral. Your ad creative now decides who sees your ads, what they cost, and whether your brand scales.',
    content: [
      {
        type: 'intro',
        text: 'The algorithms killed manual targeting and nobody held a funeral. Interest stacks, lookalikes, detailed audiences: mostly gone or ignored by the platforms. What replaced them is simple and uncomfortable. Your creative is the targeting now.',
      },
      { type: 'h2', text: 'How the machine actually works' },
      {
        type: 'p',
        text: 'Meta and TikTok watch who stops on your ad, who watches past three seconds, who clicks and who buys. Then they find more people like them. The ad itself is the signal. A gaming setup video finds gamers. A calming bedroom transformation finds parents. You do not pick the audience anymore. The creative does.',
      },
      { type: 'h2', text: 'What this means for ecom brands' },
      {
        type: 'p',
        text: 'It means creative volume and creative diversity are the highest leverage investments in your ad account. Every distinct angle is a new audience the algorithm can explore. Different hooks, different personas on camera, different problems solved, different formats. Brands stuck at a spend ceiling are almost always stuck because every ad speaks to the same person.',
      },
      { type: 'h2', text: 'The maths of testing' },
      {
        type: 'p',
        text: 'Expect most ads to lose. That is the model. If two ads in ten win and a winner can carry spend for weeks, the cost of making the eight losers is the entry fee for finding the two winners. Brands that produce four ads a month cannot play this game. Brands that produce twenty can.',
      },
      { type: 'h2', text: 'Quality still matters, just differently' },
      {
        type: 'p',
        text: 'Volume does not mean sloppy. It means systematic. The craft moves from polishing one perfect ad to engineering many credible ones: tight hooks, native delivery, real people, and a clear reason to buy. Polish that reads as an advert is often a penalty. Authenticity that reads as a recommendation is the win condition.',
      },
      {
        type: 'p',
        text: 'The brands winning paid social in 2026 are not the ones with the biggest budgets. They are the ones with the fastest creative engines. Feed the machine enough good signals and it will find your buyers for you.',
      },
    ],
  },
  {
    slug: 'building-an-ecom-brand-worth-exiting',
    title: 'Building an Ecom Brand Worth Exiting: The Content Playbook',
    date: 'April 16, 2026',
    dateISO: '2026-04-16',
    readTime: '7 min read',
    category: 'Strategy',
    image: '/media/poster-aurora-trend.jpg',
    thumbImage: '/media/poster-aurora-trend.jpg',
    excerpt:
      'Founders obsess over revenue. Acquirers obsess over durability. Here is the content playbook that turns an ecommerce store into an asset worth a serious multiple.',
    content: [
      {
        type: 'intro',
        text: 'Founders obsess over revenue. Acquirers obsess over durability. When a buyer looks at your ecommerce business, the question is never just how much you sell. It is whether the selling continues when you stop pushing.',
      },
      {
        type: 'p',
        text: 'Durability is built with brand, and brand is built with content. Here is the playbook we run with ecom brands that want an exit on the horizon.',
      },
      { type: 'h2', text: 'Own an aesthetic, not just a product' },
      {
        type: 'p',
        text: 'Products get cloned. Aesthetics are much harder to copy. A recognisable visual style across every ad, reel and product page means a competitor can match your price and still not match you. Decide what your brand looks and sounds like, then enforce it ruthlessly across every piece of content.',
      },
      { type: 'h2', text: 'Build the audience asset' },
      {
        type: 'p',
        text: 'An owned audience is line-item value in an acquisition. Followers who actually engage, an email list that actually converts, customers who post about the product unprompted. None of that appears from running ads alone. It comes from consistent organic content that gives people a reason to stick around between purchases.',
      },
      { type: 'h2', text: 'Make brand search grow' },
      {
        type: 'p',
        text: 'Buyers check Google Trends for your brand name. Rising brand search means people remember you and seek you out, which means cheaper acquisition and pricing power. Content drives this more than anything else: memorable organic videos and distinctive ads make people search the brand, not the product category.',
      },
      { type: 'h2', text: 'Systemise the creative engine' },
      {
        type: 'p',
        text: 'A business that depends on the founder writing every ad is not sellable, it is a job. Document the process: how concepts get chosen, how ads get made, how winners get identified and scaled. When the creative engine runs without you, you have built something a buyer can own.',
      },
      { type: 'h2', text: 'Run the numbers like an acquirer' },
      {
        type: 'p',
        text: 'Track repeat purchase rate, blended acquisition cost, the share of revenue from organic and returning customers, and creative production cost per winning ad. These are the numbers that justify a premium multiple. Improve them deliberately and the exit conversation changes completely.',
      },
      {
        type: 'p',
        text: 'The store you run today can be the brand someone fights to buy in three years. The difference is decided by what you build around the product, and that work starts with content.',
      },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

/**
 * Pick related articles for internal linking. Prefers same-category pieces,
 * then fills with the most recent others. Keeps link equity flowing between
 * the SEO articles and gives Google a reason to crawl deeper.
 */
export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticle(slug)
  if (!current) return ARTICLES.slice(0, count)
  const others = ARTICLES.filter(a => a.slug !== slug)
  const sameCategory = others.filter(a => a.category === current.category)
  const rest = others.filter(a => a.category !== current.category)
  return [...sameCategory, ...rest].slice(0, count)
}
