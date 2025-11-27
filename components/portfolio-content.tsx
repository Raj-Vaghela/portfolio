"use client"

import { Github, ExternalLink } from "lucide-react"

interface PortfolioContentProps {
    onOpenProjectsModal: () => void
}

export function PortfolioContent({ onOpenProjectsModal }: PortfolioContentProps) {
    return (
        <div className="lg:flex lg:flex-row lg:h-full lg:items-center">
            {/* Me Section */}
            <section id="me" className="min-h-[600px] lg:min-w-[100vw] lg:w-[100vw] lg:h-full flex items-center justify-center p-8 md:p-12 lg:flex-shrink-0">
                <div className="max-w-2xl w-full">
                    <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-black uppercase mb-6">About Me</h2>
                    <div className="space-y-4">
                        <p className="dark:text-white text-black text-base lg:text-lg leading-relaxed font-bold">
                            I'm an <span className="dark:text-white text-black font-black">MSc Advanced Computer Science</span> student at the University of Leicester (Distinction),
                            specializing in applied AI and Large Language Models.
                        </p>
                        <p className="dark:text-white text-black text-sm lg:text-base leading-relaxed font-bold">
                            I build <span className="dark:text-white text-black font-black">retrieval-augmented systems</span> with embeddings and pgvector,
                            robust <span className="dark:text-white text-black font-black">FastAPI/Node back ends</span>, and modern <span className="dark:text-white text-black font-black">React/Next.js UIs</span>.
                        </p>

                        <div className="pt-4 grid grid-cols-2 gap-3">
                            <div className="p-3 bg-brutalist-cyan dark:bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)]">
                                <div className="text-black dark:text-white text-xs mb-1 font-black uppercase">Location</div>
                                <div className="text-black dark:text-white font-black text-sm">Leicester, UK</div>
                            </div>
                            <div className="p-3 bg-brutalist-green dark:bg-brutalist-yellow border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)]">
                                <div className="text-black dark:text-black text-xs mb-1 font-black uppercase">Status</div>
                                <div className="text-black dark:text-black font-black text-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black dark:bg-black border-[1px] border-black dark:border-black" />
                                    Available
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="min-h-[600px] lg:min-w-[100vw] lg:w-[100vw] lg:h-full flex items-center justify-center p-8 md:p-12 lg:flex-shrink-0">
                <div className="max-w-4xl w-full">
                    <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-black uppercase mb-6">Education</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Master's Degree */}
                        <div className="p-4 bg-brutalist-magenta dark:bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="flex items-start justify-between mb-2 gap-2">
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase">M.Sc.</h3>
                                    <p className="text-white text-sm font-bold">Advanced Computer Science</p>
                                </div>
                                <div className="px-2 py-0.5 bg-brutalist-yellow dark:bg-brutalist-cyan border-[2px] border-black dark:border-white">
                                    <span className="text-black text-xs font-black uppercase">Distinction</span>
                                </div>
                            </div>
                            <p className="text-white text-xs mb-1 font-bold">University of Leicester, UK</p>
                            <p className="text-white text-xs font-bold">Jan 2024 – Jul 2025</p>
                        </div>

                        {/* Bachelor's Degree */}
                        <div className="p-4 bg-brutalist-orange dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="flex items-start justify-between mb-2 gap-2">
                                <div>
                                    <h3 className="text-lg font-black text-white dark:text-black uppercase">B.E.</h3>
                                    <p className="text-white dark:text-black text-sm font-bold">Computer Science & Engineering</p>
                                </div>
                                <div className="px-2 py-0.5 bg-brutalist-yellow border-[2px] border-black dark:border-white">
                                    <span className="text-black text-xs font-black uppercase">85.5%</span>
                                </div>
                            </div>
                            <p className="text-white dark:text-black text-xs mb-1 font-bold">S.N. Patel Institute, India</p>
                            <p className="text-white dark:text-black text-xs font-bold">Jun 2019 – Jun 2023</p>
                        </div>

                        {/* Highlights - Spans 2 columns */}
                        <div className="md:col-span-2 p-4 bg-brutalist-green dark:bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)]">
                            <h4 className="text-base font-black text-black dark:text-white mb-3 uppercase">Highlights</h4>
                            <div className="grid md:grid-cols-2 gap-2 text-xs">
                                <div className="flex gap-2">
                                    <span>🏆</span>
                                    <p className="text-black dark:text-white font-bold"><span className="font-black uppercase">Huawei Tech Arena</span> — Finalist</p>
                                </div>
                                <div className="flex gap-2">
                                    <span>🥉</span>
                                    <p className="text-black dark:text-white font-bold"><span className="font-black uppercase">Cyber4Me CTF</span> — 3rd place</p>
                                </div>
                                <div className="flex gap-2">
                                    <span>🎯</span>
                                    <p className="text-black dark:text-white font-bold"><span className="font-black uppercase">Encode AI</span> — Crypto Radio</p>
                                </div>
                                <div className="flex gap-2">
                                    <span>🎓</span>
                                    <p className="text-black dark:text-white font-bold"><span className="font-black uppercase">Scholarships</span> — MYSY Merit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="min-h-[600px] lg:min-w-[100vw] lg:w-[100vw] lg:h-full flex items-center justify-center p-8 md:p-12 lg:flex-shrink-0">
                <div className="max-w-4xl w-full">
                    <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-black uppercase mb-6">Experience</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* IBM */}
                        <div className="p-4 bg-brutalist-cyan dark:bg-brutalist-yellow border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="mb-2">
                                <h3 className="text-lg font-black text-black dark:text-black uppercase">IBM</h3>
                                <p className="text-black dark:text-black text-sm font-bold">Virtual Intern</p>
                                <span className="text-black dark:text-black text-xs font-bold">Jun 2023 – Jul 2023</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                                <li className="flex gap-1 text-black dark:text-black font-bold">
                                    <span className="font-black">▪</span>
                                    <span>Data cleaning & ML model evaluation</span>
                                </li>
                                <li className="flex gap-1 dark:text-white text-black font-bold">
                                    <span className="font-black">▪</span>
                                    <span>Automated preprocessing pipelines</span>
                                </li>
                            </ul>
                        </div>

                        {/* Microsoft */}
                        <div className="p-4 bg-brutalist-purple dark:bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="mb-2">
                                <h3 className="text-lg font-black text-white uppercase">Microsoft</h3>
                                <p className="text-white text-sm font-bold">Virtual Intern</p>
                                <span className="text-white text-xs font-bold">Apr 2023 – Jun 2023</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                                <li className="flex gap-1 text-white font-bold">
                                    <span className="font-black">▪</span>
                                    <span>Azure deployment & CI/CD</span>
                                </li>
                                <li className="flex gap-1 text-white font-bold">
                                    <span className="font-black">▪</span>
                                    <span>Git workflows & collaboration</span>
                                </li>
                            </ul>
                        </div>

                        {/* Direction Infosystems */}
                        <div className="p-4 bg-brutalist-yellow dark:bg-brutalist-orange border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="mb-2">
                                <h3 className="text-lg font-black text-black dark:text-white uppercase">Direction Infosystems</h3>
                                <p className="text-black dark:text-white text-sm font-bold">Intern</p>
                                <span className="text-black dark:text-white text-xs font-bold">Jan 2023 – Apr 2023</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                                <li className="flex gap-1 text-black dark:text-white font-bold">
                                    <span className="font-black">▪</span>
                                    <span>PHP, Laravel, MySQL development</span>
                                </li>
                            </ul>
                        </div>

                        {/* Elsner Technologies */}
                        <div className="p-4 bg-brutalist-green dark:bg-brutalist-cyan border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all">
                            <div className="mb-2">
                                <h3 className="text-lg font-black text-black dark:text-black uppercase">Elsner Technologies</h3>
                                <p className="text-black dark:text-black text-sm font-bold">Summer Internship</p>
                                <span className="text-black dark:text-black text-xs font-bold">Jun 2022 – Jul 2022</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                                <li className="flex gap-1 text-black dark:text-black font-bold">
                                    <span className="font-black">▪</span>
                                    <span>Android app development (Java)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-[600px] lg:min-w-[100vw] lg:w-[100vw] lg:h-full flex items-center justify-center p-8 md:p-12 lg:flex-shrink-0">
                <div className="max-w-5xl w-full">
                    <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-black mb-6 uppercase">Projects</h2>
                    <div className="space-y-4">
                        <p className="dark:text-white text-black text-sm lg:text-base leading-relaxed font-bold">
                            From RAG-powered assistants to agentic AI systems, I build full-stack applications combining cutting-edge AI with production-ready engineering.
                        </p>

                        {/* Project Cards - 2x2 Grid */}
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="group p-4 bg-brutalist-purple dark:bg-brutalist-magenta border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex flex-col">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-base font-black text-white uppercase">Job Recruiter Assistant</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/job-recruiter-assistant"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 bg-brutalist-magenta border-[2px] border-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex-shrink-0"
                                    >
                                        <Github className="w-3 h-3 text-white" />
                                    </a>
                                </div>
                                <p className="text-white text-xs mb-2 font-bold">RAG-powered with semantic matching, CV OCR, SendGrid automation</p>
                                <div className="flex flex-wrap gap-1 mt-auto">
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">FastAPI</span>
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">Supabase</span>
                                </div>
                            </div>

                            <div className="group p-4 bg-brutalist-cyan dark:bg-brutalist-yellow border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex flex-col">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-base font-black text-black uppercase">Medical Screening</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/NurseChat"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 bg-brutalist-magenta border-[2px] border-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex-shrink-0"
                                    >
                                        <Github className="w-3 h-3 text-white" />
                                    </a>
                                </div>
                                <p className="text-black text-xs mb-2 font-bold">AI triage chatbot with RAG+CAG pipeline, multimodal STT/TTS</p>
                                <div className="flex flex-wrap gap-1 mt-auto">
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">Gemini</span>
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">OpenAI</span>
                                </div>
                            </div>

                            <div className="group p-4 bg-brutalist-orange dark:bg-brutalist-green border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex flex-col">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-base font-black text-white dark:text-black uppercase">Crypto FM</h4>
                                    <div className="flex gap-1">
                                        <a
                                            href="https://encode2025.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 bg-brutalist-green border-[2px] border-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex-shrink-0"
                                        >
                                            <ExternalLink className="w-3 h-3 text-white dark:text-black" />
                                        </a>
                                        <a
                                            href="https://github.com/Raj-Vaghela/CryptoFM"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 bg-brutalist-magenta border-[2px] border-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex-shrink-0"
                                        >
                                            <Github className="w-3 h-3 text-white" />
                                        </a>
                                    </div>
                                </div>
                                <p className="text-white dark:text-black text-xs mb-2 font-bold">Agentic AI crypto radio with real-time market analysis</p>
                                <div className="flex flex-wrap gap-1 mt-auto">
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">Node.js</span>
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">Gemini</span>
                                </div>
                            </div>

                            <div className="group p-4 bg-brutalist-magenta dark:bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex flex-col">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-base font-black text-white uppercase">Readmission Prediction</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/Patient-Readmission-Prediction-Google-Colab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 bg-brutalist-magenta border-[2px] border-black dark:border-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex-shrink-0"
                                    >
                                        <Github className="w-3 h-3 text-white" />
                                    </a>
                                </div>
                                <p className="text-white text-xs mb-2 font-bold">ML pipeline on 100k+ dataset to flag readmissions</p>
                                <div className="flex flex-wrap gap-1 mt-auto">
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">Python</span>
                                    <span className="px-2 py-0.5 bg-brutalist-cyan dark:bg-brutalist-yellow border-[1px] border-black dark:border-white text-black text-[10px] font-black uppercase">ML</span>
                                </div>
                            </div>
                        </div>

                        {/* View All Button */}
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={onOpenProjectsModal}
                                className="group px-5 py-2 bg-brutalist-purple border-[3px] border-black dark:border-white shadow-[3px_3px_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_rgba(255,255,255,1)] transition-all flex items-center gap-2"
                            >
                                <span className="text-white font-black uppercase text-sm">View All Projects</span>
                                <ExternalLink className="w-3 h-3 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
