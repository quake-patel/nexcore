export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  emoji: string;
  imgCls: string;
  date: string;
  read: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  content: Section[];
  related: string[]; // slugs
  bannerUrl?: string;
  thumbnailUrl?: string;
};

type SubBlock = {
  type: 'p' | 'ul' | 'ol';
  text?: string;
  items?: string[];
};

type Section = {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'blockquote' | 'callout' | 'section' | 'table';
  text?: string;
  items?: string[];
  title?: string;
  titleType?: 'h2' | 'h3';
  subBlocks?: SubBlock[];
  headers?: string[];
  rows?: string[][];
};

export const posts: Post[] = [
  {
    slug: 'multi-cloud-enterprise-2025',
    title: 'Why multi-cloud is no longer optional for enterprise in 2025',
    excerpt:
      'Vendor lock-in risk, resilience requirements, and cost optimisation have converged to make multi-cloud strategy a board-level conversation.',
    tag: 'Cloud',
    emoji: '☁️',
    imgCls: '',
    date: 'May 8, 2025',
    read: '6 min read',
    author: { name: 'Arjun Mehta', role: 'Cloud Architect', initials: 'AM' },
    related: ['kubernetes-production-lessons', 'realtime-analytics-scale', 'llm-integration-guide'],
    content: [
      {
        type: 'p',
        text: 'Just a few years ago, multi-cloud was a nice-to-have — a hedge that only the largest enterprises could afford to consider. In 2025, that calculus has completely flipped. Between vendor lock-in risks, compliance mandates, and the relentless pursuit of unit economics, multi-cloud has become a baseline expectation for any organisation running production workloads at scale.',
      },
      {
        type: 'h2',
        text: 'The lock-in problem is real — and getting worse',
      },
      {
        type: 'p',
        text: 'Cloud vendors have been steadily expanding their proprietary service layers. Managed databases, serverless compute, AI/ML pipelines, IoT frameworks — the depth of differentiated services on AWS, Azure, and GCP has grown dramatically. Each of these services makes your architecture more capable, but also more entangled with a single provider.',
      },
      {
        type: 'p',
        text: 'We have seen clients facing renewal negotiations where their leverage was essentially zero because a full migration would have taken 18+ months and cost more than years of inflated pricing. Multi-cloud gives you a credible BATNA at the negotiation table.',
      },
      {
        type: 'callout',
        text: 'Key insight: A credible multi-cloud posture — even if you run 80% on a primary cloud — changes your negotiating position dramatically.',
      },
      {
        type: 'h2',
        text: 'Resilience requirements have reached board level',
      },
      {
        type: 'p',
        text: 'The major cloud outages of 2023 and 2024 left a mark. When a single Availability Zone issue cascades into a regional failure that takes down your entire customer-facing platform for hours, the conversation moves from the SRE team to the boardroom fast. Regulators in financial services and healthcare are increasingly mandating geographic and provider diversity.',
      },
      {
        type: 'ul',
        items: [
          'EU DORA (Digital Operational Resilience Act) requires financial entities to test resilience against third-party ICT failures',
          'HIPAA and HITRUST auditors are asking pointed questions about single-cloud dependency',
          'ISO 27001 revisions increasingly reference cloud concentration risk',
          'Major enterprise customer contracts now include "cloud resilience" as a due diligence checklist item',
        ],
      },
      {
        type: 'h2',
        text: 'Cost optimisation: the real driver in 2025',
      },
      {
        type: 'p',
        text: 'With FinOps now a recognised discipline and CFOs scrutinising cloud bills like never before, the ability to shift workloads between providers based on spot pricing, committed-use discounts, and egress cost structures is a genuine competitive advantage. We have helped clients save 28–40% on compute costs through intelligent workload placement across two providers.',
      },
      {
        type: 'blockquote',
        text: '"We reduced our annual cloud spend by 34% in Q1 2025 after adopting a multi-cloud strategy with NexCore. The savings funded two additional engineering hires." — VP Engineering, Series C FinTech',
      },
      {
        type: 'h2',
        text: 'What a pragmatic multi-cloud strategy actually looks like',
      },
      {
        type: 'p',
        text: 'The key word is pragmatic. You do not need to run everything everywhere. A well-designed strategy typically involves a primary cloud for the majority of workloads, a secondary cloud for specific functions (often DR, AI/ML, or regional coverage), and cloud-agnostic infrastructure abstractions at the right layers.',
      },
      {
        type: 'ul',
        items: [
          'Use Kubernetes as your compute abstraction layer — deploy to any cloud without rewriting applications',
          'Adopt cloud-agnostic data formats and avoid proprietary storage services for critical data',
          'Build with Terraform or Pulumi so infrastructure-as-code is provider-portable',
          'Design for async, event-driven communication between services to decouple cloud boundaries',
          'Use a global load balancer (Cloudflare, Fastly) to route traffic between providers without application changes',
        ],
      },
      {
        type: 'h2',
        text: 'The teams making this work in 2025',
      },
      {
        type: 'p',
        text: 'Successful multi-cloud teams have invested in platform engineering — building internal developer platforms that abstract cloud complexity from application teams. This is the decisive factor. Without it, multi-cloud becomes multi-burden. With it, developers ship to any cloud without needing to think about it.',
      },
      {
        type: 'p',
        text: 'If your organisation is still debating whether multi-cloud is worth the effort, the debate is over. The question now is how to implement it pragmatically. Start with your disaster recovery posture — it is the lowest-risk entry point and delivers immediate resilience value.',
      },
    ],
  },
  {
    slug: 'llm-integration-guide',
    title: 'Integrating LLMs into your existing product — a practical guide',
    excerpt:
      'Lessons from 20+ AI integrations: what works, what fails, and how to build AI features that your users will actually trust and use.',
    tag: 'AI & ML',
    emoji: '🤖',
    imgCls: 'b2',
    date: 'Apr 21, 2025',
    read: '9 min read',
    author: { name: 'Priya Nair', role: 'AI/ML Lead', initials: 'PN' },
    related: ['multi-cloud-enterprise-2025', 'realtime-analytics-scale', 'zero-trust-architecture'],
    content: [
      {
        type: 'p',
        text: 'We have now completed more than 20 LLM integrations across industries ranging from legal tech to e-commerce to healthcare. The patterns of success and failure are remarkably consistent. This guide distils what we have learned into actionable principles that will save you months of trial and error.',
      },
      {
        type: 'h2',
        text: 'Start with the problem, not the model',
      },
      {
        type: 'p',
        text: 'The most common mistake we see is teams starting with "we want to add an AI chatbot" rather than "our users spend 40% of their support time answering the same 12 questions." The former leads to a demo that looks impressive and a production feature nobody uses. The latter leads to a measurable outcome.',
      },
      {
        type: 'callout',
        text: 'Rule #1: If you cannot define success with a number before you start, you are not ready to build.',
      },
      {
        type: 'h2',
        text: 'The retrieval problem is harder than the generation problem',
      },
      {
        type: 'p',
        text: 'In every RAG (Retrieval-Augmented Generation) system we have built, the quality of the retrieval layer — not the LLM — was the bottleneck. Getting the right context into the prompt is the hard engineering problem. The LLM is remarkably good at synthesising accurate, well-written answers once it has the right inputs.',
      },
      {
        type: 'ul',
        items: [
          'Invest heavily in your chunking strategy — fixed-size chunks rarely outperform semantic chunking',
          'Hybrid search (dense vector + sparse BM25) consistently outperforms pure vector search by 15–30%',
          'Reranking with a cross-encoder model before passing to the LLM dramatically improves answer quality',
          'Build an evaluation harness before you build the feature — you need a way to measure retrieval quality',
        ],
      },
      {
        type: 'h2',
        text: 'Latency is a product problem, not a technical problem',
      },
      {
        type: 'p',
        text: 'A feature that takes 8 seconds to respond will not be used, regardless of quality. Streaming responses are now table stakes. But beyond streaming, consider: can you precompute likely responses? Can you cache at the retrieval layer? Can you use a smaller, fine-tuned model for common cases and fall back to a larger model only when needed?',
      },
      {
        type: 'h2',
        text: 'Trust is earned through transparency and control',
      },
      {
        type: 'p',
        text: 'The AI features with the highest adoption rates in our client deployments share one characteristic: they give users control and show their work. Citation links, confidence indicators, "was this helpful?" feedback, and easy escalation paths are not nice-to-haves — they are the difference between a feature users trust and one they avoid.',
      },
      {
        type: 'blockquote',
        text: '"The moment we added source citations to our AI-powered search, support ticket deflection went from 23% to 61%." — Head of Product, Legal Tech SaaS',
      },
      {
        type: 'h2',
        text: 'Observability is not optional',
      },
      {
        type: 'p',
        text: 'You cannot improve what you cannot measure. Every LLM integration needs prompt logging, response quality scoring (at least via LLM-as-judge), latency tracking per stage of the pipeline, and cost-per-query monitoring. Build this infrastructure before you launch.',
      },
      {
        type: 'ul',
        items: [
          'Log every prompt and completion with user context (anonymised) for offline evaluation',
          'Track token costs per feature, not just in aggregate — you will find 20% of features consume 80% of budget',
          'Set up automated regression tests that run on every prompt template change',
          'Use thumbs up/down feedback as a leading indicator, but do not rely on it as your only signal',
        ],
      },
      {
        type: 'h2',
        text: 'The model choice matters less than you think',
      },
      {
        type: 'p',
        text: 'GPT-4o, Claude 3.5, Gemini 1.5 Pro — the frontier models are remarkably capable and converging. For most production use cases, the prompt engineering, retrieval quality, and evaluation rigour matter far more than which model you pick. Choose based on your latency budget, cost constraints, data privacy requirements, and API reliability — not benchmark leaderboards.',
      },
    ],
  },
  {
    slug: 'zero-trust-architecture',
    title: 'Zero-trust architecture: beyond the buzzword',
    excerpt:
      'A clear breakdown of how zero-trust actually works in practice, and what a real implementation looks like for a mid-sized engineering team.',
    tag: 'Security',
    emoji: '🔐',
    imgCls: 'b3',
    date: 'Apr 2, 2025',
    read: '7 min read',
    author: { name: 'Karan Shah', role: 'Security Architect', initials: 'KS' },
    related: ['owasp-top-10-2025', 'multi-cloud-enterprise-2025', 'kubernetes-production-lessons'],
    content: [
      {
        type: 'p',
        text: '"Zero trust" has been one of the most abused terms in enterprise security for the past five years. Vendors have attached it to products that have nothing to do with the underlying philosophy, and organisations have declared "zero trust transformation" without changing a meaningful thing about how they handle identity or network access. This post is about what zero trust actually means — and what a real implementation looks like.',
      },
      {
        type: 'h2',
        text: 'The core principle: never trust, always verify',
      },
      {
        type: 'p',
        text: 'Zero trust is not a product. It is an architectural philosophy built on one core assumption: you cannot trust the network perimeter. Whether a request comes from inside your corporate VPN or from a coffee shop in Berlin, it must be authenticated, authorised, and continuously verified. The perimeter is dead.',
      },
      {
        type: 'callout',
        text: 'Zero trust is defined by three principles: verify explicitly, use least-privilege access, and assume breach.',
      },
      {
        type: 'h2',
        text: 'The five pillars in practice',
      },
      {
        type: 'ul',
        items: [
          'Identity: Every user, service, and device has a verified identity. MFA is mandatory. Privileged access is time-bounded and just-in-time.',
          'Devices: Endpoints are continuously assessed for health. Unmanaged or non-compliant devices cannot access production systems.',
          'Network: Micro-segmentation replaces flat networks. Services communicate only on approved paths with mutual TLS.',
          'Applications: Every application enforces its own access controls. No implicit trust from network location.',
          'Data: Data is classified, encrypted at rest and in transit, and access is logged at the row level for sensitive resources.',
        ],
      },
      {
        type: 'h2',
        text: 'What a real implementation looks like for a 50-person engineering team',
      },
      {
        type: 'p',
        text: 'You do not need a $5M security budget to implement meaningful zero trust controls. Here is a practical progression we have guided mid-sized teams through over 6–12 months.',
      },
      {
        type: 'h3',
        text: 'Phase 1 (Month 1–2): Identity foundations',
      },
      {
        type: 'ul',
        items: [
          'Consolidate identity on a single IdP (Okta, Azure AD, or Google Workspace)',
          'Enable phishing-resistant MFA (FIDO2/WebAuthn) for all users',
          'Audit all service accounts and rotate secrets into a vault (HashiCorp Vault or AWS Secrets Manager)',
          'Implement SSO for all SaaS tools — eliminate password sprawl',
        ],
      },
      {
        type: 'h3',
        text: 'Phase 2 (Month 3–4): Network access',
      },
      {
        type: 'ul',
        items: [
          'Replace your VPN with a zero-trust network access (ZTNA) solution (Cloudflare Access, Tailscale, or Zscaler)',
          'Implement device posture checks before granting access to production',
          'Enable mutual TLS between internal services using a service mesh',
        ],
      },
      {
        type: 'h3',
        text: 'Phase 3 (Month 5–12): Continuous verification',
      },
      {
        type: 'ul',
        items: [
          'Deploy SIEM with behavioural baselines and anomaly alerting',
          'Implement just-in-time privileged access with full audit trails',
          'Run quarterly purple team exercises to test detection capabilities',
          'Establish continuous compliance monitoring against CIS benchmarks',
        ],
      },
      {
        type: 'blockquote',
        text: '"We went from a flat network with a perimeter firewall to a fully zero-trust posture in nine months. The biggest change was cultural, not technical — getting developers to think about identity-first access." — CTO, 80-person SaaS company',
      },
      {
        type: 'h2',
        text: 'The metrics that matter',
      },
      {
        type: 'p',
        text: 'Track mean time to detect (MTTD), mean time to respond (MTTR), percentage of access requests denied by policy (your policy enforcement rate), and the ratio of privileged sessions to total sessions. These give you a real picture of whether your zero trust controls are working.',
      },
    ],
  },
  {
    slug: 'kubernetes-production-lessons',
    title: 'Kubernetes in production: lessons from five years of cluster management',
    excerpt:
      'The gotchas, the best practices, and the tools we rely on daily to keep large-scale Kubernetes clusters healthy and cost-efficient.',
    tag: 'DevOps',
    emoji: '⚙️',
    imgCls: '',
    date: 'Mar 14, 2025',
    read: '11 min read',
    author: { name: 'Deepak Rao', role: 'DevOps Lead', initials: 'DR' },
    related: ['multi-cloud-enterprise-2025', 'zero-trust-architecture', 'owasp-top-10-2025'],
    content: [
      {
        type: 'p',
        text: 'We have been running Kubernetes in production for five years across dozens of client environments — from small 10-node clusters to multi-region setups handling 100k+ requests per second. Here are the hard-won lessons that did not come from documentation.',
      },
      {
        type: 'h2',
        text: 'Lesson 1: Resource requests and limits will make or break you',
      },
      {
        type: 'p',
        text: 'Misconfigured resource requests and limits are the single most common cause of production incidents in Kubernetes clusters we have inherited from other teams. Pods with no requests get scheduled onto already-saturated nodes. Pods with limits set too low get OOMKilled at peak traffic. Pods with limits set too high waste capacity and inflate your cloud bill.',
      },
      {
        type: 'callout',
        text: 'Always set resource requests. Set limits only where you need hard isolation. Use VPA (Vertical Pod Autoscaler) in recommendation mode to get data-driven starting points.',
      },
      {
        type: 'h2',
        text: 'Lesson 2: Your networking model will constrain everything',
      },
      {
        type: 'p',
        text: 'Choose your CNI plugin carefully and early. Switching CNIs in a production cluster is a painful, high-risk operation. Cilium has become our default recommendation — eBPF-based networking, excellent observability, built-in network policy, and increasingly strong service mesh capabilities without the overhead of a sidecar proxy.',
      },
      {
        type: 'h2',
        text: 'Lesson 3: Observability needs to be a first-class citizen',
      },
      {
        type: 'ul',
        items: [
          'Run the kube-prometheus-stack from day one — not after your first major incident',
          'Instrument every application with structured logs, traces (OpenTelemetry), and custom metrics',
          'Build dashboards for your SLOs before you deploy — define what good looks like',
          'Alert on symptoms (high error rate, latency p99 breach) not causes — leave cause investigation to humans',
        ],
      },
      {
        type: 'h2',
        text: 'Lesson 4: Cost optimisation is an ongoing practice',
      },
      {
        type: 'p',
        text: 'Kubernetes makes it easy to scale up and surprisingly easy to forget to scale down. Cluster Autoscaler and KEDA (Kubernetes Event-Driven Autoscaling) are essential. Use Spot/Preemptible instances for stateless workloads — we routinely achieve 60–70% compute cost reduction on batch and non-critical workloads.',
      },
      {
        type: 'blockquote',
        text: '"We cut our EKS bill by 52% over six months without touching application code — purely through better cluster configuration and workload scheduling." — Platform Engineering Lead, E-commerce Scale-up',
      },
      {
        type: 'h2',
        text: 'Lesson 5: Security is not a day-two problem',
      },
      {
        type: 'ul',
        items: [
          'Enable Pod Security Admission (PSA) from the start — do not run privileged containers',
          'Use network policies to enforce least-privilege communication between namespaces',
          'Scan images in CI with Trivy or Snyk — block high/critical CVEs from reaching production',
          'Rotate all cluster certificates automatically and audit RBAC quarterly',
          'Run Falco for runtime threat detection — it pays for itself the first time it catches a cryptominer',
        ],
      },
      {
        type: 'h2',
        text: 'The toolchain we actually use in 2025',
      },
      {
        type: 'ul',
        items: [
          'Cluster provisioning: Terraform + managed Kubernetes (EKS, GKE, or AKS)',
          'GitOps: ArgoCD for application delivery, Flux for platform components',
          'Observability: Grafana + Prometheus + Tempo + Loki (the LGTM stack)',
          'Security: Falco, Trivy, OPA/Gatekeeper, Vault for secrets',
          'Cost: Kubecost for visibility, Karpenter for node provisioning efficiency',
          'Networking: Cilium CNI + Gateway API',
        ],
      },
    ],
  },
  {
    slug: 'realtime-analytics-scale',
    title: "Real-time analytics at scale: an architect's field guide",
    excerpt:
      'How to design a streaming analytics pipeline that handles millions of events per second without burning your AWS bill.',
    tag: 'Data',
    emoji: '📊',
    imgCls: 'b2',
    date: 'Feb 28, 2025',
    read: '8 min read',
    author: { name: 'Sneha Patel', role: 'Data Architect', initials: 'SP' },
    related: ['llm-integration-guide', 'multi-cloud-enterprise-2025', 'kubernetes-production-lessons'],
    content: [
      {
        type: 'p',
        text: 'Building a real-time analytics pipeline that actually scales is one of the most complex distributed systems challenges in modern engineering. The failure modes are subtle, the costs can spiral quickly, and the gap between "works in demo" and "works at 10M events/day" is vast. This guide is about the decisions that matter.',
      },
      {
        type: 'h2',
        text: 'Define your latency and throughput requirements first',
      },
      {
        type: 'p',
        text: '"Real-time" means different things to different products. Is 500ms acceptable? 5 seconds? 30 seconds? Your answer determines your entire architecture. True sub-second analytics requires very different infrastructure than "near real-time" dashboards that refresh every 30 seconds. Be precise before you design.',
      },
      {
        type: 'callout',
        text: 'The biggest waste in analytics infrastructure: over-engineering for sub-second latency when the business would be equally happy with 10-second windows.',
      },
      {
        type: 'h2',
        text: 'The streaming layer: Kafka is still king, but not always right',
      },
      {
        type: 'p',
        text: 'Apache Kafka remains the gold standard for high-throughput event streaming. But Kafka has operational complexity that many teams underestimate. For teams that do not need Kafka-scale throughput (i.e., below ~100k events/second), consider Redpanda (Kafka-compatible, dramatically simpler to operate) or AWS Kinesis/GCP Pub-Sub if you are willing to accept cloud lock-in.',
      },
      {
        type: 'h2',
        text: 'Stream processing: the decision that will haunt you',
      },
      {
        type: 'ul',
        items: [
          'Apache Flink: best-in-class for stateful stream processing, high throughput, complex event time semantics. High operational complexity.',
          'Apache Spark Structured Streaming: great if you already have Spark expertise. Micro-batch, not true streaming.',
          'Bytewax / Quix Streams: Python-native streaming frameworks — excellent developer experience, growing fast.',
          'KSQL / Flink SQL: SQL-first stream processing — right for teams without JVM expertise.',
        ],
      },
      {
        type: 'h2',
        text: 'The serving layer: where most teams make their biggest mistake',
      },
      {
        type: 'p',
        text: 'Pre-aggregation is the most important performance optimisation in analytics systems. Materialise your most common queries as pre-computed aggregates in your stream processor and write them to a fast serving layer. Apache Druid, ClickHouse, and StarRocks are purpose-built for this pattern and deliver sub-second query performance on billions of rows.',
      },
      {
        type: 'blockquote',
        text: '"We migrated from PostgreSQL to ClickHouse for our analytics queries and went from 45-second dashboard load times to 300ms. Same data, same queries." — Data Engineering Lead, AdTech Platform',
      },
      {
        type: 'h2',
        text: 'Cost control: the discipline that keeps analytics sustainable',
      },
      {
        type: 'ul',
        items: [
          'Use tiered storage aggressively — Kafka and object storage (S3/GCS) for raw events, fast storage only for hot data',
          'Set retention policies explicitly — unbounded event log growth will surprise you',
          'Profile your most expensive queries and materialise them as pre-computed views',
          'Use sampling for dashboards that do not need 100% accuracy — a 10% sample is often indistinguishable',
          'Tag all compute resources with the business capability they serve — you need cost attribution to make intelligent decisions',
        ],
      },
    ],
  },
  {
    slug: 'owasp-top-10-2025',
    title: "OWASP Top 10 in 2025: what's changed and what to do about it",
    excerpt:
      'A practical breakdown of the latest OWASP Top 10 vulnerabilities and the concrete steps your team can take to address each one.',
    tag: 'Security',
    emoji: '🛡️',
    imgCls: 'b3',
    date: 'Jan 19, 2025',
    read: '10 min read',
    author: { name: 'Karan Shah', role: 'Security Architect', initials: 'KS' },
    related: ['zero-trust-architecture', 'kubernetes-production-lessons', 'llm-integration-guide'],
    content: [
      {
        type: 'p',
        text: 'OWASP updates its Top 10 to reflect the shifting threat landscape, and 2025 brings meaningful changes — particularly with the rise of AI-powered applications and increasingly sophisticated supply chain attacks. Here is a practical breakdown of each category and what your team should actually be doing about it.',
      },
      {
        type: 'h2',
        text: 'A01: Broken Access Control — still the biggest problem',
      },
      {
        type: 'p',
        text: 'Broken access control has held the top spot for three consecutive editions, and for good reason. IDOR (Insecure Direct Object Reference) vulnerabilities, missing function-level access controls, and CORS misconfiguration remain endemic. The fix is unglamorous but essential: enforce access control at the server side for every request, implement deny-by-default policies, and test access control as part of every pull request.',
      },
      {
        type: 'callout',
        text: '94% of applications tested had some form of broken access control. This is a code review and architecture problem, not a tooling problem.',
      },
      {
        type: 'h2',
        text: 'A02: Cryptographic Failures',
      },
      {
        type: 'ul',
        items: [
          'Encrypt all sensitive data at rest using AES-256 — no exceptions for "low sensitivity" PII',
          'Use TLS 1.3 for all data in transit — disable TLS 1.0 and 1.1',
          'Never implement your own cryptography — use well-audited libraries',
          'Hash passwords with bcrypt, scrypt, or Argon2 — MD5 and SHA-1 are not acceptable',
          'Audit your secret management — API keys and credentials in environment variables or git history are common exposures',
        ],
      },
      {
        type: 'h2',
        text: 'A03: Injection',
      },
      {
        type: 'p',
        text: 'SQL injection is not dead — it is just less common in new code thanks to ORMs. But prompt injection in LLM-powered applications is the new injection frontier and it is actively being exploited. If your application passes user-controlled data to an LLM that has tool access or can take actions, you need a threat model specifically for prompt injection.',
      },
      {
        type: 'h2',
        text: 'A09: Security Logging and Monitoring Failures — the silent killer',
      },
      {
        type: 'p',
        text: 'The average time to detect a breach is still measured in weeks. The reason is almost always inadequate logging. Every authentication event, access control decision, and data access involving sensitive resources should be logged with enough context to reconstruct what happened. Then you need to actually monitor those logs with alerting on anomalous patterns.',
      },
      {
        type: 'h2',
        text: 'What your team should do this quarter',
      },
      {
        type: 'ul',
        items: [
          'Run a dependency audit — identify and patch critical CVEs in your supply chain (A06)',
          'Implement SAST in your CI pipeline — catch injection and cryptographic issues at the PR stage',
          'Enable structured security logging and set up anomaly alerts in your SIEM',
          'Test your access control layer explicitly — write tests that assert unauthorised requests are rejected',
          'Add Content Security Policy headers and ensure all admin endpoints require MFA',
        ],
      },
      {
        type: 'blockquote',
        text: '"Security is not a feature you add at the end. It is a property you design in from the start." — OWASP Foundation',
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): Post[] {
  return slugs.map((s) => posts.find((p) => p.slug === s)).filter(Boolean) as Post[];
}
