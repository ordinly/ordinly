import * as IconImport from "react-icons/fa";

const Icons = { ...IconImport };

const iconMapping: { [key: string]: keyof typeof Icons } = {
  account: "FaUserCog",
  work: "FaToolbox",
  dashboard: "FaChartLine",
  logout: "FaSignOutAlt",
  menu: "FaBars",
  empty: "FaFolderOpen",
  add: "FaPlus",
  trash: "FaTrash",
  project: "FaPuzzlePiece",
  team: "FaPeopleCarry",
  worker: "FaUser",
  "no-image": "FaImage",
  settings: "FaCog",
  people: "FaUsersCog",
  invitation: "FaEnvelope",
  close: "FaTimes",
  info: "FaInfo",
  owner: "FaAward",
  back: "FaChevronLeft",
  workers: "FaUsers",
  role: "FaIdCard",
  vendor: "FaIndustry",
  "caret-down": "FaChevronDown",
  subscription: "FaMoneyCheck",
  task: "FaClipboardList",
  company: "FaUniversity",
  clients: "FaHandshake",
  edit: "FaEdit",
  files: "FaFileAlt",
  save: "FaSave",
  "empty-items": "FaInbox",
  pending: "FaClock",
  exclamation: "FaExclamation",
  inProgress: "FaClock",
  complete: "FaCheckCircle",
  notStarted: "FaMinusCircle",
  overview: "FaChartPie",
  "due-date": "FaRegClock",
  message: "FaComment",
  send: "FaPaperPlane",
  upload: "FaUpload",
  invoice: "FaReceipt",
  client: "FaAddressCard",
  quote: "FaFileInvoiceDollar",
  downloadFile: "FaFileDownload",
  document: "FaFileContract",
  "chevron-left": "FaChevronLeft",
  "chevron-right": "FaChevronRight",
  connections: "FaCommentAlt",
  email: "FaMailBulk",
  notes: "FaStickyNote",
  templates: "FaProjectDiagram",
  contacts: "FaAddressBook",
  roadmap: "FaMapSigns",
  table: "FaThList",
  cards: "FaThLarge",
  filters: "FaSlidersH",
  more: "FaEllipsisV",
  calendar: "FaRegCalendar",
  marketplace: "FaNewspaper",
  check: "FaCheck",
  filter: "FaFilter",
  location: "FaMapMarkerAlt",
  bold: "FaBold",
  italic: "FaItalic",
  underline: "FaUnderline",
  strikethrough: "FaStrikethrough",
  "ordered-list": "FaListOl",
  "unordered-list": "FaListUl",
  tag: "FaTag",
  "company-profile": "FaTable",
};

export default iconMapping;
