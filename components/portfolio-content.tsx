"use client"

import { Github, ExternalLink } from "lucide-react"

interface PortfolioContentProps {
    onOpenProjectsModal: () => void
}

export function PortfolioContent({ onOpenProjectsModal }: PortfolioContentProps) {
    return (
        <>
            {/* Me Section */}
            <section id="me" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
                <div className="max-w-3xl">
                    <h2 className="text-5xl font-bold dark:text-white text-gray-800 mb-8">About Me</h2>
                    <div className="space-y-6">
                        <p className="dark:text-white text-gray-800 text-lg leading-relaxed">
                            I'm an <span className="dark:text-white text-black font-semibold">MSc Advanced Computer Science</span> student at the University of Leicester (Distinction),
                            specializing in applied AI and Large Language Models.
                        </p>
                        <p className="dark:text-white text-gray-900 text-base leading-relaxed">
                            I build <span className="dark:text-white text-black font-medium">retrieval-augmented systems</span> with embeddings and pgvector,
                            robust <span className="dark:text-white text-black font-medium">FastAPI/Node back ends</span>, and modern <span className="dark:text-white text-black font-medium">React/Next.js UIs</span>.
                            I'm comfortable with multimodal STT/TTS/OCR, function calling, and streaming UX. Strong in Python and
                            software engineering fundamentals — I ship testable services with telemetry, retries, and graceful shutdowns.
                        </p>
                        <p className="dark:text-white text-gray-900 text-base leading-relaxed">
                            Looking to help teams turn LLM prototypes into reliable, user-centered products.
                        </p>

                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 backdrop-blur-none">
                                <div className="dark:text-white text-gray-800 text-sm mb-1">Location</div>
                                <div className="dark:text-white text-black font-medium">Leicester, UK</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 backdrop-blur-none">
                                <div className="dark:text-white text-gray-800 text-sm mb-1">Status</div>
                                <div className="dark:text-white text-black font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Available for work
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
                <div className="max-w-3xl w-full">
                    <h2 className="text-5xl font-bold dark:text-white text-gray-800 mb-8">Education</h2>
                    <div className="space-y-6">
                        {/* Master's Degree */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
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
                        </div>

                        {/* Bachelor's Degree */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
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
                        </div>

                        {/* Highlights & Awards */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 backdrop-blur-none">
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
                                    <p className="dark:text-white text-gray-900 text-sm"><span className="font-medium dark:text-white text-black">Encode AI London '25</span> — "Crypto Radio"</p>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
                <div className="max-w-3xl w-full">
                    <h2 className="text-5xl font-bold dark:text-white text-gray-800 mb-8">Experience</h2>
                    <div className="space-y-6">
                        {/* IBM */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">IBM</h3>
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
                        </div>

                        {/* Microsoft */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">Microsoft</h3>
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
                        </div>

                        {/* Direction Infosystems */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">Direction Infosystems</h3>
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
                        </div>

                        {/* Elsner Technologies */}
                        <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">Elsner Technologies Pvt. Ltd.</h3>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-[600px] flex items-center justify-center p-8 md:p-12">
                <div className="max-w-3xl w-full">
                    <h2 className="text-5xl font-bold dark:text-white text-gray-800 mb-8">Project Highlights</h2>
                    <div className="space-y-6">
                        <p className="dark:text-white text-gray-800 text-lg leading-relaxed">
                            From RAG-powered assistants to agentic AI systems, I build full-stack applications that combine cutting-edge AI with production-ready engineering.
                        </p>

                        {/* Quick Project Cards */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="group p-5 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none flex flex-col h-full">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-lg font-bold dark:text-white text-gray-800">Job Recruiter Assistant</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/job-recruiter-assistant"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all flex-shrink-0"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-4 h-4 dark:text-white/70 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors" />
                                    </a>
                                </div>
                                <p className="dark:text-white text-gray-900 text-sm mb-auto">RAG-powered with semantic matching, CV OCR, and SendGrid automation</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">FastAPI</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Supabase</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">pgvector</span>
                                </div>
                            </div>

                            <div className="group p-5 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none flex flex-col h-full">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-lg font-bold dark:text-white text-gray-800">Medical Screening Assistant</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/NurseChat"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all flex-shrink-0"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-4 h-4 dark:text-white/70 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors" />
                                    </a>
                                </div>
                                <p className="dark:text-white text-gray-900 text-sm mb-auto">AI triage chatbot with RAG+CAG pipeline and multimodal STT/TTS</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Gemini</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">OpenAI</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Whisper</span>
                                </div>
                            </div>

                            <div className="group p-5 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none flex flex-col h-full">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-lg font-bold dark:text-white text-gray-800">Crypto FM</h4>
                                    <div className="flex gap-1">
                                        <a
                                            href="https://encode2025.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all flex-shrink-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink className="w-4 h-4 dark:text-white/70 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors" />
                                        </a>
                                        <a
                                            href="https://github.com/Raj-Vaghela/CryptoFM"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all flex-shrink-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github className="w-4 h-4 dark:text-white/70 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors" />
                                        </a>
                                    </div>
                                </div>
                                <p className="dark:text-white text-gray-900 text-sm mb-auto">Agentic AI crypto radio with real-time market analysis</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Node.js</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Gemini</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Google TTS</span>
                                </div>
                            </div>

                            <div className="group p-5 rounded-2xl bg-white/5 dark:bg-white/5 bg-white/20 border border-white/10 dark:border-white/10 border-white/40 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-white/30 transition-colors backdrop-blur-none flex flex-col h-full">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                    <h4 className="text-lg font-bold dark:text-white text-gray-800">30-Day Readmission Prediction</h4>
                                    <a
                                        href="https://github.com/Raj-Vaghela/Patient-Readmission-Prediction-Google-Colab"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/20 transition-all flex-shrink-0"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-4 h-4 dark:text-white/70 text-gray-700 group-hover:dark:text-white group-hover:text-gray-900 transition-colors" />
                                    </a>
                                </div>
                                <p className="dark:text-white text-gray-900 text-sm mb-auto">ML pipeline on 100k+ dataset to flag readmissions</p>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">Python</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">scikit-learn</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/10 bg-white/30 dark:text-white text-gray-800 text-xs border border-transparent dark:border-transparent border-white/50">pandas</span>
                                </div>
                            </div>
                        </div>

                        {/* View All Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={onOpenProjectsModal}
                                className="group px-6 py-3 rounded-xl bg-white/10 dark:bg-white/10 bg-white/25 backdrop-blur-none border border-white/20 dark:border-white/20 border-white/50 hover:bg-white/20 dark:hover:bg-white/20 hover:bg-white/35 transition-all flex items-center gap-2"
                            >
                                <span className="dark:text-white text-gray-800 font-medium">View All Projects</span>
                                <ExternalLink className="w-4 h-4 dark:text-white text-gray-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
