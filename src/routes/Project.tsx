import { useParams, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/seo/Seo'
import { BackendFlowDiagram } from '@/components/BackendFlowDiagram'
import {
  getProjectBySlug,
  getAllProjects,
  PROJECT_CATEGORY_LABELS,
} from '@/lib/projects'
import { getProjectStatusLabel, projectCardBlurb } from '@/lib/project-display'
import { NotFound } from '@/routes/NotFound'

export function Project() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const project = slug ? getProjectBySlug(slug) : undefined
  const allProjects = getAllProjects()

  if (!project) {
    return <NotFound />
  }

  const statusLabel = getProjectStatusLabel(project)
  const heroBlurb =
    project.category === 'backend' ? projectCardBlurb(project) : project.shortDescription

  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .concat(allProjects.filter((p) => p.id !== project.id && p.category !== project.category))
    .slice(0, 3)

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        image={project.image}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <section className="w-full border-b border-(--border-terminal)">
          <div className="max-w-(--terminal-max) mx-auto px-4 py-8 sm:py-12 md:py-20">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-6 sm:mb-8 border border-(--border-terminal) bg-transparent text-terminal-fg-muted hover:bg-terminal-prompt hover:text-terminal-bg hover:border-terminal-prompt rounded-lg transition-colors text-sm sm:text-base"
            >
              ← Back to Work
            </Button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs sm:text-sm font-semibold text-(--syntax-function) uppercase tracking-wider mb-3">
                {PROJECT_CATEGORY_LABELS[project.category]}
              </p>
              <h1 className="mb-2 text-terminal-fg text-2xl sm:text-3xl md:text-4xl">{project.title}</h1>
              <p className="text-base sm:text-lg text-terminal-fg-muted max-w-2xl mb-6 sm:mb-8 leading-relaxed">
                {heroBlurb}
              </p>

              {/* Project Meta */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-(--border-terminal)">
                {project.category !== 'backend' && (
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-1 sm:mb-2">
                      Year
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-terminal-fg">{project.year}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-1 sm:mb-2">
                    Role
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-terminal-fg">{project.role || 'Fullstack Engineer'}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-1 sm:mb-2">
                    Status
                  </p>
                  <Badge className="bg-transparent text-(--syntax-variable) border border-(--syntax-variable) rounded-full text-xs sm:text-sm px-3 py-1 font-mono">
                    {statusLabel}
                  </Badge>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-3 sm:mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className="border border-(--border-terminal) bg-transparent text-terminal-fg rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {project.image && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="max-w-(--terminal-max) mx-auto px-4 py-8 sm:py-12">
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-lg border border-(--border-terminal) shadow-2xl object-cover h-48 sm:h-72 md:h-96 lg:h-125"
              />
            </div>
          </motion.section>
        )}

        {/* Project Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-terminal-bg-alt py-12 sm:py-16 md:py-24 border-y border-(--border-terminal)"
        >
          <div className="max-w-(--content-max) mx-auto px-4">
            {project.category === 'backend' ? (
              <>
                <BackendFlowDiagram slug={project.slug} />
                {project.problem && (
                  <div className="mb-10">
                    <h2 className="mb-4 text-terminal-fg text-xl sm:text-2xl">The problem</h2>
                    <p className="text-base sm:text-lg text-terminal-fg-muted leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.built && project.built.length > 0 && (
                  <div className="mb-10">
                    <h2 className="mb-4 text-terminal-fg text-xl sm:text-2xl">What I built</h2>
                    <ul className="space-y-3 text-terminal-fg-muted text-base sm:text-lg leading-relaxed list-disc pl-5">
                      {project.built.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.concepts && project.concepts.length > 0 && (
                  <div className="mb-10">
                    <h2 className="mb-4 text-terminal-fg text-xl sm:text-2xl">Concepts</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.concepts.map((concept) => (
                        <Badge
                          key={concept}
                          className="border border-(--border-terminal) bg-transparent text-terminal-fg-muted rounded-full px-3 py-1 text-sm"
                        >
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.impact && project.impact.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-terminal-fg text-xl sm:text-2xl">Impact</h2>
                    <ul className="space-y-3 text-terminal-fg-muted text-base sm:text-lg leading-relaxed list-disc pl-5">
                      {project.impact.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="mb-4 sm:mb-6 text-terminal-fg text-xl sm:text-2xl md:text-3xl">
                  Project Overview
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-terminal-fg-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </>
            )}

            {/* CTA */}
            {project.url && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-(--border-terminal)">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto font-bold rounded-lg bg-terminal-prompt text-terminal-bg hover:bg-terminal-fg hover:text-terminal-bg transition-colors">
                    View Live Project →
                  </Button>
                </a>
              </div>
            )}
          </div>
        </motion.section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-12 sm:py-16 md:py-24"
          >
            <div className="max-w-(--terminal-max) mx-auto px-4">
              <h2 className="mb-8 sm:mb-12 text-terminal-fg text-xl sm:text-2xl md:text-3xl">More Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {relatedProjects.map((relatedProject) => (
                  <motion.div
                    key={relatedProject.id}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => navigate(`/projects/${relatedProject.slug}`)}
                    className="cursor-pointer group"
                  >
                    {relatedProject.image ? (
                      <div className="mb-3 sm:mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg border border-(--border-terminal)"
                        />
                      </div>
                    ) : (
                      <div className="mb-3 sm:mb-4 h-40 sm:h-48 rounded-lg border border-(--border-terminal) bg-terminal-bg-alt px-4 py-5 flex items-center">
                        <p className="text-terminal-fg-muted text-sm line-clamp-4">
                          {relatedProject.shortDescription}
                        </p>
                      </div>
                    )}
                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-terminal-fg group-hover:text-terminal-prompt transition-colors">{relatedProject.title}</h3>
                    <p className="text-terminal-fg-muted text-sm">{relatedProject.shortDescription}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </>
  )
}
