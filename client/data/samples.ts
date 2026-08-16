export interface SampleItem {
  slug: string
  service: string
  segment: 'elementary' | 'junior_high' | 'senior_high' | 'college'
  title: string
  note: string
  placeholder: string
  description: string
}

export const samples: SampleItem[] = [
  {
    slug: 'powerpoint-decks',
    service: 'PowerPoint Decks',
    segment: 'elementary',
    title: 'Grade 6 — Science',
    note: 'Week 4, 5 slides/session',
    placeholder: 'Sample PPT screenshot goes here',
    description: 'Self-made, fully editable slides matched sa BOW — hindi AI-dumped na content. Bawat slide deck ay sinusunod ang DepEd competencies at inayos para madaling ituro.'
  },
  {
    slug: 'lesson-plans-ilaw',
    service: 'Lesson Plans (ILAW)',
    segment: 'senior_high',
    title: 'Grade 10 — Araling Panlipunan',
    note: 'ILAW format, Quarter 2',
    placeholder: 'Sample DLL screenshot goes here',
    description: 'DepEd ILAW-format na daily lesson log, BOW-aligned, ready i-print o i-submit. Kasama ang learning objectives, procedures, at assessment.'
  },
  {
    slug: 'modules-worksheets',
    service: 'Modules & Worksheets',
    segment: 'junior_high',
    title: 'Grade 8 — English',
    note: "Differentiated activity sheet",
    placeholder: 'Sample worksheet goes here',
    description: "Learner-ready modules at activity sheets, may differentiated versions para sa iba't ibang learner level."
  },
  {
    slug: 'assessments-tos',
    service: 'Assessments + TOS',
    segment: 'junior_high',
    title: 'Grade 7 — Mathematics',
    note: 'Summative test with TOS & answer key',
    placeholder: 'Sample exam + TOS goes here',
    description: 'Summative test na may kasamang Table of Specifications at answer key, ready i-print.'
  },
  {
    slug: 'full-quarter-kit',
    service: 'Full Quarter Kit',
    segment: 'senior_high',
    title: 'Grade 9 — Filipino',
    note: 'Complete Quarter 3 kit',
    placeholder: 'Sample full kit goes here',
    description: 'Kumpletong quarter kit — DLL, PPT, worksheets, at summative — lahat batay sa isang BOW.'
  },
  {
    slug: 'custom-request',
    service: 'Custom Request',
    segment: 'elementary',
    title: 'SPED-modified worksheet set',
    note: 'Halimbawa ng custom project',
    placeholder: 'Sample custom project goes here',
    description: 'Halimbawa ng custom na request — SPED-modified na worksheet set na inayos base sa specific na pangangailangan ng klase.'
  }
]