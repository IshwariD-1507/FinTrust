import React from 'react';
import { MatchedPhrase } from '../types';

interface PostHighlightTextProps {
  text: string;
  matches: MatchedPhrase[];
}

export const PostHighlightText: React.FC<PostHighlightTextProps> = ({ text, matches }) => {
  if (!matches || matches.length === 0) {
    return <span className="text-slate-800 leading-relaxed whitespace-pre-wrap">{text}</span>;
  }

  // Sort matches by start index
  const sortedMatches = [...matches].sort((a, b) => a.startIndex - b.startIndex);

  // Merge overlapping ranges
  const nonOverlapping: MatchedPhrase[] = [];
  for (const m of sortedMatches) {
    if (nonOverlapping.length === 0) {
      nonOverlapping.push(m);
    } else {
      const last = nonOverlapping[nonOverlapping.length - 1];
      if (m.startIndex < last.endIndex) {
        // overlap: extend or skip
        if (m.endIndex > last.endIndex) {
          last.endIndex = m.endIndex;
          last.ruleId = `${last.ruleId}, ${m.ruleId}`;
        }
      } else {
        nonOverlapping.push(m);
      }
    }
  }

  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  nonOverlapping.forEach((match, idx) => {
    // Normal text before match
    if (match.startIndex > currentIndex) {
      elements.push(
        <span key={`text-${idx}`}>
          {text.substring(currentIndex, match.startIndex)}
        </span>
      );
    }

    // Determine highlight color based on rule
    let badgeColor = 'bg-amber-100 text-amber-950 border-amber-300';
    if (match.ruleId.includes('R1')) {
      badgeColor = 'bg-rose-100 text-rose-950 border-rose-300';
    } else if (match.ruleId.includes('R5')) {
      badgeColor = 'bg-teal-100 text-teal-950 border-teal-300';
    } else if (match.ruleId.includes('R7') || match.ruleId.includes('R6')) {
      badgeColor = 'bg-emerald-100 text-emerald-950 border-emerald-300';
    }

    const matchedSubstring = text.substring(match.startIndex, match.endIndex);
    elements.push(
      <mark
        key={`match-${idx}`}
        title={`Triggered Rule: ${match.ruleId}`}
        className={`px-1 py-0.5 mx-0.5 rounded border ${badgeColor} font-medium inline-block text-inherit cursor-help transition-all`}
      >
        {matchedSubstring}
        <span className="ml-1 text-[10px] font-mono opacity-80 uppercase tracking-tight">
          [{match.ruleId}]
        </span>
      </mark>
    );

    currentIndex = match.endIndex;
  });

  // Remaining text
  if (currentIndex < text.length) {
    elements.push(
      <span key="text-end">
        {text.substring(currentIndex)}
      </span>
    );
  }

  return (
    <div className="text-slate-800 leading-relaxed whitespace-pre-wrap">
      {elements}
    </div>
  );
};
