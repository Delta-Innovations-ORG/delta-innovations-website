import React, { lazy, memo, Suspense, useDeferredValue, useMemo, useState } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const LazyReactMarkdown = lazy(() => import('react-markdown'));

type MarkdownContentProps = {
  markdown: string;
  className?: string;
};

const PREVIEW_LIMIT = 50_000;

function MarkdownSkeleton() {
  return (
    <div className="animate-pulse space-y-3" aria-hidden>
      <div className="h-4 bg-brand-navyCard rounded w-3/4" />
      <div className="h-4 bg-brand-navyCard rounded w-full" />
      <div className="h-4 bg-brand-navyCard rounded w-5/6" />
    </div>
  );
}

function MarkdownContentInner({ markdown, className = '' }: MarkdownContentProps) {
  const isLarge = markdown.length > PREVIEW_LIMIT;
  const [expanded, setExpanded] = useState(!isLarge);
  const deferredMarkdown = useDeferredValue(markdown);

  const displayMarkdown = useMemo(() => {
    if (expanded || !isLarge) return deferredMarkdown;
    return `${deferredMarkdown.slice(0, PREVIEW_LIMIT)}\n\n…`;
  }, [deferredMarkdown, expanded, isLarge]);

  return (
    <div className={className}>
      <div className="markdown-prose">
        <Suspense fallback={<MarkdownSkeleton />}>
          <LazyReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
            {displayMarkdown}
          </LazyReactMarkdown>
        </Suspense>
      </div>
      {isLarge && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-6 text-sm font-medium text-brand-cyan hover:text-brand-emeraldLight transition-colors"
        >
          Show full README
        </button>
      )}
    </div>
  );
}

export const MarkdownContent = memo(MarkdownContentInner);
