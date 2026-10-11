import { SyntheticRegistrationRecord } from '../types';

export const SYNTHETIC_REGISTRATION_RECORDS: SyntheticRegistrationRecord[] = [
  {
    demoId: 'DEMO-REG-001',
    exampleEntityName: 'Example Education Entity',
    datasetLabel: 'Synthetic demo record',
    category: 'Educational Institute / Content Creator (Non-Advisory)',
    fictionalNote: 'Fictional placeholder for testing FinTrust interface. Not a real SEBI registration.'
  },
  {
    demoId: 'DEMO-REG-002',
    exampleEntityName: 'Example Research Entity',
    datasetLabel: 'Synthetic demo record',
    category: 'Simulated Research Analyst (INH-0000000000-DEMO)',
    fictionalNote: 'Fictional research analyst entity for classroom demonstration only. No legal standing.'
  },
  {
    demoId: 'DEMO-REG-003',
    exampleEntityName: 'Example Advisory Entity',
    datasetLabel: 'Synthetic demo record',
    category: 'Simulated Investment Adviser (INA-0000000000-DEMO)',
    fictionalNote: 'Fictional investment advisory entity for prototype testing. Must not be used for real investments.'
  }
];

export const OFFICIAL_SEBI_RESOURCES = [
  {
    title: 'SEBI Investor Education Portal',
    url: 'https://investor.sebi.gov.in/',
    description: 'Official educational guides on securities markets, financial planning, and investor protection in India.'
  },
  {
    title: 'SEBI — How to Spot a Scam',
    url: 'https://investor.sebi.gov.in/spot-any-scam.html',
    description: 'Detailed official guide by SEBI warning against Ponzi schemes, unregistered PMS, fake WhatsApp groups, and guaranteed return traps.'
  },
  {
    title: 'SEBI — Recognised Intermediaries Directory',
    url: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes',
    description: 'Public directory of registered stock brokers, merchant bankers, depository participants, and mutual fund intermediaries.'
  },
  {
    title: 'SEBI — Search Intermediaries Database',
    url: 'https://www.sebi.gov.in/department/market-intermediaries-regulation-and-supervision-department-14/search-intm.html',
    description: 'Direct query tool to verify current registration validity of Research Analysts (RA) and Investment Advisers (IA).'
  }
];

export const REGISTRATION_CATEGORIES_GUIDE = [
  {
    name: 'Research Analyst (RA)',
    regulations: 'SEBI (Research Analysts) Regulations, 2014',
    scope: 'Authorized to publish research reports, stock target valuations, and public recommendations. Required to disclose personal holdings and conflicts of interest.',
    keyRule: 'Must hold valid SEBI RA registration number starting with INH.'
  },
  {
    name: 'Investment Adviser (IA)',
    regulations: 'SEBI (Investment Advisers) Regulations, 2013',
    scope: 'Authorized to provide customized, client-specific financial planning and portfolio advice. Fee-only structure; cannot receive broker distribution kickbacks.',
    keyRule: 'Must hold valid SEBI IA registration number starting with INA.'
  },
  {
    name: 'Mutual Fund Distributor (MFD)',
    regulations: 'AMFI Guidelines / SEBI Mutual Fund Regulations',
    scope: 'Distributes mutual fund schemes and earns trail commission. Cannot charge advisory fees or offer customized direct equity trading calls.',
    keyRule: 'Registered with AMFI with valid ARN code.'
  },
  {
    name: 'Financial Educator / General Content Creator',
    regulations: 'General Speech / Content Disclaimer Norms',
    scope: 'Can teach market concepts, balance sheet interpretation, and macroeconomic principles. Cannot give buy/sell calls or stock price targets.',
    keyRule: 'No SEBI registration required for genuine conceptual education, but strictly prohibited from charging for tips or managing public funds.'
  }
];
