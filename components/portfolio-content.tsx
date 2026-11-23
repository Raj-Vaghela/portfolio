"use client"

import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, ExternalLink, GraduationCap, LayoutGrid, UserRound } from "lucide-react"
import type { Ref } from "react"
import { PortfolioCard } from "@/components/portfolio-card"
import { ProfileLink, ProjectLinks, ProjectSourceStatus } from "@/components/profile-link"
import { currentWork, profile, projects } from "@/lib/profile"
import { raykdi } from "@/lib/freelance"

interface PortfolioContentProps {
    onOpenProjectsModal: () => void
    mobile?: boolean
    projectsButtonRef?: Ref<HTMLButtonElement>
}

export function PortfolioContent({ onOpenProjectsModal, mobile = false, projectsButtonRef }: PortfolioContentProps) {
    const idPrefix = mobile ? "mobile-" : ""

    return (
        <>
            {/* Me Section */}
            <section id={idPrefix + "me"} className="portfolio-content-section">
                <div>
                    <h2 className="portfolio-section-heading">
                        <UserRound aria-hidden="true" />
                        About
                    </h2>
                    <PortfolioCard wallpaper={mobile} className={`portfolio-about space-y-4${mobile ? " portfolio-company-about" : ""}`}>
                        {mobile && (
                            <div className="portfolio-company-context">
                                <span className="portfolio-company-context-dot" aria-hidden="true" />
                                <span>Currently building at <strong>{profile.employer}</strong></span>
                                <a className="portfolio-company-context-arrow" href="https://kordinlabs.io/" target="_blank" rel="noopener noreferrer" aria-label="Visit Kordin Labs website">↗</a>
                            </div>
                        )}
                        <p className="dark:text-white text-gray-800 text-lg leading-relaxed">
                            I&apos;m an <span className="dark:text-white text-black font-semibold">{profile.role} at {profile.employer}</span> and an MSc Advanced Computer Science graduate from the University of Leicester (Distinction),
                            specializing in applied AI and Large Language Models.
                        </p>
                        <p className="dark:text-white text-gray-900 text-base leading-relaxed">
                            I build <span className="dark:text-white text-black font-medium">retrieval-augmented systems</span> with embeddings and pgvector,
                            robust <span className="dark:text-white text-black font-medium">FastAPI/Node back ends</span>, and modern <span className="dark:text-white text-black font-medium">React/Next.js UIs</span>.
                            I&apos;m comfortable with multimodal STT/TTS/OCR, function calling, and streaming UX. Strong in Python and
                            software engineering fundamentals. I ship testable services with telemetry, retries, and graceful shutdowns.
                        </p>
                        <p className="dark:text-white text-gray-900 text-base leading-relaxed">
                            At {profile.employer}, I build features across the frontend and backend, from interfaces to APIs, and review code with both teams.
                        </p>

                        <div className="portfolio-about-facts">
                            <div className="portfolio-about-fact">
                                <div className="dark:text-white text-gray-800 text-sm mb-1">Location</div>
                                <div className="dark:text-white text-black font-medium">Leicester, UK</div>
                            </div>
                            <div className="portfolio-about-fact">
                                <div className="dark:text-white text-gray-800 text-sm mb-1">Status</div>
                                <div className="dark:text-white text-black font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    {profile.role} at {profile.employer}
                                </div>
                            </div>
                        </div>
                    </PortfolioCard>
                </div>
            </section>

            {/* Experience Section */}
            <section id={idPrefix + "experience"} className="portfolio-content-section">
                <div>
                    <h2 className="portfolio-section-heading">
                        <BriefcaseBusiness aria-hidden="true" />
                        Experience
                    </h2>
                    <div className="portfolio-content-stack">
                        <PortfolioCard wallpaper={mobile} className={mobile ? "portfolio-company-feature" : undefined}>
                            {mobile && (
                                <>
                                    <div className="portfolio-company-watermark" aria-hidden="true">KORDIN</div>
                                    <div className="portfolio-company-grid" aria-hidden="true" />
                                    <div className="portfolio-company-feature-top">
                                        <span>01 / CURRENTLY BUILDING</span>
                                        <span className="portfolio-company-feature-label">KORDIN LABS · LONDON</span>
                                    </div>
                                </>
                            )}
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="text-2xl font-bold dark:text-white text-gray-800">{profile.employer}</h3>
                                        <ProfileLink href="https://kordinlabs.io/" label="Website" description="Visit the Kordin Labs website" />
                                        <ProfileLink href="https://uk.linkedin.com/company/kordinlabs" label="LinkedIn" description="View Kordin Labs on LinkedIn" />
                                    </div>
                                    <p className="dark:text-white text-gray-900 text-lg">{profile.role}</p>
                                </div>
                                <span className="dark:text-white text-gray-800 text-sm whitespace-nowrap">{profile.roleStart} to present</span>
                            </div>
                            <p className="dark:text-white text-gray-800 text-sm mb-4">Remote, UK</p>
                            {mobile && (
                                <div className="portfolio-company-feature-context">
                                    <span>AI infrastructure</span><span>Multi-cloud</span><span>Product engineering</span>
                                </div>
                            )}
                            <ul className="space-y-2 mt-4">
                                {currentWork.map((item) => (
                                    <li key={item} className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                        <span className="dark:text-white text-gray-800">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </PortfolioCard>

                        {/* IBM */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="text-2xl font-bold dark:text-white text-gray-800">IBM</h3>
                                        <ProfileLink href="https://www.linkedin.com/company/ibm/" label="LinkedIn" description="View IBM on LinkedIn" />
                                    </div>
                                    <p className="dark:text-white text-gray-900 text-lg">Virtual Intern</p>
                                </div>
                                <span className="dark:text-white text-gray-800 text-sm whitespace-nowrap">Jun 2023 – Jul 2023</span>
                            </div>
                            <ul className="space-y-2 mt-4">
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Prototyped data cleaning & visualisation in Python, cutting exploratory cycle time by ~30% on sample datasets.</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Evaluated classical ML models (precision/recall/AUC) and documented trade-offs for baseline selection.</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Automated preprocessing (imputation/encoding/scaling) into reusable snippets for consistency across notebooks.</span>
                                </li>
                            </ul>
                        </PortfolioCard>

                        {/* Microsoft */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="text-2xl font-bold dark:text-white text-gray-800">Microsoft</h3>
                                        <ProfileLink href="https://www.linkedin.com/company/microsoft/" label="LinkedIn" description="View Microsoft on LinkedIn" />
                                    </div>
                                    <p className="dark:text-white text-gray-900 text-lg">Virtual Intern</p>
                                </div>
                                <span className="dark:text-white text-gray-800 text-sm whitespace-nowrap">Apr 2023 – Jun 2023</span>
                            </div>
                            <p className="dark:text-white text-gray-900 text-base mb-3">AICTE approved Virtual Internship under the Future Ready Talent initiative</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Explored Azure (Static Web Apps, Front Door, CDN) and deployed sample apps with CI/CD from GitHub (100% green builds).</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Practised Git/GitHub workflows (branching, PR reviews, issues), reducing merge conflicts on small team projects.</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Built mini-demos connecting Azure front ends to simple APIs with notes on cost, latency, reliability trade-offs.</span>
                                </li>
                            </ul>
                        </PortfolioCard>

                        {/* Direction Infosystems */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="text-2xl font-bold dark:text-white text-gray-800">Direction Infosystems</h3>
                                        <ProfileLink href="https://in.linkedin.com/company/direction-infosystems" label="LinkedIn" description="View Direction Infosystems on LinkedIn" />
                                    </div>
                                    <p className="dark:text-white text-gray-900 text-lg">Intern</p>
                                </div>
                                <span className="dark:text-white text-gray-800 text-sm whitespace-nowrap">Jan 2023 – Apr 2023</span>
                            </div>
                            <p className="dark:text-white text-gray-800 text-sm mb-4">Bardoli</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Built and maintained websites using PHP, Laravel, MySQL, Bootstrap, and jQuery in a team setting.</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Assisted in UI design and code deployment, ensuring smooth handover and compatibility with in-house tools.</span>
                                </li>
                            </ul>
                        </PortfolioCard>

                        {/* Elsner Technologies */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <h3 className="text-2xl font-bold dark:text-white text-gray-800">Elsner Technologies Pvt. Ltd.</h3>
                                        <ProfileLink href="https://uk.linkedin.com/company/elsner-technology-pvt--ltd-" label="LinkedIn" description="View Elsner Technologies on LinkedIn" />
                                    </div>
                                    <p className="dark:text-white text-gray-900 text-lg">Summer Internship</p>
                                </div>
                                <span className="dark:text-white text-gray-800 text-sm whitespace-nowrap">Jun 2022 – Jul 2022</span>
                            </div>
                            <p className="dark:text-white text-gray-800 text-sm mb-4">Ahmedabad</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Developed a basic Android-based To-Do list app using Java.</span>
                                </li>
                                <li className="flex gap-2 dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-gray-800">•</span>
                                    <span>Completed foundational coding tasks while gaining exposure to agile teamwork and app development principles.</span>
                                </li>
                            </ul>
                        </PortfolioCard>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id={idPrefix + "projects"} className="portfolio-content-section">
                <div>
                    <h2 className="portfolio-section-heading">
                        <LayoutGrid aria-hidden="true" />
                        Project highlights
                    </h2>
                    <div className="portfolio-content-stack">
                        <PortfolioCard wallpaper={mobile} className="portfolio-freelance-feature">
                            <p className="portfolio-card-accent text-sm font-medium">Freelance portfolio</p>
                            <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{raykdi.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-800 dark:text-white/80">{raykdi.summary}</p>
                            <Link
                                href={"/freelance#" + raykdi.id}
                                className="portfolio-secondary mt-4 inline-flex"
                            >
                                View case study
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Link>
                        </PortfolioCard>

                        <div className="portfolio-project-grid">
                            {projects.map((project) => (
                                <PortfolioCard wallpaper={mobile} key={project.title} className="flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-lg font-bold dark:text-white text-gray-800">{project.title}</h4>
                                        <ProjectLinks project={project} />
                                    </div>
                                    <p className="text-xs dark:text-white/70 text-gray-700 mb-2">{project.context}</p>
                                    <p className="dark:text-white text-gray-900 text-sm mb-auto">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/30 dark:bg-white/10 dark:text-white text-gray-800 text-xs border border-white/50 dark:border-transparent">{tag}</span>
                                        ))}
                                    </div>
                                    <ProjectSourceStatus project={project} />
                                </PortfolioCard>
                            ))}
                        </div>

                        {/* View All Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                ref={projectsButtonRef}
                                onClick={onOpenProjectsModal}
                                className="portfolio-secondary"
                            >
                                <span className="dark:text-white text-gray-800 font-medium">View All Projects</span>
                                <ExternalLink className="w-4 h-4 dark:text-white text-gray-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id={idPrefix + "education"} className="portfolio-content-section">
                <div>
                    <h2 className="portfolio-section-heading">
                        <GraduationCap aria-hidden="true" />
                        Education
                    </h2>
                    <div className="portfolio-content-stack">
                        {/* Master's Degree */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">Master of Science (M.Sc.)</h3>
                                    <p className="dark:text-white text-gray-900 text-lg">Advanced Computer Science</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/30">
                                    <span className="dark:text-white text-gray-800 text-sm font-medium">Distinction</span>
                                </div>
                            </div>
                            <p className="dark:text-white text-gray-900 text-base mb-3">University of Leicester, UK</p>
                            <p className="dark:text-white text-gray-800 text-sm mb-4">Jan 2024 – Jul 2025</p>
                            <div className="space-y-2">
                                <p className="dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-black font-medium">Key modules:</span> Big Data & Predictive Analytics, C++, Cybersecurity, Technology & Innovation Management
                                </p>
                            </div>
                        </PortfolioCard>

                        {/* Bachelor's Degree */}
                        <PortfolioCard wallpaper={mobile}>
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">Bachelor of Engineering (B.E.)</h3>
                                    <p className="dark:text-white text-gray-900 text-lg">Computer Science & Engineering</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/30">
                                    <span className="dark:text-white text-gray-800 text-sm font-medium">8.55/10 (85.5%)</span>
                                </div>
                            </div>
                            <p className="dark:text-white text-gray-900 text-base mb-3">S.N. Patel Institute of Technology & Research Centre, India</p>
                            <p className="dark:text-white text-gray-800 text-sm mb-4">Jun 2019 – Jun 2023</p>
                            <div className="space-y-2">
                                <p className="dark:text-white text-gray-900 text-sm">
                                    <span className="dark:text-white text-black font-medium">Key modules:</span> Artificial Intelligence, Computer Networks, Data Mining, Machine Learning, Software Engineering
                                </p>
                            </div>
                        </PortfolioCard>

                        {/* Highlights & Awards */}
                        <PortfolioCard wallpaper={mobile}>
                            <h4 className="text-lg font-bold dark:text-white text-gray-800 mb-4">Highlights & Awards</h4>
                            <div className="grid gap-3">
                                <div className="flex gap-3">
                                    <span className="text-yellow-400 mt-0.5">🏆</span>
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">Huawei Tech Arena</span> — Finalist (Top 8/100+ teams)</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-yellow-400 mt-0.5">🥉</span>
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">Cyber4Me CTF</span> — 3rd place (University of Wolverhampton)</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-blue-400 mt-0.5">🎯</span>
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">Encode AI London &apos;25</span> — &quot;Crypto Radio&quot;</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-purple-400 mt-0.5">👥</span>
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">University leadership:</span> Peer Mentor, Course Rep, Leicester 100 (policy review for 10,000+ students)</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-green-400 mt-0.5">🎓</span>
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">Scholarships:</span> MYSY Merit Scholarship, State Aptitude Test Winner</p>
                                </div>
                            </div>
                        </PortfolioCard>
                    </div>
                </div>
            </section>
        </>
    )
}
