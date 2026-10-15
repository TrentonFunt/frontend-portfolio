import { useNavigate, useOutletContext } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectSectionNav } from '@/components/ProjectSectionNav'
import { CliHintBanner } from '@/components/CliHintBanner'
import { SkillsAccordion } from '@/components/SkillsAccordion'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { CopyEmailButton } from '@/components/CopyEmailButton'
import {
  getAllProjects,
  getProjectsByCategory,
  PROJECT_CATEGORY_LABELS,
  type ProjectCategory,
} from '@/lib/projects'
import type { SiteOutletContext } from '@/components/layout/SiteLayout'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/FadeInSection'
import { MagneticButton } from '@/components/MagneticButton'
import { Typewriter } from '@/components/Typewriter'
import { CodeSnippet } from '@/components/CodeSnippet'
import resumePdf from '@/assets/TIWALADE-ADEGOKE-Resume.pdf'
import { profile, summaryAbout, summaryShort } from '@/lib/portfolio-content'

export function Home() {
  const navigate = useNavigate()
  const { openCli } = useOutletContext<SiteOutletContext>()
  const projects = getAllProjects()
  const projectSections: { category: ProjectCategory; dir: string; id: string }[] = [
    { category: 'frontend', dir: 'frontend/', id: 'projects-frontend' },
    { category: 'fullstack', dir: 'fullstack/', id: 'projects-fullstack' },
    { category: 'backend', dir: 'backend/', id: 'projects-backend' },
  ]

  return (
    <>
      <Seo
        title="Tiwalade Adegoke"
        description="Fullstack engineer open to remote work. React, TypeScript, ASP.NET Core, and shipped web products from UI through APIs and data."
      />

      <section className="max-w-(--terminal-max) mx-auto px-4 py-16 md:py-24 relative">
        <FadeInSection>
          <CliHintBanner onOpenCli={openCli} />

          <div className="terminal-window relative overflow-hidden border-(--border-terminal)">
            <div className="absolute top-0 left-0 right-0 h-px bg-terminal-prompt/40" aria-hidden="true" />

            <div className="absolute top-4 right-4 hidden lg:block opacity-40 pointer-events-none" aria-hidden="true">
              <CodeSnippet delay={2000} />
            </div>

            <div className="terminal-body relative z-10">
              <div className="mb-6 font-mono text-sm">
                <span className="text-terminal-prompt">visitor@portfolio</span>
                <span className="text-terminal-fg-muted">:</span>
                <span className="text-(--syntax-function)">~</span>
                <span className="text-terminal-fg-muted">$</span>
                <span className="ml-2">whoami</span>
              </div>

              <div className="mb-8">
                <h1 className="text-terminal-fg mb-3 text-2xl sm:text-3xl md:text-4xl font-mono tracking-tight">
                  <Typewriter text="Tiwalade Adegoke" speed={80} delay={300} showCursorAfterComplete />
                </h1>
                <p className="text-base sm:text-lg mb-3 text-(--syntax-function) font-semibold font-mono">
                  Fullstack Engineer
                </p>
                <p className="text-terminal-fg-muted max-w-2xl leading-relaxed text-sm sm:text-base">
                  {summaryShort}
                </p>
                <p className="text-terminal-prompt text-sm mt-3 font-medium font-mono">
                  {profile.availability}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-mono">
                <MagneticButton
                  as="a"
                  href="#projects"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-terminal-prompt text-terminal-prompt rounded hover:bg-terminal-prompt hover:text-terminal-bg transition-colors"
                >
                  <span>→</span> view projects
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#experience"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
                >
                  <span>→</span> experience
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
                >
                  <span>→</span> contact
                </MagneticButton>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <section id="projects" className="py-16 md:py-24 border-y border-(--border-terminal)">
        <div className="max-w-(--terminal-max) mx-auto px-4">
          <FadeInSection className="mb-6">
            <div className="flex items-center gap-2 mb-2 font-mono text-sm">
              <span className="text-terminal-prompt">$</span>
              <span>ls -la ./projects</span>
            </div>
            <p className="text-terminal-fg-muted text-sm">total {projects.length} entries</p>
          </FadeInSection>

          <ProjectSectionNav />

          <div className="space-y-16">
            {projectSections.map(({ category, dir, id }, sectionIndex) => {
              const sectionProjects = getProjectsByCategory(category)
              if (sectionProjects.length === 0) return null

              return (
                <div
                  key={category}
                  id={id}
                  className="scroll-mt-[var(--site-scroll-offset)] section-anchor"
                >
                  <FadeInSection delay={sectionIndex * 0.05} className="mb-6">
                    <div className="flex items-center gap-2 mb-1 font-mono text-sm">
                      <span className="text-terminal-prompt">$</span>
                      <span>{`ls ./projects/${dir}`}</span>
                    </div>
                    <p className="text-terminal-fg-muted text-sm">
                      {sectionProjects.length} {PROJECT_CATEGORY_LABELS[category].toLowerCase()}{' '}
                      {sectionProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                  </FadeInSection>

                  <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sectionProjects.map((project) => (
                      <StaggerItem key={project.id}>
                        <ProjectCard
                          project={project}
                          onClick={() => navigate(`/projects/${project.slug}`)}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-16 md:py-24 border-b border-(--border-terminal) bg-terminal-bg-alt">
        <div className="max-w-(--terminal-max) mx-auto px-4">
          <FadeInSection>
            <div className="mb-8 font-mono text-sm">
              <span className="text-terminal-prompt">$</span>
              <span className="ml-2">cat experience.md</span>
            </div>
            <h2 className="text-terminal-fg text-xl sm:text-2xl mb-8 font-mono"># Experience</h2>
            <ExperienceTimeline />
          </FadeInSection>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24">
        <div className="max-w-(--terminal-max) mx-auto px-4">
          <FadeInSection>
            <div className="terminal-window">
              <div className="terminal-body">
                <div className="mb-6 text-sm sm:text-base font-mono">
                  <span className="text-terminal-prompt">$</span>
                  <span className="ml-2">cat about.md</span>
                </div>

                <div className="space-y-4 sm:space-y-6 max-w-(--content-max)">
                  <h2 className="text-terminal-fg text-xl sm:text-2xl md:text-3xl font-mono"># About Me</h2>
                  <p className="text-terminal-fg-muted leading-relaxed text-sm sm:text-base">{summaryAbout}</p>

                  <div className="pt-4 border-t border-(--border-terminal)">
                    <h3 className="text-terminal-fg mb-4 font-mono">## Skills</h3>
                    <SkillsAccordion />
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 border-t border-(--border-terminal)">
        <div className="max-w-(--terminal-max) mx-auto px-4">
          <FadeInSection className="text-center max-w-(--content-max) mx-auto">
            <div className="mb-6 text-sm sm:text-base font-mono">
              <span className="text-terminal-prompt">$</span>
              <span className="ml-2">./contact --send-message</span>
            </div>

            <h2 className="text-terminal-fg mb-4 text-xl sm:text-2xl md:text-3xl font-mono">
              Let&apos;s build something
            </h2>
            <p className="text-terminal-fg-muted mb-8 leading-relaxed text-sm sm:text-base">
              {profile.availability}. I&apos;d love to hear about roles, collaborations, or interesting builds.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-3 min-h-11 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-fg transition-colors text-sm sm:text-base font-mono break-all sm:break-normal"
              >
                {profile.email}
              </a>
              <CopyEmailButton />
              <a
                href={resumePdf}
                download="Tiwalade-Adegoke-Resume.pdf"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-3 min-h-11 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base font-mono"
              >
                ↓ resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-3 min-h-11 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base font-mono"
              >
                GitHub
              </a>
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 sm:px-6 py-3 min-h-11 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base font-mono"
              >
                LinkedIn
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}
