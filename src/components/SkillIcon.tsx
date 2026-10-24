import type { ComponentType } from 'react';
import {
  SiTensorflow, SiKeras, SiPytorch, SiScikitlearn, SiHuggingface, SiOpencv,
  SiYolo, SiSpacy, SiPython, SiR, SiJavascript,
  SiTypescript, SiPandas, SiNumpy, SiPlotly, SiApachespark, SiApachekafka,
  SiHtml5, SiCss, SiTailwindcss, SiReact, SiNextdotjs, SiNodedotjs,
  SiFastapi, SiStreamlit, SiGradio, SiPostgresql, SiMysql, SiMongodb,
  SiRedis, SiFirebase, SiGithub, SiDocker, SiVercel, SiGooglecloud,
  SiGooglecolab, SiJupyter, SiPostman, SiPytest, SiLinux, SiGooglegemini,
  SiClaude, SiCursor, SiModelcontextprotocol, SiLatex,
  SiNotion, SiObsidian, SiGooglesheets, SiN8N, SiTelegram, SiBitcoin,
  SiTradingview,
} from 'react-icons/si';
import { FaAws, FaFileExcel } from 'react-icons/fa';
import {
  Database, BarChart3, LineChart, ScatterChart, PieChart, TerminalSquare,
  Orbit, PenLine, MessageSquareText, FileText, Bot, Sparkles, Webhook,
  Braces, Workflow, Zap, Banknote, Coins, Fuel, CandlestickChart,
  TrendingUp, Waves, ShieldCheck, History, Sigma, Activity, BrainCircuit,
} from 'lucide-react';

type IconComponent = ComponentType<{
  size?: number | string;
  className?: string;
  color?: string;
}>;

// Brand icons not available in react-icons — inlined SVGs
const TableauIcon = ({ size = 16, className }: { size?: number | string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M242.69 340.3h26.62v-72.6h67v-25.82h-67v-72.6h-26.62v72.6h-66.15v25.82h66.15zM119.26 445.18h22.59v-64.54h59.7v-20.17h-59.7v-65.34h-22.59v65.34h-59.7v20.17h59.7zM370.15 212h22.59v-64.5h60.5v-19.37h-60.5V62.79h-22.59v65.34h-59.7v19.37h59.7zM246.72 496h19.36v-46h41.15v-16.92h-41.15v-46h-19.36v46h-40.33V450h40.33zM120.07 212h21v-65.31h60.51v-18.56H141V62.79h-21v65.34H59.56v18.56h60.51zm315.65 96.84h19.36v-45.18H496v-17.74h-40.92v-45.18h-19.36v45.18h-40.33v17.74h40.33z" />
    <path fillRule="evenodd" d="M370.15 445.18h22.59v-64.54h60.5v-20.17h-60.5v-65.34h-22.59v65.34h-59.7v20.17h59.7z" />
    <path d="M307 74.08V60.37h-40.34V16h-14.52v44.37h-40.33v13.71h40.33v44.37h14.52V74.08zM56.11 305.61h14.52v-44.37H111v-13.71H70.63V204H56.11v43.56H16v14.52l40.11-.08z" />
  </svg>
);

const VsCodeIcon = ({ size = 16, className }: { size?: number | string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
    <path d="M15.434 1.72887L12.14 0.144875C12.002 0.078875 11.855 0.046875 11.709 0.046875C11.353 0.046875 11.18 0.211875 11.155 0.228875C11.073 0.270875 11.005 0.337875 11.004 0.338875L4.698 6.08888L1.951 4.00488C1.832 3.91388 1.69 3.86987 1.548 3.86987C1.387 3.86987 1.226 3.92787 1.1 4.04288L0.219 4.84387C0.074 4.97587 0.001 5.15688 0.001 5.33687C0.001 5.51687 0.073 5.69688 0.218 5.82888L2.6 8.00088L0.217 10.1719C0.072 10.3039 0 10.4839 0 10.6639C0 10.8439 0.073 11.0249 0.218 11.1569L1.099 11.9579C1.226 12.0729 1.386 12.1309 1.547 12.1309C1.688 12.1309 1.83 12.0859 1.95 11.9959L4.697 9.91187L11.003 15.6619C11.003 15.6619 11.072 15.7299 11.155 15.7719C11.179 15.7889 11.353 15.9529 11.709 15.9529C11.855 15.9529 12.003 15.9209 12.141 15.8549L15.435 14.2709C15.781 14.1049 16.001 13.7539 16.001 13.3699V2.62888C16.001 2.24487 15.781 1.89488 15.435 1.72787L15.434 1.72887ZM7.217 7.99988L12.002 4.36987V11.6299L7.217 7.99988Z" />
  </svg>
);

const skillIcons: Record<string, IconComponent> = {
  // AI & ML
  TensorFlow: SiTensorflow,
  Keras: SiKeras,
  PyTorch: SiPytorch,
  'scikit-learn': SiScikitlearn,
  'XGBoost': Sigma,
  'Hugging Face': SiHuggingface,
  OpenCV: SiOpencv,
  YOLO: SiYolo,
  SHAP: BarChart3,
  spaCy: SiSpacy,
  'Predictive Modeling': BrainCircuit,
  'Time-Series Forecasting': Activity,
  // Languages
  Python: SiPython,
  SQL: Database,
  R: SiR,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  // Data & Analytics
  pandas: SiPandas,
  NumPy: SiNumpy,
  Matplotlib: LineChart,
  Seaborn: ScatterChart,
  Plotly: SiPlotly,
  'Apache Spark': SiApachespark,
  'Apache Kafka': SiApachekafka,
  'Power BI': PieChart,
  Tableau: TableauIcon,
  // Web & Backend
  HTML: SiHtml5,
  CSS: SiCss,
  'Tailwind CSS': SiTailwindcss,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  FastAPI: SiFastapi,
  Streamlit: SiStreamlit,
  Gradio: SiGradio,
  // Databases
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Firebase: SiFirebase,
  // Dev & Cloud
  GitHub: SiGithub,
  Docker: SiDocker,
  Vercel: SiVercel,
  AWS: FaAws,
  'Google Cloud': SiGooglecloud,
  'Google Colab': SiGooglecolab,
  Jupyter: SiJupyter,
  'VS Code': VsCodeIcon,
  Postman: SiPostman,
  Pytest: SiPytest,
  Linux: SiLinux,
  // AI Coding & Agents
  'Claude Code': TerminalSquare,
  Antigravity: Orbit,
  Cursor: SiCursor,
  Codex: PenLine,
  'Gemini CLI': SiGooglegemini,
  Claude: SiClaude,
  'Model Context Protocol': SiModelcontextprotocol,
  'Prompt engineering': MessageSquareText,
  // Research & Workflow
  'LaTeX (Overleaf)': SiLatex,
  Notion: SiNotion,
  Obsidian: SiObsidian,
  Excel: FaFileExcel,
  'Google Sheets': SiGooglesheets,
  'Patent drafting': FileText,
  'Scientific writing': PenLine,
  // n8n & AI Automation
  'n8n': SiN8N,
  'LLM Agents': Bot,
  'OpenAI API': Sparkles,
  'Webhooks': Webhook,
  'REST APIs': Braces,
  'Telegram Bots': SiTelegram,
  'Workflow Orchestration': Workflow,
  'Task Automation': Zap,
  // Financial Markets
  Forex: Banknote,
  Crypto: SiBitcoin,
  'Gold (XAUUSD)': Coins,
  'Crude Oil': Fuel,
  TradingView: SiTradingview,
  'Price Action': CandlestickChart,
  'Market Structure': TrendingUp,
  'Liquidity Analysis': Waves,
  'Risk Management': ShieldCheck,
  Backtesting: History,
};

export function SkillIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Icon = skillIcons[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

export default SkillIcon;
