
export interface PartnerLevelInfo {
  level: string;
  commission: number;
  minClients: number;
  maxClients: number | null;
  color: string;
  icon: string;
  description: string;
}

export const PARTNER_LEVELS: PartnerLevelInfo[] = [
  {
    level: "Бронзовый",
    commission: 20,
    minClients: 0,
    maxClients: 5,
    color: "#CD7F32",
    icon: "award",
    description: "Начальный уровень партнёрства. Получайте 20% комиссии с платежей ваших клиентов"
  },
  {
    level: "Серебряный",
    commission: 25,
    minClients: 6,
    maxClients: 10,
    color: "#C0C0C0",
    icon: "badge",
    description: "Средний уровень. Увеличенная комиссия 25% и расширенная техническая поддержка"
  },
  {
    level: "Золотой",
    commission: 27,
    minClients: 11,
    maxClients: 20,
    color: "#FFD700",
    icon: "medal",
    description: "Высокий уровень. Комиссия 27% и приоритетная поддержка клиентов"
  },
  {
    level: "Платиновый",
    commission: 35,
    minClients: 21,
    maxClients: 50,
    color: "#9B87F5",
    icon: "diamond",
    description: "Элитный уровень. Комиссия 35% и персональный менеджер для вас и ваших клиентов"
  },
  {
    level: "Божественный",
    commission: 50,
    minClients: 51,
    maxClients: null,
    color: "#E5DEFF",
    icon: "star",
    description: "Максимальный уровень. Получайте 50% комиссии и эксклюзивные привилегии"
  }
];
