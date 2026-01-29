import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/seo/Seo'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { NotFound } from '@/routes/NotFound'

export function Project() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = slug ? getProjectBySlug(slug) : undefined
  const allProjects = getAllProjects()

  if (!project) {
    return <NotFound />
  }

  // Get related projects (all except current)
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3)

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
          <div className="max-w-(--terminal-max) mx-auto px-4 py-12 md:py-20">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-8 border border-(--border-terminal) bg-transparent text-terminal-fg-muted hover:bg-terminal-prompt hover:text-terminal-bg hover:border-terminal-prompt rounded-lg transition-colors"
            >
              ← Back to Work
            </Button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="mb-4 text-terminal-fg">{project.title}</h1>
              <p className="text-xl md:text-2xl text-terminal-fg-muted max-w-2xl mb-8">
                {project.shortDescription}
              </p>

              {/* Project Meta */}
              <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-(--border-terminal)">
                <div>
                  <p className="text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-2">
                    Year
                  </p>
                  <p className="text-2xl font-bold text-terminal-fg">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-2">
                    Role
                  </p>
                  <p className="text-2xl font-bold text-terminal-fg">{project.role || 'Frontend Developer'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-2">
                    Status
                  </p>
                  <Badge className="bg-transparent text-(--syntax-variable) border border-(--syntax-variable) rounded-full text-sm px-3 py-1">
                    Completed
                  </Badge>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-sm font-semibold text-terminal-fg-muted uppercase tracking-wider mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      className="border border-(--border-terminal) bg-transparent text-terminal-fg rounded-full px-4 py-2 text-sm font-semibold hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Image */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <div className="max-w-(--terminal-max) mx-auto px-4 py-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-lg border border-(--border-terminal) shadow-2xl object-cover h-96 md:h-125"
            />
          </div>
        </motion.section>

        {/* Project Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-terminal-bg-alt py-16 md:py-24 border-y border-(--border-terminal)"
        >
          <div className="max-w-(--content-max) mx-auto px-4">
            <h2 className="mb-6 text-terminal-fg">Project Overview</h2>
            <div className="space-y-6">
              <p className="text-lg text-terminal-fg-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* CTA */}
            {project.url && (
              <div className="mt-12 pt-8 border-t border-(--border-terminal)">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="text-lg px-8 py-6 h-auto font-bold rounded-lg bg-terminal-prompt text-terminal-bg hover:bg-terminal-fg hover:text-terminal-bg transition-colors">
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
            className="py-16 md:py-24"
          >
            <div className="max-w-(--terminal-max) mx-auto px-4">
              <h2 className="mb-12 text-terminal-fg">More Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <motion.div
                    key={relatedProject.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => navigate(`/projects/${relatedProject.slug}`)}
                    className="cursor-pointer group"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg border border-(--border-terminal)"
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-terminal-fg group-hover:text-terminal-prompt transition-colors">{relatedProject.title}</h3>
                    <p className="text-terminal-fg-muted">{relatedProject.shortDescription}</p>
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
