import React from 'react';

type FooterSectionHeadingProps = {
  title: string;
  id?: string;
};

export function FooterSectionHeading({ title, id }: FooterSectionHeadingProps) {
  return (
    <h3
      id={id}
      className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-cyan"
    >
      {title}
    </h3>
  );
}
