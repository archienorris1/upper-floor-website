export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'intro'; text: string }

export type Article = {
  slug: string
  title: string
  date: string
  readTime: string
  category: string
  image: string
  thumbImage: string
  excerpt: string
  content: Block[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'building-brand-through-podcasting',
    title: 'Building a Brand Through Podcasting: 5 Ideas That Actually Work',
    date: 'April 14, 2026',
    readTime: '5 min read',
    category: 'Strategy',
    image: '/images/insights-featured.jpg',
    thumbImage: '/images/insights-featured.jpg',
    excerpt: 'Building a brand through podcasting isn\'t about going viral. It\'s about earning attention, one episode at a time.',
    content: [
      { type: 'intro', text: 'Building a brand through podcasting isn\'t about going viral. It\'s about earning attention, one episode at a time.' },
      { type: 'p', text: 'Most brands approach podcasting backwards. They focus on downloads, on going viral, on getting featured. But the podcasts that actually build lasting brands do something different — they show up consistently, speak to a specific audience, and earn trust over time.' },
      { type: 'p', text: 'Here are 5 ideas that actually work:' },
      { type: 'h2', text: '1. Your brand starts with who you serve' },
      { type: 'p', text: 'If you\'re not solving a real problem for someone specific, growth will always feel forced. The most successful B2B podcasts aren\'t trying to appeal to everyone. They own a niche, speak to a specific buyer, and become the go-to resource for that person. Specificity is what makes people feel seen — and feeling seen is what builds loyalty.' },
      { type: 'h2', text: '2. Stay in your lane' },
      { type: 'p', text: 'The more focused you are, the easier it is for people to understand and trust you. When you try to cover everything, you become forgettable. When you commit to a lane, you become the authority in it. Pick your territory and own it.' },
      { type: 'h2', text: '3. Clarity creates trust' },
      { type: 'p', text: 'If someone can\'t explain what your podcast is about in one sentence, you\'ve lost them. This applies to your show name, your episode titles, your thumbnail, your description. Every touchpoint should make it immediately clear who the show is for and what they\'ll get from it. Confusion kills credibility.' },
      { type: 'h2', text: '4. Be bold about what you believe' },
      { type: 'p', text: 'Safe content gets ignored. Clear opinions attract the right audience. The brands that build real authority through podcasting aren\'t afraid to take a position. They share their actual perspective on how things should be done. That\'s what gets shared, cited, and remembered.' },
      { type: 'h2', text: '5. Commit to consistency' },
      { type: 'p', text: 'Showing up every week beats chasing one viral episode. Consistency is what turns a podcast into a brand asset. It signals reliability, builds anticipation, and compounds over time. One great episode won\'t change your business. Fifty good ones will.' },
      { type: 'p', text: 'The brands winning through podcasting right now aren\'t the ones with the biggest budgets or the flashiest studios. They\'re the ones who showed up, stayed focused, and earned their audience\'s attention — one episode at a time.' },
    ],
  },
  {
    slug: 'why-platforms-are-betting-on-podcasts',
    title: 'Why Every Major Platform Is Betting on Podcasts (And What It Means For Your Brand)',
    date: 'April 22, 2026',
    readTime: '6 min read',
    category: 'Industry',
    image: '/images/insights-thumb-1.jpg',
    thumbImage: '/images/insights-thumb-1.jpg',
    excerpt: 'Apple pushing video podcasts. Netflix launching conversation-led shows. Spotify rolling out AI-powered discovery. All in the same month.',
    content: [
      { type: 'intro', text: 'Apple pushing video podcasts. Netflix launching conversation-led shows. Spotify rolling out AI-powered podcast discovery. All in the same month.' },
      { type: 'p', text: 'This isn\'t coincidence. It\'s a land grab.' },
      { type: 'h2', text: 'What\'s actually happening with Apple' },
      { type: 'p', text: 'Apple moving into video podcasts isn\'t really about podcasting. It\'s about platforms fighting for ownership. Apple wants to keep creators and audiences inside its ecosystem instead of losing them to YouTube or Spotify. They want to own the distribution, the discovery, and the monetisation.' },
      { type: 'p', text: 'For brands, this creates an opportunity: the platforms are investing heavily in making podcasts more discoverable and more watchable. That rising tide lifts everyone — if you\'re already in the water.' },
      { type: 'h2', text: 'What Netflix is actually building' },
      { type: 'p', text: 'Netflix getting into podcasts is wild when you think about it. But they\'re not doing podcasts in the traditional sense. They\'re building shows that happen to be conversation-led. More designed for people to watch, not just listen.' },
      { type: 'p', text: 'This matters because it confirms something we\'ve believed for a while: most people aren\'t discovering podcasts on podcast apps anymore. It\'s clips, reels, YouTube, the social feed. That\'s where the attention is. The audio is just the source material.' },
      { type: 'h2', text: 'What Spotify\'s AI discovery means for you' },
      { type: 'p', text: 'Spotify testing AI-powered prompted playlists is the most significant development for brand podcasters. Instead of scrolling or relying on charts, listeners can type what they\'re in the mood for and get recommendations immediately.' },
      { type: 'p', text: 'Discovery has always been one of the hardest parts of podcasting — especially for niche B2B shows. This shift makes it easier for the right content to reach the right people. But only if your show is specific enough about what it is and who it\'s for.' },
      { type: 'h2', text: 'What this means for your brand' },
      { type: 'p', text: 'The platforms are doing the hard work of making podcasts more discoverable. Your job is to make sure your show is worth discovering. That means clear positioning, consistent production, and content that earns attention every single week.' },
      { type: 'p', text: 'The brands that build now will be the ones that benefit most when the platforms finish building the infrastructure around them.' },
    ],
  },
  {
    slug: 'long-game-beats-virality',
    title: 'Why Playing the Long Game With Your Podcast Beats Chasing Virality',
    date: 'May 1, 2026',
    readTime: '4 min read',
    category: 'Strategy',
    image: '/images/insights-thumb-2.jpg',
    thumbImage: '/images/insights-thumb-2.jpg',
    excerpt: 'In an era where everything is expected to be instant and shareable, the things that build slowly are the things that last.',
    content: [
      { type: 'intro', text: 'Justin Bieber didn\'t just perform at Coachella. He reframed what a performance can be.' },
      { type: 'p', text: 'In an era where everything is expected to be instant, polished, and shareable — Bieber did the opposite. He made something that required context. That didn\'t translate instantly. That wasn\'t built for the feed.' },
      { type: 'p', text: 'And that\'s exactly the opportunity for brands.' },
      { type: 'p', text: 'We\'re surrounded by content optimised for the moment. Quick takes, trending sounds, dopamine-engineered hooks. Most of it is forgotten by the next scroll. But the things that require a little more from the audience — the things that build slowly — those are the things that last.' },
      { type: 'h2', text: 'Podcasts are the long game.' },
      { type: 'p', text: 'A single viral post might get you 10,000 impressions. A consistent podcast — one that shows up every week, goes deep on topics your audience cares about, and positions you as the authority in your space — builds something that compounds.' },
      { type: 'p', text: 'Your ideal client listens to three episodes before they ever reach out. They feel like they already know you. The trust is already there. The sales conversation is completely different.' },
      { type: 'p', text: 'That\'s not something you can manufacture with a viral moment. It\'s something you earn over time.' },
      { type: 'p', text: 'The brands winning through podcasting right now didn\'t launch with a perfect strategy. They started, they stayed consistent, and they let the compound effect do its work.' },
      { type: 'p', text: 'It might not win the moment. But it wins in the long term.' },
    ],
  },
  {
    slug: 'podcasting-underestimated-advantage',
    title: 'Podcasting Is Still Underestimated. That\'s Your Competitive Advantage.',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Industry',
    image: '/images/insights-featured.jpg',
    thumbImage: '/images/insights-featured.jpg',
    excerpt: 'Joe Rogan\'s podcast reportedly wasn\'t nominated for a Golden Globe because the show didn\'t pay the $500 entry fee.',
    content: [
      { type: 'intro', text: 'Joe Rogan\'s podcast reportedly wasn\'t nominated for a Golden Globe because the show didn\'t pay the $500 entry fee.' },
      { type: 'p', text: 'The biggest podcast in the world. Missed by a legacy institution because of an admin process that wasn\'t built for a new format.' },
      { type: 'p', text: 'This small detail highlights something much bigger: podcasting is still not fully taken seriously by the establishment. And for brands paying attention, that\'s a significant opportunity.' },
      { type: 'h2', text: 'New media always faces this' },
      { type: 'p', text: 'New media formats have always faced this. Film wasn\'t taken seriously by theatre. Television wasn\'t taken seriously by film. Podcasting is going through the same thing — transforming content creation, audience engagement, and influence, while legacy institutions still operate on rules that don\'t reflect the shift.' },
      { type: 'p', text: 'The brands that move now — before podcasting gets the mainstream credibility it\'s heading towards — are the ones that will have built the audience, the archive, and the authority before everyone else catches up.' },
      { type: 'h2', text: 'The window is still open' },
      { type: 'p', text: 'Groundbreaking voices are flying under the radar right now. Not because their content isn\'t good. Because they haven\'t committed to showing up consistently enough to be impossible to ignore.' },
      { type: 'p', text: 'The window to be early is still open. But it won\'t be forever.' },
    ],
  },
  {
    slug: 'podcasting-isnt-just-audio',
    title: 'Podcasting Isn\'t Just Audio Anymore. Here\'s What\'s Changed.',
    date: 'March 12, 2026',
    readTime: '5 min read',
    category: 'Industry',
    image: '/images/insights-thumb-1.jpg',
    thumbImage: '/images/insights-thumb-1.jpg',
    excerpt: 'Podcasting isn\'t just alive. It\'s evolving into something much bigger — and audio is just the starting point.',
    content: [
      { type: 'intro', text: 'Podcasting isn\'t just alive. It\'s evolving into something much bigger.' },
      { type: 'p', text: 'Nearly 4.7 million podcasts are indexed worldwide. Hundreds of thousands are actively publishing content. But the most important shift isn\'t the volume — it\'s the format.' },
      { type: 'h2', text: 'Audio is just the starting point now.' },
      { type: 'p', text: 'Audiences aren\'t only listening in headphones anymore. They\'re watching clips on TikTok and YouTube Shorts. They\'re finding shows through 30-second Instagram Reels. They\'re reading transcripts repurposed as LinkedIn posts. They\'re following creators across platforms because a single clip caught their attention in the social feed.' },
      { type: 'p', text: 'Podcasting is becoming a multi-sensory medium. The conversation is the core — but the content it creates extends in every direction.' },
      { type: 'h2', text: 'For brands, this changes everything' },
      { type: 'p', text: 'For brands, this changes everything about how you should think about your podcast. The episode isn\'t the end product. It\'s the source material.' },
      { type: 'p', text: 'One 45-minute recording, produced well, can become: a full video episode on YouTube, 10–20 short clips for social platforms, a long-form LinkedIn post, a newsletter section, an SEO article, a series of story slides, quote graphics for Instagram.' },
      { type: 'p', text: 'The brands that understand this are getting 10x the content output from the same investment. The ones still thinking of their podcast as just an audio file are leaving most of the value on the table.' },
      { type: 'h2', text: 'The microphone is just the beginning.' },
      { type: 'p', text: 'Success in podcasting today isn\'t about publishing episodes. It\'s about creating content experiences that meet your audience where they are, in the format they prefer, and making it easy to share, find, and connect with.' },
      { type: 'p', text: 'The microphone is just the beginning.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
