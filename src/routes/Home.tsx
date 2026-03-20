import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Seo } from '@/components/seo/Seo'
import { getAllProjects } from '@/lib/projects'
import { FadeInSection, StaggerContainer, StaggerItem } from '@/components/FadeInSection'
import { TiltCard } from '@/components/TiltCard'
import { MagneticButton } from '@/components/MagneticButton'
import { Typewriter } from '@/components/Typewriter'
import { CodeSnippet } from '@/components/CodeSnippet'
import resumePdf from '@/assets/TIWALADE-ADEGOKE-Resume.pdf'

export function Home() {
  const navigate = useNavigate()
  const projects = getAllProjects()

  return (
    <>
      <Seo
        title="Tiwalade Adegoke | Fullstack Engineer"
        description="Fullstack Engineer building scalable web applications across frontend and backend systems. Strong in React, TypeScript, ASP.NET, and modern UI development."
      />

      <section className="max-w-(--terminal-max) mx-auto px-4 py-16 md:py-24 relative">
        <div 
          className="absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-terminal-prompt/20 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -top-5 md:-top-10 left-1/4 md:left-1/3 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-(--syntax-function)/15 rounded-full blur-3xl pointer-events-none" 
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
                <h1 className="text-terminal-fg mb-4 text-2xl sm:text-3xl md:text-4xl">
                  <Typewriter text="Tiwalade Adegoke" speed={80} delay={300} showCursorAfterComplete />
                </h1>
                <p className="text-base sm:text-lg mb-2">
                  <span className="bg-linear-to-r from-(--syntax-function) via-terminal-prompt to-(--syntax-string) bg-clip-text text-transparent font-semibold">
                    Fullstack Engineer
                  </span>
                </p>
                <p className="text-terminal-fg-muted max-w-2xl leading-relaxed text-sm sm:text-base md:text-lg">
                  I build scalable web applications across frontend and backend systems. 
                  Strong in React, TypeScript, ASP.NET, and modern UI development — with hands-on 
                  experience designing RESTful APIs, managing relational databases, and implementing 
                  secure authentication. Type <span className="text-(--syntax-string)">`help`</span> to explore, 
                  or scroll to browse the GUI way.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                <MagneticButton
                  as="a"
                  href="#projects"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-terminal-prompt text-terminal-prompt rounded hover:bg-terminal-prompt hover:text-terminal-bg transition-colors"
                >
                  <span>→</span> view projects
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#about"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors"
                >
                  <span>→</span> about me
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
                <div className="mb-6 text-sm sm:text-base">
                  <span className="text-terminal-prompt">$</span>
                  <span className="ml-2">cat about.md</span>
                </div>
                
                <div className="space-y-4 sm:space-y-6 max-w-(--content-max)">
                  <h2 className="text-terminal-fg text-xl sm:text-2xl md:text-3xl">
                    # About Me
                  </h2>
                  <p className="text-terminal-fg-muted leading-relaxed text-sm sm:text-base">
                    Fullstack Engineer with 2+ years experience building scalable web applications across frontend and backend systems.
                    I've shipped production code across different domains — from a real bakery ordering platform with its own backend infrastructure,
                    to fintech platforms handling live transactions, e-learning systems, and physics-based games.
                    Strong in React, TypeScript, ASP.NET, and modern UI development.
                  </p>
                  <p className="text-terminal-fg-muted leading-relaxed text-sm sm:text-base">
                    I thrive in collaborative environments, enjoy owning features end-to-end — from API design to polished UI — 
                    and care deeply about code quality, security, and user experience. Based in Nigeria, open to remote opportunities worldwide.
                  </p>
                  
                  <div className="pt-4 border-t border-(--border-terminal)">
                    <h3 className="text-terminal-fg mb-6">## Skills</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill) => (
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
                      <h4 className="text-(--syntax-function) text-sm mb-3 font-semibold">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        {['C# ASP.NET Core', 'Node.js', 'PHP (Laravel)', 'SQL', 'PostgreSQL', 'RESTful API Design', 'JWT', 'RBAC'].map((skill) => (
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
                        {['Redux Toolkit', 'Zustand', 'TanStack Query', 'Axios', 'REST APIs'].map((skill) => (
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
                        {['Git', 'GitHub', 'Firebase', 'Figma', 'Chrome DevTools', 'Vercel', 'Docker', 'Vite', 'Cursor', 'GitHub Copilot'].map((skill) => (
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
                        {['Jest', 'Vitest', 'React Testing Library', 'Cypress', 'NUnit'].map((skill) => (
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
                        {['Component Architecture', 'SOLID Principles', 'Responsive Design', 'Accessibility', 'Performance Optimization', 'Role-Based Access Control'].map((skill) => (
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
            <div className="mb-6 text-sm sm:text-base">
              <span className="text-terminal-prompt">$</span>
              <span className="ml-2">./contact --send-message</span>
            </div>
            
            <h2 className="text-terminal-fg mb-4 text-xl sm:text-2xl md:text-3xl">
              Let's Build Something
            </h2>
            <p className="text-terminal-fg-muted mb-8 leading-relaxed text-sm sm:text-base">
              I'm always interested in hearing about new projects, opportunities, 
              or just chatting about the web. Drop me a line.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:tiwatide23@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-fg transition-colors text-sm sm:text-base"
              >
                tiwatide23@gmail.com
              </a>
              <a
                href={resumePdf}
                download="Tiwalade-Adegoke-Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base"
              >
                ↓ Resume
              </a>
              <a
                href="https://github.com/TrentonFunt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tiwalade-adegoke"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border border-(--border-terminal) text-terminal-fg-muted rounded hover:border-terminal-fg hover:text-terminal-fg transition-colors text-sm sm:text-base"
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
