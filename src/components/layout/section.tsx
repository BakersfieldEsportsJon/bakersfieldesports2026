import { cn } from "@/lib/utils"

interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24", className)}
    >
      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="font-orbitron text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
