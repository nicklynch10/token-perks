# Artificial Analysis — benchmark scores, data terms, methodology

Research for Token Perks Pareto chart (effective cost vs intelligence, per-point "Source: Artificial Analysis" attribution).

**Access date for every source below: 2026-09-07.** All scores were read from public artificialanalysis.ai pages on this date. Nothing here is estimated by us: every score is transcribed from an AA page, and scores AA itself marks as estimates are flagged `*`.

---

## 1. Scores

### 1.0 Index version status

- **Current headline index: Artificial Analysis Intelligence Index v4.3** — confirmed on the methodology page (https://artificialanalysis.ai/methodology/intelligence-benchmarking), on individual model pages (e.g. https://artificialanalysis.ai/models/gpt-5), and in the data API docs (`intelligence_index_version` reports `4.3`; https://artificialanalysis.ai/data-api/docs).
- v4.3 is a 10-evaluation suite: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1.
- Version transition observed: v4.2 → v4.3. The site notice says v4.3 "replaces 𝜏³-Banking with AutomationBench-AA, and upgrades Terminal-Bench to v4.0" (seen on https://artificialanalysis.ai/). Some page body text (e.g. https://artificialanalysis.ai/models) still says "v4.2" — stale copy; treat v4.3 as current.
- **`*` = score AA marks as an estimate.** Model pages label these "Estimate (independent evaluation forthcoming)". The homepage's coverage counter reads "24 of 644 models" for v4.3 — consistent with only ~24 models fully re-run under v4.3 while the rest carry estimated/carried scores. The public leaderboard lists 202 scored entries.
- AA scores each model/endpoint **per reasoning-effort variant** (e.g. "GPT-5.6 Sol (max)" vs "(high)" vs "(Non-reasoning)"). Names below are exactly as AA lists them.

### 1.1 Focus table — one score per family member our chart will likely use

Legend: score = AA Intelligence Index v4.3 (0-100 scale as displayed). `*` = AA-marked estimate. Rank = as displayed at the linked source.

| Model (name as AA lists it) | AA II v4.3 | Est. | Rank (as shown) | Source URL | Date |
|---|---|---|---|---|---|
| Claude Fable 5.1 (max with fallback) | 53 | | #1 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-6 Astra (max) | 53 | | #3 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Opus 5 (max) | 51 | | #7 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Fable 5 (with fallback) | 50 | | #8 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Muse Spark 1.3 (max) | 48 | | #13 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-5.6 Sol (max) | 47 | | #14 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-6 Astra (Non-reasoning) | 45 | | #17 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Qwen3.8 Max | 45 | * | #20 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GLM-5.3 (max) | 44 | | #21 (top open weights) | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Grok 4.6 (high) | 44 | | #22 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Kimi K3 (max) | 44 | | #25 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-5.6 Terra (max) | 42 | | #28 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Qwen3.8-Flash-Next | 42 | * | #29 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GLM-5.3-Flash | 42 | | #30 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Gemini 3.8 Flash (high) | 41 | | #31 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Qwen3.8 2.4T A95B | 40 | | #32 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Gemini 3.7 Flash (medium) | 40 | * | #36 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Sonnet 5 (max) | 38 | | #41 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-5.6 Luna (max) | 38 | | #43 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| DeepSeek V4 Pro 0813 (max) | 36 | | #45 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| DeepSeek V4 Flash Vision (max) | 35 | | #48 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Kimi K3 (low) | 34 | * | #52 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| K2 Horizon 375B A23B | 34 | * | #54 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-5.3 Codex (xhigh) | 33 | * | #62 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| DeepSeek V4 Pro (max) | 31 | | #64 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Gemini 3.1 Pro Preview | 30 | | #67 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| MiniMax-M3 | 30 | | #69 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Kimi K2.7 Code | 29 | * | #70 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Sonnet 5 (medium) | 28 | | #73 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| GPT-5.5 Instant (June 2026) | 27 | | #80 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Sonnet 5 (low) | 25 | | #91 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Gemini 3.5 Flash-Lite | 23 | | #99 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude Sonnet 4.6 (Non-reasoning, low) | 23 | * | #97 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| o3 | 20 | * | #114 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude 4.5 Haiku | 18 | | #124 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Mistral Medium 3.5 | 15 | | #135 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Claude 4.5 Haiku (Non-reasoning) | 15 | * | #132 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Magistral Medium 1.2 | 12 | | #163 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Mistral Small 4 | 11 | | #170 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| gpt-oss-120b (high) | 12 | | #160 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Mistral Large 3 | 10 | | #187 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |
| Llama 4 Maverick | 9 | | #192 | https://artificialanalysis.ai/leaderboards/models | 2026-09-07 |

### 1.1b Legacy / individually-requested models (from their model pages)

These sit below the leaderboard's current 202-entry cut or are scored per-model; ranks on model pages are within that page's own comparison class (denominators differ per page).

| Model (name as AA lists it) | AA II v4.3 | Est. | Rank (as shown) | Source URL | Date |
|---|---|---|---|---|---|
| GPT-5 (high) | 23 | yes (labeled estimate; page also flags model as deprecated, recommends GPT-5.1) | #109 of 202 | https://artificialanalysis.ai/models/gpt-5 | 2026-09-07 |
| GPT-5 mini (high) | 17 | no | #49 of 175 | https://artificialanalysis.ai/models/gpt-5-mini | 2026-09-07 |
| GPT-5 nano (high) | 13 | yes | #12 of 59 | https://artificialanalysis.ai/models/gpt-5-nano | 2026-09-07 |
| GPT-5 pro | UNCERTAIN | — | — | https://artificialanalysis.ai/models/gpt-5-pro returned HTTP 404 on 2026-09-07; no public score found | 2026-09-07 |
| Claude Opus 4.5 (Non-reasoning) | 24 | yes | #9 of 64 | https://artificialanalysis.ai/models/claude-opus-4-5 | 2026-09-07 |
| Claude Sonnet 4.5 | UNCERTAIN | — | — | https://artificialanalysis.ai/models/claude-sonnet-4-5 returned HTTP 404 on 2026-09-07; page appears removed (Sonnet 4.6 / Sonnet 5 are listed instead) | 2026-09-07 |
| Gemini 2.5 Pro | 17 | no | #141 of 202 | https://artificialanalysis.ai/models/gemini-2-5-pro | 2026-09-07 |
| DeepSeek R1 0528 (May '25) | 13 | yes | #75 of 112 | https://artificialanalysis.ai/models/deepseek-r1 | 2026-09-07 |
| MiniMax-M2 | 19 | yes | #53 of 112 | https://artificialanalysis.ai/models/minimax-m2 | 2026-09-07 |
| Llama 4 Scout | 6 | no | #23 of 39 | https://artificialanalysis.ai/models/llama-4-scout | 2026-09-07 |
| GLM-4.6 (Non-reasoning) | 15 | yes ("independent evaluation forthcoming") | #16 of 44 | https://artificialanalysis.ai/models/glm-4-6 | 2026-09-07 |
| Kimi K2 | 13 | yes | #20 of 44 | https://artificialanalysis.ai/models/kimi-k2 | 2026-09-07 |
| Grok 4 | 22 | yes ("independent evaluation forthcoming") | #113 of 202 | https://artificialanalysis.ai/models/grok-4 | 2026-09-07 |

### 1.2 Full public leaderboard capture (202 entries)

Source for every row: https://artificialanalysis.ai/leaderboards/models — accessed 2026-09-07. Index: AA Intelligence Index v4.3. `*` = AA-marked estimate.

1. Claude Fable 5.1 (max with fallback) — 53
2. Claude Fable 5.1 (xhigh with fallback) — 53
3. GPT-6 Astra (max) — 53
4. GPT-6 Astra (xhigh) — 53
5. Claude Fable 5.1 (high with fallback) — 51
6. GPT-6 Astra (high) — 51
7. Claude Opus 5 (max) — 51
8. Claude Fable 5 (with fallback) — 50
9. GPT-6 Astra (medium) — 50
10. Claude Opus 5 (xhigh) — 50
11. Claude Fable 5.1 (medium with fallback) — 49
12. Claude Opus 5 (high) — 48
13. Muse Spark 1.3 (max) — 48
14. GPT-5.6 Sol (max) — 47
15. Claude Fable 5.1 (low with fallback) — 47
16. GPT-6 Astra (low) — 46
17. GPT-6 Astra (Non-reasoning) — 45
18. Muse Spark 1.3 (xhigh) — 45
19. Claude Opus 5 (medium) — 45
20. Qwen3.8 Max — 45*
21. GLM-5.3 (max) — 44
22. Grok 4.6 (high) — 44
23. Grok 4.6 (xhigh) — 44
24. GPT-5.6 Sol (xhigh) — 44
25. Kimi K3 (max) — 44
26. Grok 4.6 (medium) — 43
27. GPT-5.6 Sol (high) — 42
28. GPT-5.6 Terra (max) — 42
29. Qwen3.8-Flash-Next — 42*
30. GLM-5.3-Flash — 42
31. Gemini 3.8 Flash (high) — 41
32. Qwen3.8 2.4T A95B — 40
33. Gemini 3.8 Flash (medium) — 40
34. Muse Spark 1.2 (xhigh) — 40
35. Claude Opus 5 (low) — 40
36. Gemini 3.7 Flash (medium) — 40*
37. GPT-5.6 Sol (medium) — 39
38. Gemini 3.7 Flash (high) — 39
39. Grok 4.5 (high) — 39
40. GLM-5.2 (max) — 39*
41. Claude Sonnet 5 (max) — 38
42. GPT-5.6 Terra (xhigh) — 38
43. GPT-5.6 Luna (max) — 38
44. Gemini 3.7 Flash (low) — 37*
45. DeepSeek V4 Pro 0813 (max) — 36
46. Grok 4.6 (low) — 35
47. Agnes 2.5 Pro Beta — 35*
48. DeepSeek V4 Flash Vision (max) — 35
49. GPT-5.6 Luna (xhigh) — 35
50. DeepSeek V4 Flash 0731 (max) — 35
51. GPT-5.6 Terra (high) — 34
52. Kimi K3 (low) — 34*
53. Gemini 3.6 Flash — 34
54. K2 Horizon 375B A23B — 34*
55. Qwen3.8 27B (xhigh) — 34
56. GPT-5.6 Sol (low) — 34
57. Gemini 3.8 Flash (low) — 34
58. Gemini 3.5 Flash (medium) — 34*
59. Motif 3 — 34*
60. GPT-5.6 Luna (high) — 33*
61. GPT-5.6 Terra (medium) — 33*
62. GPT-5.3 Codex (xhigh) — 33*
63. Motif 3 (Beta) — 32*
64. DeepSeek V4 Pro (max) — 31
65. Qwen3.8 27B (medium) — 31*
66. Apodex 1.1 — 30*
67. Gemini 3.1 Pro Preview — 30
68. DeepSeek V4 Pro (high) — 30*
69. MiniMax-M3 — 30
70. Kimi K2.7 Code — 29*
71. Qwen3.8 27B (low) — 29*
72. Claude Sonnet 5 (Non-reasoning) — 29*
73. Claude Sonnet 5 (medium) — 28
74. GPT-5.6 Sol (Non-reasoning) — 28*
75. Nex-N2-Pro — 28*
76. Solar Pro 4 — 28*
77. GPT-5.6 Terra (low) — 28*
78. JT-4.1 Flash 236B A21B — 27*
79. Quasar 438B (max) — 27
80. GPT-5.5 Instant (June 2026) — 27
81. Agnes 2.5 Pro Alpha — 27*
82. MiMo-V2.5-Pro — 26
83. Inkling Small — 26
84. Qwen3.7 Plus — 26
85. GPT-5.6 Luna (medium) — 26*
86. Hy3 — 26
87. Inkling — 26
88. MiMo-V2-Omni-0327 — 25*
89. Ling 3.0 Flash — 25*
90. Grok 4.3 (medium) — 25*
91. Claude Sonnet 5 (low) — 25
92. Solar Open2 250B — 25*
93. Grok 4.3 (low) — 24*
94. MiMo-V2-Omni — 24*
95. Gemini 3.5 Flash (minimal) — 24*
96. Nemotron 3 Ultra — 23
97. Claude Sonnet 4.6 (Non-reasoning, low) — 23*
98. A.X-K2 — 23*
99. Gemini 3.5 Flash-Lite — 23
100. MiMo-V2-Flash (Feb 2026) — 22*
101. GLM-5.2 (Non-reasoning) — 22*
102. Qwen3.8 27B — 22*
103. MiMo-V2.5 — 22
104. GPT-5.6 Terra (Non-reasoning) — 22*
105. Qwen3.6 35B A3B — 22*
106. LongCat 2.0 — 22*
107. Qwen3.6 27B — 22
108. GPT-5.6 Luna (low) — 22*
109. G9v3-39A5B — 22*
110. KAT-Coder-Pro V2 — 22*
111. Qwen3.5 397B A17B (Non-reasoning) — 21*
112. DeepSeek V4 Pro (Non-reasoning) — 21*
113. Qwen3.5 Omni Plus — 20*
114. o3 — 20*
115. Qwen3.6 27B (Non-reasoning) — 20
116. K-EXAONE 2.0 — 20*
117. Step 3.7 Flash — 19*
118. Qwen3.5 397B A17B — 19
119. DeepSeek V4 Flash (Non-reasoning) — 19*
120. JT-35B-Flash — 19*
121. MiMo-V2.5-Pro (Non-reasoning) — 18*
122. Muse Glimmer (high) — 18
123. Qwen3.5 122B A10B (Non-reasoning) — 18*
124. Claude 4.5 Haiku — 18
125. Ring-2.6-1T — 17
126. Doubao Seed Code — 17*
127. GPT-5.6 Luna (Non-reasoning) — 17*
128. Gemma 4 26B A4B — 17*
129. Qwen3.5 122B A10B — 16
130. MiMo-V2-Flash (Non-reasoning) — 16*
131. Gemma 4 31B — 15
132. Claude 4.5 Haiku (Non-reasoning) — 15*
133. Qwen3.6 35B A3B (Non-reasoning) — 15*
134. Qwen3.5 35B A3B (Non-reasoning) — 15*
135. Mistral Medium 3.5 — 15
136. Granite 4.2 30B — 15*
137. Grok 4.3 (Non-reasoning) — 15
138. K-EXAONE — 14*
139. MiniCPM5-2B — 14*
140. ERNIE 5.0 Thinking Preview — 14*
141. Gemma 4 12B — 14*
142. Nova 2.0 Pro Preview (medium) — 14*
143. Command A+ — 14
144. Gemma 4 31B (Non-reasoning) — 14*
145. Qwen3.5 9B — 14*
146. Nova 2.0 Omni (medium) — 14*
147. Nemotron 3.5 Lightning — 14
148. Nemotron 3 Super — 14
149. Apriel-v1.6-15B-Thinker — 13*
150. Nova 2.0 Lite (high) — 13*
151. Qwen3.5 9B (Non-reasoning) — 13*
152. EXAONE 4.5 33B — 13*
153. Gemma 4 26B A4B (Non-reasoning) — 13*
154. Qwen3.5 4B — 13*
155. North Mini Code — 13*
156. Nova 2.0 Pro Preview (low) — 13*
157. Nova 2.0 Lite (medium) — 12*
158. Qwen3.5 Omni Flash — 12*
159. Granite 4.2 8B — 12*
160. gpt-oss-120b (high) — 12
161. JT-MINI — 12
162. Ling 3.0 Tiny — 12
163. Magistral Medium 1.2 — 12
164. Nova 2.0 Lite (low) — 12
165. HyperNova 60B 2605 (high) — 12
166. Nemotron Cascade 2 30B A3B — 12
167. Mercury 2 — 12
168. K2 Think V2 — 11
169. LongCat Flash Lite — 11
170. Mistral Small 4 — 11
171. HyperCLOVA X SEED Think (32B) — 11
172. K-EXAONE (Non-reasoning) — 11
173. Qwen3 Next 80B A3B (Reasoning) — 11
174. Nova 2.0 Omni (low) — 11
175. Mi:dm K 2.5 Pro — 11
176. Trinity Large Thinking — 11
177. G9v3-3B — 11
178. Qwen3.5 4B (Non-reasoning) — 11
179. INTELLECT-3 — 11
180. Solar Open 100B — 10
181. Nemotron 3 Nano Omni 30B A3B — 10
182. gpt-oss-120b (low) — 10
183. Qwen3 Coder Next — 10
184. Nova 2.0 Pro Preview (Non-reasoning) — 10
185. gpt-oss-20b (low) — 10
186. K2-V2 (high) — 10
187. Mistral Large 3 — 10
188. Qwen3 Next 80B A3B — 10
189. DiffusionGemma 26B A4B — 10
190. Devstral 2 — 9
191. Gemma 4 12B (Non-reasoning) — 9
192. Llama 4 Maverick — 9
193. Motif-2-12.7B — 9
194. Nova Premier — 9
195. Granite 4.2 3B — 9
196. gpt-oss-20b (high) — 9
197. K2-V2 (medium) — 9
198. Llama Nemotron Super 49B v1.5 — 9
199. Mistral Small 4 (Non-reasoning) — 9
200. Tri-21B-Think — 9
201. Gemma 4 E4B — 9
202. Nemotron 3 Nano — 9

### 1.3 Coding Index and Math Index status

- **AA Coding Index: NOT published as a public per-model composite on the website.** Model pages (checked https://artificialanalysis.ai/models/gpt-5) show only the Intelligence Index composite plus JS-rendered per-evaluation charts (SciCode, Terminal-Bench v4.0, etc. — no numbers extractable). The **data API** does expose an `artificial_analysis_coding_index` field (https://artificialanalysis.ai/data-api/docs; also listed at https://artificialanalysis.ai/api-reference). UNCERTAIN for any specific model value without an API key.
- **AA Math Index: no longer exists as a composite.** The data-api docs state: "there is **no math index**; the third composite is the agentic index" (`artificial_analysis_agentic_index`) — https://artificialanalysis.ai/data-api/docs, accessed 2026-09-07. Note a contradiction: the older api-reference page (https://artificialanalysis.ai/api-reference) still lists an `artificial_analysis_math_index` field among LLM fields. Math ability is now carried by HLE (10%) and CritPt (10%) inside the Intelligence Index. Record Math Index as NOT AVAILABLE.
- Related but distinct: AA's **Coding Agent Index** (agents, not models) = "average pass@1 across DeepSWE, Terminal-Bench v2.1, and SWE-Atlas-QnA", 14 models, at https://artificialanalysis.ai/agents/coding-agents. Do not confuse with a per-model coding index.

---

## 2. Data API and terms of use

### 2.1 Does AA offer an official data API? Yes.

AA operates a documented data API. Two public doc surfaces (both accessed 2026-09-07):

1. **API reference** — https://artificialanalysis.ai/api-reference
   - "Artificial Analysis provides a free API to support analysis of AI models and in making informed decisions about which AI models to use."
   - Two tiers: "We offer a free API focused on model benchmarks and a commercial API with more comprehensive data." Commercial API documentation "is available to partners separately" (no public price list).
   - Free rate limit per this page: "The API is rate-limited to 1,000 requests per day."
   - Endpoints include `GET /data/llms/models` (benchmark scores, pricing, speed) with fields `artificial_analysis_intelligence_index`, `artificial_analysis_coding_index`, `artificial_analysis_math_index` (legacy), plus per-benchmark scores (GPQA, HLE, LiveCodeBench, SciCode, Math-500, AIME, ...).
   - Auth: "Include your API key in the `x-api-key` header."
   - Attribution: "Attribution is required for all use of our free API." (credit https://artificialanalysis.ai/). Also: cache responses; don't put keys client-side.

2. **Data API product page + docs** — https://artificialanalysis.ai/data-api and https://artificialanalysis.ai/data-api/docs
   - Base URL: `https://artificialanalysis.ai/api/v2`; same `x-api-key` auth; "one header authenticates the request."
   - Tier table (from /data-api):

     | Tier | Daily rate limit | Price | Use rights |
     |---|---|---|---|
     | Free | 100 requests | $0 | "Internal use only with attribution"; "Internal use only; no redistribution" |
     | Pro | 500 requests | monthly/yearly (undisclosed) | "Restricted external use"; full model-level data and benchmark scores; orgs under 150 employees |
     | Commercial | "Custom (1,000/day base package)" | quote via Order Form | "Commercial redistribution with attribution"; orgs 150+ employees |

   - Free endpoint `GET /api/v2/language/models/free` returns "headline indices, median performance, input/output pricing". Full per-benchmark data (`GET /api/v2/language/models`) is Pro+.
   - "Use of the API requires attribution across all tiers." "When you display or share API data, credit Artificial Analysis as the source." "A visible byline or footer link is sufficient."
   - Note the discrepancy between the two pages on free-tier limits (1,000/day vs 100/day); the /data-api/docs page (100/day, fixed 24-hour window) is the more specific and current one.

### 2.2 Governing terms (both PDFs read in full, 2026-09-07)

**A. Website Terms of Use, v1.0, last revised April 28, 2024** — https://artificialanalysis.ai/docs/legal/Terms-of-Use.pdf
Governs the public website (what we read without an API key).

- §2.1 License: "Company grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site solely for your own personal, noncommercial use."
- §2.2 Certain Restrictions: "(a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site, whether in whole or in part, or any content displayed on the Site; ... (c) you shall not access the Site in order to build a similar or competitive website, product, or service; and (d) except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means."
- §3.3(b)(vi) Acceptable Use: no "software or automated agents or scripts ... to generate automated searches, requests, or queries to (or to strip, scrape, or mine data from) the Site" (search-engine exception only).

**B. Data Platform Terms and Conditions, v1.1, last revised August 19, 2026** — https://artificialanalysiscdn.com/legal/ProDataPlatformTerms.pdf
Governs the API and data platform, "including access to and use of the Artificial Analysis API on the free tier". Key definitions:

- §1.4 "Data": "all information, metrics, scores, rankings, benchmarks, evaluations, indices ... This includes, without limitation, the Artificial Analysis Intelligence Index, individual evaluation scores, model and provider performance metrics, pricing data ..."
- §1.9 "Competitive Product": "any product or service whose primary purpose is benchmarking, ranking, comparison, competitive intelligence, or model/provider selection guidance for artificial intelligence models, AI inference providers, or AI-related technologies, that is substantially similar to the products and services offered by Company."
- §1.10 "Derived Data": works "created by Customer that are based upon or incorporate Data, but which do not contain any individual Data points, metrics, scores, or rankings that are available on the Platform or through the API in substantially the same form. For the avoidance of doubt, the following are NOT Derived Data: (a) raw Data points republished in any format; (b) structured or tabular reproductions of Data; (c) datasets that incorporate Data in a form that could serve as a substitute for the API or Platform; or (d) any output where the underlying Data remains individually identifiable."

#### (i) Citing individual scores with attribution + outbound links — what's allowed

- §2.3 Permitted Uses by Tier — All Tiers (Free included) may: "(a) use Data for Internal Use; (b) share charts and visualizations publicly, subject to the attribution requirements in Section 5; and (c) make **brief citations of individual Data points in publicly available content** (e.g., blog posts, articles, press releases), provided such citations include the attribution **'Source: Artificial Analysis (artificialanalysis.ai)' with a hyperlink where technically feasible** and do not reproduce Data in a structured, tabular, or machine-readable format."
- §5.1 Mandatory Attribution: "Attribution is required at all subscription tiers and in all use cases where Data or Derived Data is shared, published, displayed, or otherwise made available outside of Customer's own internal systems. There are no exceptions to this requirement." Required forms:
  - Charts & Visualizations: "Artificial Analysis logo must be visible on the chart"
  - Data & Metrics: "Source: Artificial Analysis (artificialanalysis.ai)" with hyperlink where feasible
  - Derived Data: "Based on data from Artificial Analysis" plus non-endorsement statement
- §5.2 Non-Endorsement: no implying AA endorses our work; external Derived Data needs a statement that it was created by us and does not represent AA's views.
- Free-API docs add: "Attribution is required for all use of our free API" (https://artificialanalysis.ai/api-reference).

**Bottom line for commentary/comparison contexts:** quoting a handful of individual scores inline with the exact string "Source: Artificial Analysis (artificialanalysis.ai)" + hyperlink is explicitly permitted at every tier, as long as we do not also reproduce the data in structured/tabular/machine-readable form.

#### (ii) Republishing full tables / datasets — what's prohibited

- §2.4 Redistribution Restrictions — Customer shall not: "(a) Distribute, transfer, sell, sublicense, or otherwise make raw Data files available to any third party. (b) Provide bulk data downloads (including CSV, Excel, JSON, or machine-readable exports) to any person or entity outside Customer's Authorized User account. (c) Embed or otherwise make raw Data available through any customer-facing product, API, dashboard, or service. (d) Combine Data with data from third-party sources to create a product, dataset, or service that is made available to any third party."
- Pro and Commercial tiers: "Pro and Commercial Customers may not redistribute raw Data files (including CSV, Excel, JSON, or other bulk data exports) to any third party." (§2.3)
- §2.5 Anti-Competitive Restrictions: "Customer shall not use the Data to develop, operate, or improve any product or service made available to third parties whose primary purpose is benchmarking, ranking, comparison, competitive intelligence, or model/provider selection guidance, without Company's prior written consent. Without limitation, Customer shall not: (a) Create, develop, or operate a Competitive Product. (b) Reverse-engineer, reconstruct, or replicate Company's evaluation methodologies, scoring algorithms, or index construction. (c) Create any database, index, or data product that incorporates Data and is substantially similar to any product or service offered by Company."
- §2.6(d): "Customer shall not use the Data to develop, train, fine-tune, or improve any artificial intelligence or machine learning model, algorithm, or system without Company's prior written consent."
- §3: no altering/manipulating Data values; no selective presentation that misleads "while representing or implying that such presentation reflects or is endorsed by Artificial Analysis."
- §11.7: on termination, "Customer shall delete all copies of raw Data and raw Data files in its possession or control within thirty (30) days."

### 2.3 What this means for our Pareto chart (effective cost vs intelligence)

Not legal advice; a reading of the quoted clauses as of 2026-09-07.

- **Clearly fine (explicitly permitted at ALL tiers, Free included):**
  - Individual score citations in article/commentary text, with "Source: Artificial Analysis (artificialanalysis.ai)" + hyperlink — §2.3(c).
  - Sharing a chart publicly with attribution — §2.3(b) — but §5.1 requires the **AA logo visible on the chart itself** (AA provides logo/brand assets per §5.3).
- **Not covered by the permissive clauses — needs care or permission:**
  - Reproducing the scores as a structured table / sortable dataset / machine-readable export on our site — §2.3(c) excludes "structured, tabular, or machine-readable format", and §1.10(a)-(d) explicitly define such reproductions as NOT Derived Data.
  - §2.4(c): embedding raw Data in a customer-facing product/dashboard. A per-point chart is a "visualization" (fine), but shipping the underlying point data as queryable/downloadable data would cross this line.
  - §2.4(d): combining AA Data with our cost data into a product offered to third parties is a listed restriction — our Pareto chart does combine these, so it leans on the chart/visualization permission (§2.3(b)) and brief-citation permission (§2.3(c)) rather than qualifying as a data product.
  - §2.5 Anti-Competitive clause is the biggest exposure: Token Perks' purpose includes model/provider selection guidance and comparison, which matches the "Competitive Product" definition. If we consume AA data via the Platform/API, §2.5 arguably applies absent written consent. Practical mitigations: (1) keep AA data to individually-cited, chart-form presentations with full attribution; (2) do not build any AA-data database/index; (3) proactively email AA (hello@artificialanalysis.ai) describing our chart and ask for written consent — §2.5's gate is "without Company's prior written consent".
  - If we instead only cite publicly visible scores as brief commentary citations (no API key, no bulk table), our exposure falls under the Website ToU rather than the Data Platform Terms, but Website ToU §2.2 still prohibits reproduction of Site content and §3.3 prohibits scraping — so API access with attribution, or written consent, is the cleaner path.
- Recommendation for the build: per-point "Source: Artificial Analysis" label + link (as planned), AA logo on the chart, no downloadable AA data table, and reach out to AA for written consent before launch.

---

## 3. Methodology notes (how the Intelligence Index is computed)

Source for all bullets: https://artificialanalysis.ai/methodology/intelligence-benchmarking (accessed 2026-09-07), cross-checked against https://artificialanalysis.ai/models and https://artificialanalysis.ai/data-api/docs.

- **v4.3 is a weighted average across four categories, 10 evaluations, weights tilted toward agentic work.** Agents 30% (AA-Briefcase 15%, GDPval-AA v2 10%, AutomationBench-AA 5%), Coding 20% (Terminal-Bench v4.0 10%, SciCode 10%), General 30% (AA-Omniscience 15%, GDP.pdf 10%, AA-LCR v1.1 5%), Scientific Reasoning 20% (HLE 10%, CritPt 10%). The suite is "primarily text-based, English-language". Estimated 95% CI of the index: less than ±1% (based on >10-repeat experiments).
- **Normalization:** only the two Elo-based agent evals are rescaled — Elo is "frozen at the time of a model's addition" and mapped via clamp((Elo - 500) / 2000). AA-Briefcase Elo is anchored with GPT-5.5 (medium) at 1000; GDPval-AA v2 is "anchored to human expert deliverables at 1000". All other evals contribute raw pass rates/scores at their stated weights.
- **Elo machinery (where used):** Bradley-Terry model fit by maximum likelihood; 95% CIs from the sandwich estimator; ties count as half-wins; two-stage sampling (balanced first, then Elo-informed pairing). GDPval-AA v2 is judged by a three-judge panel — GPT-5.5 (medium reasoning), Gemini 3.1 Pro Preview (high reasoning), Claude Opus 4.8 (high effort) — sampled per comparison, submissions anonymized as A/B. AA-Briefcase converts rubric pass rates into Elo via "synthetic head-to-head matches using a maximum-likelihood Elo aggregation", combined with analytical-quality and presentation Elo.
- **Harness / running conditions:** zero-shot instruction prompting (no few-shot); temperature 0 for non-reasoning models, 0.6 for reasoning models (unless the lab recommends otherwise); max output 16,384 tokens for non-reasoning (adjusted to model limits), maximum disclosed output for reasoning models; up to 30 automatic retries, failures manually reviewed, compromised results not published; scoring is pass@1 aggregated over repeats. Agent harnesses: Stirrup (open source) for AA-Briefcase and GDPval-AA v2 (500- and 250-turn caps, finish/abandon tools), mini-SWE-agent v2.4.6 for Terminal-Bench, Zapier's AutomationBench environment (50-turn cap); E2B is the primary sandbox provider. GPT-5.6 Luna (medium) is the judge model for AA-Omniscience, GDP.pdf criteria, AA-LCR, and HLE equality checks.
- **Reasoning-effort variants are scored separately** — each model endpoint/effort setting (e.g. "GPT-5.6 Sol (max)" vs "(medium)" vs "(Non-reasoning)") gets its own leaderboard row and score.
- **Cost-per-task is weighted by the same benchmark weights** as the index: "Each evaluation's cost is calculated from input, cache hit, cache write, reasoning, and answer token prices, divided by task count, and weighted by its Intelligence Index weight" (https://artificialanalysis.ai/models). Directly relevant to our Pareto x-axis: AA's own cost-per-intelligence-task metric uses these weights, and AA's blended price assumes a 7:2:1 cache-hit:input:output ratio (https://artificialanalysis.ai/methodology).

---

## Source list (all accessed 2026-09-07)

| What | URL |
|---|---|
| Full leaderboard (202 entries) | https://artificialanalysis.ai/leaderboards/models |
| Models overview (v4.2-era text, per-eval descriptions, cost-per-task wording) | https://artificialanalysis.ai/models |
| Intelligence Index methodology v4.3 | https://artificialanalysis.ai/methodology/intelligence-benchmarking |
| Methodology index | https://artificialanalysis.ai/methodology |
| API reference (free API, 1,000/day, field names) | https://artificialanalysis.ai/api-reference |
| Data API product + tier table | https://artificialanalysis.ai/data-api |
| Data API docs (base URL, 100/day free, no math index) | https://artificialanalysis.ai/data-api/docs |
| Website Terms of Use v1.0 (2024-04-28), PDF | https://artificialanalysis.ai/docs/legal/Terms-of-Use.pdf |
| Data Platform Terms v1.1 (2026-08-19), PDF | https://artificialanalysiscdn.com/legal/ProDataPlatformTerms.pdf |
| Coding Agent Index | https://artificialanalysis.ai/agents/coding-agents |
| Model pages (see section 1.1b rows for each slug) | https://artificialanalysis.ai/models/{slug} |
