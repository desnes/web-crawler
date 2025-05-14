interface HNNews {
  number: number;
  title: string;
  points: number;
  comments: number;
  url?: string;
}
interface NewsCardProps {
  item: HNNews
}

export const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <article className="flex p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <span className="text-gray-500 mr-2">{item.number}.</span>
      <div className="flex-1">
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-900 font-medium hover:text-hn-orange"
        >
          {item.title}
        </a>
        <div className="text-xs text-gray-500 mt-1">
          <span>{item.points} points</span>
          <span className="mx-2">|</span>
          <span>{item.comments} comments</span>
        </div>
      </div>
    </article>
  )
}