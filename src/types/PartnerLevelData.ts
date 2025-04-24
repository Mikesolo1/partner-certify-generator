
import { PartnerLevel } from './PartnerLevel';

export interface PartnerLevelData {
  level: string;
  commission: number;
  description: string;
  minClients: number;
  maxClients?: number;
  icon: string;
  color: string;
}

export const PARTNER_LEVELS: PartnerLevelData[] = [
  {
    level: "Бронзовый",
    commission: 20,
    description: "Начальный уровень партнерства с базовыми преимуществами",
    minClients: 0,
    maxClients: 5,
    icon: "award",
    color: "#CD7F32"
  },
  {
    level: "Серебряный",
    commission: 25,
    description: "Более высокий процент комиссии и расширенная техническая поддержка",
    minClients: 6,
    maxClients: 10,
    icon: "badge",
    color: "#C0C0C0"
  },
  {
    level: "Золотой",
    commission: 27,
    description: "Приоритетная поддержка и возможность получения сертификата",
    minClients: 11,
    maxClients: 20,
    icon: "medal",
    color: "#FFD700"
  },
  {
    level: "Платиновый",
    commission: 35,
    description: "VIP-поддержка, персональный менеджер и высокий процент комиссии",
    minClients: 21,
    maxClients: 50,
    icon: "diamond",
    color: "#9B87F5"
  },
  {
    level: "Божественный",
    commission: 50,
    description: "Максимальные привилегии и наивысший процент комиссии",
    minClients: 51,
    icon: "star",
    color: "#8B5CF6"
  }
];
