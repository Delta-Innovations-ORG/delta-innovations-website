import React from 'react';
import { MapPin } from 'lucide-react';
import { teamMembers, teamPreviewCount } from '../../content/team';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';

type TeamSectionProps = {
  preview?: boolean;
};

export function TeamSection({ preview = false }: TeamSectionProps) {
  const members = preview ? teamMembers.slice(0, teamPreviewCount) : teamMembers;

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeading
          badge="Our Team"
          title={preview ? 'Engineers across Pakistan & Egypt' : 'Meet the team'}
          description={
            preview
              ? 'A distributed team focused on clear scope, secure delivery, and long-term partnerships.'
              : 'Full-stack, mobile, AI, and platform engineers delivering transparent, milestone-based projects.'
          }
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.08}>
              <article className="glass-card p-6 lg:p-8 h-full flex flex-col">
                <h3 className="text-xl font-bold text-brand-light font-display">{member.name}</h3>
                <p className="text-brand-cyan text-sm font-medium mt-1">{member.role}</p>
                <p className="flex items-center gap-1.5 text-xs text-brand-muted mt-2">
                  <MapPin size={12} className="text-brand-cyan" aria-hidden />
                  {member.location}
                </p>
                <p className="text-brand-muted text-sm leading-relaxed mt-4 flex-1">{member.bio}</p>
                <ul className="flex flex-wrap gap-2 mt-4">
                  {member.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-lg bg-brand-navyCard border border-brand-cyan/20 text-brand-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        {preview && (
          <div className="text-center mt-10">
            <Button to="/team" variant="secondary">
              View Full Team
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
