import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/seo/Seo'
import { getAllProjects } from '@/lib/projects'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/FadeInSection'
import { TiltCard } from '@/components/TiltCard'
import { MagneticButton } from '@/components/MagneticButton'
import { Typewriter } from '@/components/Typewriter'
import { CodeSnippet } from '@/components/CodeSnippet'

export function Home() {
  const navigate = useNavigate()
  const projects = getAllProjects()

  return (
    <>
      <Seo
        title="Tiwalade Adegoke | Frontend Developer"
        description="Frontend Developer building fast, accessible web applications with React and TypeScript. Experienced in complex state management and scalable component architecture."
      />

      <section className="max-w-(--terminal-max) mx-auto px-4 py-16 md:py-24 relative">
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-terminal-prompt/20 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -top-10 left-1/3 w-64 h-64 bg-(--syntax-function)/15 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        
        <FadeInSection>
          <div className="terminal-window relative overflow-hidden border-terminal-prompt/30 shadow-[0_0_60px_-15px_var(--terminal-prompt)]">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-terminal-prompt to-transparent" aria-hidden="true" />
            
            <div className="absolute top-4 right-4 hidden md:block opacity-50 pointer-events-none" aria-hidden="true">
              <CodeSnippet delay={2000} />
            </div>
            
            <div className="terminal-body relative z-10">
              <div className="mb-6">
                <span className="text-terminal-prompt">visitor@portfolio</span>
                <span className="text-terminal-fg-muted">:</span>
                <span className="text-(--syntax-function)">~</span>
                <span className="text-terminal-fg-muted">$</span>
                <span className="ml-2">whoami</span>
              </div>
              
              <div className="mb-8 pl-0">
                <h1 className="text-terminal-fg mb-4">
                  <Typewriter text="Tiwalade Adegoke" speed={80} delay={300} showCursorAfterComplete />
                </h1>
                <p className="text-lg mb-2">
                  <span className="bg-linear-to-r from-(--syntax-function) via-terminal-prompt to-(--syntax-string) bg-clip-text text-transparent font-semibold">
                    Frontend Developer
                  </span>
                </p>
                <p className="text-terminal-fg-muted max-w-2xl leading-relaxed text-lg">
                  I build fast, accessible web applications with React and TypeScript. 
                  Strong focus on clean architecture, state management, and delivering 
                  polished user experiences. Type <span className="text-(--syntax-string)">`help`</span> to explore, 
                  or scroll to browse the GUI way.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <MagneticButton
                  as="a"
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-terminal-prompt text-terminal-prompt rounded hover:bg-terminal-prompt hover:text-terminal-bg transition-colors"
                >
                  <span>→</span> view projects
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#about"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
                >
                  <span>→</span> about me
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
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
          <FadeInSection className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-terminal-prompt">$</span>
              <span>ls -la ./projects</span>
            </div>
            <p className="text-terminal-fg-muted">
              total {projects.length} projects
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <TiltCard
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="group cursor-pointer p-6 rounded-lg border border-(--border-terminal) bg-terminal-bg-alt hover:border-terminal-prompt transition-colors"
                >
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded bg-terminal-bg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-terminal-fg group-hover:text-terminal-prompt transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-terminal-fg-muted whitespace-nowrap">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-terminal-fg-muted text-sm mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-(--border-terminal) bg-transparent text-terminal-fg-muted rounded-sm px-2 py-0.5 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="outline"
                        className="border-(--border-terminal) bg-transparent text-terminal-fg-muted rounded-sm px-2 py-0.5 text-xs"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24">
        <div className="max-w-(--terminal-max) mx-auto px-4">
          <FadeInSection>
            <div className="terminal-window">
              <div className="terminal-body">
                <div className="mb-6">
                  <span className="text-terminal-prompt">$</span>
                  <span className="ml-2">cat about.md</span>
                </div>
                
                <div className="space-y-6 max-w-(--content-max)">
                  <h2 className="text-terminal-fg">
                    # About Me
                  </h2>
                  <p className="text-terminal-fg-muted leading-relaxed">
                    Frontend Developer with a passion for building intuitive, performant web applications. 
                    I've shipped production code across different domains—from fintech platforms handling real transactions 
                    to interactive learning systems and even physics-based games. What stays constant is my focus on 
                    clean component architecture, predictable state management, and pixel-perfect UI.
                  </p>
                  <p className="text-terminal-fg-muted leading-relaxed">
                    I thrive in collaborative environments, enjoy owning features end-to-end, and care deeply about 
                    code quality and user experience. Based in Nigeria, open to remote opportunities worldwide.
                  </p>
                  
                  <div className="pt-4 border-t border-(--border-terminal)">
                    <h3 className="text-terminal-fg mb-6">## Skills</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">State & Data</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Redux', 'Zustand', 'TanStack Query', 'Axios', 'REST APIs', 'JWT Auth'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Git', 'GitHub', 'Firebase', 'Figma', 'Chrome DevTools', 'Vercel'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Testing</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Jest', 'Vitest', 'React Testing Library', 'Cypress'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Core Concepts</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Component Architecture', 'Responsive Design', 'Accessibility', 'Performance Optimization', 'Role-Based Access'].map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-sm border border-(--border-terminal) rounded text-(--syntax-variable) hover:border-terminal-prompt hover:text-terminal-prompt transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
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
            <div className="mb-6">
              <span className="text-terminal-prompt">$</span>
              <span className="ml-2">./contact --send-message</span>
            </div>
            
            <h2 className="text-terminal-fg mb-4">
              Let's Build Something
            </h2>
            <p className="text-terminal-fg-muted mb-8 leading-relaxed">
              I'm always interested in hearing about new projects, opportunities, 
              or just chatting about the web. Drop me a line.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:tiwatide23@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-fg transition-colors"
              >
                tiwatide23@gmail.com
              </a>
              <a
                href="/TIWALADE-ADEGOKE-Resume.pdf"
                download="Tiwalade-Adegoke-Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
              >
                ↓ Resume
              </a>
              <a
                href="https://github.com/TrentonFunt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tiwalade-adegoke"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
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
