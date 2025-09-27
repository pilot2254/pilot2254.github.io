/**
 * Blog Card Component
 * Displays a blog post preview in a card format
 */

import Link from "next/link"
import { Calendar, Clock, User, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/blog"
import { blogConfig } from "@/config/blog"
import type { BlogPost } from "@/types"

interface BlogCardProps {
  post: BlogPost
  showAuthor?: boolean
  showReadingTime?: boolean
  showTags?: boolean
  className?: string
}

export function BlogCard({ 
  post, 
  showAuthor = blogConfig.showAuthor,
  showReadingTime = blogConfig.showReadingTime,
  showTags = blogConfig.showTags,
  className 
}: BlogCardProps) {
  return (
    <Card className={`flex flex-col h-full hover:shadow-lg transition-shadow duration-200 ${className || ""}`}>
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg sm:text-xl">
            <Link 
              href={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </CardTitle>
          {post.featured && (
            <Badge variant="default" className="shrink-0 text-xs">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-3 text-sm sm:text-base">
          {post.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
          
          {showAuthor && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.author}</span>
            </div>
          )}
          
          {showReadingTime && post.readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
        </div>
        
        {showTags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex-none pt-0">
        <Link 
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}