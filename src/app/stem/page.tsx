import type { Metadata } from "next"
import Link from "next/link"
import {
  GraduationCap,
  Code,
  Cpu,
  Video,
  BarChart3,
  Users,
  School,
  BookOpen,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { stemInfo } from "@/data/stem"

export const metadata: Metadata = {
  title: "STEM Programs | Bakersfield eSports Center",
  description:
    "BEC offers STEM education programs including Game Design, PC Building, Streaming & Content Creation, and Esports Analytics. Partnered with Valley Strong Credit Union.",
}

const programIcons: Record<string, React.ElementType> = {
  "game-design": Code,
  "pc-building": Cpu,
  "streaming-content": Video,
  "esports-analytics": BarChart3,
}

const impactStats = [
  { value: "1,000+", label: "Students Reached", icon: Users },
  { value: "15+", label: "School Partnerships", icon: School },
  { value: "30+", label: "Programs Delivered", icon: BookOpen },
]

export default function STEMPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <GraduationCap className="mr-1 h-3 w-3" />
            Education
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {stemInfo.title.split(" ").slice(0, 1).join(" ")}{" "}
            <span className="text-red-400">
              {stemInfo.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            {stemInfo.overview}
          </p>
          <div className="mt-6">
            <Badge variant="outline" className="text-sm">
              In partnership with {stemInfo.partner}
            </Badge>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Our Programs
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {stemInfo.programs.map((program) => {
              const Icon = programIcons[program.id] || GraduationCap
              return (
                <Card
                  key={program.id}
                  className="border-border/50 transition-colors hover:border-red-500/30"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="mb-3 text-sm font-semibold text-red-400">
                      What Students Learn
                    </h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Our Impact
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {impactStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/20">
                    <Icon className="h-7 w-7 text-red-400" />
                  </div>
                  <div className="font-orbitron text-4xl font-bold text-red-400">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
            Through our partnership with Valley Strong Credit Union, we have been
            able to bring STEM education programs to schools and community
            organizations across the Central Valley, using gaming and esports as
            an engaging entry point to build critical technology skills.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-card to-red-950/20 p-8 sm:p-12">
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <h2 className="font-orbitron text-3xl font-bold">
              {stemInfo.callToAction.text}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {stemInfo.callToAction.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us to Enroll
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+16615297447">
                  <Phone className="mr-2 h-4 w-4" />
                  (661) 529-7447
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
